import gsap from 'gsap';

/**
 * ScrollManager - Handles scroll-based scene transitions and animations
 */
export class ScrollManager {
    constructor(totalScenes, onSceneChange) {
        this.totalScenes = totalScenes;
        this.currentScene = 0;
        this.onSceneChange = onSceneChange;
        this.isScrolling = false;
        this.scrollTimeout = null;
        
        this.init();
    }
    
    init() {
        // Update scroll progress indicator
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Handle wheel events for smoother transitions
        window.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });
        
        // Update on resize
        window.addEventListener('resize', () => this.updateSceneHeights());
        
        this.updateSceneHeights();
    }
    
    handleScroll() {
        // Update scroll progress bar
        const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        const progressBar = document.querySelector('.scroll-progress-bar');
        if (progressBar) {
            progressBar.style.width = `${scrollPercentage}%`;
        }
        
        // Determine current scene based on scroll position
        const newScene = Math.floor((window.scrollY + window.innerHeight / 2) / window.innerHeight);
        const clampedScene = Math.max(0, Math.min(newScene, this.totalScenes - 1));
        
        if (clampedScene !== this.currentScene) {
            this.currentScene = clampedScene;
            this.onSceneChange(this.currentScene);
            this.updateSceneCounter();
            this.updateActiveNav();
            this.updateContentVisibility();
        }
        
        // Clear timeout and set new one
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            this.isScrolling = false;
        }, 150);
        
        this.isScrolling = true;
    }
    
    handleWheel(e) {
        // Optional: Add custom wheel handling for smoother experience
        // Currently using native scroll for better compatibility
    }
    
    updateSceneHeights() {
        // Ensure each section is exactly viewport height
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.style.minHeight = `${window.innerHeight}px`;
        });
    }
    
    updateSceneCounter() {
        const currentSceneElement = document.querySelector('.current-scene');
        if (currentSceneElement) {
            const sceneNumber = String(this.currentScene + 1).padStart(2, '0');
            gsap.to(currentSceneElement, {
                duration: 0.3,
                opacity: 0,
                y: -10,
                onComplete: () => {
                    currentSceneElement.textContent = sceneNumber;
                    gsap.to(currentSceneElement, {
                        duration: 0.3,
                        opacity: 1,
                        y: 0,
                    });
                }
            });
        }
    }
    
    updateActiveNav() {
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach((link, index) => {
            if (index === this.currentScene) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    updateContentVisibility() {
        const contentWrappers = document.querySelectorAll('.content-wrapper');
        contentWrappers.forEach((wrapper, index) => {
            if (index === this.currentScene) {
                wrapper.classList.add('active');
            } else {
                wrapper.classList.remove('active');
            }
        });
    }
    
    scrollToScene(sceneIndex) {
        const targetY = sceneIndex * window.innerHeight;
        gsap.to(window, {
            duration: 1.5,
            scrollTo: { y: targetY, autoKill: false },
            ease: 'power2.inOut',
        });
    }
    
    getCurrentScene() {
        return this.currentScene;
    }
}
