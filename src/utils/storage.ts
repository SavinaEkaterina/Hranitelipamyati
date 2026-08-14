/**
 * Image Compression Utility
 * Downscales large images to max dimension (e.g. 1600px) and compresses to JPEG (quality 0.82).
 * Converts multi-megabyte user uploads into lightweight ~150-300KB data URLs for order attachments without visible quality loss.
 */
export async function compressImage(
  input: File | string,
  maxDimension = 1600,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    const processDataUrl = (dataUrl: string) => {
      // If it's already small or not an image data URL, return directly
      if (!dataUrl || (!dataUrl.startsWith('data:image/') && !dataUrl.startsWith('data:application/'))) {
        resolve(dataUrl);
        return;
      }

      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        let { width, height } = img;

        // Check if downscaling is required
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl); // Fallback to raw if canvas context fails
          return;
        }

        // Draw and compress to JPEG
        ctx.drawImage(img, 0, 0, width, height);
        try {
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        } catch (err) {
          console.warn('Canvas toDataURL failed, using original data URL:', err);
          resolve(dataUrl);
        }
      };

      img.onerror = (err) => {
        console.warn('Failed to load image for compression, using original data:', err);
        resolve(dataUrl);
      };

      img.src = dataUrl;
    };

    if (input instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          processDataUrl(result);
        } else {
          reject(new Error('FileReader result empty'));
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(input);
    } else if (typeof input === 'string') {
      processDataUrl(input);
    } else {
      reject(new Error('Invalid input for compressImage'));
    }
  });
}
