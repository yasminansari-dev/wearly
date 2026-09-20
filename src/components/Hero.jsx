// Hero.jsx

export default function Hero() {
  return (
    <section>
      {/* Left content */}

      {/* 3D Canvas */}
      <Canvas>
        <ambientLight />
        <directionalLight />

        {/* Jacket */}
        <Float>
          <primitive object={jacket.scene} />
        </Float>

        {/* Left & Right Clothes */}
        <primitive object={shirt.scene} />
        <primitive object={coat.scene} />
      </Canvas>
    </section>
  )
}