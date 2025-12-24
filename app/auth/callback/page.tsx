'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
    const router = useRouter();
    // Prevent double processing
    const [processed, setProcessed] = useState(false);

    useEffect(() => {
        if (processed) return;

        const handleSession = async (session: any) => {
            if (!session) return;
            // Prevent multiple calls
            setProcessed(true);

            // Check if user has profile
            const { data: profile } = await supabase
                .from('users')
                .select('*')
                .eq('id', session.user.id)
                .single();

            if (profile) {
                router.replace('/dashboard');
            } else {
                router.replace('/onboarding');
            }
        };

        const initAuth = async () => {
            // 1. Check immediately
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                await handleSession(session);
                return;
            }

            // 2. Listen for changes if no session yet
            const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
                if (event === 'SIGNED_IN' && session) {
                    await handleSession(session);
                } else if (event === 'SIGNED_OUT') {
                    router.replace('/auth');
                }
            });

            return () => {
                subscription.unsubscribe();
            };
        };

        initAuth();
    }, [router, processed]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                <p className="text-gray-500">로그인 처리 중입니다...</p>
            </div>
        </div>
    );
}
