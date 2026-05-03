const automator = require('miniprogram-automator');
const fs = require('fs');
const path = require('path');

describe('Mini-Program Omni-Adaptability Audit', () => {
  let miniProgram;

  beforeAll(async () => {
    // 确保截图目录存在
    const dir = './audit-results/mini';
    if (!fs.existsSync(dir)){ fs.mkdirSync(dir, { recursive: true }); }

    miniProgram = await automator.launch({
      projectPath: process.env.ZYMINI_PATH || '../zymini'
    });
  }, 60000);

  test('UX Flow: Survey -> Result -> History', async () => {
    const page = await miniProgram.reLaunch('/pages/survey/survey');
    await page.waitFor(2000);
    await page.screenshot({ path: './audit-results/mini/survey_init.png' });

    // 模拟答题交互 (假设有选项点击)
    const options = await page.$$('.option-item');
    if (options.length > 0) {
      await options[0].tap();
      await page.waitFor(500);
      await page.screenshot({ path: './audit-results/mini/survey_interaction.png' });
    }

    // 切换到结果页
    await miniProgram.navigateTo('/pages/result/result');
    await page.waitFor(2000);
    await page.screenshot({ path: './audit-results/mini/result_visual_audit.png' });
  });

  afterAll(async () => {
    await miniProgram.disconnect();
  });
});
