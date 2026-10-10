const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

sharp.cache(false);

const targetDirs = [
  path.join(__dirname, '..', 'public', 'Banner'),
  path.join(__dirname, '..', 'public', 'Hero section'),
  path.join(__dirname, '..', 'public', 'Card Image'),
  path.join(__dirname, '..', 'public', 'image')
];
const extensions = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];

let totalOriginalBytes = 0;
let totalOptimizedBytes = 0;
let processedCount = 0;

function getAllImages(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(getAllImages(filePath));
    } else {
      const ext = path.extname(file);
      if (extensions.includes(ext)) {
        results.push(filePath);
      }
    }
  });
  return results;
}

async function optimizeImage(filePath) {
  try {
    const inputBuffer = fs.readFileSync(filePath);
    const origSize = inputBuffer.length;
    totalOriginalBytes += origSize;

    const ext = path.extname(filePath).toLowerCase();

    let transformer = sharp(inputBuffer).rotate();

    const metadata = await transformer.metadata();
    const maxDim = 1920;
    if (metadata.width > maxDim || metadata.height > maxDim) {
      transformer = transformer.resize(maxDim, maxDim, { fit: 'inside', withoutEnlargement: true });
    }

    let outputBuffer;
    if (ext === '.png') {
      outputBuffer = await transformer.png({ quality: 80, compressionLevel: 9, effort: 7 }).toBuffer();
    } else {
      outputBuffer = await transformer.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
    }

    const newSize = outputBuffer.length;

    if (newSize < origSize) {
      fs.writeFileSync(filePath, outputBuffer);
      totalOptimizedBytes += newSize;
      const savedPercent = (((origSize - newSize) / origSize) * 100).toFixed(1);
      console.log(`Optimized: ${path.basename(filePath)} (${(origSize/1024).toFixed(0)}KB -> ${(newSize/1024).toFixed(0)}KB, -${savedPercent}%)`);
    } else {
      totalOptimizedBytes += origSize;
      console.log(`Kept original: ${path.basename(filePath)} (already optimal)`);
    }
    processedCount++;
  } catch (err) {
    console.error(`Failed ${filePath}:`, err.message);
  }
}

async function run() {
  const allFiles = targetDirs.flatMap(getAllImages);
  console.log(`Found ${allFiles.length} images to optimize...`);
  for (const f of allFiles) {
    await optimizeImage(f);
  }
  console.log('\n========================================');
  console.log(`Processed: ${processedCount} images`);
  console.log(`Original total size: ${(totalOriginalBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Optimized total size: ${(totalOptimizedBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total Saved: ${((totalOriginalBytes - totalOptimizedBytes) / 1024 / 1024).toFixed(2)} MB (${(((totalOriginalBytes - totalOptimizedBytes)/totalOriginalBytes)*100).toFixed(1)}% reduction!)`);
  console.log('========================================\n');
}

run();
