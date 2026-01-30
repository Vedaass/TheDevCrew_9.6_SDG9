"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

function Building({ position, height, color }: { position: [number, number, number], height: number, color: string }) {
    // Simple Box geometry for buildings
    return (
        <mesh position={[position[0], height / 2, position[2]]}>
            <boxGeometry args={[1, height, 1]} />
            <meshStandardMaterial color={color} opacity={0.8} transparent />
            <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(1, height, 1)]} />
                <lineBasicMaterial color="white" opacity={0.2} transparent />
            </lineSegments>
        </mesh>
    );
}

function City() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Slow rotation for ambient effect
            groupRef.current.rotation.y += 0.001;
        }
    });

    // Generate random buildings
    const buildings = [];
    for (let i = -5; i <= 5; i++) {
        for (let j = -5; j <= 5; j++) {
            if (Math.random() > 0.6) {
                const height = Math.random() * 3 + 1;
                buildings.push(
                    <Building
                        key={`${i}-${j}`}
                        position={[i * 2, 0, j * 2]}
                        height={height}
                        color={Math.random() > 0.5 ? '#003366' : '#004a99'}
                    />
                );
            }
        }
    }

    return (
        <group ref={groupRef}>
            {buildings}
            {/* Grid Floor */}
            <gridHelper args={[30, 30, 0xffffff, 0x555555]} />
        </group>
    );
}

export default function ThreeBackground() {
    return (
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
            <Canvas camera={{ position: [10, 10, 10], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <City />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                {/* Fog to blend into background */}
                <fog attach="fog" args={['#0a0a0a', 5, 30]} />
            </Canvas>
        </div>
    );
}
