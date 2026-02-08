"use client";

import { useEffect } from "react";

type AdSenseProps = {
    client?: string;
    slot?: string;
    format?: string;
    responsive?: boolean;
    style?: React.CSSProperties;
};

export function AdSense({
    client = "ca-pub-XXXXXXXXXXXXXXXX", // Default placeholder
    slot = "0000000000",
    format = "auto",
    responsive = true,
    style = { display: "block" },
}: AdSenseProps) {
    const isDev = process.env.NODE_ENV === "development";

    useEffect(() => {
        if (isDev) return;
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense error", e);
        }
    }, [isDev]);

    if (isDev) {
        return (
            <div
                className="bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-500 font-minecraft text-sm p-4 w-full my-4"
                style={{ minHeight: "250px", ...style }}
            >
                [広告スペース (開発モード)]<br />
                AdSense Slot: {slot}
            </div>
        );
    }

    return (
        <div className="my-4 w-full overflow-hidden">
            <ins
                className="adsbygoogle"
                style={style}
                data-ad-client={client}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive ? "true" : "false"}
            />
        </div>
    );
}
