import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'FromDear - 익명 선물함';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #FEF2F2, #FFF1F2)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        fontSize: 100,
                        marginBottom: 20,
                    }}
                >
                    🎁
                </div>
                <div
                    style={{
                        fontSize: 60,
                        fontWeight: 'bold',
                        background: 'linear-gradient(to right, #DC2626, #DB2777)',
                        backgroundClip: 'text',
                        color: 'transparent',
                        marginBottom: 10,
                    }}
                >
                    FromDear
                </div>
                <div
                    style={{
                        fontSize: 30,
                        color: '#4B5563',
                        fontWeight: '500',
                    }}
                >
                    마음을 전하는 따뜻한 익명 선물함
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
