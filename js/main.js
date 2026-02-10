import * as THREE from 'three';
import gsap from 'gsap';
import { CONFIG } from './config.js';
import { ScrollManager } from './utils/ScrollManager.js';
import { Scene1 } from './scenes/Scene1.js';
import { Scene2 } from './scenes/Scene2.js';
import { Scene3 } from './scenes/Scene3.js';
import { Scene4 } from './scenes/Scene4.js';
import { Scene5 } from './scenes/Scene5.js';

/**
 * Main Application Class
 */
class App {
    constructor() {
        this.canvas = document.querySelector('#webgl-canvas');
        this.loadingScreen = document.querySelector('#loading-screen');
        this.scenes = [];
        this.currentSceneIndex = 0;
        this.mouse = { x: 0, y: 0 };
        this.clock = new THREE.Clock();
        
        this.init();
    }
    
    init() {
        this.setupRenderer();
        this.setupCamera();
        this.setupScene();
        this.setupScenes();
        this.setupEventListeners();
        this.setupScrollManager();
        this.hideLoadingScreen();
        this.animate();
    }
    
    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true,
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(CONFIG.PIXEL_RATIO);
        this.renderer.setClearColor(0x0a0a0a, 1);
    }
    
    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            CONFIG.CAMERA.fov,
            window.innerWidth / window.innerHeight,
            CONFIG.CAMERA.near,
            CONFIG.CAMERA.far
        );
        this.camera.position.set(
            CONFIG.CAMERA.position.x,
            CONFIG.CAMERA.position.y,
            CONFIG.CAMERA.position.z
        );
    }
    
    setupScene() {
        this.scene = new THREE.Scene();
        
        // Add ambient fog for depth
        this.scene.fog = new THREE.Fog(0x0a0a0a, 5, 15);
    }
    
    setupScenes() {
        // Initialize all scenes
        this.scenes = [
            new Scene1(this.scene, this.camera),
            new Scene2(this.scene, this.camera),
            new Scene3(this.scene, this.camera),
            new Scene4(this.scene, this.camera),
            new Scene5(this.scene, this.camera),
        ];
        
        // Start with first scene
        if (this.scenes[0]) {
            this.scenes[0].enter();
        }
    }
    
    setupEventListeners() {
        // Mouse move for parallax effect
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });
        
        // Touch support for mobile
        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                this.mouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
                this.mouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
            }
        });
        
        // Window resize
        window.addEventListener('resize', () => this.onResize());
        
        // Navigation links
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sceneIndex = parseInt(link.dataset.scene);
                this.scrollManager.scrollToScene(sceneIndex);
            });
        });
        
        // Mobile navigation toggle
        const navToggle = document.querySelector('.nav-toggle');
        const navLinksContainer = document.querySelector('.nav-links');
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navLinksContainer.classList.toggle('active');
            });
        }
        
        // Scene buttons
        const sceneButtons = document.querySelectorAll('.scene-button');
        sceneButtons.forEach(button => {
            button.addEventListener('click', () => {
                const nextScene = this.currentSceneIndex + 1;
                if (nextScene < CONFIG.TOTAL_SCENES) {
                    this.scrollManager.scrollToScene(nextScene);
                }
            });
        });
        
        // Music control (optional - no actual audio in this version)
        const musicControl = document.querySelector('#music-control');
        if (musicControl) {
            let isPlaying = false;
            musicControl.addEventListener('click', () => {
                isPlaying = !isPlaying;
                const playIcon = musicControl.querySelector('.icon-play');
                const pauseIcon = musicControl.querySelector('.icon-pause');
                
                if (isPlaying) {
                    playIcon.style.display = 'none';
                    pauseIcon.style.display = 'block';
                } else {
                    playIcon.style.display = 'block';
                    pauseIcon.style.display = 'none';
                }
            });
        }
    }
    
    setupScrollManager() {
        this.scrollManager = new ScrollManager(
            CONFIG.TOTAL_SCENES,
            (sceneIndex) => this.onSceneChange(sceneIndex)
        );
    }
    
    onSceneChange(newSceneIndex) {
        // Exit current scene
        if (this.scenes[this.currentSceneIndex]) {
            this.scenes[this.currentSceneIndex].exit();
        }
        
        // Update current scene index
        this.currentSceneIndex = newSceneIndex;
        
        // Enter new scene
        if (this.scenes[this.currentSceneIndex]) {
            this.scenes[this.currentSceneIndex].enter();
        }
    }
    
    hideLoadingScreen() {
        // Simulate loading progress
        const progressBar = document.querySelector('.loader-progress-bar');
        let progress = 0;
        
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);
                
                // Hide loading screen
                setTimeout(() => {
                    gsap.to(this.loadingScreen, {
                        duration: 0.5,
                        opacity: 0,
                        onComplete: () => {
                            this.loadingScreen.classList.add('hidden');
                        }
                    });
                }, 500);
            }
            progressBar.style.width = `${progress}%`;
        }, 200);
    }
    
    onResize() {
        // Update camera
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        
        // Update renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(CONFIG.PIXEL_RATIO);
        
        // Update scroll manager
        this.scrollManager.updateSceneHeights();
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        const elapsedTime = this.clock.getElapsedTime();
        
        // Update current scene
        if (this.scenes[this.currentSceneIndex]) {
            this.scenes[this.currentSceneIndex].update(elapsedTime, this.mouse);
        }
        
        // Render
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new App();
    });
} else {
    new App();
}
