const automator = require('miniprogram-automator');

async function runAudit() {
  const miniProgram = await automator.launch({
    projectPath: '../zymini', // 指向检出的 zymini 源码
  });

  const page = await miniProgram.reLaunch('/pages/index/index');
  await page.waitFor(3000);

  // --- 1. 基础适配截图 (iPhone 模式) ---
  await page.screenshot({ path: './audit-results/mini/iphone_standard.png' });

  // --- 2. 模拟滑动交互 (Swipe) ---
  console.log('Testing Scroll/Swipe...');
  await miniProgram.pageScrollTo(1000); // 滚到底部
  await page.waitFor(1000);
  await page.screenshot({ path: './audit-results/mini/iphone_scrolled.png' });

  // --- 3. 模拟旋转/横屏适配 ---
  // 注意：小程序真机旋转需配置 pageOrientation，自动化中通过切换模拟器型号实现
  console.log('Testing iPad Landscape...');
  // 重新启动以应用新的模拟器配置 (需开发者工具支持)
  
  // --- 4. 复杂交互：点击弹出层 ---
  const btn = await page.$('.start-btn');
  if (btn) {
    await btn.tap();
    await page.waitFor(1500);
    await page.screenshot({ path: './audit-results/mini/after_tap_interaction.png' });
  }

  await miniProgram.disconnect();
}

runAudit().catch(err => {
  console.error('Audit Failed:', err);
  process.exit(1);
});
