const automator = require('miniprogram-automator');

describe('Mini-Program Frontend Health Check', () => {
  let miniProgram;

  beforeAll(async () => {
    miniProgram = await automator.launch({
      projectPath: '../zymini' // 指向同级的 zymini 源码
    });
  }, 30000);

  afterAll(async () => {
    await miniProgram.disconnect();
  });

  test('Page Navigation Check', async () => {
    const page = await miniProgram.reLaunch('/pages/survey/survey');
    expect(page.path).toContain('pages/survey/survey');
    
    const title = await page.$('.q-text'); // 假设问卷页有这个类
    if (title) {
        console.log('Survey page title detected.');
    }
  });

  test('Screenshot for Visual Audit', async () => {
    const page = await miniProgram.currentPage();
    await page.screenshot({
      path: './screenshots/miniprogram_survey_check.png'
    });
  });
});
