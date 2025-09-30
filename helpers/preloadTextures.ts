import * as THREE from "three";

const textureCache: Record<string, THREE.Texture> = {};

export function preloadTextures(urls: string[]) {
    const loader = new THREE.TextureLoader();

    urls.forEach((url) => {
        if (textureCache[url]) return;

        const texture = loader.load(url, () => {
            texture.anisotropy = 16;
            texture.minFilter = THREE.LinearMipmapLinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.center.set(0.5, 0.5);
            texture.rotation = Math.PI;
            texture.wrapS = THREE.RepeatWrapping;
            texture.repeat.x = -1;
        });

        textureCache[url] = texture;
    });
}

export function getTexture(url: string) {
    return textureCache[url] || null;
}