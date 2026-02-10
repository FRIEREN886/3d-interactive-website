# 3D交互式网站 - 3D Interactive Website

一个基于WebGL的高端3D交互式网站，使用Three.js和GSAP创建令人惊叹的视觉体验。

![3D Interactive Website](https://img.shields.io/badge/Three.js-r128-blue)
![GSAP](https://img.shields.io/badge/GSAP-3.12-green)
![WebGL](https://img.shields.io/badge/WebGL-Enabled-orange)

## ✨ 项目简介

这是一个现代化的3D交互式网站，展示了WebGL和Three.js的强大功能。网站包含4个独特的3D场景，每个场景都有精心设计的动画效果和交互体验。采用暗色主题和霓虹色彩，营造出未来感十足的视觉氛围。

## 🎯 核心特性

### 🌟 四个独特的3D场景

1. **几何世界** - 漂浮旋转的3D几何体组合
   - 立方体、球体、圆环等多种几何体
   - 动态漂浮和旋转动画
   - 鼠标视差跟随效果

2. **粒子星云** - 交互式粒子系统
   - 15000+粒子组成的3D星云
   - 鼠标移动影响粒子运动
   - 彩色渐变和发光效果

3. **波动地形** - 动态3D地形网格
   - 实时波浪动画
   - 线框和实体双层渲染
   - 平滑的顶点动画

4. **未来文字** - 3D文字和图形展示
   - 立体文字效果
   - 环绕动画的装饰元素
   - 发光材质

### 🎮 交互功能

- **点击切换** - 点击屏幕任意位置切换到下一个场景
- **滚轮切换** - 使用鼠标滚轮前后切换场景
- **触摸支持** - 移动设备支持滑动切换
- **视差效果** - 鼠标移动时3D物体产生视差跟随
- **场景导航** - 右侧导航指示器显示当前场景
- **平滑过渡** - 使用GSAP实现丝滑的相机动画（1.5-2秒）

### 🎨 视觉设计

- **暗色主题** - 深色背景营造沉浸感
- **霓虹色彩** - 紫色、粉色、蓝色等霓虹色点缀
- **发光效果** - 材质自发光和彩色光源
- **动态光照** - 环境光、方向光、点光源、聚光灯
- **流畅动画** - 60 FPS的渲染性能

### ⚡ 性能优化

- 自适应像素比（最高2倍）
- 根据设备性能调整粒子数量
- 高效的渲染循环（requestAnimationFrame）
- 资源清理和内存管理
- 响应式设计，适配各种屏幕

## 🛠️ 技术栈

### 核心技术

- **Three.js (r128)** - 3D渲染引擎
- **GSAP 3.12** - 动画库
- **原生 JavaScript (ES6+)** - 应用逻辑
- **HTML5** - 页面结构
- **CSS3** - 样式和动画

### 3D技术特性

- WebGL 1.0+
- PBR材质（物理渲染）
- 动态光照系统
- 粒子系统
- 几何体动画
- 相机动画

## �� 项目结构

```
3d-interactive-website/
├── index.html              # 主HTML文件
├── css/
│   └── style.css          # 样式文件（暗色主题、霓虹色彩）
├── js/
│   ├── main.js            # 主逻辑（Three.js初始化、渲染循环）
│   ├── scenes.js          # 场景管理（4个3D场景）
│   └── utils.js           # 工具函数（鼠标跟踪、防抖等）
├── package.json           # 项目配置
├── .gitignore            # Git忽略文件
└── README.md             # 项目文档
```

## 🚀 快速开始

### 方式1：直接打开（最简单）

直接在浏览器中打开 `index.html` 文件即可。

```bash
# 在浏览器中打开
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

### 方式2：使用本地服务器（推荐）

使用本地HTTP服务器可以获得更好的体验：

```bash
# 克隆仓库
git clone https://github.com/FRIEREN886/3d-interactive-website.git
cd 3d-interactive-website

# 使用 Python 启动服务器
python -m http.server 8000

# 或使用 Node.js (需要安装 http-server)
npx http-server -p 8000

# 或使用 npm 脚本
npm run dev
```

然后在浏览器中访问：`http://localhost:8000`

## 🎯 交互说明

### 场景切换

1. **鼠标点击** - 点击屏幕任意位置切换到下一个场景
2. **鼠标滚轮** - 向下滚动切换到下一个，向上滚动切换到上一个
3. **触摸滑动** - 移动设备上下滑动切换场景
4. **导航点击** - 点击右侧导航指示器跳转到指定场景

### 鼠标效果

- 移动鼠标时，3D物体会产生微妙的视差跟随效果
- 在粒子场景中，鼠标移动会影响粒子的运动轨迹
- 相机位置会轻微跟随鼠标，增强沉浸感

### 场景编号

- 场景 1：几何世界（默认）
- 场景 2：粒子星云
- 场景 3：波动地形
- 场景 4：未来文字

## 🎨 自定义

### 修改颜色主题

在 `js/utils.js` 中修改 `randomNeonColor()` 函数：

```javascript
function randomNeonColor() {
    const colors = [
        0x8a2be2, // 蓝紫色
        0xff1493, // 深粉色
        0x00bfff, // 深天蓝
        // 添加你的颜色...
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}
```

### 调整场景数量

在 `js/scenes.js` 中的 `SceneManager` 类添加新场景：

```javascript
createYourScene(scene) {
    // 创建你的自定义3D场景
    const objects = [];
    // ... 添加3D物体
    return objects;
}
```

### 修改动画速度

在 `js/scenes.js` 中调整各个场景的动画参数。

## 📱 响应式设计

网站完全响应式，自动适配：

- **桌面端** (1920x1080+) - 完整体验，最高性能
- **笔记本** (1366x768+) - 完整功能
- **平板端** (768x1024) - 优化的粒子数量
- **手机端** (375x667) - 精简的粒子系统，触摸控制

## 🌐 浏览器兼容性

支持所有支持WebGL的现代浏览器：

- ✅ Chrome 60+ （推荐）
- ✅ Firefox 60+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ 移动端浏览器（iOS Safari, Chrome Mobile）

**注意**：需要启用WebGL支持。

## ⚙️ 性能说明

### 性能等级

网站会根据设备性能自动调整：

- **高性能**（桌面端）：15000粒子
- **中等性能**（高端移动设备）：8000粒子
- **低性能**（普通移动设备）：5000粒子

### 优化建议

- 关闭不必要的浏览器扩展
- 使用硬件加速
- 确保显卡驱动最新
- 关闭其他占用GPU的应用

## 🔧 开发

### 依赖说明

项目使用CDN加载Three.js和GSAP，无需安装依赖：

- Three.js: `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js`
- GSAP: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js`

### 代码结构

#### main.js - 主程序
- Three.js 初始化（场景、相机、渲染器）
- 光照系统设置
- 事件监听（点击、滚轮、触摸）
- 渲染循环

#### scenes.js - 场景管理
- SceneManager 类管理所有场景
- 4个场景创建函数
- 场景切换逻辑
- 动画更新函数

#### utils.js - 工具函数
- 鼠标位置跟踪
- 防抖/节流函数
- 数学工具（随机数、插值、映射）
- 性能检测
- 颜色工具

## 🐛 常见问题

### Q: 页面显示黑屏？
A: 检查浏览器是否支持WebGL，或查看控制台是否有错误信息。

### Q: 性能不佳，卡顿？
A: 尝试关闭其他占用GPU的程序，或降低浏览器缩放比例。

### Q: 移动端无法切换场景？
A: 确保使用滑动而不是点击，滑动距离要超过50px。

### Q: 加载很慢？
A: 首次加载需要下载Three.js和GSAP库，请确保网络连接正常。

## 📄 许可证

MIT License - 可自由使用本项目进行学习或商业用途。

## 🤝 贡献

欢迎贡献代码！你可以：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📧 联系方式

- 在GitHub上提交 [Issue](https://github.com/FRIEREN886/3d-interactive-website/issues)
- 发起 [Pull Request](https://github.com/FRIEREN886/3d-interactive-website/pulls)

## 🙏 致谢

- [Three.js](https://threejs.org/) - 强大的3D渲染库
- [GSAP](https://greensock.com/gsap/) - 专业的动画库
- 灵感来源：[MakeMePulse](https://www.makemepulse.com/) 等优秀的3D交互网站

---

**用 ❤️ 和 WebGL 构建** | © 2026 3D Interactive Website

---

## 🎓 学习资源

如果你想学习更多关于Three.js和3D Web开发：

- [Three.js 官方文档](https://threejs.org/docs/)
- [Three.js 示例](https://threejs.org/examples/)
- [WebGL 基础教程](https://webglfundamentals.org/)
- [GSAP 文档](https://greensock.com/docs/)

享受你的3D之旅！🚀
