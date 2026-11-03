import { useRef, useEffect } from "react";
import * as THREE from "three";
import { modelConfig } from "@/components/3d/config/animationConfig";
import { useThree } from "@react-three/fiber";
import { useFadeInAnimation } from "./useFadeInAnimation";
import { useRangeProgress } from "./useRangeProgress";

const { BOBBINGDISTANCE, BOBBINGSPEED, POSITION, ROTATION, SCALE, EXIT, FLYOUT } = modelConfig.LOGO;

const lerp = (start: number, end: number, t: number) => start + (end - start) * t;
const clamp01 = (t: number) => Math.min(Math.max(t, 0), 1);

function easeInOutQuint(t: number) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
}

function animatePosition(start: number[], end: number[], t: number, target: THREE.Mesh) {
    target.position.set(
        lerp(start[0], end[0], t),
        lerp(start[1], end[1], t),
        lerp(start[2], end[2], t),
    );
}

function animateScale(start: number[], end: number[], t: number, target: THREE.Mesh) {
    target.scale.set(
        lerp(start[0], end[0], t),
        lerp(start[1], end[1], t),
        lerp(start[2], end[2], t),
    );
}

function animateRotation(start: number[], end: number[], t: number, target: THREE.Mesh) {
    target.rotation.set(
        lerp(start[0], end[0], t),
        lerp(start[1], end[1], t),
        lerp(start[2], end[2], t),
    );
}

function animateLogoPosition(t: number, start: number[], end: number[], target: THREE.Mesh) {
    const eased = easeInOutQuint(t);

    const drift = Math.sin(eased * Math.PI) * 0.05;

    target.position.set(
        lerp(start[0], end[0], eased) + drift,
        lerp(start[1], end[1], eased),
        lerp(start[2], end[2], eased),
    );

    return eased;
}

let anchor: HTMLElement | null = null;

// How far through the fly-out the page is scrolled, from 0 to 1, read from where the anchor sits on screen
// (see FLYOUT in the config). 0 when the page has no anchor
function flyOutProgress() {
    if (!anchor?.isConnected) anchor = document.querySelector<HTMLElement>(FLYOUT.ANCHOR);
    if (!anchor) return 0;
    const onScreen = anchor.getBoundingClientRect().top / window.innerHeight;
    return clamp01((FLYOUT.START - onScreen) / (FLYOUT.START - FLYOUT.END));
}

const localCentre = new THREE.Vector3();
const offset = new THREE.Vector3();
const centre = new THREE.Vector3();

// From the logo's pivot to the middle of its shape, which sits off to one side in the model
function centreOffset(mesh: THREE.Mesh, scale: number) {
    if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox();
    mesh.geometry.boundingBox!.getCenter(localCentre);
    return offset.copy(localCentre).multiplyScalar(scale).applyEuler(mesh.rotation);
}

/**
 * Flies the logo straight at the camera from its current pose. Its middle moves along the line of sight, so it
 * grows on screen the way something coming at you does, without moving across it.
 */
function flyOut(mesh: THREE.Mesh, camera: THREE.Camera, t: number, scale: number) {
    centreOffset(mesh, scale);
    centre.copy(mesh.position).add(offset);

    // Closing in on the camera by a factor of k makes the logo look 1/k times bigger. k shrinks exponentially,
    // so it grows steadily on screen, and reaches 0 at the end: the logo passes the camera and is gone.
    // k is exactly 1 at the start, so it leaves from wherever the bobbing has it, without a jump
    const g = Math.pow(t, FLYOUT.ACCELERATION);
    const k = Math.pow(FLYOUT.ZOOM, -g) - g / FLYOUT.ZOOM;
    centre.sub(camera.position).multiplyScalar(k).add(camera.position);
    // Slides sideways as it comes, ending up SHIFT beside the camera, so the camera doesn't pass straight through it
    centre.x += FLYOUT.SHIFT * (1 - k);

    mesh.position.copy(centre).sub(offset);
}

export function useLogoAnimations() {
    const ref = useRef<THREE.Mesh>(null);
    const progressRef = useRef(0);
    const { applyFadeIn } = useFadeInAnimation();

    const exitProgress = useRangeProgress("home", "spacer-1");

    useEffect(() => {
        progressRef.current = exitProgress;
    }, [exitProgress]);

    const { viewport } = useThree();
    const vw = viewport.width;
    const position = vw < 4 ? POSITION.MOBILE : vw < 10 ? POSITION.TABLET : POSITION.DESKTOP;
    const scale = vw < 4 ? SCALE.MOBILE : vw < 10 ? SCALE.TABLET : SCALE.DESKTOP;
    const exitPosition = vw < 4 ? EXIT.POSITION.MOBILE : vw < 10 ? EXIT.POSITION.TABLET : EXIT.POSITION.DESKTOP;

    const animate = ({ clock, camera }: { clock: THREE.Clock; camera: THREE.Camera }) => {
        if (!ref.current) return;

        const t = progressRef.current;
        const time = clock.getElapsedTime();

        if (t <= 0) {
            ref.current.position.set(...position);
            ref.current.scale.set(...scale);
            ref.current.rotation.set(...ROTATION);
        } else if (t < 1) {
            const eased = animateLogoPosition(t, position, exitPosition, ref.current);
            animateScale(scale, EXIT.SCALE, eased, ref.current);
            animateRotation(ROTATION, EXIT.ROTATION, eased, ref.current);
        } else {
            ref.current.position.set(...exitPosition);
            ref.current.scale.set(...EXIT.SCALE);
            ref.current.rotation.set(...EXIT.ROTATION);
        }

        ref.current.position.y += BOBBINGDISTANCE * Math.sin(time * BOBBINGSPEED);

        // Gone once it has flown out, so it isn't drawn for the rest of the page
        const fly = flyOutProgress();
        ref.current.visible = fly < 1;
        if (fly > 0) flyOut(ref.current, camera, fly, scale[0]);

        applyFadeIn(ref.current, time, scale);
    };

    return { ref, animate };
}
