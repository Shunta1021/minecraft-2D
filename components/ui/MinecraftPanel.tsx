import { twMerge } from 'tailwind-merge';

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function MinecraftPanel({ children, className, ...props }: PanelProps) {
    return (
        <div
            className={twMerge(
                "bg-[#C6C6C6] border-4 border-t-white border-l-white border-b-[#555555] border-r-[#555555] p-6 text-[#3F3F3F] shadow-lg relative",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
