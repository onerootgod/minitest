import { test, expect, devices } from '@playwright/test';
import fs from 'fs';

const TARGET_URL = process.env.TEST_URL || 'https://zyadmin.pages.dev';

test.describe('Admin Panel Omni-Adaptability Audit', () => {
  // 波比：在执行前确保目录存在
  test.beforeAll(() => {
    if (!fs.existsSync('./audit-results/admin')) {
      fs.mkdirSync('./audit-results/admin', { recursive: true });
    }
  });

  const deviceScenarios = [
    { name: 'iPad_Pro_11_Landscape', ...devices['iPad Pro 11'], isLandscape: true },
    { name: 'iPhone_15_Pro_Max', ...devices['iPhone 15 Pro Max'] }
  ];

  for (const device of deviceScenarios) {
    test(`Visual Audit: ${device.name}`, async ({ page }) => {
      await page.setViewportSize(device.viewport);
      await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
      
      // 接入码绕过
      const accessInput = page.locator('#access-code');
      if (await accessInput.isVisible()) {
          await accessInput.fill('one9root6man3');
          await page.click('button:has-text("校准接入")');
          await page.waitForTimeout(3000);
      }
      
      await page.screenshot({ path: `./audit-results/admin/${device.name}_final.png`, fullPage: true });
      console.log(`✅ ${device.name} verified.`);
    });
  }
});
