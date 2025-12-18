"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Sidebar from '@/components/demo/Sidebar';
import Canvas from '@/components/demo/Canvas';
import Inspector from '@/components/demo/Inspector';
import LessonsView from '@/components/demo/views/LessonsView';
import AssetsView from '@/components/demo/views/AssetsView';
import TraineesView from '@/components/demo/views/TraineesView';
import SettingsView from '@/components/demo/views/SettingsView';
import SafetyModuleCanvas from '@/components/demo/SafetyModuleCanva_AIPreview';

function DemoContent() {
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState('modules');

    useEffect(() => {
        const view = searchParams.get('view');
        if (view) {
            setActiveTab(view);
        }
    }, [searchParams]);

    return (
        <div className="flex h-screen bg-slate-950 text-white overflow-hidden font-sans">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            {activeTab === 'modules' && (
                <>
                    <SafetyModuleCanvas />
                </>
            )}

            {activeTab === 'lessons' && <LessonsView />}
            {activeTab === 'assets' && <AssetsView />}
            {activeTab === 'Trainees' && <TraineesView />}
            {activeTab === 'settings' && <SettingsView />}
        </div>
    );
}

export default function DemoPage() {
    return (
        <Suspense fallback={<div className="flex h-screen bg-slate-950 text-white items-center justify-center">Loading...</div>}>
            <DemoContent />
        </Suspense>
    );
}
