import { test, expect, devices } from '@playwright/test';

// 目标地址：本地服务或部署后的 Preview
const TARGET_URL = process.env.TEST_URL || 'https://zyadmin.pages.dev';

test.describe('Admin Panel Responsive Check', () => {
  test('Visual Audit: iPad Pro 11 (Glassmorphism Check)', async ({ page }) => {
    await page.setViewportSize({ width: 1194, height: 834 });
    await page.goto(TARGET_URL);
    
    // 检查核心标题是否对齐 iOS 26 视觉
    const title = page.locator('h1, .title');
    await expect(title).toBeVisible();
    await page.screenshot({ path: './screenshots/ipad_admin_audit.png', fullPage: true });
    console.log('iPad Pro 11 audit complete.');
  });
});
