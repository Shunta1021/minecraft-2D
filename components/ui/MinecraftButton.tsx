import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "green" | "red";
    fullWidth?: boolean;
}

export function MinecraftButton({
    children,
    className,
    variant = "default",
    fullWidth = false,
    ...props
}: ButtonProps) {
    const baseStyles =
        "px-6 py-3 font-pixel text-white text-lg relative active:top-[2px] active:shadow-none outline-none focus:ring-2 focus:ring-white/50";

    // Custom borders for blocky 3D effect
    const borderStyles = "border-2 border-b-4";

    const variants = {
        default: "bg-[#727272] border-t-[#8B8B8B] border-l-[#8B8B8B] border-r-[#3F3F3F] border-b-[#3F3F3F] hover:bg-[#8B8B8B] text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)]",
        green: "bg-[#419E37] border-t-[#6AD15E] border-l-[#6AD15E] border-r-[#1D4D15] border-b-[#1D4D15] hover:bg-[#5CB552] text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)]",
        red: "bg-[#FF0000] border-t-[#FF6666] border-l-[#FF6666] border-r-[#990000] border-b-[#990000] hover:bg-[#FF3333] text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)]",
    };

    return (
        <button
            className={twMerge(
                baseStyles,
                borderStyles,
                variants[variant],
                fullWidth && "w-full",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
