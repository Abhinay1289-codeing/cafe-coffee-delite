const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, '../assets/images');

async function optimizeImages() {
  console.log('Starting image optimization...');
  const files = fs.readdirSync(dir);
  let converted = 0;

  for (const file of files) {
    if (file.match(/\.(jpeg|jpg|png)$/i)) {
      const ext = path.extname(file);
      const basename = path.basename(file, ext);
      const inputPath = path.join(dir, file);
      const outputPath = path.join(dir, `${basename}.webp`);
      
      try {
        await sharp(inputPath)
          .resize(400, null, { withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outputPath);
        
        console.log(`Converted: ${file} -> ${basename}.webp`);
        fs.unlinkSync(inputPath); // Remove original
        converted++;
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }

  console.log(`\n🎉 Successfully optimized and converted ${converted} images to WebP format!`);
}

optimizeImages();
