import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import './css/globals.css'
import Box from './Box.jsx'
import Sphere from './Sphere.jsx'
import * as THREE from 'three'
import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

const spheres : {position: [number,number,number]; color : string; description : string}[] = [
  { position: [0, 0, 0], color: 'red', description: 'é uma esfera' },
  { position: [100, 0, 0], color: 'hotpink', description: 'é uma esfera' },
  { position: [200, 0, 0], color: 'blue', description: 'é uma esfera' },
  { position: [300, 0, 0], color: 'green', description: 'é uma esfera' },
  { position: [400, 0, 0], color: 'yellow', description: 'é uma esfera' },
  { position: [500, 0, 0], color: 'orange', description: 'é uma esfera' },
]

function CameraController( {targets} : {targets : [number,number,number][]} ) {
  const { camera } = useThree()
  const [index, setIndex] = useState(0)
  const description = document.getElementById('description')

  useEffect(() => {
    const handleKeyDown = (event : KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        setIndex((i) => Math.min(i + 1, targets.length - 1))
      } else if (event.key === 'ArrowLeft') {
        setIndex((i) => Math.max(i - 1, 0))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [targets.length])

  useEffect(() => {
    const targetPos = new THREE.Vector3(...targets[index])
    camera.position.set(targetPos.x, targetPos.y + 10, targetPos.z + 50) // Ajuste de altura/distância
    camera.lookAt(targetPos)
    description!.innerText = `Sphere ${index + 1}: ${spheres[index].description}`
  }, [index, camera, targets])

  return null
}

function Stars({ count = 1000 }: { count?: number }) {
  const stars = Array.from({ length: count }, (_, i) => ({
    position: [
      Math.random() * 1500 - 600,
      Math.random() * 1500 - 600,
      Math.random() * 1500 - 600
    ],
    color: 'white',
    key: i
  }))

  return (
    <>
      {stars.map((s) => (
        <Sphere key={s.key} args={[0.25,32,32]} position={s.position as [number, number, number]} color={s.color} />
      ))}
    </>
  )
}

export default function App() {
  return (
    <div className='flex flex-col bg-black w-screen h-screen'>
      <h1 className="text-center font-bold text-red-500">Testando</h1>
      <Canvas id="scene" camera={{ position: [0, 10, 50], fov: 20 }}>
        <ambientLight intensity={0.5} />

        <directionalLight
          position={[250, 200, 100]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <directionalLight
          position={[-250, 200, 100]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <pointLight
          position={[250, 50, -50]}
          intensity={1.2}
        />

        <pointLight
          position={[0, 50, 100]}
          intensity={1}
        />

        {spheres.map((s, i) => (
            <Sphere key={i} position={s.position} color={s.color}></Sphere>
        ))}

        <Stars count={5000} />

        <CameraController targets={spheres.map((s) => s.position)} />
      </Canvas>
        <p className="text-white font-bold" id="description"></p>
    </div>
  )
}