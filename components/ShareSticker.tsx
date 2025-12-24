'use client';

import { forwardRef } from 'react';

interface ShareStickerProps {
    username: string;
}

const ShareSticker = forwardRef<HTMLDivElement, ShareStickerProps>(({ username }, ref) => {
    return (
        <div
            ref={ref}
            className="fixed left-[-9999px] top-0 w-[400px] h-[600px] bg-gradient-to-br from-red-50 via-white to-green-50 flex flex-col items-center text-center border-[12px] border-white rounded-[40px] overflow-hidden"
            // Inline styles to ensure html2canvas captures it correctly
            style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                boxShadow: '0 20px 60px -10px rgba(0,0,0,0.1)'
            }}
        >
            {/* CSS Pattern */}
            <div
                className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none mix-blend-multiply"
                style={{
                    backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            ></div>

            {/* Layout Container */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between items-center pt-16 pb-16">

                {/* Top Section: Main Content */}
                <div className="flex flex-col items-center justify-center flex-1">
                    <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white shadow-sm mb-6 transform -rotate-2">
                        <span className="text-7xl mb-2 block filter drop-shadow-md">🎁</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="inline-block px-5 py-2 bg-red-100 text-red-600 rounded-full text-lg font-bold mb-4 shadow-sm">
                            Happy Winter ❄️
                        </div>
                        <div className="text-center">
                            <h2 className="text-4xl font-black text-gray-900 leading-tight tracking-tight mb-3">
                                <span className="text-green-600">{username}</span>님의<br />
                                선물함입니다
                            </h2>
                            <p className="text-gray-500 text-lg font-medium">
                                익명으로 마음을 전해주세요!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Footer */}
                <div className="bg-white px-8 py-3 rounded-2xl shadow-md border border-gray-100 transform rotate-2">
                    <p className="text-gray-400 font-mono text-base font-bold tracking-widest">
                        FromDear 💌
                    </p>
                </div>
            </div>
        </div>
    );
});

ShareSticker.displayName = 'ShareSticker';

export default ShareSticker;
