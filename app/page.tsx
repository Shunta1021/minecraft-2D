"use client";

import { useState } from "react";
import { MinecraftButton } from "@/components/ui/MinecraftButton";
import { MinecraftPanel } from "@/components/ui/MinecraftPanel";
import { ImageUploader } from "@/components/features/ImageUploader";
import { VoxelViewer } from "@/components/features/VoxelViewer";
import { convertImageToBlocks, VoxelData } from "@/lib/converter";
import { generateSchematic } from "@/lib/schematic";
import { BlockCategory } from "@/lib/blocks";
import { AdSense } from "@/components/ui/AdSense";
import { Settings, Hammer, RotateCcw, Download, Sliders, Languages } from "lucide-react";

// Translations
const T = {
  en: {
    title: "BLOCK CRAFT",
    subtitle: "2D BLUEPRINT",
    dragDrop: "Drag & Drop Image Here",
    support: "Support: PNG, JPG, WEBP",
    settings: "Settings",
    generate: "CONVERT TO BLOCKS",
    building: "Matching Colors...",
    reset: "Reset",
    download: "Download .mcfunction",
    size: "Size (Width)",
    palette: "Block Palette",
    cat_wool: "Wool",
    cat_concrete: "Concrete",
    cat_terracotta: "Terracotta",
    cat_wood: "Wood",
    cat_stone: "Stone/Bricks",
    cat_other: "Others (Glass, Ores, etc.)",
    done: "DONE",
    importHint: "* Import via 'function build' command",
    poweredBy: "Powered by High-Fidelity Color Matching (CIELAB)"
  },
  ja: {
    title: "ブロッククラフト",
    subtitle: "2D 設計図メーカー",
    dragDrop: "画像をここにドラッグ",
    support: "対応: PNG, JPG, WEBP",
    settings: "設定",
    generate: "ブロックに変換",
    building: "色を合わせています...",
    reset: "リセット",
    download: ".mcfunction を保存",
    size: "サイズ (横幅のブロック数)",
    palette: "使用するブロック",
    cat_wool: "羊毛 (Wool)",
    cat_concrete: "コンクリート (Concrete)",
    cat_terracotta: "テラコッタ (Terracotta)",
    cat_wood: "木材 (Wood)",
    cat_stone: "石・レンガ (Stone)",
    cat_other: "その他 (鉱石・ガラス等)",
    done: "完了",
    importHint: "* マイクラ内で /function build と入力して読み込み",
    poweredBy: "Powered by High-Fidelity Color Matching (CIELAB)"
  }
};

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [voxels, setVoxels] = useState<VoxelData[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [lang, setLang] = useState<'en' | 'ja'>('ja');

  // Settings State
  const [size, setSize] = useState(64);
  const [categories, setCategories] = useState<BlockCategory[]>([
    'wool', 'concrete', 'terracotta', 'wood', 'stone', 'other'
  ]);

  const t = T[lang];

  const toggleCategory = (cat: BlockCategory) => {
    if (categories.includes(cat)) {
      setCategories(categories.filter(c => c !== cat));
    } else {
      setCategories([...categories, cat]);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage) return;
    if (categories.length === 0) {
      alert("At least one block category must be selected!");
      return;
    }
    setIsGenerating(true);

    // Simulate initial delay for UX
    await new Promise(r => setTimeout(r, 100));

    try {
      const imageUrl = URL.createObjectURL(selectedImage);
      // Generate voxels with user settings
      const data = await convertImageToBlocks(imageUrl, {
        size: size,
        allowedCategories: categories
      });
      setVoxels(data);
    } catch (error) {
      console.error(error);
      alert("Error generating model.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setVoxels([]);
    setSelectedImage(null);
  };

  const handleDownload = () => {
    if (voxels.length === 0) return;

    const commands = generateSchematic(voxels);
    if (!commands) return;

    const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(commands);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "detail_2d.mcfunction");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[#221C1C]">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#4a4a4a_1px,transparent_1px)] [background-size:16px_16px]"
      />

      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-50">
        <MinecraftButton
          variant="default"
          onClick={() => setLang(lang === 'en' ? 'ja' : 'en')}
          className="px-3 py-2 text-sm flex gap-2"
        >
          <Languages className="w-4 h-4" />
          {lang === 'en' ? '日本語' : 'English'}
        </MinecraftButton>
      </div>

      <div className="max-w-4xl w-full flex flex-col gap-6 relative z-10 animate-in fade-in zoom-in duration-500">

        {/* Title Section */}
        <div className="text-center space-y-2 mb-2">
          <h1 className="text-4xl md:text-7xl font-bold text-white drop-shadow-[5px_5px_0_#1a1a1a] tracking-wider transform -rotate-2 font-pixel">
            {t.title}
            <span className="block text-2xl md:text-3xl text-[#FFFF55] drop-shadow-[2px_2px_0_#3F3F3F] mt-2 rotate-1">
              {t.subtitle}
            </span>
          </h1>
        </div>

        {/* Main Interface */}
        <MinecraftPanel className="flex flex-col gap-6 transform transition-all hover:scale-[1.005] duration-300 relative">

          {/* Settings Overlay */}
          {showSettings && (
            <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8 rounded-none animate-in fade-in zoom-in duration-200">
              <div className="bg-[#C6C6C6] border-4 border-white p-6 w-full max-w-md space-y-6 text-[#3F3F3F] shadow-2xl">
                <h2 className="text-2xl font-bold font-pixel text-center">{t.settings}</h2>

                <div className="space-y-4">
                  {/* Size Slider */}
                  <div>
                    <label className="flex justify-between text-sm font-bold mb-2">
                      <span>{t.size}</span>
                      <span>{size}px</span>
                    </label>
                    <input
                      type="range" min="16" max="150" step="16" value={size}
                      onChange={(e) => setSize(Number(e.target.value))}
                      className="w-full h-2 bg-[#555555] rounded-none appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#419E37] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
                    />
                  </div>

                  {/* Palette Checkboxes */}
                  <div className="bg-black/10 p-4 rounded-sm border border-[#555555]">
                    <label className="block text-sm font-bold mb-3">{t.palette}</label>
                    <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                      {[
                        { id: 'wool', label: t.cat_wool },
                        { id: 'concrete', label: t.cat_concrete },
                        { id: 'terracotta', label: t.cat_terracotta },
                        { id: 'wood', label: t.cat_wood },
                        { id: 'stone', label: t.cat_stone },
                        { id: 'other', label: t.cat_other },
                      ].map((cat) => (
                        <div
                          key={cat.id}
                          className="flex items-center gap-2 cursor-pointer select-none"
                          onClick={() => toggleCategory(cat.id as BlockCategory)}
                        >
                          <div className={`w-4 h-4 border-2 border-[#555555] flex items-center justify-center ${categories.includes(cat.id as BlockCategory) ? 'bg-[#419E37]' : 'bg-white'}`}>
                            {categories.includes(cat.id as BlockCategory) && <div className="w-1.5 h-1.5 bg-white" />}
                          </div>
                          <span className={categories.includes(cat.id as BlockCategory) ? 'text-black' : 'text-gray-500'}>
                            {cat.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <MinecraftButton fullWidth onClick={() => setShowSettings(false)}>
                  {t.done}
                </MinecraftButton>
              </div>
            </div>
          )}

          {voxels.length > 0 ? (
            <div className="flex flex-col gap-4 animate-in slide-in-from-bottom-10 fade-in duration-500">
              {/* Viewer (Flat) */}
              <VoxelViewer voxels={voxels} />

              <div className="grid grid-cols-2 gap-4">
                <MinecraftButton variant="default" onClick={handleReset} className="flex items-center justify-center gap-2">
                  <RotateCcw className="w-5 h-5" />
                  {t.reset}
                </MinecraftButton>
                <MinecraftButton variant="green" onClick={handleDownload} className="flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  {t.download}
                </MinecraftButton>
              </div>
              <p className="text-center text-[#727272] text-xs">
                {t.importHint}
              </p>
            </div>
          ) : (
            <>
              <ImageUploader onImageSelect={setSelectedImage} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MinecraftButton
                  variant="default"
                  onClick={() => setShowSettings(true)}
                  className="flex items-center justify-center gap-2"
                >
                  <Sliders className="w-5 h-5" />
                  {t.settings}
                </MinecraftButton>
                <MinecraftButton
                  variant="green"
                  className={`flex items-center justify-center gap-2 text-yellow-100 transition-all ${!selectedImage ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:scale-105 hover:brightness-110'}`}
                  disabled={!selectedImage || isGenerating}
                  onClick={handleGenerate}
                >
                  {isGenerating ? (
                    <span className="animate-pulse">{t.building}</span>
                  ) : (
                    <>
                      <Hammer className="w-5 h-5" />
                      {t.generate}
                    </>
                  )}
                </MinecraftButton>
              </div>
            </>
          )}

        </MinecraftPanel>

        {/* Ad Space */}
        <AdSense slot="1234567890" style={{ minHeight: "100px" }} />

        <p className="text-center text-[#727272] text-sm font-pixel">
          {t.poweredBy}
        </p>

      </div>
    </main>
  );
}
