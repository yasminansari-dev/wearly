import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const dustCount = 110;

function Bomber({ color = "#3d4a2f", scale = 1 }) {
  const sleeveMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color, roughness: 0.32, metalness: 0.12 }), [color]);
  const trimMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#1b241d", roughness: 0.5 }), []);

  return (
    <group scale={scale}>
      <mesh castShadow material={sleeveMaterial}>
        <boxGeometry args={[1.55, 1.9, 0.62]} />
      </mesh>
      <mesh castShadow position={[-0.98, 0.17, 0]} rotation={[0, 0, -0.22]} material={sleeveMaterial}>
        <capsuleGeometry args={[0.28, 1.45, 8, 16]} />
      </mesh>
      <mesh castShadow position={[0.98, 0.17, 0]} rotation={[0, 0, 0.22]} material={sleeveMaterial}>
        <capsuleGeometry args={[0.28, 1.45, 8, 16]} />
      </mesh>
      <mesh castShadow position={[0, 1.19, 0]} material={trimMaterial}>
        <torusGeometry args={[0.3, 0.075, 8, 24]} />
      </mesh>
      <mesh position={[0, 0.15, 0.335]} material={trimMaterial}>
        <boxGeometry args={[0.045, 1.72, 0.025]} />
      </mesh>
      <mesh position={[0, -0.7, 0]} material={trimMaterial}>
        <boxGeometry args={[1.44, 0.18, 0.65]} />
      </mesh>
      <mesh position={[-0.7, -0.08, 0.35]} rotation={[0, 0, -0.1]} material={trimMaterial}>
        <boxGeometry args={[0.35, 0.24, 0.035]} />
      </mesh>
      <mesh position={[0.7, -0.08, 0.35]} rotation={[0, 0, 0.1]} material={trimMaterial}>
        <boxGeometry args={[0.35, 0.24, 0.035]} />
      </mesh>
    </group>
  );
}

function SideGarment({ side, color }) {
  const garment = useRef();
  const direction = side === "left" ? -1 : 1;

  useLayoutEffect(() => {
    const timeline = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } });
    timeline.to(garment.current.position, { y: 0.28, duration: 4.8 }, 0).to(garment.current.rotation, { z: direction * 0.1, y: direction * 0.16, duration: 4.8 }, 0);
    return () => timeline.kill();
  }, [direction]);

  return (
    <group ref={garment} position={[direction * 3.65, -0.25, -0.8]} rotation={[0, direction * 0.28, direction * -0.11]} scale={0.82}>
      <mesh castShadow>
        <boxGeometry args={[1.2, 2.45, 0.38]} />
        <meshStandardMaterial color={color} roughness={0.48} metalness={0.1} />
      </mesh>
      <mesh position={[0, 1.43, 0]}>
        <torusGeometry args={[0.28, 0.06, 8, 20]} />
        <meshStandardMaterial color="#151d1e" roughness={0.55} />
      </mesh>
    </group>
  );
}

function Dust() {
  const points = useMemo(() => {
    const positions = new Float32Array(dustCount * 3);
    for (let index = 0; index < dustCount; index += 1) {
      positions[index * 3] = (Math.random() - 0.5) * 13;
      positions[index * 3 + 1] = Math.random() * 6 - 1;
      positions[index * 3 + 2] = Math.random() * 3 - 3;
    }
    return positions;
  }, []);

  const dust = useRef();
  useFrame((_, delta) => {
    if (dust.current) dust.current.rotation.y += delta * 0.012;
  });

  return (
    <points ref={dust} position={[0, 0, -1]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={dustCount} array={points} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#dbe3ce" size={0.018} transparent opacity={0.42} sizeAttenuation />
    </points>
  );
}

function Showroom() {
  const jacket = useRef();
  const keyLight = useRef();

  useLayoutEffect(() => {
    const rotation = gsap.to(jacket.current.rotation, { y: Math.PI * 2, duration: 18, repeat: -1, ease: "none" });
    const float = gsap.to(jacket.current.position, { y: 0.32, duration: 3.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
    const light = gsap.to(keyLight.current, { intensity: 8.5, duration: 3.6, repeat: -1, yoyo: true, ease: "sine.inOut" });
    return () => { rotation.kill(); float.kill(); light.kill(); };
  }, []);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1.1, 8.2]} fov={38} />
      <ambientLight intensity={0.42} color="#6f8296" />
      <spotLight ref={keyLight} position={[0, 5.5, 3]} angle={0.42} penumbra={1} intensity={7} color="#fff6df" castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-4, 1, 2]} intensity={2.6} color="#7c5a5b" />
      <pointLight position={[4, 1, -1]} intensity={2.2} color="#3d4a2f" />
      <Dust />
      <group ref={jacket}>
        <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.14}><Bomber scale={1.42} /></Float>
      </group>
      <SideGarment side="left" color="#7c5a5b" />
      <SideGarment side="right" color="#26382d" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.7, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0b1c2d" metalness={0.65} roughness={0.22} />
      </mesh>
      <ContactShadows position={[0, -1.68, 0]} opacity={0.7} scale={8} blur={2.7} far={4} color="#02070c" />
    </>
  );
}

export default function Hero() {
  return (
    <main className="wearly-hero">
      <div className="hero-glow" />
      <Canvas shadows dpr={[1, 1.7]} gl={{ antialias: true, alpha: true }}><color attach="background" args={["#071426"]} /><Showroom /></Canvas>
      <header className="hero-header">
        <a className="hero-logo" href="#" aria-label="Wearly home"><span>W</span> WEARLY</a>
        <a className="hero-menu" href="#login">Sign in <span aria-hidden="true">↗</span></a>
      </header>
      <section className="hero-copy" aria-labelledby="hero-title">
        <p className="hero-kicker">THE NEW LUXURY / 001</p>
        <h1 id="hero-title">REWEAR<br /><em>THE FUTURE</em></h1>
        <p className="hero-description">Discover premium pre-loved fashion, donate quality clothing, and give every garment a second life.</p>
        <div className="hero-actions"><a className="hero-primary" href="#discover">Explore Collection <span aria-hidden="true">↗</span></a><a className="hero-secondary" href="#donate">Donate Clothing</a></div>
      </section>
      <div className="hero-meta hero-meta-left">VOL. 01 <span /> EST. 2024</div>
      <div className="hero-meta hero-meta-right">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></div>
      <div className="hero-slider" aria-label="Collection slide 1 of 3"><span className="active" /><span /><span /></div>
      <div className="hero-product-label"><span>01</span><strong>THE BOMBER</strong><small>RECLAIMED / SERIES 01</small></div>
    </main>
  );
}