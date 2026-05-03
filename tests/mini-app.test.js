const automator = require('miniprogram-automator');
const fs = require('fs');

describe('Mini-Program Deep Interaction Audit', () => {
  let miniProgram;

  beforeAll(async () => {
    const dir = './audit-results/mini';
    if (!fs.existsSync(dir)){ fs.mkdirSync(dir, { recursive: true }); }

    // 黑默丁格：改用 connect 模式，配合 GHA 中开启的 9420 端口
    // 这比 launch 模式在云端更稳定，能绕过 IDE 启动时的权限弹窗
    miniProgram = await automator.connect({
      wsEndpoint: 'ws://localhost:9420'
    });
  }, 120000); // 提升超时到 2 分钟，等待 IDE 预热

  test('Core UX Flow Audit', async () => {
    const page = await miniProgram.reLaunch('/pages/survey/survey');
    await page.waitFor(5000);
    await page.screenshot({ path: './audit-results/mini/01_survey_init.png' });

    // 滑动测试
    await miniProgram.evaluate(() => {
      wx.pageScrollTo({ scrollTop: 500, duration: 300 });
    });
    await page.waitFor(1000);
    await page.screenshot({ path: './audit-results/mini/02_survey_scrolled.png' });

    console.log('✅ Mini-App visual capture complete.');
  });

  afterAll(async () => {
    await miniProgram.disconnect();
  });
});
