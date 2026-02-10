import * as THREE from 'three';
import gsap from 'gsap';
import { WaveShader } from '../shaders/WaveShader.js';
import { GlowShader } from '../shaders/GlowShader.js';
import { WebGLUtils } from '../utils/WebGLUtils.js';

/**
 * Scene3 - Showcase scene with rotating geometry
 * Enhanced with custom WebGL wave and glow shaders
 */
export class Scene3 {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.geometries = [];
        this.lights = [];
        
        this.init();
    }
    
    init() {
        // Create a complex rotating structure with wave shader
        const mainGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
        
        // Use custom WebGL wave shader for the main mesh
        const mainUniforms = WebGLUtils.createUniforms({
            time: 0,
            amplitude: 0.05,
            frequency: 3.0,
            color1: new THREE.Color(0xff00ff),
            color2: new THREE.Color(0xff0088)
        });
        
        const mainMaterial = WebGLUtils.createShaderMaterial({
            vertexShader: WaveShader.vertexShader,
            fragmentShader: WaveShader.fragmentShader,
            uniforms: mainUniforms,
            transparent: false,
            side: THREE.DoubleSide
        });
        
        this.mainMesh = new THREE.Mesh(mainGeometry, mainMaterial);
        this.scene.add(this.mainMesh);
        this.geometries.push(this.mainMesh);
        
        // Create orbiting spheres with glow effect
        const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
        const glowColors = [
            new THREE.Color(0x00f5ff),
            new THREE.Color(0xff00ff),
            new THREE.Color(0xffea00)
        ];
        
        this.orbitingSpheres = [];
        for (let i = 0; i < 3; i++) {
            // Create glow material using custom WebGL shader
            const glowUniforms = WebGLUtils.createUniforms({
                glowColor: glowColors[i],
                intensity: 2.0,
                power: 2.0
            });
            
            const glowMaterial = WebGLUtils.createShaderMaterial({
                vertexShader: GlowShader.vertexShader,
                fragmentShader: GlowShader.fragmentShader,
                uniforms: glowUniforms,
                transparent: true,
                blending: THREE.AdditiveBlending,
                side: THREE.FrontSide
            });
            
            const sphere = new THREE.Mesh(sphereGeometry, glowMaterial);
            this.scene.add(sphere);
            this.geometries.push(sphere);
            this.orbitingSpheres.push(sphere);
        }
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        this.lights.push(ambientLight);
        
        const pointLight1 = new THREE.PointLight(0x00f5ff, 2, 10);
        pointLight1.position.set(3, 3, 3);
        this.scene.add(pointLight1);
        this.lights.push(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0xff00ff, 2, 10);
        pointLight2.position.set(-3, -3, 3);
        this.scene.add(pointLight2);
        this.lights.push(pointLight2);
    }
    
    enter() {
        // Animate entrance
        gsap.from(this.mainMesh.scale, {
            duration: 1.5,
            x: 0,
            y: 0,
            z: 0,
            ease: 'elastic.out(1, 0.5)',
        });
        
        this.orbitingSpheres.forEach((sphere, index) => {
            gsap.from(sphere.scale, {
                duration: 1,
                x: 0,
                y: 0,
                z: 0,
                delay: 0.5 + index * 0.2,
                ease: 'back.out(1.7)',
            });
        });
    }
    
    exit() {
        // Animate exit
        gsap.to(this.mainMesh.scale, {
            duration: 0.5,
            x: 0,
            y: 0,
            z: 0,
        });
        
        this.orbitingSpheres.forEach((sphere, index) => {
            gsap.to(sphere.scale, {
                duration: 0.5,
                x: 0,
                y: 0,
                z: 0,
                delay: index * 0.1,
            });
        });
    }
    
    update(time, mouse) {
        // Rotate main mesh
        if (this.mainMesh) {
            this.mainMesh.rotation.x = time * 0.3;
            this.mainMesh.rotation.y = time * 0.5;
            
            // Update shader uniforms for wave animation
            if (this.mainMesh.material.uniforms) {
                WebGLUtils.updateUniforms(this.mainMesh.material, { time });
            }
        }
        
        // Animate orbiting spheres
        this.orbitingSpheres.forEach((sphere, index) => {
            const angle = time + (index * Math.PI * 2 / 3);
            const radius = 2.5;
            sphere.position.x = Math.cos(angle) * radius;
            sphere.position.y = Math.sin(angle * 1.5) * radius * 0.5;
            sphere.position.z = Math.sin(angle) * radius;
        });
        
        // Mouse parallax effect
        if (mouse) {
            this.camera.position.x = mouse.x * 0.4;
            this.camera.position.y = mouse.y * 0.4;
            this.camera.lookAt(0, 0, 0);
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
