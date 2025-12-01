"use client";
import { useState } from 'react';
import Sidebar from '@/components/demo/Sidebar';
import Canvas from '@/components/demo/Canvas';
import Inspector from '@/components/demo/Inspector';
import LessonsView from '@/components/demo/views/LessonsView';
import AssetsView from '@/components/demo/views/AssetsView';
import StudentsView from '@/components/demo/views/StudentsView';
import SettingsView from '@/components/demo/views/SettingsView';

export default function DemoPage() {
    const [activeTab, setActiveTab] = useState('modules');

    return (
        <div className="flex h-screen bg-slate-950 text-white overflow-hidden font-sans">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            {activeTab === 'modules' && (
                <>
                    <Canvas />
                    <Inspector />
                </>
            )}

            {activeTab === 'lessons' && <LessonsView />}
            {activeTab === 'assets' && <AssetsView />}
            {activeTab === 'students' && <StudentsView />}
            {activeTab === 'settings' && <SettingsView />}
        </div>
    );
}
