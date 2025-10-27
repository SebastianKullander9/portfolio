import { Text } from "@react-three/drei";
import { useSlidingTextAnimations } from "@/hooks/animations/useSlidingTextAnimations";
import { slidingTextConfig } from "../config/animationConfig";
import { RefObject } from "react";
import * as THREE from "three";

const { TEXT, FONTSIZE, TEXTPOSITIONX } = slidingTextConfig;

interface SlidingTextProps {
    refs: RefObject<THREE.Mesh[]>;
    textWidth: number;
}

export default function SlidingText({ refs, textWidth } : SlidingTextProps) {
    const NUM_INSTANCES = 2;

    return (
        <>
            {[...Array(NUM_INSTANCES)].map((_, i) => (
                <Text
                    key={i}
                    ref={(el) => (refs.current[i] = el!)}
                    fontSize={FONTSIZE}
                    color="white"
                    position={[i * textWidth, 0, TEXTPOSITIONX]}
                    font="/fonts/tan-pearl.otf"
                    material-toneMapped={false}
                >
                    {TEXT}
                </Text>
            ))}
        </>
    );
}