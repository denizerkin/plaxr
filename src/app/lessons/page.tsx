"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
    Folder, ChevronRight, ChevronDown, Pen, Info, Trash2,
    MoreVertical, Clock, CheckCircle2
} from 'lucide-react';

import TimelineVisualizer from '@/components/demo/TimelineVisualizer';
import { initialSteps as carSteps } from '@/components/demo/SafetyModuleCanva_AIPreview';
import { initialSteps as machinerySteps } from '@/components/demo/MachineryModuleCanvas';

// Define lesson metadata
const lessons = [
    {
        id: 'car',
        title: 'Car Diagnostics & Engine Inspection',
        description: 'Learn to diagnose engine faults using OBDII scanners and inspect ignition components.',
        steps: carSteps,
        path: '/lessons/car',
        duration: '20 min',
        level: 'Intermediate',
        status: 'In Progress'
    },
    {
        id: 'machinery',
        title: 'Industrial Machinery Safety Protocols',
        description: 'Master safety protocols and power-up sequences for heavy industrial equipment.',
        steps: machinerySteps,
        path: '/lessons/machinery',
        duration: '30 min',
        level: 'Beginner',
        status: 'Ready'
    }
];

export default function LessonsPage() {
    const [openLessonId, setOpenLessonId] = useState<string | null>(null);

    const toggleLesson = (id: string) => {
        setOpenLessonId(current => current === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-slate-950 p-8 flex flex-col items-center">

            <div className="w-full max-w-5xl">
                {/* Header */}
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            Lesson Manager
                        </h1>
                        <p className="text-slate-400 mt-2">
                            Manage your XR training modules. Expand a folder to view the step timeline.
                        </p>
                    </div>
                    <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-bold shadow-lg shadow-cyan-900/20 transition-all">
                        + New Lesson
                    </button>
                </div>

                {/* Lessons List (Folders) */}
                <div className="space-y-4">
                    {lessons.map((lesson) => {
                        const isOpen = openLessonId === lesson.id;

                        return (
                            <div
                                key={lesson.id}
                                className={`bg-slate-900 border rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.1)]' : 'border-slate-800 hover:border-slate-700'}`}
                            >
                                {/* Header Row (Click to Expand) */}
                                <div
                                    onClick={() => toggleLesson(lesson.id)}
                                    className="p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-800/50 transition-colors select-none group"
                                >
                                    {/* Folder Icon */}
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${isOpen ? 'bg-cyan-500/10 text-cyan-400' : 'bg-slate-800 text-slate-500 group-hover:text-slate-300'}`}>
                                        {isOpen ? <Folder className="w-6 h-6 fill-current" /> : <Folder className="w-6 h-6" />}
                                    </div>

                                    {/* Title & Info */}
                                    <div className="flex-1">
                                        <h2 className={`font-bold text-lg transition-colors ${isOpen ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                                            {lesson.title}
                                        </h2>
                                        <div className="flex items-center gap-4 mt-1">
                                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> {lesson.duration}
                                            </span>
                                            <span className="text-xs text-slate-500 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700">
                                                {lesson.level}
                                            </span>
                                            {isOpen && (
                                                <span className="text-xs text-cyan-500 font-medium">
                                                    {lesson.steps.length} Steps
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Expand Chevron */}
                                    <div className={`p-2 rounded-full transition-all duration-300 ${isOpen ? 'rotate-180 bg-slate-800 text-cyan-400' : 'text-slate-500'}`}>
                                        <ChevronDown className="w-5 h-5" />
                                    </div>
                                </div>

                                {/* Expanded Content: Actions & Timeline */}
                                {isOpen && (
                                    <div className="border-t border-slate-800 bg-slate-950/30 animate-in slide-in-from-top-2 duration-200">

                                        {/* Action Bar */}
                                        <div className="px-6 py-3 flex items-center justify-between border-b border-slate-800/50 bg-slate-900/50">
                                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                                Timeline Preview
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Link href={lesson.path}>
                                                    <button className="flex items-center gap-2 px-3 py-1.5 rounded bg-cyan-600/10 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-600 hover:text-white transition-all text-xs font-bold uppercase tracking-wider">
                                                        <Pen className="w-3 h-3" /> Edit Module
                                                    </button>
                                                </Link>
                                                <button className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors" title="Info">
                                                    <Info className="w-4 h-4" />
                                                </button>
                                                <button className="p-1.5 rounded hover:bg-red-900/20 text-slate-400 hover:text-red-400 transition-colors" title="Delete">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Timeline Visualization */}
                                        <div className="p-6">
                                            <TimelineVisualizer steps={lesson.steps} activeStepIndex={-1} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
