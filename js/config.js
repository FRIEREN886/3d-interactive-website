/**
 * Configuration file for the 3D Interactive Website
 */

export const CONFIG = {
    // Scene Settings
    TOTAL_SCENES: 5,
    
    // Performance
    TARGET_FPS: 60,
    PIXEL_RATIO: Math.min(window.devicePixelRatio, 2),
    
    // Colors
    COLORS: {
        neonCyan: 0x00f5ff,
        neonMagenta: 0xff00ff,
        neonYellow: 0xffea00,
        white: 0xffffff,
        black: 0x0a0a0a,
    },
    
    // Particle Settings
    PARTICLES: {
        count: window.innerWidth < 768 ? 500 : 1000,
        size: 2,
        speed: 0.0005,
    },
    
    // Camera Settings
    CAMERA: {
        fov: 75,
        near: 0.1,
        far: 1000,
        position: { x: 0, y: 0, z: 5 },
    },
    
    // Animation Durations
    DURATIONS: {
        sceneTransition: 1.5,
        fadeIn: 1,
        fadeOut: 0.5,
    },
    
    // Mouse Interaction
    MOUSE: {
        parallaxStrength: 0.02,
        smoothness: 0.1,
    },
};
