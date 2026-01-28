const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesToOptimize = [
  {
    input: 'public/bank-security.png',
    output: 'public/bank-security.webp',
    width: 400, // Resize to appropriate display size
    quality: 85
  },
  {
    input: 'public/images/auth-bg.png',
    output: 'public/images/auth-bg.webp',
    width: 1920, // Keep large for background
    quality: 80
  },
  {
    input: 'public/images/vip-starter.png',
    output: 'public/images/vip-starter.webp',
    width: 800, // Resize to appropriate display size
    quality: 85
  }
];

async function optimizeImages() {
  console.log('🖼️  Starting advanced image optimization...\n');
  console.log(`📊 Target: Images under ${MAX_FILE_SIZE}KB\n`);
  
  const publicDir = path.join(__dirname, '..', 'public');
  const images = findImages(publicDir);
  
  if (images.length === 0) {
    console.log('⚠️  No images found to optimize');
    return;
  }
  
  console.log(`Found ${images.length} images to optimize\n`);
  
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  
  for (const imagePath of images) {
    const relativePath = path.relative(path.join(__dirname, '..'), imagePath);
    
    try {
      // Get original file size
      const originalStats = fs.statSync(imagePath);
      const originalSizeKB = originalStats.size / 1024;
      totalOriginalSize += originalSizeKB;
      
      console.log(`📸 ${relativePath} (${originalSizeKB.toFixed(2)} KB)`);
      
      // Determine optimal width based on image location/name
      let targetWidth = null;
      if (relativePath.includes('auth-bg') || relativePath.includes('background')) {
        targetWidth = RESPONSIVE_SIZES.large;
      } else if (relativePath.includes('vip') || relativePath.includes('property')) {
        targetWidth = RESPONSIVE_SIZES.medium;
      } else {
        targetWidth = RESPONSIVE_SIZES.small;
      }
      
      // Generate AVIF (best compression)
      try {
        const avifResult = await optimizeImage(imagePath, 'avif', targetWidth);
        totalOptimizedSize += avifResult.sizeKB;
        console.log(`   ✅ AVIF: ${avifResult.sizeKB.toFixed(2)} KB (quality: ${avifResult.quality})`);
      } catch (error) {
        console.log(`   ⚠️  AVIF failed: ${error.message}`);
      }
      
      // Generate WebP (fallback)
      try {
        const webpResult = await optimizeImage(imagePath, 'webp', targetWidth);
        totalOptimizedSize += webpResult.sizeKB;
        console.log(`   ✅ WebP: ${webpResult.sizeKB.toFixed(2)} KB (quality: ${webpResult.quality})`);
      } catch (error) {
        console.log(`   ⚠️  WebP failed: ${error.message}`);
      }
      
      const savings = ((1 - (totalOptimizedSize / 2) / originalSizeKB) * 100).toFixed(1);
      console.log(`   💾 Savings: ${savings}%\n`);
      
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}\n`);
    }
  }

  console.log('✨ Image optimization complete!');
}

optimizeImages().catch(console.error);
