/**
 * Custom WebGL Shader for Advanced Particle Effects
 * Implements GPU-based particle rendering using WebGL shaders
 */

export const ParticleShader = {
    vertexShader: `
        attribute float size;
        attribute vec3 customColor;
        
        uniform float time;
        
        varying vec3 vColor;
        
        void main() {
            vColor = customColor;
            
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            
            // Particle size with distance attenuation
            gl_PointSize = size * (300.0 / -mvPosition.z);
            
            gl_Position = projectionMatrix * mvPosition;
        }
    `,
    
    fragmentShader: `
        uniform sampler2D pointTexture;
        uniform float time;
        
        varying vec3 vColor;
        
        void main() {
            // Create circular particles
            vec2 center = gl_PointCoord - vec2(0.5);
            float dist = length(center);
            
            if (dist > 0.5) {
                discard;
            }
            
            // Add glow effect
            float alpha = 1.0 - (dist * 2.0);
            alpha = pow(alpha, 2.0);
            
            // Pulsating effect
            float pulse = sin(time * 2.0) * 0.2 + 0.8;
            
            gl_FragColor = vec4(vColor * pulse, alpha);
        }
    `
};
