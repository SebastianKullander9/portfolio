//FIX MAGIC POV VALUES HERE AND CANVAS INTO ANIMATIONCONFIG

import Plane from "../plane/Plane";
import MacScreen from "../models/MacScreen";
import { useSlidesStore } from "@/store/useSlidesStore";
import { useThree } from "@react-three/fiber";


export default function Scene() {
    const { slides } = useSlidesStore();
    const { camera, size } = useThree();


    function getWorldPerPixel(cameraFov: number) {
        const fov = (cameraFov * Math.PI) / 180;
        const worldHeight = 2 * Math.tan(fov / 2) * camera.position.z;
        const cameraAspect = size.width / size.height;
        const worldWidth = worldHeight * cameraAspect;
        return worldWidth / window.innerWidth;
    }

    const WorldPerPixel = getWorldPerPixel(20);

    return (
        <>  
                {slides.map((slide, index) => (
                    <group key={index}>
                        <Plane index={index} WorldPerPixel={WorldPerPixel} />
                        <MacScreen index={index} WorldPerPixel={WorldPerPixel} imgUrl={slide.imgUrl} />
                    </group>
                ))}
        </>
    );
}