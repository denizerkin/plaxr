"use client";
import { useState, Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    useGLTF,
    OrbitControls,
    Environment,
    Html,
    ContactShadows,
    Float,
    Grid,
    Center
} from '@react-three/drei';
import {
    Move, Maximize, RotateCw, MousePointer2, Globe, Sparkles,
    CheckCircle2, Flame, Fan, XCircle, Box, Layers, Settings, ChevronRight, ChevronLeft,
    ArrowRight, PlayCircle, Mic, Square, Bot, Activity, Music, Play, Pause, AlertCircle, Plus, Trash2, Volume2, Loader2
} from 'lucide-react';
import Link from 'next/link';
import * as THREE from 'three';
import Inspector from './Inspector';

/* --- Types --- */
interface EngineModelProps {
    markersActive: boolean;
}

/* --- 3D Component: Focus Arrow --- */
const FocusArrow = ({ position, target }: { position: [number, number, number], target: [number, number, number] }) => {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (group.current) {
            // Make the arrow point at the target
            group.current.lookAt(target[0], target[1], target[2]);
            // Add a gentle floating animation
            group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
        }
    });

    return (
        <group ref={group} position={position}>
            {/* Simple Red Triangle (3-sided cone) */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <coneGeometry args={[0.2, 0.5, 3]} />
                <meshStandardMaterial color="#0d9fe6" emissive="#00d2f2" emissiveIntensity={0.5} />
            </mesh>
        </group>
    );
};


/* --- 2. Environment Controller (Restored) --- */
const EnvironmentController = ({ mode }: { mode: string }) => {
    return (
        <>
            <Environment preset={mode === 'warehouse' ? 'city' : 'city'} background={false} />
            {mode === 'grid' && (
                <Grid
                    position={[0, -0.01, 0]} args={[10.5, 10.5]} cellSize={0.6} cellThickness={1}
                    cellColor="#06b6d4" sectionSize={3.3} sectionThickness={1.5} sectionColor="#334155"
                    fadeDistance={30} infiniteGrid
                />
            )}
        </>
    );
};


/* --- Data: Steps (MACHINERY REPAIR - Placeholder) --- */
export const initialSteps = [
    {
        id: 1,
        title: 'Start Machine',
        script: 'Locate the green start button on the main control panel. Press it firmly to initiate the motor startup sequence.',
        arrowTarget: [0, 3.5, 0.5],
        arrowPosition: [1.5, 3.5, 2.0]
    },
    {
        id: 2,
        title: 'Safety Measures',
        script: 'Ensure the clear safety guard is lowered completely. Verify the emergency stop button is not engaged and is easily accessible.',
        arrowTarget: [0, 3.8, -0.5],
        arrowPosition: [-1.5, 4.0, 1.0]
    },
    {
        id: 3,
        title: 'Material Placement',
        script: 'Place the material securely on the cutting bed. Ensure it is flush against the back fence and clamped down if necessary.',
        arrowTarget: [0, 2.6, 0],
        arrowPosition: [0, 3.5, 2.0]
    },
    {
        id: 4,
        title: 'Operation',
        script: 'With hands clear of the blade path, slowly pull the handle down to cut through the material using steady, even pressure.',
        arrowTarget: [0, 3.0, 0],
        arrowPosition: [2.0, 4.0, 2.0]
    }
];

/* --- 1. Machinery Model Wrapper --- */
const MachineryModel = ({ markersActive }: EngineModelProps) => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    // CHANGED: Loading machinery.glb instead of car.glb
    const { scene } = useGLTF(`${basePath}/3d/machinery.glb`);

    return (
        <group dispose={null}>
            {/* Manual Reset to 0 (Ground Level) */}
            <primitive object={scene} scale={1.2} position={[0, 1.2, 0]} />

            {markersActive && (
                <>
                    {/* Placeholder Marker */}
                    <Html position={[0, 1.5, 0]} center distanceFactor={8} zIndexRange={[100, 0]}>
                        <div className="flex flex-col items-center min-w-[120px] pointer-events-none">
                            <div className="bg-orange-500/20 border border-orange-500 text-orange-400 px-2 py-1 rounded text-[10px] font-bold mb-1 uppercase tracking-tighter backdrop-blur-sm">
                                Control Panel
                            </div>
                            <div className="w-8 h-8 rounded-full border-2 border-orange-500 flex items-center justify-center bg-black/50">
                                <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                            </div>
                        </div>
                    </Html>
                </>
            )}
        </group>
    );
};

/* --- Simulated Audio Player Component (Now with TTS) --- */
const AudioPlayer = ({ text }: { text: string }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // Stop audio when text changes or component unmounts
        window.speechSynthesis.cancel();
        setIsPlaying(false);
    }, [text]);

    const togglePlay = () => {
        if (isPlaying) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
        } else {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.onend = () => setIsPlaying(false);
            window.speechSynthesis.speak(utterance);
            setIsPlaying(true);
        }
    };

    return (
        <div className="absolute top-16 left-4 z-50 flex items-center gap-3 bg-slate-900/90 backdrop-blur-md border border-slate-700 px-4 py-2 rounded-full shadow-xl">
            <div className="flex items-center gap-2">
                <button
                    onClick={togglePlay}
                    className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-900/50"
                >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>
            </div>

            <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Audio Guide</span>
                <div className="w-32 h-1 bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full bg-cyan-500 rounded-full transition-all duration-1000 ease-linear ${isPlaying ? 'w-full animate-[progress_10s_linear_infinite]' : 'w-1/3'}`}></div>
                </div>
            </div>

            <button className="text-slate-400 hover:text-white transition-colors">
                <Volume2 className="w-4 h-4" />
            </button>
        </div>
    );
}

const MachineryModuleCanvas = () => {
    const [environment, setEnvironment] = useState('grid');
    const [showAiLayer, setShowAiLayer] = useState(true);
    const [markersActive, setMarkersActive] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isEnvMenuOpen, setEnvMenuOpen] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [activeAiTab, setActiveAiTab] = useState<'assistant' | 'generator' | 'system'>('assistant');
    const [isSystemChecking, setIsSystemChecking] = useState(true);
    const [lessonName, setLessonName] = useState('Industrial_Saw_Safety_Operation');
    const [lessonDuration, setLessonDuration] = useState('30 min');

    const [stepsData, setStepsData] = useState(initialSteps);
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const currentStep = stepsData[activeStepIndex];

    const handleScriptChange = (newScript: string) => {
        const updatedSteps = [...stepsData]; // Create a copy
        updatedSteps[activeStepIndex] = {
            ...updatedSteps[activeStepIndex],
            script: newScript
        };
        setStepsData(updatedSteps);
    };

    const handleDeleteStep = (e: React.MouseEvent, indexToDelete: number) => {
        e.stopPropagation(); // Prevent step selection when clicking delete
        if (stepsData.length <= 1) return; // Prevent deleting the last step

        const newSteps = stepsData.filter((_, idx) => idx !== indexToDelete);
        setStepsData(newSteps);

        // Adjust active index if necessary
        if (indexToDelete === activeStepIndex) {
            // If deleting active step, go to previous (or 0)
            setActiveStepIndex(Math.max(0, indexToDelete - 1));
        } else if (indexToDelete < activeStepIndex) {
            // If deleting a step before active, shift active index down
            setActiveStepIndex(activeStepIndex - 1);
        }
    };

    const handleTitleChange = (newTitle: string) => {
        const updatedSteps = [...stepsData]; // Create a copy
        updatedSteps[activeStepIndex] = {
            ...updatedSteps[activeStepIndex],
            title: newTitle
        };
        setStepsData(updatedSteps);
    };

    useEffect(() => { setMounted(true); }, []);

    const getBackgroundStyle = () => {
        return environment === 'warehouse'
            ? "bg-slate-900"
            : "bg-[linear-gradient(rgba(30,41,59,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.5)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]";
    };

    return (
        <div className="flex w-full h-screen bg-slate-950 font-sans selection:bg-cyan-500/30 overflow-hidden">

            {/* === CENTER: 3D CANVAS === */}
            <div className="flex-1 relative flex flex-col h-full relative">

                {/* Back Button */}
                <Link href="/lessons" className="absolute top-4 left-4 z-50 flex items-center gap-2 px-3 py-2 bg-slate-900/80 backdrop-blur border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all shadow-lg group">
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold">Back to Lessons</span>
                </Link>

                {/* Audio Player */}
                <AudioPlayer text={currentStep.script} />

                {/* === DOCKED TIMELINE (Footer Style) === */}
                <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col pointer-events-none w-full bg-slate-900 border-t border-slate-700 h-44 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">

                    {/* Label Tab */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 pointer-events-auto bg-slate-900 border-t border-x border-slate-700 rounded-t-xl px-6 py-1.5 shadow-xl flex items-center gap-2">
                        <Layers className="w-4 h-4 text-cyan-400" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                            Module Timeline
                        </span>
                    </div>

                    <div className="pointer-events-auto h-full w-full flex items-center relative overflow-x-auto custom-scrollbar px-12">

                        {/* Container for content that grows - Centered using mx-auto */}
                        <div className="relative flex items-start pl-4 pr-12 mx-auto w-fit">

                            {/* Steps Group */}
                            {stepsData.map((step, index) => (
                                <div key={step.id} className="flex items-start">
                                    <button
                                        onClick={() => setActiveStepIndex(index)}
                                        className="flex flex-col items-center group/item relative focus:outline-none"
                                    >
                                        <div className="relative">
                                            <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center text-xl font-bold z-10 transition-all duration-300 bg-slate-900 ${index === activeStepIndex
                                                ? 'border-cyan-500 text-cyan-400 scale-110 shadow-[0_0_25px_rgba(6,182,212,0.4)]'
                                                : 'border-slate-600 text-slate-500 hover:border-cyan-400 hover:text-cyan-400'
                                                }`}>
                                                {index + 1}
                                            </div>

                                            {stepsData.length > 1 && (
                                                <div
                                                    onClick={(e) => handleDeleteStep(e, index)}
                                                    className="absolute -top-1 -right-1 w-6 h-6 bg-slate-800 border border-slate-600 rounded-full flex items-center justify-center text-slate-400 hover:text-red-400 hover:border-red-400 hover:bg-slate-900 transition-all opacity-0 group-hover/item:opacity-100 z-20 shadow-lg cursor-pointer"
                                                    title="Delete Step"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-4 w-0 flex justify-center overflow-visible">
                                            <span className={`whitespace-nowrap text-sm font-bold px-3 py-1.5 rounded transition-all duration-300 ${index === activeStepIndex
                                                ? 'text-cyan-400 bg-slate-800 border border-cyan-500/30'
                                                : 'text-slate-400 bg-transparent border border-transparent group-hover/item:border-slate-700 group-hover/item:bg-slate-800'
                                                }`}>
                                                {step.title}
                                            </span>
                                        </div>
                                    </button>

                                    {index < stepsData.length - 1 && (
                                        <div className="w-24 h-0.5 border-t-2 border-dashed border-slate-700 mx-2 mt-8"></div>
                                    )}
                                </div>
                            ))}

                            <div className="ml-8 mt-1 flex items-center">
                                <button
                                    onClick={() => {
                                        const newId = stepsData.length + 1;
                                        const newStep = {
                                            id: newId,
                                            title: 'New Step',
                                            script: 'Describe the action for this step...',
                                            arrowTarget: [0, 1.5, 0],
                                            arrowPosition: [2, 2, 2]
                                        };
                                        setStepsData([...stepsData, newStep]);
                                        setActiveStepIndex(stepsData.length);
                                    }}
                                    className="w-14 h-14 rounded-xl border-2 border-slate-600 bg-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400 hover:bg-slate-700 transition-all shadow-lg"
                                    title="Add Step"
                                >
                                    <Plus className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Toolbar (Centered) */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-slate-800/90 backdrop-blur rounded-lg p-2 flex space-x-2 border border-slate-700 shadow-xl z-40">
                    <button className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-700 rounded transition-colors"><MousePointer2 className="h-5 w-5" /></button>
                    <button className="p-2 text-cyan-400 bg-slate-700 rounded transition-colors"><Move className="h-5 w-5" /></button>
                    <button className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-700 rounded transition-colors"><RotateCw className="h-5 w-5" /></button>
                    <button className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-700 rounded transition-colors"><Maximize className="h-5 w-5" /></button>
                    <div className="w-px h-8 bg-slate-700 mx-2"></div>

                    {/* --- FIXED DROPDOWN --- */}
                    <div className="relative">
                        <button
                            onClick={() => setEnvMenuOpen(!isEnvMenuOpen)}
                            className={`p-2 rounded transition-colors flex items-center space-x-2 ${isEnvMenuOpen ? 'text-cyan-400 bg-slate-700' : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-700'}`}
                            title="Environment"
                        >
                            <Globe className="h-5 w-5" />
                        </button>
                        {isEnvMenuOpen && (
                            <div className="absolute top-full left-0 mt-2 w-32 bg-slate-800 border border-slate-700 rounded-md shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                {['grid', 'warehouse'].map(env => (
                                    <button
                                        key={env}
                                        onClick={() => {
                                            setEnvironment(env);
                                            setEnvMenuOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-700 capitalize ${environment === env ? 'text-cyan-400' : 'text-slate-300'}`}
                                    >
                                        {env} View
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* ---------------------- */}

                    <button onClick={() => setShowAiLayer(!showAiLayer)} className={`p-2 rounded transition-colors ml-2 ${showAiLayer ? 'text-purple-400 bg-purple-900/30' : 'text-slate-400 hover:text-purple-400'}`}>
                        <Sparkles className="h-5 w-5" />
                    </button>
                </div>

                {/* 3D Viewport */}
                <div className="flex-1 relative w-full h-full transition-colors duration-500">
                    <div className={`absolute inset-0 ${getBackgroundStyle()} pointer-events-none transition-all duration-500`}></div>
                    {!mounted ? (
                        <div className="flex items-center justify-center h-full text-cyan-500 animate-pulse">Loading Machinery...</div>
                    ) : (
                        <Canvas camera={{ position: [3, 3, 4], fov: 45 }}>
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
                            <spotLight position={[-5, 5, 5]} intensity={1} color="#06b6d4" />
                            <EnvironmentController mode={environment} />
                            <Suspense fallback={null}>
                                <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
                                    <MachineryModel markersActive={markersActive} />
                                </Float>
                                <FocusArrow
                                    position={currentStep.arrowPosition as [number, number, number]}
                                    target={currentStep.arrowTarget as [number, number, number]}
                                />
                            </Suspense>
                            <ContactShadows position={[0, -0.6, 0]} opacity={0.6} scale={10} blur={2} far={4} />
                            <OrbitControls makeDefault target={[0, 1.2, 0]} minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
                        </Canvas>
                    )}
                </div>

                {/* AI Assistant Bubble (Updated with Tabs) - Top Right Corner */}
                {showAiLayer && (
                    <div className="absolute top-4 right-4 z-50 flex flex-col items-end gap-2 w-64 pointer-events-auto">
                        <div className="bg-slate-900/95 backdrop-blur-md border border-purple-500/30 p-0 rounded-2xl rounded-br-none shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-500 w-full overflow-hidden">
                            <div className="flex border-b border-white/10">
                                <button onClick={() => setActiveAiTab('assistant')} className={`flex-1 py-3 flex justify-center transition-colors ${activeAiTab === 'assistant' ? 'bg-purple-500/10 text-purple-400 border-b-2 border-purple-500' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}> <Bot className="w-4 h-4" /> </button>
                                <button onClick={() => setActiveAiTab('generator')} className={`flex-1 py-3 flex justify-center transition-colors ${activeAiTab === 'generator' ? 'bg-purple-500/10 text-purple-400 border-b-2 border-purple-500' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}> <Sparkles className="w-4 h-4" /> </button>
                                <button onClick={() => setActiveAiTab('system')} className={`flex-1 py-3 flex justify-center transition-colors ${activeAiTab === 'system' ? 'bg-purple-500/10 text-purple-400 border-b-2 border-purple-500' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}> <Activity className="w-4 h-4" /> </button>
                            </div>

                            <div className="p-4">
                                {activeAiTab === 'assistant' && (
                                    <>
                                        <div className="flex items-start gap-3 mb-4">
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0">
                                                <Bot className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="text-cyan-400 text-sm font-semibold mb-1">System Diagnostics</h4>
                                                <p className="text-slate-300 text-sm leading-relaxed">
                                                    {markersActive ? "System ready. All parameters nominal." : "Machine in standby. Checking operational status..."}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {/* ... Other tabs skipped for brevity since they are generic ... */}
                                {/* TAB 2: GENERATOR (Now with Button) */}
                                {activeAiTab === 'generator' && (
                                    <>
                                        <div className="flex items-start gap-3 mb-4">
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shrink-0">
                                                <Sparkles className="w-4 h-4 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="text-purple-400 text-sm font-semibold mb-1">AI Architect</h4>
                                                <p className="text-slate-300 text-xs leading-relaxed">
                                                    Record or type to generate.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            <button
                                                onClick={() => setIsRecording(!isRecording)}
                                                className={`w-full py-3 rounded-lg flex items-center justify-center gap-3 transition-all ${isRecording
                                                    ? 'bg-red-500/20 text-red-400 border border-red-500/50 animate-pulse'
                                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                                                    }`}
                                            >
                                                {isRecording ? <Square className="w-4 h-4 fill-current" /> : <Mic className="w-4 h-4" />}
                                                <span className="text-xs font-bold uppercase tracking-wider">
                                                    {isRecording ? 'Stop Recording' : 'Start Voice Input'}
                                                </span>
                                            </button>

                                            <button
                                                onClick={() => setIsGenerating(true)}
                                                className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg shadow-purple-900/20"
                                            >
                                                Generate Module
                                            </button>
                                        </div>
                                    </>
                                )}

                                {/* TAB 3: SYSTEM (New) */}
                                {activeAiTab === 'system' && (
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-slate-300">System Monitoring</span>
                                            <div
                                                onClick={() => setIsSystemChecking(!isSystemChecking)}
                                                className={`w-10 h-5 rounded-full p-0.5 cursor-pointer transition-colors ${isSystemChecking ? 'bg-cyan-500' : 'bg-slate-700'}`}
                                            >
                                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isSystemChecking ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                            </div>
                                        </div>

                                        <div className={`p-3 rounded-lg border ${isSystemChecking ? 'bg-green-500/10 border-green-500/30' : 'bg-slate-800 border-slate-700'}`}>
                                            <div className="flex items-center gap-3">
                                                {isSystemChecking ? (
                                                    <Loader2 className="w-4 h-4 text-green-500 animate-spin" />
                                                ) : (
                                                    <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                                                )}
                                                <span className={`text-xs font-medium ${isSystemChecking ? 'text-green-400' : 'text-slate-400'}`}>
                                                    {isSystemChecking ? 'No problem with course creation' : 'Monitoring paused'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}


                {/* Bottom Status Bar */}
                <div className="h-8 bg-slate-900 border-t border-slate-800 flex items-center px-4 text-xs text-slate-500 justify-between z-20">
                    <div className="flex space-x-4 font-mono"><span>X: 12.5</span><span>Y: 0.0</span><span>Z: -5.2</span></div>
                    <div className="flex items-center gap-4"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-500"></span> Online</span><span>Mode: {environment}</span></div>
                </div>
            </div>

            {/* === RIGHT SIDE: INSPECTOR === */}
            <Inspector
                currentScript={currentStep.script}
                currentStepTitle={currentStep.title}
                onScriptChange={handleScriptChange}
                onStepTitleChange={handleTitleChange}
                lessonName={lessonName}
                onLessonNameChange={setLessonName}
                lessonDuration={lessonDuration}
                onLessonDurationChange={setLessonDuration}
            />

        </div>
    );
};

export default MachineryModuleCanvas;
