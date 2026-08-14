import type { SyntheticEvent } from 'react';
import publicManifest from './publicManifest.json';

// Extension priority order
const EXTENSIONS = ['.webp', '.jpg', '.jpeg', '.png', '.mp4'];
const cache: Record<string, string> = {};

// Build an in-memory set of all existing static public files
const KNOWN_FILES = new Set<string>(publicManifest as string[]);

/**
 * Checks if a file exists in our in-memory set of public files without any network requests.
 */
function fileExists(url: string): boolean {
  if (KNOWN_FILES.size > 0) {
    return KNOWN_FILES.has(url);
  }
  return true;
}

/**
 * Generates candidate base paths to handle potential folder structure aliases.
 */
function getBasePathCandidates(basePath: string): string[] {
  const candidates = [basePath];
  if (basePath.startsWith('/stories/')) {
    candidates.push('/hero/images/stories/' + basePath.slice(9));
    candidates.push('/stories/' + basePath.slice(9));
  } else if (basePath.startsWith('/hero/') && !basePath.startsWith('/hero/images/')) {
    candidates.push('/hero/images/' + basePath.slice(6));
  } else if (basePath.startsWith('/gallery/') && !basePath.startsWith('/gallery/before/') && !basePath.startsWith('/gallery/after/')) {
    candidates.push('/gallery/before/' + basePath.slice(9));
    candidates.push('/gallery/after/' + basePath.slice(9));
    candidates.push('/examples/' + basePath.slice(9));
    candidates.push('/exhibition/' + basePath.slice(9));
  }
  return candidates;
}

/**
 * Resolves an image path directly from the public directory.
 */
export function getImageUrl(path: string | undefined | null): string {
  if (!path) return '';

  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }

  if (cache[path]) {
    return cache[path];
  }

  let normalized = path.trim();
  if (normalized.startsWith('/public')) {
    normalized = normalized.slice(7);
  }
  if (!normalized.startsWith('/')) {
    normalized = '/' + normalized;
  }

  // If path already points directly to an existing file in public
  if (KNOWN_FILES.has(normalized)) {
    cache[path] = normalized;
    return normalized;
  }

  // Check if original path had an extension
  const lastDot = normalized.lastIndexOf('.');
  const lastSlash = normalized.lastIndexOf('/');
  const hasExtension = lastDot > lastSlash && lastDot !== -1;

  let basePath = normalized;
  if (hasExtension) {
    basePath = normalized.slice(0, lastDot);
  }

  const baseCandidates = getBasePathCandidates(basePath);

  // Check extensions in priority order: .webp -> .jpg -> .jpeg -> .png -> .mp4
  for (const candidate of baseCandidates) {
    for (const ext of EXTENSIONS) {
      const targetUrl = candidate + ext;
      if (KNOWN_FILES.has(targetUrl)) {
        cache[path] = targetUrl;
        return targetUrl;
      }
    }
  }

  // Fallback if file not found in KNOWN_FILES:
  // If an extension was explicitly provided, respect it; otherwise append .webp
  const fallback = hasExtension ? normalized : (basePath.endsWith('.webp') ? basePath : basePath + '.webp');
  cache[path] = fallback;
  return fallback;
}

/**
 * Runtime error handler for <img> elements as additional fallback.
 */
export function handleImageError(
  e: SyntheticEvent<HTMLImageElement, Event>
) {
  const target = e.currentTarget;
  const currentSrc = target.src;

  const triedCount = parseInt(target.dataset.triedExtCount || '0', 10);
  if (triedCount >= EXTENSIONS.length) {
    return;
  }

  try {
    const urlObj = new URL(currentSrc);
    const pathname = urlObj.pathname;
    const lastDot = pathname.lastIndexOf('.');
    const lastSlash = pathname.lastIndexOf('/');

    if (lastDot > lastSlash && lastDot !== -1) {
      const basePath = pathname.slice(0, lastDot);
      const nextExt = EXTENSIONS[triedCount];
      target.dataset.triedExtCount = String(triedCount + 1);
      target.src = urlObj.origin + basePath + nextExt;
    }
  } catch {
    // ignore
  }
}

