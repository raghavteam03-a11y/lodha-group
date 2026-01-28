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
  console.log('🖼️  Starting image optimization...\n');

  for (const image of imagesToOptimize) {
    const inputPath = path.join(__dirname, '..', image.input);
    const outputPath = path.join(__dirname, '..', image.output);

    // Check if input file exists
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Skipping ${image.input} - file not found`);
      continue;
    }

    try {
      // Get original file size
      const originalStats = fs.statSync(inputPath);
      const originalSize = (originalStats.size / 1024).toFixed(2);

      // Optimize and convert to WebP
      await sharp(inputPath)
        .resize(image.width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: image.quality })
        .toFile(outputPath);

      // Get optimized file size
      const optimizedStats = fs.statSync(outputPath);
      const optimizedSize = (optimizedStats.size / 1024).toFixed(2);
      const savings = ((1 - optimizedStats.size / originalStats.size) * 100).toFixed(1);

      console.log(`✅ ${image.input}`);
      console.log(`   Original: ${originalSize} KB`);
      console.log(`   Optimized: ${optimizedSize} KB`);
      console.log(`   Savings: ${savings}%\n`);
    } catch (error) {
      console.error(`❌ Error optimizing ${image.input}:`, error.message);
    }
  }

  console.log('✨ Image optimization complete!');
}

optimizeImages().catch(console.error);
