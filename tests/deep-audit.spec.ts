import { test, expect, devices } from '@playwright/test';

const TARGET_URL = process.env.TEST_URL || 'https://zyadmin.pages.dev';

// 定义需要审计的“极端”工况
const auditScenarios = [
  { name: 'iPhone_15_Portrait', ...devices['iPhone 15 Pro Max'] },
  { name: 'iPhone_15_Landscape', ...devices['iPhone 15 Pro Max'], isLandscape: true },
  { name: 'iPad_Pro_11_Portrait', ...devices['iPad Pro 11'] },
  { name: 'iPad_Pro_11_Landscape', ...devices['iPad Pro 11'], isLandscape: true },
  { name: 'WeChat_Mobile_Simulation', viewport: { width: 375, height: 667 }, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/04.1 MicroMessenger/7.0.12' }
];

test.describe('TCM.OS Deep Interaction & Orientation Audit', () => {
  for (const scenario of auditScenarios) {
    test(`Full-Flow Audit: ${scenario.name}`, async ({ page }) => {
      // 1. 初始化仿真环境
      await page.setViewportSize(scenario.viewport);
      await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
      
      // 2. 自动通过接入码屏障
      const accessInput = page.locator('#access-code');
      if (await accessInput.isVisible()) {
        await accessInput.fill('one9root6man3');
        await page.click('button:has-text("校准接入")');
        await page.waitForTimeout(2000);
      }

      // --- 阶段 A: 首屏布局审计 ---
      await page.screenshot({ path: `./audit-results/admin/${scenario.name}_phase1_init.png` });

      // --- 阶段 B: 滑动交互审计 (Testing Scroll/Sticky) ---
      console.log(`[${scenario.name}] Executing Scroll Audit...`);
      await page.mouse.wheel(0, 1000); // 向下滑动 1000 像素
      await page.waitForTimeout(1000);
      await page.screenshot({ path: `./audit-results/admin/${scenario.name}_phase2_scrolled.png` });

      // --- 阶段 C: 动态旋转审计 (Testing Reflow) ---
      if (!scenario.isLandscape && scenario.name.includes('iPad')) {
        console.log(`[${scenario.name}] Executing Rotation Audit...`);
        await page.setViewportSize({ width: scenario.viewport.height, height: scenario.viewport.width });
        await page.waitForTimeout(1500); // 等待 CSS 媒体查询响应
        await page.screenshot({ path: `./audit-results/admin/${scenario.name}_phase3_rotated.png` });
      }

      // --- 阶段 D: 交互元素审计 (Testing Buttons/Cards) ---
      const firstCard = page.locator('.ant-card, .card').first();
      if (await firstCard.isVisible()) {
        await firstCard.click();
        await page.waitForTimeout(500);
        await page.screenshot({ path: `./audit-results/admin/${scenario.name}_phase4_interaction.png` });
      }

      console.log(`✅ ${scenario.name} Audit Successful.`);
    });
  }
});
