import { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import './css/globals.css'
import { ThreeElements } from '@react-three/fiber'
import * as THREE from 'three'
import {Texture} from 'three'

type MeshProps = ThreeElements['mesh'] & {
  textName : string | null,
  color: string;
  position: [number, number, number];
  type : string | undefined;
  args?: [number, number, number];
  textureUrl: string | null;
};

export default function Sphere({ color, textName, position, type, args, textureUrl, ...props }: MeshProps) {
  let texture;

  textureUrl ?  texture = useLoader(THREE.TextureLoader, textureUrl) as Texture : texture = null

  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={position} {...props}>
      {type !== "star" &&
        <directionalLight
            position={[position[0]-100, position[1]+50, position[2]+300]}
            intensity={1}
            castShadow
          />
      }

      <sphereGeometry args={args ? args : [2, 32, 32 ]} />

      {textureUrl ?
      <meshStandardMaterial map={texture} color={color} />
      :
      <meshStandardMaterial color={color} />}
    </mesh>
  );
}