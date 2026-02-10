import * as THREE from 'three';
import gsap from 'gsap';

/**
 * Scene4 - Interactive scene with mouse-responsive elements
 */
export class Scene4 {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.geometries = [];
        this.lights = [];
        this.interactiveMeshes = [];
        
        this.init();
    }
    
    init() {
        // Create a grid of interactive cubes
        const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const colors = [0x00f5ff, 0xff00ff, 0xffea00];
        
        for (let x = -2; x <= 2; x++) {
            for (let y = -1; y <= 1; y++) {
                const material = new THREE.MeshStandardMaterial({
                    color: colors[Math.floor(Math.random() * colors.length)],
                    metalness: 0.6,
                    roughness: 0.4,
                    emissive: colors[Math.floor(Math.random() * colors.length)],
                    emissiveIntensity: 0.2,
                });
                
                const cube = new THREE.Mesh(cubeGeometry, material);
                cube.position.set(x * 1.2, y * 1.2, -2);
                cube.userData = {
                    originalPosition: cube.position.clone(),
                    originalScale: 1,
                };
                
                this.scene.add(cube);
                this.geometries.push(cube);
                this.interactiveMeshes.push(cube);
            }
        }
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        this.lights.push(ambientLight);
        
        const spotLight = new THREE.SpotLight(0xffffff, 1);
        spotLight.position.set(0, 5, 5);
        spotLight.angle = Math.PI / 6;
        spotLight.penumbra = 0.3;
        this.scene.add(spotLight);
        this.lights.push(spotLight);
    }
    
    enter() {
        // Animate entrance - cascade effect
        this.interactiveMeshes.forEach((mesh, index) => {
            gsap.from(mesh.position, {
                duration: 1,
                z: mesh.position.z - 10,
                delay: index * 0.03,
                ease: 'back.out(1.7)',
            });
            
            gsap.from(mesh.rotation, {
                duration: 1,
                x: Math.PI * 2,
                y: Math.PI * 2,
                delay: index * 0.03,
            });
        });
    }
    
    exit() {
        // Animate exit
        this.interactiveMeshes.forEach((mesh, index) => {
            gsap.to(mesh.position, {
                duration: 0.5,
                z: mesh.position.z + 10,
                delay: index * 0.02,
            });
        });
    }
    
    update(time, mouse) {
        // Rotate cubes based on time
        this.interactiveMeshes.forEach((mesh, index) => {
            mesh.rotation.x = time * (0.5 + index * 0.01);
            mesh.rotation.y = time * (0.3 + index * 0.01);
        });
        
        // Enhanced mouse interaction
        if (mouse) {
            // Convert mouse coordinates to 3D space
            const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
            vector.unproject(this.camera);
            
            const dir = vector.sub(this.camera.position).normalize();
            const distance = -this.camera.position.z / dir.z;
            const pos = this.camera.position.clone().add(dir.multiplyScalar(distance));
            
            // React to mouse proximity
            this.interactiveMeshes.forEach(mesh => {
                const distanceToMouse = mesh.position.distanceTo(pos);
                const maxDistance = 3;
                
                if (distanceToMouse < maxDistance) {
                    const influence = 1 - (distanceToMouse / maxDistance);
                    const targetScale = 1 + influence * 0.5;
                    
                    gsap.to(mesh.scale, {
                        duration: 0.3,
                        x: targetScale,
                        y: targetScale,
                        z: targetScale,
                        ease: 'power2.out',
                    });
                    
                    // Brighten emissive
                    gsap.to(mesh.material, {
                        duration: 0.3,
                        emissiveIntensity: 0.5 + influence * 0.5,
                    });
                } else {
                    gsap.to(mesh.scale, {
                        duration: 0.5,
                        x: 1,
                        y: 1,
                        z: 1,
                    });
                    
                    gsap.to(mesh.material, {
                        duration: 0.5,
                        emissiveIntensity: 0.2,
                    });
                }
            });
            
            // Camera follows mouse more dramatically
            this.camera.position.x = mouse.x * 1.5;
            this.camera.position.y = mouse.y * 1.5;
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
