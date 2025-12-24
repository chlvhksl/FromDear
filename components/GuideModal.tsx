'use client';

import { useState, useEffect } from 'react';

interface GuideModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function GuideModal({ isOpen, onClose }: GuideModalProps) {
    const [step, setStep] = useState(0);

    const steps = [
        {
            emoji: "🎁",
            title: "3초 만에 선물함 만들기",
            desc: "복잡한 절차는 없어요! 로그인 한 번이면\n나만의 특별한 선물함이 즉시 만들어집니다.",
            color: "bg-red-50 text-red-600"
        },
        {
            emoji: "🔗",
            title: "링크 복사해서 자랑하기",
            desc: "내 선물함 주소를 복사해서\n인스타그램 스토리나 카톡 프로필에 올려주세요.\n'나한테도 써줘!'라고 적어보면 어떨까요?",
            color: "bg-green-50 text-green-600"
        },
        {
            emoji: "💌",
            title: "익명 편지 열어보기",
            desc: "친구들의 속마음이 익명으로 도착해요.\n누가 보냈을지 상상하며 하나씩 열어보세요.\n도착한 마음들은 평생 간직할 수 있어요.",
            color: "bg-yellow-50 text-yellow-600"
        }
    ];

    useEffect(() => {
        if (isOpen) {
            setStep(0);
        }
    }, [isOpen]);

    const handleClose = () => {
        localStorage.setItem('has_seen_guide', 'true');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={handleClose}>
            <div className="bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()}>

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 transition-colors p-2"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <div className="text-center mt-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-8">
                        FromDear 200% 즐기기 ❄️
                    </h3>

                    <div className="relative min-h-[220px]">
                        {steps.map((s, idx) => (
                            <div
                                key={idx}
                                className={`absolute inset-0 transition-all duration-500 transform ${idx === step
                                    ? 'opacity-100 translate-x-0 scale-100'
                                    : idx < step
                                        ? 'opacity-0 -translate-x-full scale-90'
                                        : 'opacity-0 translate-x-full scale-90'
                                    }`}
                            >
                                <div className={`w-24 h-24 mx-auto ${s.color} rounded-full flex items-center justify-center text-5xl mb-6 shadow-sm`}>
                                    {s.emoji}
                                </div>
                                <h4 className="text-lg font-bold text-gray-800 mb-3">{s.title}</h4>
                                <p className="text-gray-500 leading-relaxed whitespace-pre-wrap">
                                    {s.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center gap-2 mb-8 mt-10">
                        {steps.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-2 rounded-full transition-all duration-300 ${idx === step ? 'w-8 bg-red-500' : 'w-2 bg-gray-200'
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            if (step < steps.length - 1) {
                                setStep(step + 1);
                            } else {
                                handleClose();
                            }
                        }}
                        className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all shadow-lg active:scale-95"
                    >
                        {step < steps.length - 1 ? '다음 >' : '시작하기!'}
                    </button>
                </div>
            </div>
        </div>
    );
}
