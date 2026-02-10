// ==================== 主应用程序 ====================

// 全局变量
let scene, camera, renderer, sceneManager;
let lights = [];
let clock;

// 初始化
function init() {
    console.log('Initializing 3D Interactive Website...');
    
    // 创建场景
    scene = new THREE.Scene();
    // No fog for clean design
    
    // 创建相机
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100);
    camera.position.z = 10;
    
    // 创建渲染器
    const canvas = document.getElementById('webgl-canvas');
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // 创建时钟
    clock = new THREE.Clock();
    
    // 设置光源
    setupLights();
    
    // 创建场景管理器
    sceneManager = new SceneManager();
    sceneManager.scenes = [0]; // Only light bulb scene
    sceneManager.init(scene);
    
    // 设置事件监听
    setupEventListeners();
    
    // 隐藏加载动画
    hideLoader();
    
    // 开始渲染循环
    animate();
    
    console.log('Initialization complete!');
}

// 设置光源
function setupLights() {
    // 柔和的环境光
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.6);
    scene.add(ambientLight);
    lights.push(ambientLight);
    
    // 主方向光 - 温暖色调
    const directionalLight = new THREE.DirectionalLight(0xfff5e6, 0.5);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    lights.push(directionalLight);
}

// 设置事件监听
function setupEventListeners() {
    const canvas = document.getElementById('webgl-canvas');
    
    // 窗口大小调整
    window.addEventListener('resize', onWindowResize, false);
}

// 窗口大小调整处理
function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

// 隐藏加载动画
function hideLoader() {
    const loader = document.getElementById('loader');
    
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);
}

// 更新动态光源
function updateLights(time) {
    // No dynamic light movement for clean design
}

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    
    const time = clock.getElapsedTime();
    
    // 更新性能监控
    Performance.update();
    
    // 更新鼠标状态
    updateMouseState();
    
    // 更新光源
    updateLights(time);
    
    // 更新场景
    if (sceneManager) {
        sceneManager.update(camera, time * 1000);
    }
    
    // 渲染场景
    renderer.render(scene, camera);
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    init();
});

// 错误处理
window.addEventListener('error', (event) => {
    console.error('Application error:', event.error);
});

// 清理函数（页面卸载时）
window.addEventListener('beforeunload', () => {
    // 清理 Three.js 资源
    if (scene) {
        scene.traverse((object) => {
            if (object.geometry) {
                object.geometry.dispose();
            }
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => material.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });
    }
    
    if (renderer) {
        renderer.dispose();
    }
});
