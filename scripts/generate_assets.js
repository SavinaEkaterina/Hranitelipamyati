import fs from 'fs';
import path from 'path';
import https from 'https';

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(true));
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

// SVG fallback helper if download fails
const createSvgPlaceholder = (filePath, text, width = 800, height = 600, bgColor = '#3B3128', textColor = '#C9A96E') => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="100%" height="100%" fill="${bgColor}"/>
    <text x="50%" y="50%" font-family="serif" font-size="24" fill="${textColor}" dominant-baseline="middle" text-anchor="middle">${text}</text>
  </svg>`;
  fs.writeFileSync(filePath, svg);
};

// Create a dummy mp4 file or small valid video buffer
const createDummyVideo = (filePath) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  // Minimal MP4 header / placeholder bytes
  const buffer = Buffer.from([
    0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70, 0x6d, 0x70, 0x34, 0x32,
    0x00, 0x00, 0x00, 0x00, 0x6d, 0x70, 0x34, 0x32, 0x69, 0x73, 0x6f, 0x6d
  ]);
  fs.writeFileSync(filePath, buffer);
};

const assetsToDownload = [
  // Logo
  { url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200', path: 'public/logo/logo.png' },
  { url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100', path: 'public/logo/favicon.png' },

  // Hero images
  { url: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=800', path: 'public/hero/images/left-top.jpg' },
  { url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=800', path: 'public/hero/images/left-middle.jpg' },
  { url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800', path: 'public/hero/images/left-bottom.jpg' },
  { url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800', path: 'public/hero/images/right-top.jpg' },
  { url: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&q=80&w=800', path: 'public/hero/images/right-middle.jpg' },
  { url: 'https://images.unsplash.com/photo-1577702312572-5bb9328a9f15?auto=format&fit=crop&q=80&w=800', path: 'public/hero/images/right-bottom.jpg' },
  { url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1200', path: 'public/hero/images/center-poster.jpg' },

  // Gallery
  { url: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=800&sat=-100', path: 'public/gallery/before/1.jpg' },
  { url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800', path: 'public/gallery/after/1.jpg' },
  { url: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&q=80&w=800&sat=-100', path: 'public/gallery/before/2.jpg' },
  { url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800', path: 'public/gallery/after/2.jpg' },
  { url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=800&sat=-100', path: 'public/gallery/before/3.jpg' },
  { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800', path: 'public/gallery/after/3.jpg' },
  { url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800&sat=-100', path: 'public/gallery/before/4.jpg' },
  { url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800', path: 'public/gallery/after/4.jpg' },
  { url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800&sat=-100', path: 'public/gallery/before/5.jpg' },
  { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800', path: 'public/gallery/after/5.jpg' },
  { url: 'https://images.unsplash.com/photo-1577702312572-5bb9328a9f15?auto=format&fit=crop&q=80&w=800&sat=-100', path: 'public/gallery/before/6.jpg' },
  { url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=800', path: 'public/gallery/after/6.jpg' },

  // Stories
  { url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=800&sat=-100', path: 'public/stories/story-1-before.jpg' },
  { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800', path: 'public/stories/story-1-after.jpg' },
  { url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800&sat=-100', path: 'public/stories/story-2-before.jpg' },
  { url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800', path: 'public/stories/story-2-after.jpg' },
  { url: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=800&sat=-100', path: 'public/stories/story-3-before.jpg' },
  { url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800', path: 'public/stories/story-3-after.jpg' },

  // Why Us
  { url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1000', path: 'public/why-us/why-us-photo.jpg' },

  // Services
  { url: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=800&sat=-100', path: 'public/services/restoration-before.jpg' },
  { url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800', path: 'public/services/restoration-after.jpg' },
  { url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800', path: 'public/services/colorization.jpg' },
  { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800', path: 'public/services/revival.jpg' },
  { url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800', path: 'public/services/mosaic.jpg' },
  { url: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&q=80&w=800', path: 'public/services/enhancement.jpg' },

  // Reviews
  { url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200', path: 'public/reviews/review-1.jpg' },
  { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', path: 'public/reviews/review-2.jpg' },
  { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', path: 'public/reviews/review-3.jpg' }
];

async function run() {
  console.log('Downloading assets to public/...');
  for (const item of assetsToDownload) {
    try {
      await downloadFile(item.url, item.path);
      console.log(`Saved: ${item.path}`);
    } catch (err) {
      console.error(`Failed downloading ${item.path}, generating fallback...`);
      createSvgPlaceholder(item.path, path.basename(item.path));
    }
  }

  // Create video placeholder
  createDummyVideo('public/hero/video/hero.mp4');
  createDummyVideo('public/hero/video/hero-main.mp4');
  console.log('Hero video created at public/hero/video/hero-main.mp4');
}

run();
