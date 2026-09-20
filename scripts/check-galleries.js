const fs = require('fs')
const content = fs.readFileSync('lib/travel-data.ts', 'utf8')
const blocks = content.split(/slug:\s*'/)
for (let i = 1; i < blocks.length; i++) {
  const slug = blocks[i].split("'")[0]
  const galleryMatch = blocks[i].match(/gallery:\s*\[([\s\S]*?)\]/)
  const count = galleryMatch ? (galleryMatch[1].match(/image:/g) || []).length : 0
  console.log(slug, 'gallery count:', count)
}
