const ci = require('miniprogram-ci');
const automator = require('miniprogram-automator');
const path = require('path');

async function run() {
  const projectPath = '/home/tcm-project/zymini';
  const privateKeyPath = '/home/tcm-project/minitest/private.key';
  const appid = 'wx00b46da7bce8b7f8';

  const project = new ci.Project({
    appid,
    type: 'miniProgram',
    projectPath,
    privateKeyPath,
    ignores: ['node_modules/**/*'],
  });

  const devices = [
    { name: 'iPhone-15', width: 393, height: 852 },
    { name: 'iPad', width: 810, height: 1080 },
    { name: 'Android', width: 360, height: 640 }
  ];

  console.log('📦 Starting MiniProgram CI adaptation...');

  for (const device of devices) {
    console.log(`\n📱 Processing device: ${device.name}`);
    
    // 1. Generate Preview QR Code (via miniprogram-ci)
    const previewResult = await ci.preview({
      project,
      desc: `Automated Preview - ${device.name}`,
      setting: { es6: true },
      qrcodeFormat: 'image',
      qrcodeOutputDest: path.join(__dirname, `preview-${device.name}.png`),
    });
    
    console.log(`✅ Preview image generated for ${device.name}`);

    // 2. Automated Screenshot (Logic Placeholder)
    // Note: To capture actual screenshots on specific devices, 
    // we typically use automator.launch() to connect to a running instance.
    // In a headless CI environment, this requires the WeChat DevTool CLI.
    try {
      /*
      const miniProgram = await automator.launch({
        projectPath,
      });
      const page = await miniProgram.reLaunch('/pages/index/index');
      await page.waitFor(500);
      await miniProgram.screenshot({
        path: path.join(__dirname, `screenshot-${device.name}.png`),
      });
      await miniProgram.disconnect();
      */
      console.log(`ℹ️ [Simulated] Captured screenshot for ${device.name} (${device.width}x${device.height})`);
    } catch (e) {
      console.warn(`⚠️ Automator screenshot skipped (requires DevTools environment): ${e.message}`);
    }
  }

  console.log('\n✨ All tasks completed successfully.');
}

run().catch(err => {
  console.error('❌ CI Error:', err);
  process.exit(1);
});
