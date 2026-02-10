import * as THREE from 'three';
import { ParticleShader } from '../shaders/ParticleShader.js';
import { WebGLUtils } from './WebGLUtils.js';

/**
 * ParticleSystem - Creates and manages particle effects using WebGL shaders
 * Enhanced with custom GLSL shaders for better visual effects
 */
export class ParticleSystem {
    constructor(scene, config) {
        this.scene = scene;
        this.config = config;
        this.particles = null;
        this.particleGeometry = null;
        this.particleMaterial = null;
        
        this.init();
    }
    
    init() {
        const { count, size } = this.config;
        
        // Create geometry
        this.particleGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        
        // Generate random particle positions and colors
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            
            // Position
            positions[i3] = (Math.random() - 0.5) * 20;
            positions[i3 + 1] = (Math.random() - 0.5) * 20;
            positions[i3 + 2] = (Math.random() - 0.5) * 20;
            
            // Color (gradient between neon colors)
            const colorChoice = Math.random();
            if (colorChoice < 0.33) {
                colors[i3] = 0;
                colors[i3 + 1] = 0.96;
                colors[i3 + 2] = 1;
            } else if (colorChoice < 0.66) {
                colors[i3] = 1;
                colors[i3 + 1] = 0;
                colors[i3 + 2] = 1;
            } else {
                colors[i3] = 1;
                colors[i3 + 1] = 0.92;
                colors[i3 + 2] = 0;
            }
            
            // Size variation
            sizes[i] = Math.random() * size;
        }
        
        this.particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.particleGeometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
        this.particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        // Create material using custom WebGL shaders
        const uniforms = WebGLUtils.createUniforms({
            time: 0,
            pointTexture: null
        });
        
        this.particleMaterial = WebGLUtils.createShaderMaterial({
            vertexShader: ParticleShader.vertexShader,
            fragmentShader: ParticleShader.fragmentShader,
            uniforms,
            transparent: true,
            blending: THREE.AdditiveBlending
        });
        
        this.particleMaterial.depthWrite = false;
        
        // Create particles mesh
        this.particles = new THREE.Points(this.particleGeometry, this.particleMaterial);
        this.scene.add(this.particles);
    }
    
    update(time) {
        if (!this.particles) return;
        
        // Update shader uniforms for animation
        WebGLUtils.updateUniforms(this.particleMaterial, { time });
        
        // Rotate particles slowly
        this.particles.rotation.y = time * 0.05;
        this.particles.rotation.x = time * 0.03;
        
        // Animate particle positions
        const positions = this.particleGeometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] += Math.sin(time + i) * 0.001;
        }
        this.particleGeometry.attributes.position.needsUpdate = true;
    }
    
    explode() {
        // Animate particles explosion effect
        const positions = this.particleGeometry.attributes.position.array;
        const originalPositions = positions.slice();
        
        for (let i = 0; i < positions.length; i += 3) {
            const distance = Math.sqrt(
                positions[i] ** 2 + 
                positions[i + 1] ** 2 + 
                positions[i + 2] ** 2
            );
            
            const direction = {
                x: positions[i] / distance,
                y: positions[i + 1] / distance,
                z: positions[i + 2] / distance,
            };
            
            positions[i] += direction.x * 5;
            positions[i + 1] += direction.y * 5;
            positions[i + 2] += direction.z * 5;
        }
        
        this.particleGeometry.attributes.position.needsUpdate = true;
        
        // Reset after animation
        setTimeout(() => {
            for (let i = 0; i < positions.length; i++) {
                positions[i] = originalPositions[i];
            }
            this.particleGeometry.attributes.position.needsUpdate = true;
        }, 1000);
    }
    
    setOpacity(opacity) {
        if (this.particleMaterial && this.particleMaterial.uniforms) {
            // For shader material, we control opacity through uniforms
            this.particleMaterial.opacity = opacity;
        }
    }
    
    dispose() {
        if (this.particleGeometry) this.particleGeometry.dispose();
        if (this.particleMaterial) this.particleMaterial.dispose();
        if (this.particles && this.scene) this.scene.remove(this.particles);
    }
}
