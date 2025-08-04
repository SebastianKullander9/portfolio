import { Text } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from "three";

export default function SlidingText() {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const refs = useRef<any>([]);
    const speed = 0.0005;
    const text = new String("Sebastian Kullander Frontend Developer");
    const textArray = text.split('');

    const leftBoundary = -0.5;
    const rightStart = 0.01;

    useFrame(() => {
        refs.current.forEach((letter: THREE.Mesh, index: number) => {
            if (!letter) return;

            letter.position.x -= speed;

            if (letter.position.x < leftBoundary) {
            const letterWidth = 1 * 0.01;
            const totalWidth = textArray.length * letterWidth;
            letter.position.x = rightStart + totalWidth;
            }
        });
    });

    return (
        <>
            {textArray.map((character, index) => {
                return <Text 
                    key={index}
                    ref={(element) => (refs.current[index] = element)}
                    fontSize={0.04}
                    color="white"
                    position={[rightStart + (1 * index * 0.02), 0.061, 4.75]}
                    font="/fonts/Boska-Variable.ttf"
                    material-toneMapped={false}
                >
                    {character}
                </Text>
            })}
        </>
        
    );
}