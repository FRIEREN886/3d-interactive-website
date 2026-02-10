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
    scene.fog = new THREE.Fog(0x0a0a0f, 10, 50);
    
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
    renderer.setClearColor(0x0a0a0f, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // 创建时钟
    clock = new THREE.Clock();
    
    // 设置光源
    setupLights();
    
    // 创建场景管理器
    sceneManager = new SceneManager();
    sceneManager.scenes = [0, 1, 2, 3]; // 4个场景
    sceneManager.init(scene);
    
    // 设置事件监听
    setupEventListeners();
    
    // 隐藏加载动画
    hideLoader();
    
    // 显示场景标题
    setTimeout(() => {
        document.querySelector('.scene-title').classList.add('visible');
    }, 500);
    
    // 开始渲染循环
    animate();
    
    console.log('Initialization complete!');
}

// 设置光源
function setupLights() {
    // 环境光
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    lights.push(ambientLight);
    
    // 主方向光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    lights.push(directionalLight);
    
    // 彩色点光源1 - 紫色
    const pointLight1 = new THREE.PointLight(0x8a2be2, 1, 50);
    pointLight1.position.set(-5, 3, 5);
    scene.add(pointLight1);
    lights.push(pointLight1);
    
    // 彩色点光源2 - 粉色
    const pointLight2 = new THREE.PointLight(0xff1493, 1, 50);
    pointLight2.position.set(5, -3, 5);
    scene.add(pointLight2);
    lights.push(pointLight2);
    
    // 彩色点光源3 - 青色
    const pointLight3 = new THREE.PointLight(0x00bfff, 1, 50);
    pointLight3.position.set(0, 5, -5);
    scene.add(pointLight3);
    lights.push(pointLight3);
    
    // 聚光灯（动态）
    const spotLight = new THREE.SpotLight(0xffffff, 0.5);
    spotLight.position.set(0, 10, 0);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.3;
    spotLight.castShadow = true;
    scene.add(spotLight);
    lights.push(spotLight);
}

// 设置事件监听
function setupEventListeners() {
    const canvas = document.getElementById('webgl-canvas');
    
    // 窗口大小调整
    window.addEventListener('resize', onWindowResize, false);
    
    // 点击切换场景
    canvas.addEventListener('click', () => {
        sceneManager.nextScene(camera);
    });
    
    // 滚轮切换场景
    let lastScrollTime = 0;
    const scrollDelay = 1000; // 1秒防抖
    
    window.addEventListener('wheel', throttle((event) => {
        const currentTime = Date.now();
        
        if (currentTime - lastScrollTime < scrollDelay) {
            return;
        }
        
        lastScrollTime = currentTime;
        
        if (event.deltaY > 0) {
            sceneManager.nextScene(camera);
        } else {
            sceneManager.previousScene(camera);
        }
    }, 100));
    
    // 触摸支持（移动端）
    let touchStartY = 0;
    let touchEndY = 0;
    
    canvas.addEventListener('touchstart', (event) => {
        touchStartY = event.touches[0].clientY;
    });
    
    canvas.addEventListener('touchend', (event) => {
        touchEndY = event.changedTouches[0].clientY;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > 50) { // 最小滑动距离
            if (diff > 0) {
                sceneManager.nextScene(camera);
            } else {
                sceneManager.previousScene(camera);
            }
        }
    });
    
    // 导航指示器点击
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', (event) => {
            event.stopPropagation();
            sceneManager.switchToScene(index, camera);
        });
    });
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
    // 让点光源轻微移动
    if (lights[2]) {
        lights[2].position.x = Math.sin(time * 0.5) * 5;
        lights[2].position.z = Math.cos(time * 0.5) * 5;
    }
    
    if (lights[3]) {
        lights[3].position.x = Math.cos(time * 0.7) * 5;
        lights[3].position.z = Math.sin(time * 0.7) * 5;
    }
    
    if (lights[4]) {
        lights[4].position.x = Math.sin(time * 0.3) * 3;
        lights[4].position.y = 5 + Math.cos(time * 0.4) * 2;
    }
}

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    
    const time = clock.getElapsedTime();
    
    // 更新性能监控
    Performance.update();
    
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
