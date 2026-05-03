import { test, expect, devices } from '@playwright/test';

const TARGET_URL = process.env.TEST_URL || 'https://zyadmin.pages.dev';

const auditDevices = [
  { name: 'PC_4K_Workstation', viewport: { width: 3840, height: 2160 } },
  { name: 'PC_1080P_Standard', viewport: { width: 1920, height: 1080 } },
  { name: 'MacBook_Air_13', viewport: { width: 1440, height: 900 } },
  { name: 'iPad_Pro_11_Landscape', ...devices['iPad Pro 11'], isLandscape: true },
  { name: 'iPad_Pro_11_Portrait', ...devices['iPad Pro 11'] },
  { name: 'iPhone_15_Pro_Max', ...devices['iPhone 15 Pro Max'] },
  { name: 'iPhone_SE_Compact', ...devices['iPhone SE'] },
  { name: 'WeChat_Simulator_Mobile', viewport: { width: 375, height: 667 }, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/04.1 MicroMessenger/7.0.12' },
  { name: 'Android_Foldable_Unfolded', viewport: { width: 1768, height: 2208 } }
];

test.describe('Admin Panel Omni-Adaptability Audit', () => {
  for (const device of auditDevices) {
    test(`Visual & Interaction Audit: ${device.name}`, async ({ page }) => {
      // 设置环境模拟
      if (device.userAgent) {
        await page.addInitScript((ua) => {
          Object.defineProperty(navigator, 'userAgent', { get: () => ua });
        }, device.userAgent);
      }
      
      await page.setViewportSize(device.viewport);
      await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
      
      // 1. 全屏首屏快照
      await page.screenshot({ path: `./audit-results/admin/${device.name}_01_landing.png`, fullPage: true });
      
      // 2. 交互测试：接入码验证
      const accessInput = page.locator('#access-code');
      if (await accessInput.isVisible()) {
          await accessInput.fill('one9root6man3');
          await page.screenshot({ path: `./audit-results/admin/${device.name}_02_filling.png` });
          
          // 点击校准并等待导航/反馈
          await page.click('button:has-text("校准接入")');
          await page.waitForTimeout(3000); // 等待动画和 API 响应
          
          // 3. 内部仪表盘/成功页适配
          await page.screenshot({ path: `./audit-results/admin/${device.name}_03_dashboard.png`, fullPage: true });
      } else {
          // 如果没有接入码框，可能是已经持久化登录，检查主内容
          await page.screenshot({ path: `./audit-results/admin/${device.name}_03_main_content.png`, fullPage: true });
      }
      
      console.log(`✅ Audit complete for ${device.name}`);
    });
  }
});
