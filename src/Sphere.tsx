import { useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import './css/globals.css'
import { ThreeElements } from '@react-three/fiber'
import * as THREE from 'three'
import {Texture} from 'three'

type MeshProps = ThreeElements['mesh'] & {
  color: string;
  position: [number, number, number];
  args?: [number, number, number];
  textureUrl: string | null;
};

export default function Sphere({ color, position, args, textureUrl, ...props }: MeshProps) {
  let texture;
  textureUrl ?  texture = useLoader(THREE.TextureLoader, textureUrl) as Texture : texture = null
  // texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  // texture.repeat.set(2, 2)
  return (
    <mesh position={position} {...props}>
      <sphereGeometry args={args ? args : [2, 32, 32 ]} />
      {textureUrl ?
      <meshStandardMaterial map={texture} color={color} /> :
      <meshStandardMaterial color={color}/>}
    </mesh>
  );
}