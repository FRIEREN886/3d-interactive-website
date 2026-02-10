/**
 * Custom WebGL Shader for Wave Animation Effects
 * Implements vertex displacement using WebGL GLSL shaders
 */

export const WaveShader = {
    vertexShader: `
        uniform float time;
        uniform float amplitude;
        uniform float frequency;
        
        varying vec3 vNormal;
        varying vec2 vUv;
        
        void main() {
            vNormal = normal;
            vUv = uv;
            
            vec3 pos = position;
            
            // Create wave effect using sin and cos functions
            float wave = sin(pos.x * frequency + time) * cos(pos.y * frequency + time);
            pos.z += wave * amplitude;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `,
    
    fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float time;
        
        varying vec3 vNormal;
        varying vec2 vUv;
        
        void main() {
            // Mix colors based on UV coordinates and time
            float mixValue = sin(vUv.x * 10.0 + time) * 0.5 + 0.5;
            vec3 color = mix(color1, color2, mixValue);
            
            // Add lighting based on normal
            float light = dot(vNormal, vec3(0.0, 0.0, 1.0)) * 0.5 + 0.5;
            color *= light;
            
            gl_FragColor = vec4(color, 1.0);
        }
    `
};
