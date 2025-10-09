import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import './css/globals.css'
import Box from './Box.jsx'
import Sphere from './Sphere.jsx'
import Stars from './Stars.tsx'
import CameraController from './CameraController.tsx'

const spheres : {position: [number,number,number]; color : string; textureUrl : string | null}[] = [
  { position: [0, 0, 0], color: 'white', textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Equirectangular-projection.jpg' },
  { position: [100, 0, 0], color: 'white', textureUrl: 'src/assets/AUsVQ.jpg' },
  { position: [200, 0, 0], color: 'blue', textureUrl: null },
  { position: [300, 0, 0], color: 'green', textureUrl: null },
  { position: [400, 0, 0], color: 'yellow', textureUrl: null },
  { position: [500, 0, 0], color: 'orange', textureUrl: null },
]

export default function App() {
  return (
    <div className='flex flex-col bg-black w-screen h-screen'>
      <h1 className="text-center font-bold text-red-500">Testando</h1>
      <Canvas id="scene" camera={{ position: [0, 0, 20], fov: 20 }}>
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
            <Sphere key={i} position={s.position} color={s.color} textureUrl={s.textureUrl}></Sphere>
        ))}

        <Stars count={5000} />

        <CameraController />
      </Canvas>
        <p className="text-white font-bold" id="description"></p>
    </div>
  )
}