const { createCanvas } = require('@napi-rs/canvas');
const fs = require('fs');
const path = require('path');

const width = 360;
const height = 480;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Clear background (transparent)
ctx.clearRect(0, 0, width, height);

// Stamp border parameters (outer offset for serrated edge)
const margin = 16;
const stampW = width - margin * 2;
const stampH = height - margin * 2;
const toothRadius = 5;
const toothSpacing = 15;

// Draw perforated/serrated stamp shape
ctx.save();
ctx.beginPath();

// Top edge teeth
let currentX = margin;
let currentY = margin;
ctx.moveTo(currentX, currentY);

// Draw teeth on top
while (currentX < margin + stampW) {
  ctx.lineTo(currentX, currentY);
  ctx.arc(currentX + toothSpacing / 2, currentY, toothRadius, Math.PI, 0, true);
  currentX += toothSpacing;
}
ctx.lineTo(margin + stampW, currentY);

// Right edge
while (currentY < margin + stampH) {
  ctx.lineTo(currentX, currentY);
  ctx.arc(currentX, currentY + toothSpacing / 2, toothRadius, -Math.PI / 2, Math.PI / 2, true);
  currentY += toothSpacing;
}
ctx.lineTo(currentX, margin + stampH);

// Bottom edge
while (currentX > margin) {
  ctx.lineTo(currentX, currentY);
  ctx.arc(currentX - toothSpacing / 2, currentY, toothRadius, 0, Math.PI, true);
  currentX -= toothSpacing;
}
ctx.lineTo(margin, currentY);

// Left edge
while (currentY > margin) {
  ctx.lineTo(currentX, currentY);
  ctx.arc(currentX, currentY - toothSpacing / 2, toothRadius, Math.PI / 2, -Math.PI / 2, true);
  currentY -= toothSpacing;
}
ctx.lineTo(margin, margin);

ctx.closePath();

// Fill Stamp Base Paper (Aged Vintage Off-White / Ivory)
const bgGrad = ctx.createLinearGradient(margin, margin, margin + stampW, margin + stampH);
bgGrad.addColorStop(0, '#FFFDF8');
bgGrad.addColorStop(0.5, '#FAF4E8');
bgGrad.addColorStop(1, '#EFE4CE');
ctx.fillStyle = bgGrad;
ctx.fill();

// Subtle paper edge stroke
ctx.strokeStyle = '#D4C3A3';
ctx.lineWidth = 1;
ctx.stroke();
ctx.restore();

// Inner Decorative Margins (12px inset from paper edge)
const inset = margin + 10;
const innerW = width - inset * 2;
const innerH = height - inset * 2;

// Outer Gold Frame
ctx.strokeStyle = '#C9A96E';
ctx.lineWidth = 2.5;
ctx.strokeRect(inset, inset, innerW, innerH);

// Inner Thin Frame
ctx.strokeStyle = '#8C6239';
ctx.lineWidth = 1;
ctx.strokeRect(inset + 4, inset + 4, innerW - 8, innerH - 8);

// Top Header Banner Box
const headerH = 34;
ctx.fillStyle = '#3B2516';
ctx.fillRect(inset + 5, inset + 5, innerW - 10, headerH);

// Top Header Text
ctx.fillStyle = '#D8C29D';
ctx.font = 'bold 13px serif';
ctx.textAlign = 'left';
ctx.fillText('РОССИЯ', inset + 16, inset + 26);

ctx.fillStyle = '#FFD700';
ctx.font = '14px serif';
ctx.textAlign = 'center';
ctx.fillText('★', width / 2, inset + 26);

ctx.fillStyle = '#D8C29D';
ctx.font = 'bold 13px serif';
ctx.textAlign = 'right';
ctx.fillText('2026', inset + innerW - 16, inset + 26);

// Center Emblem Circle (Camera Lens / Vintage Stamp Seal)
const centerX = width / 2;
const centerY = height / 2 - 5;
const radius = 54;

// Outer Gold Ring
const ringGrad = ctx.createLinearGradient(centerX - radius, centerY - radius, centerX + radius, centerY + radius);
ringGrad.addColorStop(0, '#D4AF37');
ringGrad.addColorStop(0.5, '#C9A96E');
ringGrad.addColorStop(1, '#8C6239');
ctx.fillStyle = ringGrad;
ctx.beginPath();
ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
ctx.fill();

// Inner Dark Camera Disc
ctx.fillStyle = '#1E130B';
ctx.beginPath();
ctx.arc(centerX, centerY, radius - 4, 0, Math.PI * 2);
ctx.fill();

// Draw Vintage Camera Silhouette
ctx.fillStyle = '#C9A96E';

// Camera Body
const camW = 44;
const camH = 28;
const camX = centerX - camW / 2;
const camY = centerY - camH / 2 + 2;

// Rounded rect for camera
ctx.beginPath();
ctx.roundRect(camX, camY, camW, camH, 4);
ctx.fill();

// Camera top bump
ctx.fillRect(centerX - 8, camY - 5, 16, 6);

// Camera lens outer ring
ctx.fillStyle = '#1E130B';
ctx.beginPath();
ctx.arc(centerX, camY + camH / 2, 11, 0, Math.PI * 2);
ctx.fill();

// Camera lens inner glass
ctx.fillStyle = '#FFD700';
ctx.beginPath();
ctx.arc(centerX, camY + camH / 2, 6, 0, Math.PI * 2);
ctx.fill();

// Camera lens center pupil
ctx.fillStyle = '#1E130B';
ctx.beginPath();
ctx.arc(centerX, camY + camH / 2, 3, 0, Math.PI * 2);
ctx.fill();

// Text under Emblem: Title
ctx.fillStyle = '#3B2516';
ctx.font = 'bold 18px serif';
ctx.textAlign = 'center';
ctx.fillText('«Хранители памяти»', centerX, centerY + radius + 34);

ctx.fillStyle = '#735539';
ctx.font = 'italic 13px serif';
ctx.fillText('Реставрационная мастерская', centerX, centerY + radius + 56);

// Bottom Footer Bar
const footerY = inset + innerH - 34;
ctx.strokeStyle = '#C9A96E';
ctx.lineWidth = 1;
ctx.beginPath();
ctx.moveTo(inset + 5, footerY);
ctx.lineTo(inset + innerW - 5, footerY);
ctx.stroke();

// Bottom Text
ctx.fillStyle = '#3B2516';
ctx.font = 'bold 14px serif';
ctx.textAlign = 'left';
ctx.fillText('ОРЁЛ', inset + 16, footerY + 22);

ctx.fillStyle = '#8C6239';
ctx.font = 'bold 15px serif';
ctx.textAlign = 'right';
ctx.fillText('1 РУБ', inset + innerW - 16, footerY + 22);

// Save PNG
const outPath = path.join(__dirname, 'public', 'post', 'brand-stamp.png');
fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
console.log('Successfully generated stamp PNG at:', outPath);
