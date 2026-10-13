// Shared limits for images committed to the repository.
// Originals (e.g. 40 MB camera files) are never committed — they are downscaled
// with `npm run images` into src/assets/images, and Astro builds the final
// display sizes from those at build time.

/** Longest edge for committed source images. 2x a full-width 1280px layout, leaving room to scale up. */
export const MAX_EDGE = 2560;

/** Hard limits enforced by `npm run check:images` (CI fails above these). */
export const MAX_COMMITTED_EDGE = 3000;
export const MAX_COMMITTED_BYTES = 2 * 1024 * 1024; // 2 MB

/** Images in public/ are served as-is (no optimisation), so keep them small. */
export const MAX_PUBLIC_BYTES = 300 * 1024; // 300 KB

export const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.tif', '.tiff', '.heic', '.heif'];

/** Where originals go. This folder is git-ignored. */
export const ORIGINALS_DIR = 'images-originals';
/** Where the downscaled, committed copies go. */
export const OUTPUT_DIR = 'src/assets/images';
