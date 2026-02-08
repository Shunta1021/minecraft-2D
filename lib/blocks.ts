export type BlockCategory = 'stone' | 'wood' | 'wool' | 'concrete' | 'terracotta' | 'glass' | 'other';

export type Block = {
    id: string;
    name: string;
    color: [number, number, number]; // RGB
    category: BlockCategory;
};

// More vibrant colors gathered from texture averages
export const BLOCKS: Block[] = [
    // --- WOOL (Vibrant) ---
    { id: "minecraft:white_wool", name: "White Wool", color: [233, 236, 236], category: "wool" },
    { id: "minecraft:orange_wool", name: "Orange Wool", color: [240, 118, 19], category: "wool" },
    { id: "minecraft:magenta_wool", name: "Magenta Wool", color: [189, 68, 179], category: "wool" },
    { id: "minecraft:light_blue_wool", name: "Light Blue Wool", color: [58, 175, 217], category: "wool" },
    { id: "minecraft:yellow_wool", name: "Yellow Wool", color: [248, 197, 39], category: "wool" },
    { id: "minecraft:lime_wool", name: "Lime Wool", color: [112, 185, 25], category: "wool" },
    { id: "minecraft:pink_wool", name: "Pink Wool", color: [237, 141, 172], category: "wool" },
    { id: "minecraft:gray_wool", name: "Gray Wool", color: [62, 68, 71], category: "wool" },
    { id: "minecraft:light_gray_wool", name: "Light Gray Wool", color: [142, 142, 134], category: "wool" },
    { id: "minecraft:cyan_wool", name: "Cyan Wool", color: [21, 137, 145], category: "wool" },
    { id: "minecraft:purple_wool", name: "Purple Wool", color: [121, 42, 172], category: "wool" },
    { id: "minecraft:blue_wool", name: "Blue Wool", color: [53, 57, 157], category: "wool" },
    { id: "minecraft:brown_wool", name: "Brown Wool", color: [114, 71, 40], category: "wool" },
    { id: "minecraft:green_wool", name: "Green Wool", color: [84, 109, 27], category: "wool" },
    { id: "minecraft:red_wool", name: "Red Wool", color: [160, 39, 34], category: "wool" },
    { id: "minecraft:black_wool", name: "Black Wool", color: [20, 21, 25], category: "wool" },

    // --- CONCRETE (Most Vibrant) ---
    { id: "minecraft:white_concrete", name: "White Concrete", color: [207, 213, 214], category: "concrete" },
    { id: "minecraft:orange_concrete", name: "Orange Concrete", color: [224, 97, 1], category: "concrete" },
    { id: "minecraft:magenta_concrete", name: "Magenta Concrete", color: [169, 48, 159], category: "concrete" },
    { id: "minecraft:light_blue_concrete", name: "Light Blue Concrete", color: [35, 137, 198], category: "concrete" },
    { id: "minecraft:yellow_concrete", name: "Yellow Concrete", color: [240, 175, 21], category: "concrete" },
    { id: "minecraft:lime_concrete", name: "Lime Concrete", color: [94, 169, 24], category: "concrete" },
    { id: "minecraft:pink_concrete", name: "Pink Concrete", color: [213, 101, 142], category: "concrete" },
    { id: "minecraft:gray_concrete", name: "Gray Concrete", color: [54, 57, 61], category: "concrete" },
    { id: "minecraft:light_gray_concrete", name: "Light Gray Concrete", color: [125, 125, 115], category: "concrete" },
    { id: "minecraft:cyan_concrete", name: "Cyan Concrete", color: [21, 119, 136], category: "concrete" },
    { id: "minecraft:purple_concrete", name: "Purple Concrete", color: [100, 31, 156], category: "concrete" },
    { id: "minecraft:blue_concrete", name: "Blue Concrete", color: [44, 46, 143], category: "concrete" },
    { id: "minecraft:brown_concrete", name: "Brown Concrete", color: [96, 59, 31], category: "concrete" },
    { id: "minecraft:green_concrete", name: "Green Concrete", color: [73, 91, 36], category: "concrete" },
    { id: "minecraft:red_concrete", name: "Red Concrete", color: [142, 32, 32], category: "concrete" },
    { id: "minecraft:black_concrete", name: "Black Concrete", color: [8, 10, 15], category: "concrete" },

    // --- TERRACOTTA (Muted/Earthy) ---
    { id: "minecraft:terracotta", name: "Terracotta", color: [152, 94, 67], category: "terracotta" },
    { id: "minecraft:white_terracotta", name: "White Terracotta", color: [209, 178, 161], category: "terracotta" },
    { id: "minecraft:orange_terracotta", name: "Orange Terracotta", color: [161, 83, 37], category: "terracotta" },
    { id: "minecraft:magenta_terracotta", name: "Magenta Terracotta", color: [149, 88, 108], category: "terracotta" },
    { id: "minecraft:light_blue_terracotta", name: "Light Blue Terracotta", color: [113, 108, 137], category: "terracotta" },
    { id: "minecraft:yellow_terracotta", name: "Yellow Terracotta", color: [186, 133, 35], category: "terracotta" },
    { id: "minecraft:lime_terracotta", name: "Lime Terracotta", color: [103, 117, 52], category: "terracotta" },
    { id: "minecraft:pink_terracotta", name: "Pink Terracotta", color: [161, 78, 78], category: "terracotta" },
    { id: "minecraft:gray_terracotta", name: "Gray Terracotta", color: [57, 42, 35], category: "terracotta" },
    { id: "minecraft:light_gray_terracotta", name: "Light Gray Terracotta", color: [135, 106, 97], category: "terracotta" },
    { id: "minecraft:cyan_terracotta", name: "Cyan Terracotta", color: [86, 91, 91], category: "terracotta" },
    { id: "minecraft:purple_terracotta", name: "Purple Terracotta", color: [118, 70, 86], category: "terracotta" },
    { id: "minecraft:blue_terracotta", name: "Blue Terracotta", color: [74, 59, 91], category: "terracotta" },
    { id: "minecraft:brown_terracotta", name: "Brown Terracotta", color: [77, 51, 35], category: "terracotta" },
    { id: "minecraft:green_terracotta", name: "Green Terracotta", color: [76, 83, 42], category: "terracotta" },
    { id: "minecraft:red_terracotta", name: "Red Terracotta", color: [143, 61, 46], category: "terracotta" },
    { id: "minecraft:black_terracotta", name: "Black Terracotta", color: [37, 22, 16], category: "terracotta" },

    // --- WOOD ---
    { id: "minecraft:oak_planks", name: "Oak Planks", color: [162, 130, 78], category: "wood" },
    { id: "minecraft:spruce_planks", name: "Spruce Planks", color: [114, 84, 56], category: "wood" },
    { id: "minecraft:birch_planks", name: "Birch Planks", color: [196, 176, 118], category: "wood" },
    { id: "minecraft:jungle_planks", name: "Jungle Planks", color: [160, 115, 80], category: "wood" },
    { id: "minecraft:acacia_planks", name: "Acacia Planks", color: [168, 90, 50], category: "wood" },
    { id: "minecraft:dark_oak_planks", name: "Dark Oak Planks", color: [66, 43, 20], category: "wood" },
    { id: "minecraft:crimson_planks", name: "Crimson Planks", color: [101, 31, 52], category: "wood" },
    { id: "minecraft:warped_planks", name: "Warped Planks", color: [43, 104, 99], category: "wood" },
    { id: "minecraft:mangrove_planks", name: "Mangrove Planks", color: [118, 54, 49], category: "wood" },
    { id: "minecraft:cherry_planks", name: "Cherry Planks", color: [228, 176, 193], category: "wood" },
    { id: "minecraft:bamboo_planks", name: "Bamboo Planks", color: [235, 207, 88], category: "wood" },

    // --- STONE / NATURAL ---
    { id: "minecraft:stone", name: "Stone", color: [125, 125, 125], category: "stone" },
    { id: "minecraft:cobblestone", name: "Cobblestone", color: [80, 80, 80], category: "stone" },
    { id: "minecraft:granite", name: "Granite", color: [149, 103, 85], category: "stone" },
    { id: "minecraft:diorite", name: "Diorite", color: [188, 188, 188], category: "stone" },
    { id: "minecraft:andesite", name: "Andesite", color: [135, 136, 138], category: "stone" },
    { id: "minecraft:deepslate", name: "Deepslate", color: [77, 77, 80], category: "stone" },
    { id: "minecraft:bricks", name: "Bricks", color: [144, 97, 86], category: "stone" },
    { id: "minecraft:mud_bricks", name: "Mud Bricks", color: [138, 107, 88], category: "stone" },
    { id: "minecraft:sandstone", name: "Sandstone", color: [218, 210, 158], category: "stone" },
    { id: "minecraft:red_sandstone", name: "Red Sandstone", color: [180, 97, 36], category: "stone" },
    { id: "minecraft:nether_bricks", name: "Nether Bricks", color: [44, 21, 26], category: "stone" },
    { id: "minecraft:quartz_block", name: "Quartz Block", color: [235, 229, 222], category: "stone" },
    { id: "minecraft:prismarine", name: "Prismarine", color: [99, 156, 151], category: "stone" },
    { id: "minecraft:end_stone", name: "End Stone", color: [221, 223, 165], category: "stone" },
    { id: "minecraft:basalt", name: "Basalt", color: [80, 81, 86], category: "stone" },
    { id: "minecraft:blackstone", name: "Blackstone", color: [42, 35, 39], category: "stone" },

    // --- OTHER (Add more bright blocks) ---
    { id: "minecraft:dirt", name: "Dirt", color: [134, 96, 67], category: "other" },
    { id: "minecraft:grass_block", name: "Grass Block", color: [94, 157, 52], category: "other" },
    { id: "minecraft:sand", name: "Sand", color: [219, 211, 160], category: "other" },
    { id: "minecraft:gravel", name: "Gravel", color: [126, 124, 122], category: "other" },
    { id: "minecraft:snow_block", name: "Snow Block", color: [249, 254, 255], category: "other" },
    { id: "minecraft:ice", name: "Ice", color: [144, 170, 250], category: "other" },
    { id: "minecraft:obsidian", name: "Obsidian", color: [20, 18, 29], category: "other" },
    { id: "minecraft:glowstone", name: "Glowstone", color: [244, 213, 115], category: "other" },
    { id: "minecraft:sea_lantern", name: "Sea Lantern", color: [172, 199, 190], category: "other" },
    { id: "minecraft:gold_block", name: "Gold Block", color: [246, 208, 61], category: "other" },
    { id: "minecraft:iron_block", name: "Iron Block", color: [220, 220, 220], category: "other" },
    { id: "minecraft:diamond_block", name: "Diamond Block", color: [94, 230, 225], category: "other" },
    { id: "minecraft:emerald_block", name: "Emerald Block", color: [30, 210, 90], category: "other" },
    { id: "minecraft:lapis_block", name: "Lapis Block", color: [38, 67, 137], category: "other" },
    { id: "minecraft:redstone_block", name: "Redstone Block", color: [148, 20, 0], category: "other" },
    { id: "minecraft:coal_block", name: "Coal Block", color: [19, 19, 19], category: "other" },
];
