/**
 * Custom WebGL Shader for Glowing Effects
 * Uses raw GLSL vertex and fragment shaders for enhanced visual effects
 */

export const GlowShader = {
    vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPositionNormal;
        
        void main() {
            vNormal = normalize(normalMatrix * normal);
            vPositionNormal = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    
    fragmentShader: `
        uniform vec3 glowColor;
        uniform float intensity;
        uniform float power;
        
        varying vec3 vNormal;
        varying vec3 vPositionNormal;
        
        void main() {
            float a = pow(abs(dot(vNormal, vPositionNormal)), power);
            vec3 glow = glowColor * intensity * (1.0 - a);
            gl_FragColor = vec4(glow, 1.0 - a);
        }
    `
};
