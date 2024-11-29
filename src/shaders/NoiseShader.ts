import { Uniform } from 'three';

export const NoiseShader = {
  uniforms: {
    'tDiffuse': { value: null },
    'time': { value: 0 },
    'amount': { value: 0.08 },
    'speed': { value: 0.5 }
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
    uniform float time;
    uniform float amount;
    uniform float speed;
    varying vec2 vUv;

    float random(vec2 co) {
      return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }

    void main() {
      vec2 p = vUv;
      float noise = random(p + time * speed);
      
      vec4 color = texture2D(tDiffuse, p);
      vec4 noiseColor = vec4(noise);
      
      gl_FragColor = mix(color, noiseColor, amount);
    }
  `
};
