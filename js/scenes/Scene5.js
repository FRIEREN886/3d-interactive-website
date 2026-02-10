import * as THREE from 'three';
import gsap from 'gsap';
import { GlowShader } from '../shaders/GlowShader.js';
import { WebGLUtils } from '../utils/WebGLUtils.js';

/**
 * Scene5 - Ending scene with contact information
 * Enhanced with WebGL glow shaders for visual effects
 */
export class Scene5 {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.geometries = [];
        this.lights = [];
        
        this.init();
    }
    
    init() {
        // Create a ring of particles/spheres with glow shader
        const sphereGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const glowColors = [
            new THREE.Color(0x00f5ff),
            new THREE.Color(0xff00ff),
            new THREE.Color(0xffea00)
        ];
        
        this.spheres = [];
        const numSpheres = 12;
        const radius = 3;
        
        for (let i = 0; i < numSpheres; i++) {
            const angle = (i / numSpheres) * Math.PI * 2;
            const color = glowColors[i % glowColors.length];
            
            // Create glow material using custom WebGL shader
            const glowUniforms = WebGLUtils.createUniforms({
                glowColor: color,
                intensity: 2.0,
                power: 2.0
            });
            
            const material = WebGLUtils.createShaderMaterial({
                vertexShader: GlowShader.vertexShader,
                fragmentShader: GlowShader.fragmentShader,
                uniforms: glowUniforms,
                transparent: true,
                blending: THREE.AdditiveBlending,
                side: THREE.FrontSide
            });
            
            const sphere = new THREE.Mesh(sphereGeometry, material);
            sphere.position.x = Math.cos(angle) * radius;
            sphere.position.y = Math.sin(angle) * radius;
            sphere.position.z = -2;
            
            this.scene.add(sphere);
            this.geometries.push(sphere);
            this.spheres.push({ mesh: sphere, angle: angle });
        }
        
        // Create central glowing element with glow shader
        const centerGeometry = new THREE.OctahedronGeometry(0.8);
        
        const centerGlowUniforms = WebGLUtils.createUniforms({
            glowColor: new THREE.Color(0xffffff),
            intensity: 1.5,
            power: 3.0
        });
        
        const centerMaterial = WebGLUtils.createShaderMaterial({
            vertexShader: GlowShader.vertexShader,
            fragmentShader: GlowShader.fragmentShader,
            uniforms: centerGlowUniforms,
            transparent: true,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide
        });
        
        this.centerMesh = new THREE.Mesh(centerGeometry, centerMaterial);
        this.centerMesh.position.z = -2;
        this.scene.add(this.centerMesh);
        this.geometries.push(this.centerMesh);
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        this.lights.push(ambientLight);
        
        const pointLight = new THREE.PointLight(0xffffff, 2, 20);
        pointLight.position.set(0, 0, 0);
        this.scene.add(pointLight);
        this.lights.push(pointLight);
    }
    
    enter() {
        // Animate entrance
        gsap.from(this.centerMesh.scale, {
            duration: 1.5,
            x: 0,
            y: 0,
            z: 0,
            ease: 'elastic.out(1, 0.5)',
        });
        
        this.spheres.forEach(({ mesh }, index) => {
            gsap.from(mesh.position, {
                duration: 1.5,
                x: 0,
                y: 0,
                delay: index * 0.05,
                ease: 'back.out(1.7)',
            });
        });
    }
    
    exit() {
        // Animate exit
        gsap.to(this.centerMesh.scale, {
            duration: 0.5,
            x: 0,
            y: 0,
            z: 0,
        });
        
        this.spheres.forEach(({ mesh }, index) => {
            gsap.to(mesh.scale, {
                duration: 0.5,
                x: 0,
                y: 0,
                z: 0,
                delay: index * 0.03,
            });
        });
    }
    
    update(time, mouse) {
        // Rotate center mesh
        if (this.centerMesh) {
            this.centerMesh.rotation.x = time * 0.5;
            this.centerMesh.rotation.y = time * 0.7;
            
            // Pulsating effect
            const scale = 1 + Math.sin(time * 2) * 0.1;
            this.centerMesh.scale.set(scale, scale, scale);
        }
        
        // Rotate spheres around center
        this.spheres.forEach(({ mesh, angle }, index) => {
            const newAngle = angle + time;
            const radius = 3;
            
            mesh.position.x = Math.cos(newAngle) * radius;
            mesh.position.y = Math.sin(newAngle) * radius;
            
            // Individual rotation
            mesh.rotation.x = time * (1 + index * 0.1);
            mesh.rotation.y = time * (1.2 + index * 0.1);
            
            // Wave effect on Z axis
            mesh.position.z = -2 + Math.sin(time * 2 + index) * 0.3;
        });
        
        // Gentle camera movement
        if (mouse) {
            this.camera.position.x = mouse.x * 0.2;
            this.camera.position.y = mouse.y * 0.2;
            this.camera.lookAt(0, 0, -2);
        }
    }
    
    dispose() {
        this.geometries.forEach(mesh => {
            if (mesh.geometry) mesh.geometry.dispose();
            if (mesh.material) mesh.material.dispose();
            this.scene.remove(mesh);
        });
        
        this.lights.forEach(light => {
            this.scene.remove(light);
        });
    }
}
