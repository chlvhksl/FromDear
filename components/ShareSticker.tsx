'use client';

import { forwardRef } from 'react';

interface ShareStickerProps {
    username: string;
}

const ShareSticker = forwardRef<HTMLDivElement, ShareStickerProps>(({ username }, ref) => {
    return (
        <div
            ref={ref}
            className="fixed left-[-9999px] top-0 w-[400px] h-[600px] bg-gradient-to-br from-red-50 via-white to-green-50 p-8 flex flex-col items-center justify-center text-center border-[12px] border-white rounded-[40px]"
            // Inline styles to ensure html2canvas captures it correctly
            style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                boxShadow: '0 20px 60px -10px rgba(0,0,0,0.1)'
            }}
        >
            {/* CSS Pattern instead of external image */}
            <div
                className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none mix-blend-multiply"
                style={{
                    backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            ></div>

            <div className="relative z-10 bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-white shadow-sm mb-8 transform -rotate-2">
                <span className="text-8xl mb-4 block filter drop-shadow-md">🎁</span>
            </div>

            <div className="relative z-10 space-y-2">
                <div className="inline-block px-4 py-1 bg-red-100 text-red-600 rounded-full text-lg font-bold mb-2">
                    Happy Winter ❄️
                </div>
                <h2 className="text-4xl font-black text-gray-900 leading-tight">
                    <span className="text-green-600">{username}</span>님의<br />
                    선물함입니다
                </h2>
                <p className="text-gray-500 text-xl font-medium mt-4">
                    익명으로 마음을 전해주세요!
                </p>
            </div>

            <div className="mt-12 relative z-10 bg-white px-6 py-3 rounded-xl shadow-md border border-gray-100 transform rotate-2">
                <p className="text-gray-400 font-mono text-sm">
                    FromDear 💌
                </p>
            </div>
        </div>
    );
});

ShareSticker.displayName = 'ShareSticker';

export default ShareSticker;
