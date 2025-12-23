'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

function MessageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const link_id = searchParams.get('id');

    const [content, setContent] = useState('');
    const [senderName, setSenderName] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (!link_id) return;

        const fetchUser = async () => {
            const { data: profile } = await supabase
                .from('users')
                .select('*')
                .eq('link_id', link_id)
                .single();

            if (profile) {
                setUser(profile);
            }
        };
        fetchUser();
    }, [link_id]);

    // ==========================================
    // ENHANCED LOCAL ANALYSIS LOGIC (FALLBACK)
    // ==========================================
    const analyzeLocally = (text: string) => {
        // 1. Expanded Keyword Dictionary
        const keywords: Record<string, string[]> = {
            "사랑 ❤️": ["사랑", "love", "러브", "좋아", "하트", "heart", "아껴", "소중", "평생", "영원", "내꺼", "예뻐", "멋져", "쪽", "알라뷰"],
            "감동 🥹": ["고마", "감사", "땡큐", "thanks", "덕분", "감동", "눈물", "울컥", "찐심", "진심", "잊지"],
            "응원 💪": ["화이팅", "파이팅", "힘내", "응원", "할수있어", "믿어", "대박", "가즈아", "성공", "합격", "잘될", "포기하지마"],
            "축하 🎉": ["축하", "메리", "해피", "happy", "merry", "겨울", "winter", "크리스마스", "성탄", "산타", "선물", "파티", "종강", "방학", "새해"],
            "설렘 💓": ["기대", "두근", "설레", "보고싶", "만나", "데이트", "준비", "떨려", "빨리", "기다려"],
            "위로 ☕️": ["수고", "고생", "괜찮", "토닥", "따뜻", "건강", "감기", "조심", "밥", "휴식", "힐링", "걱정마"],
            "유머 ㅋ": ["ㅋㅋ", "ㅎㅎ", "빵터", "재미", "웃겨", "센스", "꿀잼", "장난", "드립"]
        };

        // 2. Calculate Base Scores
        let scores: Record<string, number> = {};
        for (const emotion of Object.keys(keywords)) { scores[emotion] = 0; }

        for (const [emotion, wordList] of Object.entries(keywords)) {
            for (const word of wordList) {
                if (text.includes(word)) {
                    scores[emotion] += 15;
                }
            }
        }

        // 3. Add Magic Ingredients (Random Flavor)
        if (Object.values(scores).reduce((a, b) => a + b, 0) === 0) {
            scores["따뜻한 마음 🔥"] = 50;
        }

        const magicIngredients = [
            "크리스마스 마법 🪄", "눈오는 날의 추억 ☃️", "100% 진심 💝",
            "붕어빵의 온기 🥖", "새해 복 🧧", "산타의 실수 🎅"
        ];
        const randomMagic = magicIngredients[Math.floor(Math.random() * magicIngredients.length)];
        scores[randomMagic] = 10;

        // 4. Sort and Pick Top 4
        const sorted = Object.entries(scores)
            .filter(([_, score]) => score > 0)
            .sort((a, b) => b[1] - a[1])
            .map(([emo, score]) => [emo, score + Math.floor(Math.random() * 5)] as [string, number]);

        let finalPicks = sorted.slice(0, 4);

        // 5. Normalize to 100%
        const totalScore = finalPicks.reduce((sum, [_, score]) => sum + score, 0);
        const result: Record<string, number> = {};

        if (totalScore > 0) {
            let currentSum = 0;
            finalPicks.forEach(([emo, score], index) => {
                const percent = index === finalPicks.length - 1
                    ? 100 - currentSum
                    : Math.round((score / totalScore) * 100);
                result[emo] = percent;
                currentSum += percent;
            });
        } else {
            result["따뜻한 마음 🔥"] = 100;
        }

        return result;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || loading) return;
        setLoading(true);

        try {
            // 1. Analyze Emotion via AI (Try API -> Fallback to Local)
            let emotionAnalysis = null;
            try {
                // Short timeout for API to avoid waiting too long
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 3000);

                const aiResponse = await fetch('https://vlydnlmwwhofsksikaeh.supabase.co/functions/v1/analyze-emotion', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
                    },
                    body: JSON.stringify({ message: content }),
                    signal: controller.signal
                });
                clearTimeout(timeoutId);

                if (aiResponse.ok) {
                    emotionAnalysis = await aiResponse.json();
                } else {
                    throw new Error('API failed');
                }
            } catch (err) {
                console.warn('AI Analysis failed, using enhanced local analysis', err);
                emotionAnalysis = analyzeLocally(content);
            }

            // If API returned null/empty for some reason, ensure fallback
            if (!emotionAnalysis || Object.keys(emotionAnalysis).length === 0) {
                emotionAnalysis = analyzeLocally(content);
            }

            // 2. Save Message with Analysis
            const { error } = await supabase.from('messages').insert({
                user_id: user.id,
                content,
                sender_name: senderName || '익명',
                is_opened: false,
                emotion_analysis: emotionAnalysis // Save AI result
            });

            if (error) throw error;

            // Success: Switch to success view instead of alert
            setIsSubmitted(true);

        } catch (error: any) {
            console.error('Message Send Error:', error);
            alert(`선물 전송에 실패했어요 😢\n오류 내용: ${error.message || JSON.stringify(error)}`);
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <div className="min-h-screen flex items-center justify-center">로딩 중...</div>;

    if (isSubmitted) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50 py-10 px-4 flex items-center justify-center">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 border-2 border-green-100 text-center">
                    <div className="text-6xl mb-6 animate-bounce">🎁</div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        선물 배달 완료!
                    </h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        {user.username}님에게 마음을<br />
                        성공적으로 전달했어요.
                    </p>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => window.location.href = `/box?id=${link_id}`}
                            className="w-full py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            친구 선물함으로 돌아가기
                        </button>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="w-full py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            나도 선물함 만들기 🎁
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50 py-10 px-4">
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 border-2 border-red-100">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {user.username}님에게 마음 선물하기 🎁
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm">
                        따뜻한 겨울 인사를 남겨주세요.<br />
                        친구에게 바로 배달됩니다.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            보내는 사람 (선택)
                        </label>
                        <input
                            type="text"
                            value={senderName}
                            onChange={(e) => setSenderName(e.target.value)}
                            placeholder="익명 (비워두면 익명으로 전달돼요)"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                            maxLength={20}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            메시지 내용
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            placeholder="여기에 소중한 마음을 담아주세요..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all h-40 resize-none"
                            maxLength={500}
                        />
                        <div className="text-right text-xs text-gray-400 mt-1">
                            {content.length}/500
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-red-500 to-green-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50"
                    >
                        {loading ? '선물 포장 중... 🎁' : '선물 보내기 🎁'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link href={`/box?id=${link_id}`} className="text-sm text-gray-500 hover:text-gray-700">
                        취소하고 돌아가기
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default function MessagePage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">로딩 중...</div>}>
            <MessageContent />
        </Suspense>
    );
}
