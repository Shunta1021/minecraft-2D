import { BLOCKS, Block, BlockCategory } from './blocks';

export type VoxelData = {
    x: number;
    y: number;
    z: number;
    blockId: string;
    color: [number, number, number];
};

export type ConversionOptions = {
    size: number;
    allowedCategories: BlockCategory[];
};

// --- Color Utils (CIELAB) ---

function rgbToLab(rgb: [number, number, number]): [number, number, number] {
    let r = rgb[0] / 255;
    let g = rgb[1] / 255;
    let b = rgb[2] / 255;

    r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

    let x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    let y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
    let z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

    x = (x > 0.008856) ? Math.pow(x, 1 / 3) : (7.787 * x) + 16 / 116;
    y = (y > 0.008856) ? Math.pow(y, 1 / 3) : (7.787 * y) + 16 / 116;
    z = (z > 0.008856) ? Math.pow(z, 1 / 3) : (7.787 * z) + 16 / 116;

    return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)];
}

function deltaE(labA: [number, number, number], labB: [number, number, number]): number {
    const dL = labA[0] - labB[0];
    const dA = labA[1] - labB[1];
    const dB = labA[2] - labB[2];
    return Math.sqrt(dL * dL + dA * dA + dB * dB);
}

// Boost saturation to match vibrant Minecraft blocks
function boostSaturation(r: number, g: number, b: number, factor: number): [number, number, number] {
    const avg = (r + g + b) / 3;
    const nr = avg + (r - avg) * factor;
    const ng = avg + (g - avg) * factor;
    const nb = avg + (b - avg) * factor;
    return [
        Math.min(255, Math.max(0, nr)),
        Math.min(255, Math.max(0, ng)),
        Math.min(255, Math.max(0, nb))
    ];
}

let CACHED_BLOCK_LABS: { block: Block, lab: [number, number, number] }[] | null = null;

function getCachedBlockLabs(allowedCategories: BlockCategory[]) {
    if (!CACHED_BLOCK_LABS) {
        CACHED_BLOCK_LABS = BLOCKS.map(b => ({
            block: b,
            lab: rgbToLab(b.color)
        }));
    }

    if (!allowedCategories || allowedCategories.length === 0) return CACHED_BLOCK_LABS;

    return CACHED_BLOCK_LABS.filter(item =>
        allowedCategories.includes(item.block.category)
    );
}

function findClosestBlockLab(
    r: number, g: number, b: number,
    candidates: { block: Block, lab: [number, number, number] }[]
): Block {
    const targetLab = rgbToLab([r, g, b]);

    // Safety check
    const activeCandidates = (!candidates || candidates.length === 0)
        ? BLOCKS.map(b => ({ block: b, lab: rgbToLab(b.color) }))
        : candidates;

    let minDiff = Infinity;
    let closest = activeCandidates[0].block;

    for (const candidate of activeCandidates) {
        const diff = deltaE(targetLab, candidate.lab);
        if (diff < minDiff) {
            minDiff = diff;
            closest = candidate.block;
        }
    }
    return closest;
}


export async function convertImageToBlocks(
    imageUrl: string,
    options: ConversionOptions
): Promise<VoxelData[]> {
    return new Promise(async (resolve, reject) => {
        try {
            const img = new Image();
            img.crossOrigin = "Anonymous";

            const imageLoadPromise = new Promise<HTMLImageElement>((res, rej) => {
                img.onload = () => res(img);
                img.onerror = rej;
                img.src = imageUrl;
            });

            const loadedImg = await imageLoadPromise;

            // Prepare Canvas (Pixelated for crispness)
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error("Canvas context not found");

            let width = options.size;
            let height = options.size;
            const aspect = loadedImg.width / loadedImg.height;

            if (aspect > 1) {
                height = Math.round(width / aspect);
            } else {
                width = Math.round(height * aspect);
            }

            canvas.width = width;
            canvas.height = height;

            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(loadedImg, 0, 0, width, height);

            const imageData = ctx.getImageData(0, 0, width, height);
            const pixels = imageData.data;

            // Get Valid Blocks (Force re-eval if options changed)
            const candidates = getCachedBlockLabs(options.allowedCategories);

            const voxels: VoxelData[] = [];

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const index = (y * width + x) * 4;
                    let r = pixels[index];
                    let g = pixels[index + 1];
                    let b = pixels[index + 2];
                    const a = pixels[index + 3];

                    if (a < 128) continue;

                    // --- SATURATION BOOST ---
                    // Minecraft blocks are vibrant. Source images often have lighting/shading.
                    // Boosting saturation helps find "pure" block colors (like Lime Concrete)
                    const boosted = boostSaturation(r, g, b, 1.4); // 1.4x saturation
                    r = boosted[0];
                    g = boosted[1];
                    b = boosted[2];

                    const block = findClosestBlockLab(r, g, b, candidates);

                    // "Wall" Mode:
                    // X: Centered (-width/2 .. +width/2)
                    // Y: From Bottom(0) to Top(height)
                    const posX = x - Math.floor(width / 2);
                    const posY = (height - y);

                    voxels.push({
                        x: posX,
                        y: posY,
                        z: 0,
                        blockId: block.id,
                        color: block.color
                    });
                }
            }

            resolve(voxels);

        } catch (err) {
            reject(err);
        }
    });
}
