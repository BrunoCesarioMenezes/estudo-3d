import Sphere from './Sphere'

export default function Stars({ count = 1000 }: { count?: number }) {
  const stars : {position: [number,number,number]; color : string; key : number}[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.random() * 1500 - 600
    const y = Math.random() * 1500 - 600
    const z = Math.random() * 1500 - 600

    const color = "white";

    stars.push({ position: [x, y, z], color, key: i })
  }

  return (
    <>
      {stars.map((s) => (
        <Sphere key={s.key} args={[0.2,32,32]} type="star" position={s.position as [number, number, number]} color={s.color} />
      ))}
    </>
  )
}