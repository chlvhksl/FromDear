import { ImageResponse } from 'next/og';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';

export const alt = 'FromDear Christmas Gift Box';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: { link_id: string } }) {
    // Initialize Supabase client directly for Edge runtime
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Fetch username
    const { data: user } = await supabase
        .from('users')
        .select('username')
        .eq('link_id', params.link_id)
        .single();

    const username = user?.username || '익명';

    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #fee2e2, #ffffff, #dcfce7)', // red-50 to green-50ish
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    position: 'relative',
                }}
            >
                {/* Background Snowflake Decorations (Simple Circles for now as SVG complexity is high) */}
                <div style={{ position: 'absolute', top: 50, left: 50, fontSize: 60 }}>❄️</div>
                <div style={{ position: 'absolute', bottom: 50, right: 50, fontSize: 60 }}>🎄</div>
                <div style={{ position: 'absolute', top: 50, right: 50, fontSize: 60 }}>✨</div>
                <div style={{ position: 'absolute', bottom: 50, left: 50, fontSize: 60 }}>☃️</div>

                <div style={{ fontSize: 100, marginBottom: 40 }}>
                    🎁
                </div>

                <div
                    style={{
                        fontSize: 60,
                        fontWeight: 'bold',
                        color: '#1f2937', // gray-800
                        textAlign: 'center',
                        marginBottom: 20,
                        padding: '0 40px',
                        lineHeight: 1.2,
                    }}
                >
                    {username}님의
                </div>

                <div
                    style={{
                        fontSize: 50,
                        fontWeight: 'normal',
                        color: '#dc2626', // red-600
                        textAlign: 'center',
                    }}
                >
                    크리스마스 선물 상자
                </div>

                <div
                    style={{
                        position: 'absolute',
                        bottom: 40,
                        fontSize: 24,
                        color: '#6b7280',
                        fontWeight: 'normal',
                    }}
                >
                    FromDear
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
