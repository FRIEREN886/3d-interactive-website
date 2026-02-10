/**
 * Custom WebGL Holographic Shader
 * Creates a futuristic holographic effect using WebGL GLSL
 */

export const HolographicShader = {
    vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        
        void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            vUv = uv;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    
    fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float time;
        uniform float scanlineIntensity;
        uniform float glitchIntensity;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        
        // Random function for glitch effect
        float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }
        
        void main() {
            // Fresnel effect for holographic look
            vec3 viewDirection = normalize(cameraPosition - vPosition);
            float fresnel = pow(1.0 - abs(dot(viewDirection, vNormal)), 3.0);
            
            // Animated scanlines
            float scanline = sin(vUv.y * 100.0 + time * 5.0) * scanlineIntensity;
            
            // Glitch effect
            float glitch = random(vec2(floor(time * 10.0), floor(vUv.y * 20.0))) * glitchIntensity;
            
            // Color mixing with holographic gradient
            vec3 color = mix(color1, color2, vUv.y + sin(time) * 0.2);
            
            // Combine effects
            color += fresnel * 0.5;
            color += scanline;
            color += glitch * vec3(0.0, 1.0, 1.0);
            
            // Add transparency based on fresnel
            float alpha = fresnel + 0.3;
            
            gl_FragColor = vec4(color, alpha);
        }
    `
};
