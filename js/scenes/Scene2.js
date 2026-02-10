import * as THREE from 'three';
import gsap from 'gsap';

/**
 * Scene2 - Introduction scene with 3D geometric shapes
 */
export class Scene2 {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.geometries = [];
        this.lights = [];
        
        this.init();
    }
    
    init() {
        // Create geometric shapes floating
        const shapes = [
            { geometry: new THREE.TorusGeometry(0.7, 0.2, 16, 100), position: [-2, 1, -2], color: 0x00f5ff },
            { geometry: new THREE.OctahedronGeometry(0.8), position: [2, -1, -3], color: 0xff00ff },
            { geometry: new THREE.IcosahedronGeometry(0.6), position: [0, 1.5, -2], color: 0xffea00 },
        ];
        
        shapes.forEach(({ geometry, position, color }) => {
            const material = new THREE.MeshStandardMaterial({
                color: color,
                metalness: 0.7,
                roughness: 0.2,
                emissive: color,
                emissiveIntensity: 0.3,
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(...position);
            this.scene.add(mesh);
            this.geometries.push(mesh);
        });
        
        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        this.lights.push(ambientLight);
        
        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
        this.lights.push(directionalLight);
    }
    
    enter() {
        // Animate entrance
        this.geometries.forEach((mesh, index) => {
            gsap.from(mesh.position, {
                duration: 1.5,
                y: mesh.position.y - 5,
                delay: index * 0.2,
                ease: 'bounce.out',
            });
            
            gsap.from(mesh.rotation, {
                duration: 1.5,
                x: Math.PI * 2,
                y: Math.PI * 2,
                delay: index * 0.2,
            });
        });
    }
    
    exit() {
        // Animate exit
        this.geometries.forEach((mesh, index) => {
            gsap.to(mesh.position, {
                duration: 0.5,
                y: mesh.position.y + 5,
                delay: index * 0.1,
            });
        });
    }
    
    update(time, mouse) {
        // Rotate geometries
        this.geometries.forEach((mesh, index) => {
            mesh.rotation.x = time * (0.5 + index * 0.1);
            mesh.rotation.y = time * (0.7 + index * 0.15);
            
            // Float effect
            mesh.position.y += Math.sin(time * 2 + index) * 0.001;
        });
        
        // Mouse parallax effect
        if (mouse) {
            this.camera.position.x = mouse.x * 0.3;
            this.camera.position.y = mouse.y * 0.3;
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
