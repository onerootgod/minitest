import { test, expect, devices } from '@playwright/test';

const TARGET_URL = 'http://localhost:8788'; // 替换为你的实际部署地址

const testDevices = [
  { name: 'iPhone 15 Pro', ...devices['iPhone 15'] },
  { name: 'iPhone 15 Pro Landscape', ...devices['iPhone 15'], isMobile: true, viewport: { width: 852, height: 393 } },
  { name: 'iPad Pro 11', ...devices['iPad Pro 11'] },
  { name: 'Desktop Chrome', viewport: { width: 1920, height: 1080 } },
];

test.describe('Admin Panel Responsive Check', () => {
  for (const device of testDevices) {
    test(`Visual Audit: ${device.name}`, async ({ page }) => {
      await page.setViewportSize(device.viewport);
      await page.goto(TARGET_URL);
      
      // 检查登录页是否正常
      await expect(page.locator('h1')).toContainText('中医指挥中心');
      await page.screenshot({ path: `./screenshots/${device.name.replace(/ /g, '_')}_login.png` });
      
      // 这里可以模拟登录后进入后台
      await page.fill('#access-code', 'one9root6man3');
      await page.click('button:has-text("校准接入")');
      // await page.screenshot({ path: `./screenshots/${device.name.replace(/ /g, '_')}_dashboard.png` });
    });
  }
});
