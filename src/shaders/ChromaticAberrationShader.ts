import { Uniform } from 'three';

export const ChromaticAberrationShader = {
  uniforms: {
    'tDiffuse': { value: null },
    'distortion': { value: 0.5 },
    'resolution': { value: null }
  },

  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float distortion;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      // Calculate offset for each color channel
      vec2 dir = uv - vec2(0.5);
      float d = length(dir);
      normalize(dir);
      
      // Create chromatic aberration effect
      vec2 rUv = uv + dir * d * distortion * 0.01 * vec2(1.0, 1.0);
      vec2 gUv = uv + dir * d * distortion * 0.01 * vec2(0.0, 1.0);
      vec2 bUv = uv + dir * d * distortion * 0.01 * vec2(-1.0, 1.0);

      // Sample each color channel with offset
      float r = texture2D(tDiffuse, rUv).r;
      float g = texture2D(tDiffuse, gUv).g;
      float b = texture2D(tDiffuse, bUv).b;
      
      // Combine channels with enhanced glow
      vec3 color = vec3(r, g, b);
      float brightness = (r + g + b) / 3.0;
      vec3 glow = color * brightness * 2.0;
      
      gl_FragColor = vec4(color + glow * 0.5, 1.0);
    }
  `
};
