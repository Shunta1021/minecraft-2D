"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { VoxelData } from "@/lib/converter";

interface VoxelViewerProps {
    voxels: VoxelData[];
}

function Voxels({ voxels }: { voxels: VoxelData[] }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const color = new THREE.Color();
    const dummy = new THREE.Object3D();

    useEffect(() => {
        if (!meshRef.current) return;

        // Set positions and colors
        voxels.forEach((voxel, i) => {
            dummy.position.set(voxel.x, voxel.y, voxel.z);
            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);

            // Set color
            color.setRGB(voxel.color[0] / 255, voxel.color[1] / 255, voxel.color[2] / 255);
            meshRef.current!.setColorAt(i, color);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;

    }, [voxels]); // Re-run when voxels change

    if (voxels.length === 0) return null;

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, voxels.length]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial />
        </instancedMesh>
    );
}

export function VoxelViewer({ voxels }: VoxelViewerProps) {
    // Center camera calculation
    const center = useMemo(() => {
        if (voxels.length === 0) return [0, 0, 0];
        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;
        let minZ = Infinity, maxZ = -Infinity;

        voxels.forEach(v => {
            minX = Math.min(minX, v.x); maxX = Math.max(maxX, v.x);
            minY = Math.min(minY, v.y); maxY = Math.max(maxY, v.y);
            minZ = Math.min(minZ, v.z); maxZ = Math.max(maxZ, v.z);
        });

        return [
            (minX + maxX) / 2,
            (minY + maxY) / 2,
            (minZ + maxZ) / 2
        ];
    }, [voxels]);

    return (
        <div className="w-full h-[500px] bg-slate-800 relative border-4 border-white shadow-inner">
            <Canvas gl={{ toneMapping: THREE.NoToneMapping }} flat linear>
                <PerspectiveCamera makeDefault position={[center[0], center[1], center[2] + 100]} />
                <OrbitControls target={new THREE.Vector3(center[0], center[1], center[2])} />

                <Voxels voxels={voxels} />

                {/* Simple Grid Helper instead of Ground Plane for 2D look */}
                <gridHelper args={[200, 200, 0x888888, 0x444444]} position={[center[0], -1, center[2]]} rotation={[0, 0, 0]} />
            </Canvas>
            <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 text-xs">
                LMB: Rotate | RMB: Pan | Scroll: Zoom
            </div>
        </div>
    );
}
