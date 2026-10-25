import * as THREE from "three";
import { backgroundGradientChunk, backgroundUniforms } from "../shaders/background";
import { modelConfig, planeConfig } from "../config/animationConfig";

const { GLASS_MATERIAL, COLOR } = modelConfig.MATERIAL;
const { PLANE } = planeConfig;

/**
 * Glass that refracts the animated background without rendering the scene a second time.
 *
 * The background is a pure function of (uv, time), so instead of sampling a render target
 * this material follows the refracted view ray to the background plane and evaluates the
 * same gradient function there. Transmission stays 0, so three.js never runs its extra
 * transmission pass.
 */
export function createBackgroundGlassMaterial({ dispersion }: { dispersion: boolean }) {
    const material = new THREE.MeshPhysicalMaterial({
        color: COLOR,
        metalness: 0,
        roughness: GLASS_MATERIAL.roughness,
        envMapIntensity: GLASS_MATERIAL.envMapIntensity,
        // The plane is not tone mapped, so the glass must not be either or the colours won't match
        toneMapped: false,
    });

    // Both variants share the same onBeforeCompile source, so they need distinct program cache keys
    material.customProgramCacheKey = () => `background-glass-${dispersion}`;

    material.onBeforeCompile = (shader) => {
        if (dispersion) shader.defines = { ...shader.defines, BG_DISPERSION: "" };

        shader.uniforms.uBlobPos = backgroundUniforms.uBlobPos;
        shader.uniforms.uBgPlaneCenter = { value: new THREE.Vector3(...PLANE.position) };
        shader.uniforms.uBgPlaneSize = { value: new THREE.Vector2(PLANE.geometry[0], PLANE.geometry[1]) };
        shader.uniforms.uBgIor = { value: GLASS_MATERIAL.ior };
        shader.uniforms.uBgTransmission = { value: GLASS_MATERIAL.transmission };
        shader.uniforms.uBgRefraction = { value: GLASS_MATERIAL.refraction };
        shader.uniforms.uBgDispersion = { value: GLASS_MATERIAL.dispersion };
        shader.uniforms.uBgRim = { value: GLASS_MATERIAL.rim };
        shader.uniforms.uBgRimSpread = { value: GLASS_MATERIAL.rimSpread };

        shader.vertexShader = shader.vertexShader
            .replace("#include <common>", "#include <common>\nvarying vec3 vBgWorldPosition;")
            .replace(
                "#include <worldpos_vertex>",
                "#include <worldpos_vertex>\nvBgWorldPosition = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;",
            );

        shader.fragmentShader = shader.fragmentShader
            .replace(
                "#include <common>",
                /* glsl */ `#include <common>
                varying vec3 vBgWorldPosition;
                uniform vec3 uBgPlaneCenter;
                uniform vec2 uBgPlaneSize;
                uniform float uBgIor;
                uniform float uBgTransmission;
                uniform float uBgRefraction;
                uniform float uBgDispersion;
                uniform float uBgRim;
                uniform float uBgRimSpread;

                ${backgroundGradientChunk}

                // Where a ray from the surface hits the (flat, unrotated) background plane, in its uv space
                vec2 bgPlaneUv( vec3 origin, vec3 dir ) {
                    float t = ( uBgPlaneCenter.z - origin.z ) / min( dir.z, -1e-4 );
                    vec2 hit = origin.xy + dir.xy * t;
                    return ( hit - uBgPlaneCenter.xy ) / uBgPlaneSize + 0.5;
                }

                vec2 bgRefractedUv( vec3 incident, vec3 n, float ior ) {
                    vec3 dir = normalize( mix( incident, refract( incident, n, 1.0 / ior ), uBgRefraction ) );
                    return bgPlaneUv( vBgWorldPosition, dir );
                }

                // The gradient outputs display (sRGB) values, the lighting works in linear
                vec3 bgSample( vec2 uv ) {
                    return sRGBTransferEOTF( vec4( backgroundGradient( uv ), 1.0 ) ).rgb;
                }`,
            )
            .replace(
                "#include <transmission_fragment>",
                /* glsl */ `
                vec3 bgN = inverseTransformDirection( normal, viewMatrix );
                vec3 bgI = normalize( vBgWorldPosition - cameraPosition );

                #ifdef BG_DISPERSION
                    vec3 bgSeen = vec3(
                        bgSample( bgRefractedUv( bgI, bgN, uBgIor * ( 1.0 - uBgDispersion ) ) ).r,
                        bgSample( bgRefractedUv( bgI, bgN, uBgIor ) ).g,
                        bgSample( bgRefractedUv( bgI, bgN, uBgIor * ( 1.0 + uBgDispersion ) ) ).b
                    );
                #else
                    vec3 bgSeen = bgSample( bgRefractedUv( bgI, bgN, uBgIor ) );
                #endif

                totalDiffuse = mix( totalDiffuse, bgSeen * material.diffuseColor, uBgTransmission );

                float bgFresnel = pow( 1.0 - saturate( dot( bgN, -bgI ) ), 3.0 );
                vec2 bgRimUv = bgPlaneUv( vBgWorldPosition, bgI ) + reflect( bgI, bgN ).xy * uBgRimSpread;
                totalSpecular += bgSample( bgRimUv ) * bgFresnel * uBgRim;`,
            );
    };

    return material;
}
