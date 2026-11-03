import { useRef } from "react";
import * as THREE from "three";
import { useFadeInAnimation } from "./useFadeInAnimation";
import { modelConfig } from "@/components/3d/config/animationConfig";
import { useDomViewport } from "../ui/useDomViewport";

const { MAILHOME } = modelConfig;
const { SCALE, ANCHOR, OFFSET, POSITION, CATCHUP, LAG } = MAILHOME;

let anchor: HTMLElement | null = null;

/**
 * How far below the text the mail is, in screen heights, when the text is at `s` (0 = top of the screen,
 * 1 = bottom). None from CATCHUP up, so it rides on the text there. Below that it trails by LAG at the bottom
 * edge, easing in so it catches up without a bump, and keeps trailing at the same rate below the screen
 */
function lagBehind(s: number) {
    const d = (s - CATCHUP) / (1 - CATCHUP);
    if (d <= 0) return 0;
    return d <= 1 ? LAG * d * d : LAG * (2 * d - 1);
}

const localCentre = new THREE.Vector3();
const offset = new THREE.Vector3();

/**
 * Puts the middle of the mail on the anchor text, at the mail's depth, so it scrolls with the text. It trails
 * behind while the text comes up the screen and catches up at CATCHUP (see lagBehind).
 * Its pivot sits off to one side in the model, so the offset to its middle is taken out, turned with it as it
 * spins: it spins in place on the text. Hidden while the text is off screen
 */
function stickToAnchor(
    mesh: THREE.Mesh,
    camera: THREE.Camera,
    canvas: { width: number; height: number },
) {
    if (!anchor?.isConnected) anchor = document.querySelector<HTMLElement>(ANCHOR);
    if (!anchor || !(camera instanceof THREE.PerspectiveCamera)) return;

    // The canvas is fixed to the top of the window, so the text's place in the window is its place on the canvas
    const rect = anchor.getBoundingClientRect();
    const h = canvas.height;
    const s = (rect.top + rect.height * (0.5 - OFFSET[1])) / h;
    const trailing = s + lagBehind(s);
    mesh.visible = trailing > -0.5 && trailing < 1.5;
    if (!mesh.visible) return;

    // Where the mail goes on screen, from -1 to 1 across, like the camera sees it
    const x = ((rect.left + rect.width * (0.5 + OFFSET[0])) / canvas.width) * 2 - 1;
    const y = 1 - trailing * 2;

    // How far the screen reaches up and across at the mail's depth
    const depth = camera.position.z - POSITION[2];
    const halfHeight = depth * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);

    if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox();
    mesh.geometry.boundingBox!.getCenter(localCentre);
    offset.copy(localCentre).multiply(mesh.scale).applyEuler(mesh.rotation);

    mesh.position
        .set(
            camera.position.x + x * halfHeight * camera.aspect,
            camera.position.y + y * halfHeight,
            POSITION[2],
        )
        .sub(offset);
}

export function useMailHomeAnimations() {
    const ref = useRef<THREE.Mesh>(null);
    const { isMobile } = useDomViewport();

    const { applyFadeIn } = useFadeInAnimation();

    const scale = isMobile ? SCALE.MOBILE : SCALE.TABLET;

    const animate = ({
        clock,
        camera,
        size,
    }: {
        clock: THREE.Clock;
        camera: THREE.Camera;
        size: { width: number; height: number };
    }) => {
        if (!ref.current) return;

        const time = clock.getElapsedTime();

        ref.current.rotation.y += 0.004;
        applyFadeIn(ref.current, time, scale);
        stickToAnchor(ref.current, camera, size);
    };

    return { ref, animate };
}
