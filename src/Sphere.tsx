import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import './css/globals.css'
import { ThreeElements } from '@react-three/fiber'
import * as THREE from 'three'

type MeshProps = ThreeElements['mesh'] & {
  color: string;
  position: [number, number, number];
  args?: [number, number, number];
};

export default function Sphere({ color, position, args, ...props }: MeshProps) {

  return (
    <mesh position={position} {...props}>
      <sphereGeometry args={args ? args : [2, 32, 32 ]} />
      <meshStandardMaterial color={color}/>
    </mesh>
  );
}