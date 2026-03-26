'use client';

import { useState, useEffect } from 'react';

export default function ShutdownNotice() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasSeen = localStorage.getItem('fromdear_shutdown_notice_seen');
        if (!hasSeen) {
            setIsOpen(true);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem('fromdear_shutdown_notice_seen', 'true');
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-500">
            <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] w-full max-w-md p-10 shadow-2xl relative overflow-hidden border border-white/20 animate-in zoom-in-95 duration-500">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-40 h-40 bg-red-100/50 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-40 h-40 bg-green-100/50 rounded-full blur-3xl"></div>

                <div className="relative z-10 text-center">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-50 to-red-100 rounded-3xl flex items-center justify-center text-4xl mb-8 shadow-inner">
                        🎁
                    </div>

                    <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">
                        FromDear 서비스 종료 안내
                    </h3>

                    <div className="space-y-4 text-gray-600 leading-relaxed break-keep font-medium">
                        <p>
                            그동안 FromDear를 아끼고 사랑해 주신 모든 분들께 진심으로 감사드립니다.
                        </p>
                        <p className="bg-red-50/50 p-4 rounded-2xl border border-red-100/50 text-red-700">
                            아쉽게도 FromDear 서비스는 <br />
                            <span className="font-bold text-lg underline decoration-wavy decoration-red-200 underline-offset-4">
                                2026년 4월 1일(수)
                            </span>
                            을 기점으로 종료될 예정입니다.
                        </p>
                        <p className="text-sm">
                            서비스 종료 전까지 소중한 마음들을 꼭 확인해 주시기 바랍니다. 여러분과 함께한 모든 순간이 선물 같았습니다.
                        </p>
                    </div>

                    <div className="mt-10">
                        <button
                            onClick={handleClose}
                            className="w-full py-5 bg-gray-900 text-white font-black rounded-2xl hover:bg-black transition-all shadow-[0_10px_20px_rgba(0,0,0,0.2)] active:scale-[0.98] hover:shadow-none"
                        >
                            확인했습니다
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
