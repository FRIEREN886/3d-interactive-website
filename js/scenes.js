// ==================== 场景管理系统 ====================

class SceneManager {
    constructor() {
        this.currentSceneIndex = 0;
        this.scenes = [];
        this.isTransitioning = false;
        this.sceneTitles = ['几何世界', '粒子星云', '波动地形', '未来文字'];
        this.sceneObjects = []; // 存储每个场景的物体
    }

    // 初始化所有场景
    init(scene) {
        console.log('Initializing scenes...');
        
        // 创建所有场景
        this.sceneObjects[0] = this.createGeometryScene(scene);
        this.sceneObjects[1] = this.createParticleScene(scene);
        this.sceneObjects[2] = this.createTerrainScene(scene);
        this.sceneObjects[3] = this.createTextScene(scene);
        
        // 初始只显示第一个场景
        this.showScene(0);
    }

    // 场景1: 几何体组合
    createGeometryScene(scene) {
        const objects = [];
        
        // 创建多个几何体
        const geometries = [
            { type: 'box', count: 3 },
            { type: 'sphere', count: 2 },
            { type: 'torus', count: 2 }
        ];
        
        geometries.forEach(({ type, count }) => {
            for (let i = 0; i < count; i++) {
                let geometry, mesh;
                
                switch(type) {
                    case 'box':
                        geometry = new THREE.BoxGeometry(
                            randomRange(0.5, 1.5),
                            randomRange(0.5, 1.5),
                            randomRange(0.5, 1.5)
                        );
                        break;
                    case 'sphere':
                        geometry = new THREE.SphereGeometry(
                            randomRange(0.4, 1),
                            32,
                            32
                        );
                        break;
                    case 'torus':
                        geometry = new THREE.TorusGeometry(
                            randomRange(0.5, 0.8),
                            randomRange(0.2, 0.4),
                            16,
                            100
                        );
                        break;
                }
                
                const material = new THREE.MeshStandardMaterial({
                    color: randomNeonColor(),
                    metalness: 0.7,
                    roughness: 0.2,
                    emissive: randomNeonColor(),
                    emissiveIntensity: 0.2
                });
                
                mesh = new THREE.Mesh(geometry, material);
                
                // 随机位置
                mesh.position.set(
                    randomRange(-4, 4),
                    randomRange(-2, 2),
                    randomRange(-2, 2)
                );
                
                // 随机旋转
                mesh.rotation.set(
                    randomRange(0, Math.PI * 2),
                    randomRange(0, Math.PI * 2),
                    randomRange(0, Math.PI * 2)
                );
                
                // 存储动画参数
                mesh.userData = {
                    rotationSpeed: {
                        x: randomRange(-0.01, 0.01),
                        y: randomRange(-0.01, 0.01),
                        z: randomRange(-0.01, 0.01)
                    },
                    floatSpeed: randomRange(0.001, 0.003),
                    floatRange: randomRange(0.3, 0.8),
                    initialY: mesh.position.y
                };
                
                scene.add(mesh);
                objects.push(mesh);
            }
        });
        
        return objects;
    }

    // 场景2: 粒子系统
    createParticleScene(scene) {
        const objects = [];
        
        // 根据性能调整粒子数量
        const performanceLevel = getPerformanceLevel();
        const particleCount = performanceLevel === 'high' ? 15000 : 
                             performanceLevel === 'medium' ? 8000 : 5000;
        
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        
        const color = new THREE.Color();
        const neonColors = [0x8a2be2, 0xff1493, 0x00bfff, 0x9370db];
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // 创建球形分布
            const radius = randomRange(2, 8);
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);
            
            // 随机颜色
            color.setHex(neonColors[Math.floor(Math.random() * neonColors.length)]);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
            
            // 随机大小
            sizes[i] = randomRange(0.01, 0.05);
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        const material = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });
        
        const particles = new THREE.Points(geometry, material);
        particles.userData = {
            originalPositions: positions.slice()
        };
        
        scene.add(particles);
        objects.push(particles);
        
        return objects;
    }

    // 场景3: 3D地形网格
    createTerrainScene(scene) {
        const objects = [];
        
        const width = 100;
        const height = 100;
        const geometry = new THREE.PlaneGeometry(15, 15, width - 1, height - 1);
        
        const vertices = geometry.attributes.position.array;
        
        // 创建初始波浪
        for (let i = 0; i < vertices.length; i += 3) {
            const x = vertices[i];
            const y = vertices[i + 1];
            vertices[i + 2] = Math.sin(x * 0.5) * 0.3 + Math.cos(y * 0.5) * 0.3;
        }
        
        geometry.computeVertexNormals();
        
        const material = new THREE.MeshStandardMaterial({
            color: 0x8a2be2,
            wireframe: false,
            metalness: 0.3,
            roughness: 0.7,
            side: THREE.DoubleSide,
            emissive: 0x8a2be2,
            emissiveIntensity: 0.1
        });
        
        const terrain = new THREE.Mesh(geometry, material);
        terrain.rotation.x = -Math.PI / 2;
        terrain.position.y = -2;
        
        terrain.userData = {
            time: 0,
            originalVertices: vertices.slice()
        };
        
        scene.add(terrain);
        objects.push(terrain);
        
        // 添加线框覆盖层
        const wireframeGeometry = new THREE.PlaneGeometry(15, 15, width - 1, height - 1);
        const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0xff1493,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        
        const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
        wireframe.rotation.x = -Math.PI / 2;
        wireframe.position.y = -1.99;
        
        wireframe.userData = {
            time: 0,
            terrain: terrain
        };
        
        scene.add(wireframe);
        objects.push(wireframe);
        
        return objects;
    }

    // 场景4: 3D文字和图形
    createTextScene(scene) {
        const objects = [];
        
        // 创建立体形状拼成文字效果
        const shapes = [];
        
        // 创建"3D"字样的几何组合
        const letterSpacing = 2.5;
        
        // 数字3
        const torus1 = new THREE.TorusGeometry(0.8, 0.3, 16, 100, Math.PI * 1.5);
        const mesh1 = new THREE.Mesh(
            torus1,
            new THREE.MeshStandardMaterial({
                color: 0x8a2be2,
                metalness: 0.8,
                roughness: 0.2,
                emissive: 0x8a2be2,
                emissiveIntensity: 0.3
            })
        );
        mesh1.position.x = -letterSpacing;
        mesh1.rotation.z = -Math.PI / 2;
        scene.add(mesh1);
        objects.push(mesh1);
        
        // 数字D的上半部分
        const torus2 = new THREE.TorusGeometry(0.8, 0.3, 16, 100, Math.PI);
        const mesh2 = new THREE.Mesh(
            torus2,
            new THREE.MeshStandardMaterial({
                color: 0xff1493,
                metalness: 0.8,
                roughness: 0.2,
                emissive: 0xff1493,
                emissiveIntensity: 0.3
            })
        );
        mesh2.position.x = letterSpacing;
        mesh2.rotation.z = Math.PI / 2;
        scene.add(mesh2);
        objects.push(mesh2);
        
        // 添加装饰立方体
        for (let i = 0; i < 5; i++) {
            const cube = new THREE.Mesh(
                new THREE.BoxGeometry(0.3, 0.3, 0.3),
                new THREE.MeshStandardMaterial({
                    color: randomNeonColor(),
                    metalness: 0.9,
                    roughness: 0.1,
                    emissive: randomNeonColor(),
                    emissiveIntensity: 0.4
                })
            );
            
            const angle = (i / 5) * Math.PI * 2;
            const radius = 3;
            cube.position.set(
                Math.cos(angle) * radius,
                Math.sin(angle * 2) * 0.5,
                Math.sin(angle) * radius
            );
            
            cube.userData = {
                angle: angle,
                radius: radius,
                rotationSpeed: randomRange(0.01, 0.03)
            };
            
            scene.add(cube);
            objects.push(cube);
        }
        
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

    // 切换到下一个场景
    nextScene(camera) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        const nextIndex = (this.currentSceneIndex + 1) % this.scenes.length;
        this.switchToScene(nextIndex, camera);
    }

    // 切换到上一个场景
    previousScene(camera) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        const prevIndex = (this.currentSceneIndex - 1 + this.scenes.length) % this.scenes.length;
        this.switchToScene(prevIndex, camera);
    }

    // 切换到指定场景
    switchToScene(index, camera) {
        if (this.isTransitioning || index === this.currentSceneIndex) {
            this.isTransitioning = false;
            return;
        }
        
        this.isTransitioning = true;
        const oldIndex = this.currentSceneIndex;
        this.currentSceneIndex = index;
        
        // 更新导航指示器
        this.updateIndicators();
        
        // 更新标题
        this.updateTitle(this.sceneTitles[index]);
        
        // 相机动画
        const targetZ = 10;
        
        gsap.to(camera.position, {
            z: targetZ + 2,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
                this.showScene(index);
                
                gsap.to(camera.position, {
                    z: targetZ,
                    duration: 1,
                    ease: "power2.inOut",
                    onComplete: () => {
                        this.isTransitioning = false;
                    }
                });
            }
        });
    }

    // 更新导航指示器
    updateIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            if (index === this.currentSceneIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // 更新场景标题
    updateTitle(title) {
        const titleElement = document.getElementById('scene-title-text');
        const titleContainer = document.querySelector('.scene-title');
        
        titleContainer.style.opacity = '0';
        
        setTimeout(() => {
            titleElement.textContent = title;
            titleContainer.style.opacity = '1';
        }, 300);
    }

    // 更新动画
    update(camera, time) {
        // 更新场景1的几何体
        if (this.sceneObjects[0]) {
            this.sceneObjects[0].forEach(obj => {
                if (obj.visible) {
                    obj.rotation.x += obj.userData.rotationSpeed.x;
                    obj.rotation.y += obj.userData.rotationSpeed.y;
                    obj.rotation.z += obj.userData.rotationSpeed.z;
                    
                    obj.position.y = obj.userData.initialY + 
                        Math.sin(time * obj.userData.floatSpeed) * obj.userData.floatRange;
                }
            });
        }
        
        // 更新场景2的粒子
        if (this.sceneObjects[1] && this.sceneObjects[1][0] && this.sceneObjects[1][0].visible) {
            const particles = this.sceneObjects[1][0];
            const positions = particles.geometry.attributes.position.array;
            const originalPositions = particles.userData.originalPositions;
            
            // 鼠标影响粒子
            const mouseInfluence = 0.5;
            
            for (let i = 0; i < positions.length; i += 3) {
                const dx = positions[i] - mouse.normalizedX * 5;
                const dy = positions[i + 1] - mouse.normalizedY * 5;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 3) {
                    const force = (3 - distance) * 0.01;
                    positions[i] += dx * force * mouseInfluence;
                    positions[i + 1] += dy * force * mouseInfluence;
                }
                
                // 轻微回弹
                positions[i] = lerp(positions[i], originalPositions[i], 0.02);
                positions[i + 1] = lerp(positions[i + 1], originalPositions[i + 1], 0.02);
                positions[i + 2] = lerp(positions[i + 2], originalPositions[i + 2], 0.02);
                
                // 旋转效果
                const angle = time * 0.0002;
                const x = positions[i];
                const z = positions[i + 2];
                positions[i] = x * Math.cos(angle) - z * Math.sin(angle);
                positions[i + 2] = x * Math.sin(angle) + z * Math.cos(angle);
            }
            
            particles.geometry.attributes.position.needsUpdate = true;
        }
        
        // 更新场景3的地形
        if (this.sceneObjects[2] && this.sceneObjects[2][0] && this.sceneObjects[2][0].visible) {
            const terrain = this.sceneObjects[2][0];
            terrain.userData.time += 0.03;
            
            const vertices = terrain.geometry.attributes.position.array;
            const originalVertices = terrain.userData.originalVertices;
            
            for (let i = 0; i < vertices.length; i += 3) {
                const x = originalVertices[i];
                const y = originalVertices[i + 1];
                
                vertices[i + 2] = 
                    Math.sin(x * 0.5 + terrain.userData.time) * 0.5 + 
                    Math.cos(y * 0.5 + terrain.userData.time * 1.5) * 0.5 +
                    Math.sin((x + y) * 0.3 + terrain.userData.time * 0.5) * 0.3;
            }
            
            terrain.geometry.attributes.position.needsUpdate = true;
            terrain.geometry.computeVertexNormals();
            
            // 同步线框
            if (this.sceneObjects[2][1]) {
                const wireframe = this.sceneObjects[2][1];
                const wireVertices = wireframe.geometry.attributes.position.array;
                
                for (let i = 0; i < wireVertices.length; i++) {
                    wireVertices[i] = vertices[i];
                }
                
                wireframe.geometry.attributes.position.needsUpdate = true;
            }
        }
        
        // 更新场景4的文字动画
        if (this.sceneObjects[3]) {
            this.sceneObjects[3].forEach((obj, index) => {
                if (obj.visible) {
                    if (index < 2) {
                        // 文字部分
                        obj.rotation.y += 0.01;
                    } else {
                        // 装饰立方体
                        obj.userData.angle += obj.userData.rotationSpeed;
                        obj.position.x = Math.cos(obj.userData.angle) * obj.userData.radius;
                        obj.position.z = Math.sin(obj.userData.angle) * obj.userData.radius;
                        obj.rotation.x += 0.02;
                        obj.rotation.y += 0.02;
                    }
                }
            });
        }
        
        // 视差效果
        if (camera) {
            const targetX = mouse.normalizedX * 0.5;
            const targetY = mouse.normalizedY * 0.5;
            
            camera.position.x = lerp(camera.position.x, targetX, 0.05);
            camera.position.y = lerp(camera.position.y, targetY, 0.05);
        }
    }
}
