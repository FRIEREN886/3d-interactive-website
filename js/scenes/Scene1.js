import * as THREE from 'three';
import gsap from 'gsap';
import { ParticleSystem } from '../utils/ParticleSystem.js';

/**
 * Scene1 - Welcome scene with particle explosion effect
 */
export class Scene1 {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.particleSystem = null;
        this.geometries = [];
        
        this.init();
    }
    
    init() {
        // Create particle system
        this.particleSystem = new ParticleSystem(this.scene, {
            count: window.innerWidth < 768 ? 500 : 1000,
            size: 2,
        });
        
        // Create central glowing sphere
        const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const sphereMaterial = new THREE.MeshBasicMaterial({
            color: 0x00f5ff,
            transparent: true,
            opacity: 0.6,
        });
        this.centralSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        this.scene.add(this.centralSphere);
        this.geometries.push(this.centralSphere);
        
        // Add point light
        this.pointLight = new THREE.PointLight(0x00f5ff, 2, 10);
        this.pointLight.position.set(0, 0, 0);
        this.scene.add(this.pointLight);
    }
    
    enter() {
        // Animate entrance
        if (this.particleSystem) {
            gsap.to(this.particleSystem.particleMaterial, {
                duration: 1,
                opacity: 0.8,
            });
        }
        
        if (this.centralSphere) {
            gsap.from(this.centralSphere.scale, {
                duration: 1.5,
                x: 0,
                y: 0,
                z: 0,
                ease: 'elastic.out(1, 0.5)',
            });
        }
    }
    
    exit() {
        // Animate exit
        if (this.particleSystem) {
            gsap.to(this.particleSystem.particleMaterial, {
                duration: 0.5,
                opacity: 0,
            });
        }
        
        if (this.centralSphere) {
            gsap.to(this.centralSphere.scale, {
                duration: 0.5,
                x: 0,
                y: 0,
                z: 0,
            });
        }
    }
    
    update(time, mouse) {
        // Update particle system
        if (this.particleSystem) {
            this.particleSystem.update(time);
        }
        
        // Animate central sphere
        if (this.centralSphere) {
            this.centralSphere.rotation.x = time * 0.5;
            this.centralSphere.rotation.y = time * 0.7;
            
            // Pulsating effect
            const scale = 1 + Math.sin(time * 2) * 0.1;
            this.centralSphere.scale.set(scale, scale, scale);
        }
        
        // Mouse parallax effect
        if (mouse) {
            this.camera.position.x = mouse.x * 0.5;
            this.camera.position.y = mouse.y * 0.5;
            this.camera.lookAt(0, 0, 0);
        }
    }
    
    dispose() {
        if (this.particleSystem) {
            this.particleSystem.dispose();
        }
        
        this.geometries.forEach(mesh => {
            if (mesh.geometry) mesh.geometry.dispose();
            if (mesh.material) mesh.material.dispose();
            this.scene.remove(mesh);
        });
        
        if (this.pointLight) {
            this.scene.remove(this.pointLight);
        }
    }
}
