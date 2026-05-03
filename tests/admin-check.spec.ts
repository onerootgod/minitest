import { test, expect, devices } from '@playwright/test';

// 注意：在 GHA 环境中，我们将通过项目根目录的 zyadmin 源码启动静态服务
const TARGET_URL = process.env.TEST_URL || 'http://localhost:8788';

const testDevices = [
  { name: 'iPhone_15_Pro', ...devices['iPhone 15'] },
  { name: 'iPad_Pro_11', ...devices['iPad Pro 11'] },
];

test.describe('Admin Panel Pixel-Level Audit', () => {
  for (const device of testDevices) {
    test(`Visual Check: ${device.name}`, async ({ page }) => {
      await page.setViewportSize(device.viewport);
      
      console.log(`Navigating to ${TARGET_URL}...`);
      await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 60000 });
      
      // 截图
      const screenshotPath = `./screenshots/${device.name}_live.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      
      // 验证核心元素 (不再空跑)
      const title = page.locator('h1, .title');
      await expect(title).toBeVisible();
      console.log(`Successfully verified ${device.name}`);
    });
  }
});
