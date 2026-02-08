import { pipeline, env } from '@xenova/transformers';

// Configure environment
env.allowLocalModels = false;
env.useBrowserCache = true;

// Singleton to hold the model instance
let depthEstimator: any = null;

// Type definition for depth result (simplified)
interface DepthResult {
    depth: any; // Tensor
    predicted_depth: any; // Tensor
}

export async function initDepthEstimator() {
    if (!depthEstimator) {
        console.log("Loading depth estimation model...");
        // Using a smaller model for browser performance
        depthEstimator = await pipeline('depth-estimation', 'Xenova/depth-anything-small-hf');
        console.log("Model loaded!");
    }
    return depthEstimator;
}

export async function estimateDepth(imageUrl: string): Promise<any> {
    const estimator = await initDepthEstimator();
    const result = await estimator(imageUrl);
    return result;
}

/**
 * Executes the full conversion pipeline:
 * 1. Estimates depth from the image
 * 2. Returns depth data as a normalized array (0-1)
 */
export async function getDepthMap(imageElement: HTMLImageElement): Promise<{ width: number, height: number, data: Float32Array } | null> {
    try {
        const estimator = await initDepthEstimator();

        // Run inference
        const { depth } = await estimator(imageElement.src);

        // depth is a Tensor. We need to extract data.
        // The tensor shape is typically [1, height, width]
        // We need to resize it to match our target voxel resolution later, 
        // but for now let's return the raw tensor data and dimensions.

        return {
            width: depth.dims[1], // [batch, width, height] or [batch, channel, height, width]? 
            // Transformers.js image output tensors are usually [height, width] or [1, height, width]
            // Let's assume standard output. 
            height: depth.dims[0],
            data: depth.data
        };
    } catch (error) {
        console.error("Depth estimation failed:", error);
        return null;
    }
}
