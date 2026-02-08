
export function generateSchematic(voxels: { x: number, y: number, z: number, blockId: string }[]) {
    if (voxels.length === 0) return null;

    // 1. Calculate dimensions to normalize
    let minX = Infinity, minY = Infinity;

    // We only care about X and Y for 2D mode, Z is always 0 in local space
    voxels.forEach(v => {
        minX = Math.min(minX, v.x);
        minY = Math.min(minY, v.y);
    });

    // 2. Generate commands
    // We want the structure to be "Standing Up" on the ground.
    // Relative to player (~ ~ ~):
    // X axis (Left/Right) -> ~X
    // Y axis (Up/Down) -> ~Y
    // Z axis (Forward) -> ~3 (Fixed distance in front)

    let commands = "";

    voxels.forEach(v => {
        // v.x and v.y are already centered/adjusted in converter.ts?
        // In converter.ts:
        // x: centered around 0 (-width/2 to +width/2)
        // y: (height - y) -> 0 to height (bottom to top)

        // So we just use them directly.
        // We might want to offset Y so it starts at the feet (which is ~0)
        // If v.y goes from 0 to height, that's perfect.

        const relX = Math.round(v.x);
        const relY = Math.round(v.y);
        const relZ = 5; // Place 5 blocks in front

        // Command: setblock ~X ~Y ~Z block
        commands += `setblock ~${relX} ~${relY} ~${relZ} ${v.blockId}\n`;
    });

    return commands;
}
