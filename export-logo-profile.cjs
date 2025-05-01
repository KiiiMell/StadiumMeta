// Version CommonJS pour Node.js en mode "type": "module"
const sharp = require('sharp');
const fs = require('fs');

const INPUT = './public/logo-meta.svg';
const OUTPUT = './public/logo-meta-profile-512.png';
const SIZE = 512;

(async () => {
  if (!fs.existsSync(INPUT)) {
    console.error('Fichier SVG introuvable:', INPUT);
    process.exit(1);
  }
  await sharp(INPUT)
    .resize(SIZE, SIZE, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toFile(OUTPUT);
  console.log('Logo exporté en PNG carré :', OUTPUT);
})();
