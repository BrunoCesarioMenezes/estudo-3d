import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

export default function CameraController() {
  const { camera, gl } = useThree()

  const keys = useRef({
    w: false,
    a: false,
    s: false,
    d: false,
  })

  const yaw = useRef(0)
  const pitch = useRef(0)

  const speed = 50
  const lookSpeed = 0.001

  useEffect(() => {
     const canvas = gl.domElement

    const handleClick = () => {
      canvas.requestPointerLock()
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (document.pointerLockElement === canvas) {
        yaw.current -= e.movementX * lookSpeed
        pitch.current -= e.movementY * lookSpeed

        pitch.current = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch.current))
      }
    }

    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      if (k === 'w' || k === 'a' || k === 's' || k === 'd') {
        keys.current[k as 'w' | 'a' | 's' | 'd'] = true
        e.preventDefault()
      }
    }

    const onKeyUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      if (k === 'w' || k === 'a' || k === 's' || k === 'd') {
        keys.current[k as 'w' | 'a' | 's' | 'd'] = false
        e.preventDefault()
      }
    }

    canvas.addEventListener('click', handleClick)
    document.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      canvas.removeEventListener('click', handleClick)
      document.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  useFrame((_, delta) => {
    const direction = new THREE.Vector3()
    camera.getWorldDirection(direction)
    direction.normalize()

    const right = new THREE.Vector3()
    right.crossVectors(camera.up, direction).normalize().multiplyScalar(-1)

    const move = new THREE.Vector3()

    if (keys.current.w) move.add(direction)
    if (keys.current.s) move.sub(direction)
    if (keys.current.a) move.sub(right)
    if (keys.current.d) move.add(right)

    if (move.lengthSq() > 0) {
      move.normalize().multiplyScalar(speed * delta)
      camera.position.add(move)
    }

    camera.rotation.set(pitch.current, yaw.current, 0, 'YXZ')
  })

  return null
}