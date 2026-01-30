"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

// Vibrant & Realistic City Palette
const PALETTES = [
    '#e2e8f0', // Clean White
    '#cbd5e0', // Concrete
    '#a0aec0', // Darker Concrete
    '#2b6cb0', // Glass Blue
    '#2c5282', // Deep Glass
    '#c05621', // Brick Orange
    '#744210', // Brown Stone
    '#1a202c', // Modern Black
];

const WINDOW_COLORS = ['#fef3c7', '#bfdbfe', '#a7f3d0']; // Warm, Cool, Greenish lights

function Building({ position, height, color }: { position: [number, number, number], height: number, color: string }) {
    // Generate windows
    const windows = useMemo(() => {
        const wins = [];
        if (height > 1.5) {
            const levels = Math.floor(height * 2.5);
            for (let i = 0; i < levels; i++) {
                // Random patterns
                if (Math.random() > 0.4) {
                    const winColor = WINDOW_COLORS[Math.floor(Math.random() * WINDOW_COLORS.length)];
                    wins.push(
                        <mesh position={[0, (i * 0.4) - (height / 2) + 0.4, 0.51]} key={i}>
                            <planeGeometry args={[0.7, 0.25]} />
                            <meshBasicMaterial color={winColor} transparent opacity={0.8} />
                        </mesh>
                    );
                }
            }
        }
        return wins;
    }, [height]);

    return (
        <group position={[position[0], height / 2, position[2]]}>
            <mesh castShadow receiveShadow>
                <boxGeometry args={[1, height, 1]} />
                <meshStandardMaterial
                    color={color}
                    roughness={0.4}
                    metalness={0.6}
                />
            </mesh>
            {/* Windows Group */}
            {windows}
            {/* Roof Detail */}
            <mesh position={[0, height / 2 + 0.05, 0]}>
                <boxGeometry args={[0.9, 0.1, 0.9]} />
                <meshStandardMaterial color="#4a5568" />
            </mesh>
        </group>
    );
}

function CityScene() {
    const groupRef = useRef<THREE.Group>(null);

    // Smooth Flyover / Rotation Animation
    useFrame(({ clock }) => {
        if (groupRef.current) {
            const t = clock.getElapsedTime();
            // Gentle undulation and rotation
            groupRef.current.rotation.y = Math.sin(t * 0.05) * 0.2;
            groupRef.current.position.z = Math.sin(t * 0.1) * 2;
        }
    });

    const city = useMemo(() => {
        const b = [];
        // Dense City Generation
        for (let i = -10; i <= 10; i++) {
            for (let j = -10; j <= 10; j++) {
                // High density check
                if (Math.random() > 0.35) {
                    // Varied heights - some skyscrapers
                    let h = Math.random() * 4 + 1;
                    if (Math.random() > 0.95) h += 8; // Supertall
                    if (Math.random() > 0.9) h += 4; // Tall

                    const color = PALETTES[Math.floor(Math.random() * PALETTES.length)];

                    // Jitter position
                    const x = i * 1.8 + (Math.random() - 0.5) * 0.5;
                    const z = j * 1.8 + (Math.random() - 0.5) * 0.5;

                    b.push(
                        <Building
                            key={`${i}-${j}`}
                            position={[x, 0, z]}
                            height={h}
                            color={color}
                        />
                    );
                }
            }
        }
        return b;
    }, []);

    return (
        <group ref={groupRef} rotation={[0, Math.PI / 4, 0]}>
            {city}
            {/* Ground Plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <circleGeometry args={[50, 64]} />
                <meshStandardMaterial color="#0f172a" roughness={0.9} />
            </mesh>
        </group>
    );
}

export default function ThreeBackground() {
    return (
        <div className="absolute inset-0 z-0 opacity-100 pointer-events-none overflow-hidden">
            {/* Gradient Overlay to fade bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10 opacity-80"></div>

            <Canvas camera={{ position: [0, 25, 30], fov: 25 }} shadows dpr={[1, 2]}>
                {/* Atmospheric Color */}
                <color attach="background" args={['#0f172a']} />

                <fog attach="fog" args={['#0f172a', 15, 60]} />

                {/* Dynamic Lighting */}
                <ambientLight intensity={0.6} color="#ffffff" />
                <directionalLight
                    position={[50, 50, 25]}
                    intensity={1.5}
                    castShadow
                    shadow-mapSize={[2048, 2048]}
                    color="#fff7ed" // Warm sun/moon
                />
                <pointLight position={[-20, 10, -20]} intensity={1} color="#60a5fa" /> {/* Blue city glow */}

                <CityScene />

                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
            </Canvas>
        </div>
    );
}
