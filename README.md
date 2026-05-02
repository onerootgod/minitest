# 🧪 minitest | TCM.OS 自动化适配哨所

## 📡 核心使命
作为 **TCM.OS** (zymini & zyadmin) 的前哨站，通过 GitHub Actions 模拟全终端环境，确保每一行代码在到达生产环境前，已经历过“全机型、全尺寸、全姿态”的严苛预检。

## 🛠️ 自动化武器库
- **Playwright (Admin Observer)**: 负责后台管理端的视觉自检。
  - 模拟 iPhone 15, iPad, PC (Chrome/Safari), Android 屏幕。
  - 自动化执行横竖屏旋转测试。
- **Miniprogram Automator (Mini Scout)**: 负责小程序的逻辑与 UI 自检。
  - 模拟微信不同基础库版本的渲染。
- **Screenshot Comparison**: 视觉回归测试，确保 1.5px 边框的呼吸感不被破坏。

## 🧭 协作流
1. **开发者推送** -> `zymini` / `zyadmin`
2. **触发预检** -> `minitest` 启动 GHA 流
3. **输出报告** -> 发送至星界游神｜✨ 指挥部
4. **准许通行** -> 自动触发 CF 生产部署

---
*ONE (Omni-Nexus Enforcement) Protocol Active.*
