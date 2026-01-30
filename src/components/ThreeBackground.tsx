"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';

// City Palette: Concrete, Glass, Steel, Night Windows
const BUILDING_COLORS = ['#2d3748', '#4a5568', '#718096', '#1a365d', '#2c5282'];
const WINDOW_COLOR = '#fbbf24'; // Warm light

function Building({ position, height, color }: { position: [number, number, number], height: number, color: string }) {
    // Random windows logic
    const windows = useMemo(() => {
        const wins = [];
        // Only add windows if building is tall enough
        if (height > 1.5) {
            const levels = Math.floor(height * 2);
            for (let i = 0; i < levels; i++) {
                if (Math.random() > 0.3) { // 70% chance of light on a floor
                    wins.push(
                        <mesh position={[0, (i * 0.5) - (height / 2) + 0.5, 0.51]} key={i}>
                            <planeGeometry args={[0.6, 0.2]} />
                            <meshBasicMaterial color={WINDOW_COLOR} />
                        </mesh>
                    );
                    // Add windows to other sides? For performance, maybe just front/back or random
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
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>
            {/* Roof Top Detail */}
            <mesh position={[0, height / 2 + 0.1, 0]}>
                <boxGeometry args={[0.8, 0.2, 0.8]} />
                <meshStandardMaterial color="#1a202c" />
            </mesh>
        </group>
    );
}

function City() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.002; // Slow rotation
        }
    });

    const buildings = useMemo(() => {
        const b = [];
        // Grid generation
        for (let i = -8; i <= 8; i++) {
            for (let j = -8; j <= 8; j++) {
                // Don't place in strict grid, add jitter
                if (Math.random() > 0.4) { // Density
                    const height = Math.random() * 6 + 2; // Taller buildings
                    const color = BUILDING_COLORS[Math.floor(Math.random() * BUILDING_COLORS.length)];
                    const x = i * 2 + (Math.random() - 0.5);
                    const z = j * 2 + (Math.random() - 0.5);

                    // Don't put buildings too close to camera center if we fly through? 
                    // But we are looking from outside.

                    b.push(
                        <Building
                            key={`${i}-${j}`}
                            position={[x, 0, z]}
                            height={height}
                            color={color}
                        />
                    );
                }
            }
        }
        return b;
    }, []);

    return (
        <group ref={groupRef}>
            {buildings}
            {/* Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#111" roughness={0.8} metalness={0.2} />
            </mesh>
        </group>
    );
}

export default function ThreeBackground() {
    return (
        <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
            {/* Gradient Overlay to fade bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>

            <Canvas camera={{ position: [15, 15, 15], fov: 45 }} shadows>
                <color attach="background" args={['#050510']} />

                {/* Lighting */}
                <ambientLight intensity={0.5} color="#ccccff" />
                <directionalLight
                    position={[10, 20, 5]}
                    intensity={1.5}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                />
                <pointLight position={[-10, 10, -10]} intensity={0.5} color="#ffaa00" />

                <City />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <fog attach="fog" args={['#050510', 10, 50]} />
            </Canvas>
        </div>
    );
}
