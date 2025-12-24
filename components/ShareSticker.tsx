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

            <div className="flex-1 flex flex-col items-center justify-center w-full pt-8 pb-4">
                <div className="relative z-10 bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white shadow-sm mb-6 transform -rotate-2">
                    <span className="text-7xl mb-2 block filter drop-shadow-md">🎁</span>
                </div>

                <div className="relative z-10 space-y-3">
                    <div className="inline-block px-5 py-2 bg-red-100 text-red-600 rounded-full text-lg font-bold mb-1 shadow-sm">
                        Happy Winter ❄️
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 leading-tight tracking-tight">
                        <span className="text-green-600">{username}</span>님의<br />
                        선물함입니다
                    </h2>
                    <p className="text-gray-500 text-lg font-medium mt-3">
                        익명으로 마음을 전해주세요!
                    </p>
                </div>
            </div>

            <div className="relative z-10 bg-white px-8 py-3 rounded-2xl shadow-md border border-gray-100 transform rotate-2 mb-10">
                <p className="text-gray-400 font-mono text-base font-bold tracking-widest">
                    FromDear 💌
                </p>
            </div>
        </div>
    );
});

ShareSticker.displayName = 'ShareSticker';

export default ShareSticker;
