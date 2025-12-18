"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Sidebar from '@/components/demo/Sidebar';
import Canvas from '@/components/demo/Canvas';
import Inspector from '@/components/demo/Inspector';
import LessonsView from '@/components/demo/views/LessonsView';
import AssetsView from '@/components/demo/views/AssetsView';
import StudentsView from '@/components/demo/views/StudentsView';
import SettingsView from '@/components/demo/views/SettingsView';
import SafetyModuleCanvas from '@/components/demo/SafetyModuleCanva_AIPreview';

export default function DemoPage() {
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
            {activeTab === 'students' && <StudentsView />}
            {activeTab === 'settings' && <SettingsView />}
        </div>
    );
}
