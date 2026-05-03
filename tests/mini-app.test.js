const automator = require('miniprogram-automator');

describe('Mini-App Frontend Audit', () => {
  let miniProgram;

  beforeAll(async () => {
    miniProgram = await automator.launch({
      projectPath: '/home/tcm-project/zymini' // 物理指向本地源码
    });
  }, 30000);

  test('Survey Page Path Verification', async () => {
    const page = await miniProgram.reLaunch('/pages/survey/survey');
    expect(page.path).toContain('pages/survey/survey');
    await page.screenshot({ path: './screenshots/mini_survey_live.png' });
  });

  afterAll(async () => {
    await miniProgram.disconnect();
  });
});
