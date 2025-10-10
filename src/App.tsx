import { Canvas } from '@react-three/fiber'
import './css/globals.css'
import Sphere from './Sphere.jsx'
import Stars from './Stars.tsx'
import CameraController from './CameraController.tsx'
import {Text} from '@react-three/drei'
import { useEffect, useRef } from 'react'

type Planet = {
  name : string,
  position: [number,number,number],
  size: [number,number,number],
  color : string,
  textureUrl : string | null
}

const spheres : Planet[] = [
  { name: "Sol", size: [218.6,3497.6,3497.6], position: [-800, 0, 0], color: 'white', textureUrl: '/assets/sun.jpg' },
  { name: "Mercúrio", size: [1.9,30.4,30.4], position: [-100, 0, 0], color: 'white', textureUrl: "/assets/mercury.png" },
  { name: "Vênus", size: [0.766,12.25,12.25], position: [-50, 0, 0], color: 'white', textureUrl: '/assets/venus.jpg' },
  { name: "Terra", size: [2,32,32], position: [0, 0, 0], color: 'white', textureUrl: '/assets/earth.png' },
  { name: "Marte", size: [1.064,17,17], position: [50, 0, 0], color: 'white', textureUrl: '/assets/mars.jpg' },
  { name: "Júpiter", size: [21.34,341.44,341.44], position: [150, 0, 0], color: 'white', textureUrl: "/assets/jupiter.jpg" },
  { name: "Saturno", size: [18.28,292.48,292.48], position: [250, 0, 0], color: 'white', textureUrl: "/assets/saturn.jpg" },
  { name: "Urano", size: [7.96,127.36,127.36], position: [350, 0, 0], color: 'white', textureUrl: "/assets/uranus.jpg" },
  { name: "Netuno", size: [7.74,123.84,123.84], position: [450, 0, 0], color: 'white', textureUrl: "/assets/nepturn.jpg" },
]

export default function App() {
  const tipRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    if(tipRef.current){
      setTimeout(() =>{
        tipRef.current.style.display = "none"
        console.log("Passou o tempo")
      },10000)
    }
  })

  return (
    <div className='flex flex-col bg-black w-screen h-screen'>
      <Canvas camera={{ position: [0, 0, 20], fov: 20 }}>
        <ambientLight intensity={0.5} />

        {spheres.map((s, i) => (
            <Sphere key={i} textName={s.name} args={s.size} position={s.position} type={undefined} color={s.color} textureUrl={s.textureUrl}></Sphere>
        ))}

        {spheres.map((s,i)=>(
          <Text
          position={[s.position[0],s.position[1]+4+s.size[0],s.position[2]]}
          fontSize={s.size[0]}
          color="white"
          anchorX="center"
          anchorY="bottom"
        >
          {s.name}
        </Text>
        ))}

        <Stars count={5000} />

        <CameraController />
      </Canvas>
      <div ref={tipRef} className="absolute text-white text-lg border-2 border-neutral-300 font-bold self-center bottom-20 bg-neutral-600/40 px-4 py-2 rounded-md">
        Use o WASD para explorar o espaço e o mouse para se guiar
      </div>
    </div>
  )
}