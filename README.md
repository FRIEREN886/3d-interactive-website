# 3D Interactive Website - Creative Experience 2026

A stunning 3D interactive creative website built with **WebGL**, Three.js and GSAP, featuring custom GLSL shaders for advanced visual effects. This project showcases modern web technologies with immersive 3D scenes, smooth scroll animations, particle systems, and responsive mouse interactions powered by WebGL rendering.

![Creative Experience 2026](https://img.shields.io/badge/Three.js-r160-blue) ![GSAP](https://img.shields.io/badge/GSAP-v3.12-green) ![Vite](https://img.shields.io/badge/Vite-v5.0-purple) ![WebGL](https://img.shields.io/badge/WebGL-Powered-red)

## ✨ Features

### 🎨 WebGL-Powered Visual Effects
- **Custom GLSL Shaders** - Hand-crafted vertex and fragment shaders for advanced effects
- **Particle Systems** - GPU-accelerated particle rendering with custom WebGL shaders
- **3D Geometry** - Interactive geometric shapes with holographic and wave shader effects
- **Glow Effects** - Real-time WebGL glow shaders with adjustable intensity
- **Holographic Materials** - Futuristic holographic effects with scanlines and glitch
- **Wave Animations** - Vertex displacement shaders for dynamic surface waves
- **Smooth Animations** - GSAP-powered transitions with easing functions
- **Neon Aesthetics** - Modern dark theme with vibrant neon accents (cyan, magenta, yellow)
- **Mouse Parallax** - Real-time camera movement based on mouse position
- **Advanced Lighting** - Ambient, directional, point, and spot lights with WebGL shadow mapping

### 🎭 Scene System
The website features 5 distinct immersive scenes, each enhanced with custom WebGL shaders:

1. **Welcome Scene** - Particle explosion effect with custom shader-based glowing central sphere
2. **Explore Possibilities** - Floating geometric shapes with holographic WebGL shaders
3. **Interactive Design** - Rotating torus knot with wave displacement shader and glowing orbiting spheres
4. **Move Your Mouse** - Grid of interactive cubes with real-time WebGL glow intensity
5. **Get in Touch** - Circular arrangement of spheres with custom shader effects

### 📱 User Experience
- **Scroll-Based Navigation** - Smooth scene transitions triggered by scrolling
- **Progress Indicators** - Visual scroll progress bar and scene counter
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Loading Animation** - Elegant loading screen with progress indicator
- **Navigation Menu** - Fixed navigation with active state indicators
- **Touch Support** - Full mobile and tablet touch interaction support

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/FRIEREN886/3d-interactive-website.git
cd 3d-interactive-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

The website will be available at `http://localhost:5173` (default Vite port)

4. **Build for production**
```bash
npm run build
```

5. **Preview production build**
```bash
npm run preview
```

## 📁 Project Structure

```
3d-interactive-website/
├── index.html              # Main HTML file with semantic structure
├── package.json            # Dependencies and scripts
├── css/
│   └── style.css          # Complete styling with modern CSS
├── js/
│   ├── main.js            # Application entry point with WebGL setup
│   ├── config.js          # Configuration constants
│   ├── shaders/           # Custom GLSL WebGL shaders
│   │   ├── GlowShader.js         # Glow effect shader
│   │   ├── WaveShader.js         # Wave animation shader
│   │   ├── HolographicShader.js  # Holographic effect shader
│   │   └── ParticleShader.js     # Particle rendering shader
│   ├── scenes/            # Individual scene modules
│   │   ├── Scene1.js      # Welcome scene with shader effects
│   │   ├── Scene2.js      # Explore scene with holographic shaders
│   │   ├── Scene3.js      # Showcase scene with wave shader
│   │   ├── Scene4.js      # Interactive scene with glow shaders
│   │   └── Scene5.js      # Contact scene with shader effects
│   └── utils/             # Utility modules
│       ├── ScrollManager.js      # Scroll handling
│       ├── ParticleSystem.js     # GPU particle effects
│       └── WebGLUtils.js         # WebGL helper utilities
├── assets/                # Assets directory
│   ├── textures/          # Texture files (optional)
│   └── fonts/             # Custom fonts (optional)
└── README.md              # This file
```

## 🛠️ Technology Stack

### Core Technologies
- **[WebGL](https://www.khronos.org/webgl/)** - Hardware-accelerated 3D graphics rendering
- **[Three.js](https://threejs.org/) v0.160.0** - WebGL 3D rendering engine
- **[GLSL](https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language)** - OpenGL Shading Language for custom shaders
- **[GSAP](https://greensock.com/gsap/) v3.12.5** - Professional-grade animation library
- **Vanilla JavaScript (ES6+)** - Modern JavaScript with modules
- **HTML5** - Semantic markup with canvas element
- **CSS3** - Modern styling with custom properties

### Development Tools
- **[Vite](https://vitejs.dev/) v5.0.11** - Fast build tool and dev server
- **ES Modules** - Native JavaScript module system

## 🎨 WebGL & Shader Implementation

### Custom GLSL Shaders
This project features four custom WebGL shaders written in GLSL:

#### 1. GlowShader
Creates realistic glow effects using Fresnel calculations:
- **Vertex Shader**: Calculates normal vectors and view-dependent positioning
- **Fragment Shader**: Implements Fresnel glow with adjustable intensity and power
- **Use Cases**: Glowing spheres, interactive cubes, central objects

#### 2. WaveShader
Implements vertex displacement for wave animations:
- **Vertex Shader**: Displaces vertices using sine/cosine functions for wave effect
- **Fragment Shader**: Color mixing with animated gradients
- **Use Cases**: Torus knot animation, dynamic surface effects

#### 3. HolographicShader
Creates futuristic holographic effects:
- **Features**: Fresnel effect, animated scanlines, glitch effect, color gradients
- **Fragment Shader**: Combines multiple effects for holographic appearance
- **Use Cases**: Geometric shapes in Scene 2

#### 4. ParticleShader
GPU-accelerated particle rendering:
- **Vertex Shader**: Custom size attributes with distance attenuation
- **Fragment Shader**: Circular particles with glow and pulsating effects
- **Use Cases**: Particle system throughout all scenes

### WebGL Utilities
The `WebGLUtils.js` module provides:
- WebGL capability detection (WebGL 1.0/2.0 support)
- Renderer capability inspection
- Shader material creation helpers
- Uniform management utilities
- Performance logging

Example usage:
```javascript
import { WebGLUtils } from './utils/WebGLUtils.js';
import { GlowShader } from './shaders/GlowShader.js';

// Create custom shader material
const uniforms = WebGLUtils.createUniforms({
    glowColor: new THREE.Color(0x00f5ff),
    intensity: 1.5,
    power: 2.5
});

const material = WebGLUtils.createShaderMaterial({
    vertexShader: GlowShader.vertexShader,
    fragmentShader: GlowShader.fragmentShader,
    uniforms,
    transparent: true
});
```

## 🎮 Usage & Customization

### Configuration
Edit `js/config.js` to customize:
- Number of particles
- Animation durations
- Colors and themes
- Camera settings
- Mouse interaction sensitivity

Example:
```javascript
export const CONFIG = {
    PARTICLES: {
        count: 1000,      // Adjust particle count
        size: 2,          // Particle size
    },
    COLORS: {
        neonCyan: 0x00f5ff,
        neonMagenta: 0xff00ff,
        neonYellow: 0xffea00,
    },
    // ... more settings
};
```

### Adding New Scenes
1. Create a new scene file in `js/scenes/` (e.g., `Scene6.js`)
2. Implement required methods: `init()`, `enter()`, `exit()`, `update()`, `dispose()`
3. Import and add to scene array in `js/main.js`
4. Add corresponding HTML section in `index.html`
5. Update `CONFIG.TOTAL_SCENES` in `js/config.js`

### Styling
Modify `css/style.css` to customize:
- Color scheme (CSS custom properties in `:root`)
- Typography and fonts
- Layout and spacing
- Responsive breakpoints
- Animation timings

## 📱 Responsive Design

The website is fully responsive with optimized experiences for:
- **Desktop** (1920x1080 and above) - Full particle count and effects
- **Tablet** (768px - 1024px) - Optimized geometry complexity
- **Mobile** (320px - 767px) - Reduced particle count, touch interactions

Mobile optimizations include:
- Reduced particle count for performance (500 vs 1000)
- Simplified geometries
- Touch event support
- Responsive navigation menu
- Adjusted text sizes and spacing

## ⚡ Performance Optimization

### Implemented Optimizations
- ✅ Adaptive pixel ratio (max 2x)
- ✅ GPU-accelerated particle systems with custom shaders
- ✅ Efficient WebGL shader compilation and caching
- ✅ Geometry instancing where applicable
- ✅ Proper dispose methods for scene cleanup
- ✅ RequestAnimationFrame for smooth 60 FPS
- ✅ Device-specific particle counts
- ✅ CSS transitions using GPU acceleration
- ✅ Debounced resize handlers
- ✅ WebGL shadow mapping optimization

### Performance Tips
- Target 60 FPS maintained across all scenes
- Monitor performance using browser DevTools
- Reduce particle count on lower-end devices
- Use simpler geometries for mobile
- Enable hardware acceleration in browser
- Check WebGL support using the built-in detection

## 🌐 Browser Compatibility

Tested and supported on:
- ✅ Chrome 90+ (Recommended for best WebGL performance)
- ✅ Firefox 88+
- ✅ Safari 14+ (WebGL 2.0 supported on macOS Big Sur+)
- ✅ Edge 90+

### Required Browser Features
- **WebGL 1.0 or 2.0** (automatically detected)
- GLSL shader support
- ES6+ JavaScript support
- CSS Grid and Flexbox
- RequestAnimationFrame API
- Canvas element support

### WebGL Detection
The application automatically detects WebGL support on load:
- If WebGL is not supported, an error message is displayed
- WebGL capabilities are logged to the browser console
- Automatic fallback handling for unsupported browsers

## 🎨 Design Features

### Color Scheme
- **Background**: Deep blacks (#0a0a0a, #1a1a2e)
- **Accents**: Neon cyan (#00f5ff), magenta (#ff00ff), yellow (#ffea00)
- **Text**: White (#ffffff) and muted gray (#a0a0a0)

### Typography
- Primary: Montserrat (modern, geometric sans-serif)
- Secondary: Poppins (clean, friendly sans-serif)
- Fallback: System fonts for performance

### Animation Philosophy
- Smooth easing functions (ease-out, ease-in-out)
- Scene transitions: 1-1.5 seconds
- Micro-interactions: 0.3-0.5 seconds
- Consistent animation rhythm throughout

## 🔧 Troubleshooting

### Common Issues

**Black screen on load:**
- Check browser console for WebGL errors
- Ensure WebGL is enabled in browser settings
- Try a different browser or update graphics drivers
- Verify your GPU supports WebGL (visit [get.webgl.org](https://get.webgl.org/))
- Check if hardware acceleration is enabled in browser settings

**WebGL not supported error:**
- Update your browser to the latest version
- Enable WebGL in browser settings:
  - Chrome: `chrome://flags` → Enable WebGL
  - Firefox: `about:config` → `webgl.disabled` = false
  - Safari: Preferences → Advanced → Show Develop menu → Develop → Enable WebGL
- Update graphics drivers
- Try a different browser with better WebGL support

**Poor performance:**
- Reduce particle count in `config.js`
- Lower `PIXEL_RATIO` in config
- Close other browser tabs
- Check GPU acceleration is enabled
- Disable browser extensions that may interfere
- Check WebGL capabilities in browser console

**Shader compilation errors:**
- Check browser console for GLSL errors
- Verify WebGL 1.0/2.0 support
- Some older GPUs may not support all shader features
- Try updating graphics drivers

**Scroll not working:**
- Ensure JavaScript is enabled
- Check for console errors
- Try refreshing the page
- Verify viewport height is set correctly

### Debugging WebGL
Open browser console to see:
- WebGL version and capabilities
- Shader compilation status
- Performance metrics
- GPU information

## 📄 License

MIT License - feel free to use this project for learning or as a template for your own creative projects.

## 🙏 Credits & Inspiration

- Inspired by [MakeMePulse](https://2017.makemepulse.com/) 2017 website
- Built with [Three.js](https://threejs.org/) WebGL library
- Custom GLSL shaders for WebGL rendering
- Animated with [GSAP](https://greensock.com/)
- Icons from open source SVG collections
- WebGL by [Khronos Group](https://www.khronos.org/webgl/)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ using WebGL, Three.js and GSAP** | Powered by Custom GLSL Shaders | © 2026 Creative Experience
