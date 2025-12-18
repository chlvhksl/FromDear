'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import GiftBoxClient from './GiftBoxClient';

function BoxContent() {
    const searchParams = useSearchParams();
    const link_id = searchParams.get('id') || '';

    if (!link_id) {
        return <div className="min-h-screen flex items-center justify-center">잘못된 접근입니다.</div>;
    }

    // Wrap in params object to match GiftBoxClient's expected props
    return <GiftBoxClient params={{ link_id }} />;
}

export default function Page() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">로딩 중...</div>}>
            <BoxContent />
        </Suspense>
    );
}
