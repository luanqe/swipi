const sharp = require('sharp');
const fs = require('fs');

// SVG for Icon (1024x1024)
const iconSVG = `
<svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0A66C2;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#004182;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1024" height="1024" fill="url(#grad)"/>
  
  <!-- Card 1 (back) -->
  <rect x="400" y="300" width="250" height="350" fill="rgba(255,255,255,0.3)" rx="20" transform="rotate(8 525 475)"/>
  
  <!-- Card 2 (front) -->
  <rect x="350" y="300" width="250" height="350" fill="rgba(255,255,255,0.95)" rx="20"/>
  
  <!-- Highlight -->
  <rect x="380" y="340" width="190" height="20" fill="#0A66C2" rx="5"/>
</svg>
`;

// SVG for Splash (1242x2436)
const splashSVG = `
<svg width="1242" height="2436" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0A66C2;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#004182;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1242" height="2436" fill="url(#grad)"/>
  
  <!-- Card 1 (back) -->
  <rect x="550" y="1050" width="180" height="250" fill="rgba(255,255,255,0.3)" rx="15" transform="rotate(8 640 1175)"/>
  
  <!-- Card 2 (front) -->
  <rect x="530" y="1050" width="180" height="250" fill="rgba(255,255,255,0.95)" rx="15"/>
  
  <!-- Highlight -->
  <rect x="550" y="1080" width="140" height="15" fill="#0A66C2" rx="4"/>
</svg>
`;

// SVG for Favicon (48x48)
const faviconSVG = `
<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
  <rect width="48" height="48" fill="#0A66C2" rx="8"/>
  <rect x="12" y="12" width="24" height="24" fill="white" rx="3"/>
  <rect x="15" y="16" width="18" height="3" fill="#0A66C2" rx="1"/>
</svg>
`;

async function generateAssets() {
  try {
    // Generate icon.png
    await sharp(Buffer.from(iconSVG))
      .resize(1024, 1024)
      .png()
      .toFile('./assets/icon.png');
    console.log('✅ icon.png created (1024x1024)');

    // Generate splash.png
    await sharp(Buffer.from(splashSVG))
      .resize(1242, 2436)
      .png()
      .toFile('./assets/splash.png');
    console.log('✅ splash.png created (1242x2436)');

    // Generate adaptive-icon.png (same as icon)
    await sharp(Buffer.from(iconSVG))
      .resize(1024, 1024)
      .png()
      .toFile('./assets/adaptive-icon.png');
    console.log('✅ adaptive-icon.png created (1024x1024)');

    // Generate favicon.png
    await sharp(Buffer.from(faviconSVG))
      .resize(48, 48)
      .png()
      .toFile('./assets/favicon.png');
    console.log('✅ favicon.png created (48x48)');

    console.log('\n🎉 All assets generated successfully!');
    console.log('📱 You can now run: npm start');
  } catch (error) {
    console.error('❌ Error generating assets:', error);
    process.exit(1);
  }
}

generateAssets();
