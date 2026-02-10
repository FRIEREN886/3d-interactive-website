// ==================== 工具函数 ====================

// 鼠标位置跟踪
const mouse = {
    x: 0,
    y: 0,
    normalizedX: 0, // -1 到 1
    normalizedY: 0  // -1 到 1
};

// 更新鼠标位置
function updateMousePosition(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    
    // 归一化坐标 (-1 到 1)
    mouse.normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.normalizedY = -(event.clientY / window.innerHeight) * 2 + 1;
}

// 监听鼠标移动
document.addEventListener('mousemove', updateMousePosition);

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 随机数生成（范围）
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

// 随机整数
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 随机颜色（霓虹色系）
function randomNeonColor() {
    const colors = [
        0x8a2be2, // 蓝紫色
        0xff1493, // 深粉色
        0x00bfff, // 深天蓝
        0x9370db, // 中紫色
        0xff69b4, // 亮粉色
        0x00ffff, // 青色
        0xff00ff, // 品红色
        0x7b68ee  // 中石板蓝
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// 线性插值
function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

// 映射值从一个范围到另一个范围
function mapRange(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

// 检测是否为移动设备
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// 获取设备性能等级（简单判断）
function getPerformanceLevel() {
    const isMobileDevice = isMobile();
    const hasHighPixelRatio = window.devicePixelRatio > 1.5;
    
    if (isMobileDevice) {
        return hasHighPixelRatio ? 'medium' : 'low';
    }
    return 'high';
}

// 平滑滚动处理
let isScrolling = false;
let scrollTimeout;

function handleScroll(callback) {
    if (isScrolling) return;
    
    isScrolling = true;
    callback();
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        isScrolling = false;
    }, 1000);
}

// 向量工具
const VectorUtils = {
    // 计算两点距离
    distance(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    },
    
    // 归一化向量
    normalize(x, y) {
        const length = Math.sqrt(x * x + y * y);
        if (length === 0) return { x: 0, y: 0 };
        return {
            x: x / length,
            y: y / length
        };
    },
    
    // 点积
    dot(x1, y1, x2, y2) {
        return x1 * x2 + y1 * y2;
    }
};

// 缓动函数
const Easing = {
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    },
    
    easeOutQuad(t) {
        return 1 - (1 - t) * (1 - t);
    },
    
    easeInQuad(t) {
        return t * t;
    },
    
    easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }
};

// 颜色工具
const ColorUtils = {
    // HSL转RGB
    hslToRgb(h, s, l) {
        let r, g, b;
        
        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    },
    
    // RGB转十六进制
    rgbToHex(r, g, b) {
        return (r << 16) | (g << 8) | b;
    }
};

// 性能监控
const Performance = {
    fps: 0,
    lastTime: performance.now(),
    frames: 0,
    
    update() {
        const currentTime = performance.now();
        this.frames++;
        
        if (currentTime >= this.lastTime + 1000) {
            this.fps = Math.round((this.frames * 1000) / (currentTime - this.lastTime));
            this.frames = 0;
            this.lastTime = currentTime;
        }
    }
};

// 导出到全局（如果需要）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        mouse,
        debounce,
        throttle,
        randomRange,
        randomInt,
        randomNeonColor,
        lerp,
        mapRange,
        isMobile,
        getPerformanceLevel,
        handleScroll,
        VectorUtils,
        Easing,
        ColorUtils,
        Performance
    };
}
