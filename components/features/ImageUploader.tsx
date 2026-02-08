"use client";

import { useState, useCallback } from "react";
import { UploadCloud, Image as ImageIcon, X } from "lucide-react";
import { MinecraftButton } from "../ui/MinecraftButton";
import { twMerge } from "tailwind-merge";

interface ImageUploaderProps {
    onImageSelect: (file: File) => void;
}

export function ImageUploader({ onImageSelect }: ImageUploaderProps) {
    const [dragActive, setDragActive] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    const processFile = (file: File) => {
        if (!file.type.startsWith("image/")) {
            alert("Please upload an image file!");
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target?.result as string);
            onImageSelect(file);
        };
        reader.readAsDataURL(file);
    };

    const clearImage = () => {
        setPreview(null);
    };

    if (preview) {
        return (
            <div className="w-full flex flex-col items-center gap-4">
                <div className="relative w-full aspect-video bg-black/40 border-4 border-[#555555] flex items-center justify-center overflow-hidden group">
                    <img src={preview} alt="Preview" className="max-w-full max-h-full object-contain pixelated" />
                    <button
                        onClick={clearImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-sm border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-[#C6C6C6] text-sm">Image ready for processing</p>
            </div>
        );
    }

    return (
        <div
            className={twMerge(
                "w-full h-80 border-4 border-dashed relative flex flex-col items-center justify-center p-8 text-center transition-colors group",
                dragActive ? "border-white bg-white/10" : "border-[#727272] bg-black/20 hover:bg-black/30"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleChange}
                accept="image/*"
            />
            <UploadCloud className={twMerge("w-20 h-20 mb-6 transition-transform text-[#C6C6C6]", dragActive && "scale-110 text-white")} />
            <p className="text-2xl mb-2 text-white drop-shadow-md">
                {dragActive ? "Drop it!" : "Drag & Drop Image Here"}
            </p>
            <p className="text-[#C6C6C6]">Support: PNG, JPG, WEBP</p>
        </div>
    );
}
