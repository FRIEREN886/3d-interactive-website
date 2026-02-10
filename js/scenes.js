// ==================== 场景管理系统 ====================

class SceneManager {
    constructor() {
        this.currentSceneIndex = 0;
        this.scenes = [];
        this.isTransitioning = false;
        this.sceneObjects = []; // 存储每个场景的物体
        this.lightBulb = null;
    }

    // 初始化所有场景
    init(scene) {
        console.log('Initializing light bulb scene...');
        
        // 创建灯泡场景
        this.sceneObjects[0] = this.createLightBulbScene(scene);
        
        // 显示场景
        this.showScene(0);
    }

    // 场景: 可交互的灯泡
    createLightBulbScene(scene) {
        const objects = [];
        
        // 创建灯泡组（包含所有部件）
        const lightBulbGroup = new THREE.Group();
        
        // 1. 灯泡玻璃 - 透明球体
        const glassGeometry = new THREE.SphereGeometry(1, 32, 32);
        const glassMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.3,
            metalness: 0.1,
            roughness: 0.1,
            transmission: 0.9,
            thickness: 0.5,
            envMapIntensity: 1,
            clearcoat: 1,
            clearcoatRoughness: 0.1
        });
        const glass = new THREE.Mesh(glassGeometry, glassMaterial);
        lightBulbGroup.add(glass);
        
        // 2. 灯丝 - 使用环形几何体模拟
        const filamentGeometry = new THREE.TorusGeometry(0.25, 0.03, 8, 32);
        const filamentMaterial = new THREE.MeshStandardMaterial({
            color: 0xffaa00,
            emissive: 0xffaa00,
            emissiveIntensity: 2,
            metalness: 0.8,
            roughness: 0.2
        });
        const filament = new THREE.Mesh(filamentGeometry, filamentMaterial);
        filament.rotation.x = Math.PI / 2;
        lightBulbGroup.add(filament);
        
        // 3. 灯丝支架 - 细小的圆柱体
        const supportGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.8, 8);
        const supportMaterial = new THREE.MeshStandardMaterial({
            color: 0xd2691e,
            metalness: 0.7,
            roughness: 0.3
        });
        const support = new THREE.Mesh(supportGeometry, supportMaterial);
        support.position.y = -0.4;
        lightBulbGroup.add(support);
        
        // 4. 灯泡底座 - 螺纹金属部分
        const baseGeometry = new THREE.CylinderGeometry(0.4, 0.45, 0.6, 16);
        const baseMaterial = new THREE.MeshStandardMaterial({
            color: 0xcd853f, // 暖棕色
            metalness: 0.8,
            roughness: 0.4
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.y = -1.3;
        lightBulbGroup.add(base);
        
        // 添加螺纹纹理效果
        for (let i = 0; i < 5; i++) {
            const ringGeometry = new THREE.TorusGeometry(0.42, 0.02, 8, 32);
            const ringMaterial = new THREE.MeshStandardMaterial({
                color: 0xb8860b,
                metalness: 0.9,
                roughness: 0.3
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.position.y = -1.15 - i * 0.1;
            ring.rotation.x = Math.PI / 2;
            lightBulbGroup.add(ring);
        }
        
        // 5. 吊线 - 从灯泡顶部到上方
        const wireGeometry = new THREE.CylinderGeometry(0.02, 0.02, 3, 8);
        const wireMaterial = new THREE.MeshStandardMaterial({
            color: 0xcd853f, // 暖棕色
            metalness: 0.6,
            roughness: 0.5
        });
        const wire = new THREE.Mesh(wireGeometry, wireMaterial);
        wire.position.y = 2.5;
        lightBulbGroup.add(wire);
        
        // 6. 灯泡光源 - 点光源模拟灯泡内部发光
        const bulbLight = new THREE.PointLight(0xffcc88, 1.5, 10);
        bulbLight.position.set(0, 0, 0);
        bulbLight.castShadow = false;
        lightBulbGroup.add(bulbLight);
        
        // 设置灯泡组位置
        lightBulbGroup.position.y = 0;
        
        // 存储初始位置和旋转
        lightBulbGroup.userData = {
            swayAngle: { x: 0, z: 0 },
            swayVelocity: { x: 0, z: 0 },
            damping: 0.98,
            stiffness: 0.01,
            maxSwayAngle: 0.5
        };
        
        scene.add(lightBulbGroup);
        objects.push(lightBulbGroup);
        
        // 保存引用
        this.lightBulb = lightBulbGroup;
        
        return objects;
    }

    // 显示指定场景
    showScene(index) {
        this.sceneObjects.forEach((objects, i) => {
            objects.forEach(obj => {
                obj.visible = (i === index);
            });
        });
    }

    // 更新动画
    update(camera, time) {
        if (!this.lightBulb) return;
        
        const userData = this.lightBulb.userData;
        
        // 根据鼠标速度计算外力（增加力的强度）
        const forceX = mouse.velocityX * 0.001;
        const forceZ = mouse.velocityY * 0.001;
        
        // 应用外力到速度
        userData.swayVelocity.x += forceX;
        userData.swayVelocity.z += forceZ;
        
        // 弹簧恢复力（回到中心位置）
        userData.swayVelocity.x -= userData.swayAngle.x * userData.stiffness;
        userData.swayVelocity.z -= userData.swayAngle.z * userData.stiffness;
        
        // 应用阻尼
        userData.swayVelocity.x *= userData.damping;
        userData.swayVelocity.z *= userData.damping;
        
        // 更新摆动角度
        userData.swayAngle.x += userData.swayVelocity.x;
        userData.swayAngle.z += userData.swayVelocity.z;
        
        // 限制最大摆动角度
        userData.swayAngle.x = Math.max(-userData.maxSwayAngle, Math.min(userData.maxSwayAngle, userData.swayAngle.x));
        userData.swayAngle.z = Math.max(-userData.maxSwayAngle, Math.min(userData.maxSwayAngle, userData.swayAngle.z));
        
        // 应用旋转（从吊点摆动）
        this.lightBulb.rotation.x = userData.swayAngle.z;
        this.lightBulb.rotation.z = userData.swayAngle.x;
    }
}
