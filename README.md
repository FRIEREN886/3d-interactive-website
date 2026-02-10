# 3D Interactive Website - Creative Experience 2026

A stunning 3D interactive creative website built with Three.js and GSAP, inspired by modern web experiences like MakeMePulse 2017. Features immersive 3D scenes, smooth scroll animations, particle systems, and responsive mouse interactions.

![Creative Experience 2026](https://img.shields.io/badge/Three.js-r160-blue) ![GSAP](https://img.shields.io/badge/GSAP-v3.12-green) ![Vite](https://img.shields.io/badge/Vite-v5.0-purple)

## ✨ Features

### 🎨 Visual Effects
- **Particle Systems** - Dynamic star fields and floating particles with color gradients
- **3D Geometry** - Interactive geometric shapes including torus knots, octahedrons, and spheres
- **Smooth Animations** - GSAP-powered transitions with easing functions
- **Neon Aesthetics** - Modern dark theme with vibrant neon accents (cyan, magenta, yellow)
- **Mouse Parallax** - Real-time camera movement based on mouse position
- **Lighting Effects** - Ambient, directional, point, and spot lights for depth

### 🎭 Scene System
The website features 5 distinct immersive scenes:

1. **Welcome Scene** - Particle explosion effect with glowing central sphere
2. **Explore Possibilities** - Floating geometric shapes (torus, octahedron, icosahedron)
3. **Interactive Design** - Rotating torus knot with orbiting spheres
4. **Move Your Mouse** - Grid of interactive cubes that respond to cursor proximity
5. **Get in Touch** - Circular arrangement of spheres with central rotating element

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
│   ├── main.js            # Application entry point
│   ├── config.js          # Configuration constants
│   ├── scenes/            # Individual scene modules
│   │   ├── Scene1.js      # Welcome scene
│   │   ├── Scene2.js      # Explore scene
│   │   ├── Scene3.js      # Showcase scene
│   │   ├── Scene4.js      # Interactive scene
│   │   └── Scene5.js      # Contact scene
│   └── utils/             # Utility modules
│       ├── ScrollManager.js    # Scroll handling
│       └── ParticleSystem.js   # Particle effects
├── assets/                # Assets directory
│   ├── textures/          # Texture files (optional)
│   └── fonts/             # Custom fonts (optional)
└── README.md              # This file
```

## 🛠️ Technology Stack

### Core Technologies
- **[Three.js](https://threejs.org/) v0.160.0** - WebGL 3D rendering engine
- **[GSAP](https://greensock.com/gsap/) v3.12.5** - Professional-grade animation library
- **Vanilla JavaScript (ES6+)** - Modern JavaScript with modules
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties

### Development Tools
- **[Vite](https://vitejs.dev/) v5.0.11** - Fast build tool and dev server
- **ES Modules** - Native JavaScript module system

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
- ✅ Efficient particle systems
- ✅ Geometry instancing where applicable
- ✅ Proper dispose methods for scene cleanup
- ✅ RequestAnimationFrame for smooth 60 FPS
- ✅ Device-specific particle counts
- ✅ CSS transitions using GPU acceleration
- ✅ Debounced resize handlers

### Performance Tips
- Target 60 FPS maintained across all scenes
- Monitor performance using browser DevTools
- Reduce particle count on lower-end devices
- Use simpler geometries for mobile
- Enable hardware acceleration in browser

## 🌐 Browser Compatibility

Tested and supported on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Required Browser Features
- WebGL 1.0/2.0
- ES6+ JavaScript support
- CSS Grid and Flexbox
- RequestAnimationFrame API

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
- Check browser console for errors
- Ensure WebGL is enabled in browser
- Try different browser or update graphics drivers

**Poor performance:**
- Reduce particle count in `config.js`
- Lower `PIXEL_RATIO` in config
- Close other browser tabs
- Check GPU acceleration is enabled

**Scroll not working:**
- Ensure JavaScript is enabled
- Check for console errors
- Try refreshing the page
- Verify viewport height is set correctly

## 📄 License

MIT License - feel free to use this project for learning or as a template for your own creative projects.

## 🙏 Credits & Inspiration

- Inspired by [MakeMePulse](https://2017.makemepulse.com/) 2017 website
- Built with [Three.js](https://threejs.org/)
- Animated with [GSAP](https://greensock.com/)
- Icons from open source SVG collections

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ using Three.js and GSAP** | © 2026 Creative Experience
