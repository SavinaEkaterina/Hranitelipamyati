import fs from 'fs';
import path from 'path';

function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      let relPath = path.relative(publicDir, fullPath).replace(/\\/g, '/');
      if (!relPath.startsWith('/')) relPath = '/' + relPath;
      arrayOfFiles.push(relPath);
    }
  }
  return arrayOfFiles;
}

const publicDir = path.join(process.cwd(), 'public');
const files = getAllFiles(publicDir);
const outputPath = path.join(process.cwd(), 'src', 'utils', 'publicManifest.json');
fs.writeFileSync(outputPath, JSON.stringify(files, null, 2));
console.log(`[build_manifest] Generated publicManifest.json with ${files.length} files.`);
