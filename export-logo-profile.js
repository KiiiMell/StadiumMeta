// Script Node.js pour exporter le logo Stadium Meta en PNG carré pour profils réseaux sociaux
// Nécessite : npm install sharp

const sharp = require('sharp');
const fs = require('fs');

const INPUT = './public/logo-meta.svg'; // Chemin relatif au dossier du script
const OUTPUT = './public/logo-meta-profile-512.png';
const SIZE = 512; // Taille carrée (px)

(async () => {
  if (!fs.existsSync(INPUT)) {
    console.error('Fichier SVG introuvable:', INPUT);
    process.exit(1);
  }
  await sharp(INPUT)
    .resize(SIZE, SIZE, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 } // fond transparent
    })
    .png()
    .toFile(OUTPUT);
  console.log('Logo exporté en PNG carré :', OUTPUT);
})();
