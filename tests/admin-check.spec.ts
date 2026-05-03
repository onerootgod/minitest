import { test, expect, devices } from '@playwright/test';

const TARGET_URL = process.env.TEST_URL || 'https://zyadmin.pages.dev';

const auditDevices = [
  { name: 'PC_Large_Screen', viewport: { width: 1920, height: 1080 } },
  { name: 'PC_Standard', viewport: { width: 1440, height: 900 } },
  { name: 'iPad_Pro_11_Portrait', ...devices['iPad Pro 11'] },
  { name: 'iPad_Pro_11_Landscape', ...devices['iPad Pro 11'], viewport: { width: 1194, height: 834 } },
  { name: 'iPhone_15_Pro_Max', ...devices['iPhone 15 Pro Max'] },
  { name: 'iPhone_SE_Compact', ...devices['iPhone SE'] },
  { name: 'Android_Galaxy_S24', ...devices['Galaxy S24 Ultra'] }
];

test.describe('Admin Panel Omni-Adaptability Audit', () => {
  for (const device of auditDevices) {
    test(`Visual & Interaction Audit: ${device.name}`, async ({ page }) => {
      await page.setViewportSize(device.viewport);
      await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
      
      // 1. 基础 UI 截屏 (持久化存储路径)
      await page.screenshot({ path: `./audit-results/admin/${device.name}_01_landing.png`, fullPage: true });
      
      // 2. 交互测试：模拟登录/接入码输入
      const accessInput = page.locator('#access-code');
      if (await accessInput.isVisible()) {
          await accessInput.fill('one9root6man3');
          await page.screenshot({ path: `./audit-results/admin/${device.name}_02_filling.png` });
          await page.click('button:has-text("校准接入")');
          await page.waitForTimeout(2000);
          await page.screenshot({ path: `./audit-results/admin/${device.name}_03_after_login.png`, fullPage: true });
      }
      
      console.log(`Audit complete for ${device.name}`);
    });
  }
});
