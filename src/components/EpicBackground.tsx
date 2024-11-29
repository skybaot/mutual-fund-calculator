import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { NoiseShader } from '../shaders/NoiseShader';
import { ChromaticAberrationShader } from '../shaders/ChromaticAberrationShader';

const PARTICLE_COUNT = 1000;
const SYMBOL_SIZE = 0.5;
const SYMBOLS = ['₹', '$', '€', '¥', '%', '↑', '↓', '₿', '£', '₽', '₩'];
const COLORS = [
  new THREE.Color('#4f46e5'), // indigo
  new THREE.Color('#7c3aed'), // violet
  new THREE.Color('#2563eb'), // blue
  new THREE.Color('#06b6d4'), // cyan
];

export function EpicBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const frameIdRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Post-processing setup
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5, // strength
      0.4, // radius
      0.85  // threshold
    );
    composer.addPass(bloomPass);

    const noisePass = new ShaderPass(NoiseShader);
    noisePass.uniforms.time = { value: 0 };
    composer.addPass(noisePass);

    const chromaticAberrationPass = new ShaderPass(ChromaticAberrationShader);
    chromaticAberrationPass.uniforms.distortion = { value: 0.5 };
    composer.addPass(chromaticAberrationPass);

    composerRef.current = composer;

    // Particles setup
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const symbolIndices = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      // Color
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Size
      sizes[i] = Math.random() * SYMBOL_SIZE;

      // Symbol index
      symbolIndices[i] = Math.floor(Math.random() * SYMBOLS.length);
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    particlesGeometry.setAttribute('symbolIndex', new THREE.BufferAttribute(symbolIndices, 1));

    // Custom shader material
    const particlesMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        attribute float symbolIndex;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vSymbolIndex;
        
        void main() {
          vColor = color;
          vSymbolIndex = symbolIndex;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vSymbolIndex;
        
        void main() {
          float alpha = 1.0;
          vec3 finalColor = vColor;
          
          // Add glow effect
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          alpha = smoothstep(0.5, 0.2, dist);
          
          // Add color variation based on position
          finalColor += 0.2 * vec3(
            sin(gl_FragCoord.x * 0.01),
            cos(gl_FragCoord.y * 0.01),
            sin(gl_FragCoord.x * 0.01 + gl_FragCoord.y * 0.01)
          );
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.001;
      frameIdRef.current = requestAnimationFrame(animate);

      if (particlesRef.current && noisePass.uniforms.time) {
        // Update particle positions
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += Math.sin(time + i) * 0.01;
          positions[i + 1] += Math.cos(time + i) * 0.01;
          positions[i + 2] += Math.sin(time + i) * 0.01;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;

        // Update camera position based on mouse
        if (cameraRef.current) {
          cameraRef.current.position.x += (mouseRef.current.x * 2 - cameraRef.current.position.x) * 0.05;
          cameraRef.current.position.y += (mouseRef.current.y * 2 - cameraRef.current.position.y) * 0.05;
          cameraRef.current.lookAt(scene.position);
        }

        // Update shader uniforms
        noisePass.uniforms.time.value = time;
        chromaticAberrationPass.uniforms.distortion.value = 0.5 + Math.sin(time) * 0.2;
      }

      composer.render();
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameIdRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (particlesRef.current) {
        particlesRef.current.geometry.dispose();
        (particlesRef.current.material as THREE.Material).dispose();
      }
      
      if (composerRef.current) {
        composerRef.current.passes.forEach(pass => {
          if (pass.dispose) pass.dispose();
        });
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}
