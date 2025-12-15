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
    CheckCircle2, Flame, Fan, XCircle, Box, Layers, Settings, ChevronRight,
    ArrowRight, PlayCircle, Mic, Square, Bot
} from 'lucide-react';
import * as THREE from 'three';

/* --- Types --- */
interface EngineModelProps {
    markersActive: boolean;
}

/* --- Data: Steps --- */
// Define the content for each step of the module creation/preview flow


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
            {/* Arrow Shaft */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.25]}>
                <cylinderGeometry args={[0.05, 0.05, 0.5, 12]} />
                <meshStandardMaterial color="#ef4444" emissive="#7f1d1d" />
            </mesh>
            {/* Arrow Head */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.1]}>
                <coneGeometry args={[0.15, 0.4, 12]} />
                <meshStandardMaterial color="#ef4444" emissive="#7f1d1d" />
            </mesh>
        </group>
    );
};


/* --- 2. Environment Controller (Restored) --- */
/* This handles the logic for switching between Grid and Warehouse */
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


/* --- Data: Steps (ENGINE REPAIR) --- */
const initialSteps = [
    {
        id: 1,
        title: 'Diagnostics Start',
        script: 'Connect the OBDII scanner to the port located under the driver side dashboard. Scan for error codes. We are looking for P0300 (Random/Multiple Cylinder Misfire).',
        arrowTarget: [0.5, 1.4, 0.5], // Dashboard area
        arrowPosition: [1.0, 1.8, 0.8] // Closer zoom
    },
    {
        id: 2,
        title: 'Engine Access',
        script: 'Open the hood and secure the prop rod. Locust the plastic engine cover. Pull upwards gently on the corners to disengage the rubber grommets and set the cover aside.',
        arrowTarget: [0, 1.5, 1.5], // Top of engine
        arrowPosition: [0, 2.0, 2.0] // Closer zoom
    },
    {
        id: 3,
        title: 'Component Inspection',
        script: 'Inspect the ignition coils for any visible cracks or signs of arcing. Remove the coil from Cylinder 3 and inspect the spark plug tip for fouling or excessive gap wear.',
        arrowTarget: [0.2, 1.4, 1.5], // Specific cylinder area
        arrowPosition: [0.4, 1.8, 1.8] // Very close zoom
    },
    {
        id: 4,
        title: 'Verification',
        script: 'Reinstall the spark plug and coil. Clear the error codes on the scanner. Start the engine and monitor the idle RPM. Ensure the check engine light does not return.',
        arrowTarget: [0, 1.3, 1.5], // General engine view
        arrowPosition: [-0.8, 1.8, 2.0] // Closer zoom
    }
];

/* --- 1. Car Model Wrapper --- */
const CarModel = ({ markersActive }: EngineModelProps) => {
    // Use your car file path here
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    const { scene } = useGLTF(`${basePath}/3d/car.glb`);

    return (
        <group dispose={null}>
            {/* Manual Reset to 0 (Ground Level) */}
            <primitive object={scene} scale={1.2} position={[0, 0, 0]} />

            {markersActive && (
                <>
                    {/* Marker 1: Engine Block */}
                    <Html position={[0, 1.5, 1.5]} center distanceFactor={8} zIndexRange={[100, 0]}>
                        <div className="flex flex-col items-center min-w-[120px] pointer-events-none">
                            <div className="bg-orange-500/20 border border-orange-500 text-orange-400 px-2 py-1 rounded text-[10px] font-bold mb-1 uppercase tracking-tighter backdrop-blur-sm">
                                Engine Block
                            </div>
                            <div className="w-8 h-8 rounded-full border-2 border-orange-500 flex items-center justify-center bg-black/50">
                                <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                            </div>
                            <div className="w-px h-8 bg-orange-500/50"></div>
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full shadow-[0_0_10px_orange]"></div>
                        </div>
                    </Html>

                    {/* Marker 2: ECU / Electrical */}
                    <Html position={[0.5, 1.4, 1.2]} center distanceFactor={8} zIndexRange={[100, 0]}>
                        <div className="flex flex-col items-center min-w-[120px] pointer-events-none">
                            <div className="bg-cyan-500/20 border border-cyan-500 text-cyan-400 px-2 py-1 rounded text-[10px] font-bold mb-1 uppercase tracking-tighter backdrop-blur-sm">
                                ECU Unit
                            </div>
                            <div className="w-8 h-8 rounded-full border-2 border-cyan-500 flex items-center justify-center bg-black/50">
                                <Sparkles className="w-4 h-4 text-cyan-500 animate-pulse" />
                            </div>
                            <div className="w-px h-6 bg-cyan-500/50"></div>
                            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_10px_cyan]"></div>
                        </div>
                    </Html>
                </>
            )}
        </group>
    );
};



/* --- 4. Main Page --- */
import Inspector from './Inspector'; // Import the Inspector component



const SafetyModuleCanvas = () => {
    const [environment, setEnvironment] = useState('grid');
    const [showAiLayer, setShowAiLayer] = useState(true);
    const [markersActive, setMarkersActive] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isEnvMenuOpen, setEnvMenuOpen] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [activeAiTab, setActiveAiTab] = useState<'assistant' | 'generator'>('assistant');

    // NEW: Interactive Steps State
    // Convert static steps to state to allow editing
    const [stepsData, setStepsData] = useState(initialSteps);
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const currentStep = stepsData[activeStepIndex];

    // Handler for updating the script of the current step
    const handleScriptChange = (newScript: string) => {
        const updatedSteps = [...stepsData]; // Create a copy
        updatedSteps[activeStepIndex] = {
            ...updatedSteps[activeStepIndex],
            script: newScript
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

                {/* === FLOATING STEPS UI (Left Side) === */}
                <div className="absolute top-24 left-4 z-30 flex flex-col gap-2 pointer-events-none">
                    <div className="pointer-events-auto bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-3 shadow-xl w-16 hover:w-64 transition-all duration-300 group overflow-hidden">
                        <div className="flex items-center gap-3 mb-4 text-slate-400 group-hover:text-cyan-400 transition-colors pl-1 cursor-grab active:cursor-grabbing">
                            <Layers className="w-5 h-5 flex-shrink-0" />
                            <span className="text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap duration-300">
                                Step Timeline
                            </span>
                        </div>

                        <div className="space-y-3 relative">
                            {/* Vertical line connector */}
                            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-slate-700/50 -z-10"></div>

                            {stepsData.map((step, index) => (
                                <button
                                    key={step.id}
                                    onClick={() => setActiveStepIndex(index)}
                                    className="flex items-center gap-4 w-full group/item text-left relative"
                                >
                                    {/* Indicator Dot */}
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold z-10 transition-all duration-300 flex-shrink-0 ${index === activeStepIndex
                                        ? 'bg-cyan-500 border-cyan-500 text-black scale-110 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                                        : 'bg-slate-900 border-slate-600 text-slate-500 hover:border-cyan-400 hover:text-cyan-400'
                                        }`}>
                                        {index + 1}
                                    </div>

                                    {/* Text Label (Hidden by default, shown on hover) */}
                                    <div className={`opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap flex-1 ${index === activeStepIndex ? 'text-cyan-400 font-medium' : 'text-slate-400 group-hover/item:text-slate-200'
                                        }`}>
                                        <span className="text-xs">{step.title}</span>
                                    </div>

                                    {/* Active Arrow */}
                                    {index === activeStepIndex && (
                                        <ArrowRight className="w-3 h-3 text-cyan-500 opacity-0 group-hover:opacity-100 absolute right-0 transition-opacity" />
                                    )}
                                </button>
                            ))}
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
                            // 1. Toggle state on click instead of hover
                            onClick={() => setEnvMenuOpen(!isEnvMenuOpen)}
                            className={`p-2 rounded transition-colors flex items-center space-x-2 ${isEnvMenuOpen ? 'text-cyan-400 bg-slate-700' : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-700'}`}
                            title="Environment"
                        >
                            <Globe className="h-5 w-5" />
                        </button>

                        {/* 2. Show/Hide based on 'isEnvMenuOpen' state */}
                        {isEnvMenuOpen && (
                            <div className="absolute top-full left-0 mt-2 w-32 bg-slate-800 border border-slate-700 rounded-md shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                {['grid', 'warehouse'].map(env => (
                                    <button
                                        key={env}
                                        onClick={() => {
                                            setEnvironment(env);
                                            setEnvMenuOpen(false); // 3. Close menu when an item is selected
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
                        <Canvas camera={{ position: [2, 1.5, 3], fov: 45 }}>
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
                            <spotLight position={[-5, 5, 5]} intensity={1} color="#06b6d4" />

                            {/* Controller logic for switching grid/warehouse */}
                            <EnvironmentController mode={environment} />

                            <Suspense fallback={null}>
                                <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
                                    <CarModel markersActive={markersActive} />
                                </Float>
                                {/* Dynamic Arrow for current step */}
                                <FocusArrow
                                    position={currentStep.arrowPosition as [number, number, number]}
                                    target={currentStep.arrowTarget as [number, number, number]}
                                />
                            </Suspense>
                            <ContactShadows position={[0, -0.6, 0]} opacity={0.6} scale={10} blur={2} far={4} />
                            <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
                        </Canvas>
                    )}
                </div>

                {/* === VOICE RECORDER (Bottom Left) === */}
                <div className="absolute bottom-12 left-6 z-50 flex flex-col items-start gap-2 pointer-events-auto">
                    <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 p-3 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-left-10 fade-in duration-500">
                        <button
                            onClick={() => setIsRecording(!isRecording)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-slate-800 hover:bg-slate-700'}`}
                        >
                            {isRecording ? <Square className="w-5 h-5 text-white fill-current" /> : <Mic className="w-6 h-6 text-cyan-400" />}
                        </button>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Voice Input</span>
                            <div className="flex items-center gap-2 h-6">
                                {isRecording ? (
                                    <>
                                        <div className="flex gap-0.5 items-end h-full">
                                            {[1, 2, 3, 4, 5, 4, 3, 2].map((h, i) => (
                                                <div key={i} className="w-1 bg-cyan-500 rounded-full animate-[music-bar_0.5s_ease-in-out_infinite]" style={{ height: `${h * 4}px`, animationDelay: `${i * 0.05}s` }}></div>
                                            ))}
                                        </div>
                                        <span className="text-sm font-mono text-red-400 w-12 ml-2">00:14</span>
                                    </>
                                ) : (
                                    <span className="text-sm text-slate-400 italic">Tap mic to describe lesson...</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Assistant Bubble (Updated with Tabs) */}
                {showAiLayer && (
                    <div className="absolute bottom-12 right-6 z-50 flex flex-col items-end gap-2 max-w-sm pointer-events-auto">
                        <div className="bg-slate-900/95 backdrop-blur-md border border-purple-500/30 p-0 rounded-2xl rounded-br-none shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-500 w-80 overflow-hidden">

                            {/* Tabs Header */}
                            <div className="flex border-b border-white/10">
                                <button
                                    onClick={() => setActiveAiTab('assistant')}
                                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${activeAiTab === 'assistant' ? 'bg-purple-500/10 text-purple-400 border-b-2 border-purple-500' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
                                >
                                    Assistant
                                </button>
                                <button
                                    onClick={() => setActiveAiTab('generator')}
                                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${activeAiTab === 'generator' ? 'bg-purple-500/10 text-purple-400 border-b-2 border-purple-500' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
                                >
                                    Generator
                                </button>
                            </div>

                            <div className="p-4">
                                {/* TAB 1: ASSISTANT (Diagnostics) */}
                                {activeAiTab === 'assistant' && (
                                    <>
                                        <div className="flex items-start gap-3 mb-4">
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0">
                                                <Bot className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="text-cyan-400 text-sm font-semibold mb-1">System Diagnostics</h4>
                                                <p className="text-slate-300 text-sm leading-relaxed">
                                                    {markersActive
                                                        ? "Scanning complete. Detected Engine Block overheating and ECU communication errors."
                                                        : "Vehicle connected. Ready to scan OBDI/OBDII ports for fault codes."}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 justify-end pt-2">
                                            {!markersActive ? (
                                                <button onClick={() => setMarkersActive(true)} className="px-3 py-1.5 text-xs bg-cyan-600 hover:bg-cyan-500 text-white rounded font-medium shadow-lg shadow-cyan-900/20 transition-all active:scale-95 flex items-center gap-2">
                                                    <Sparkles className="w-3 h-3" /> Run Scan
                                                </button>
                                            ) : (
                                                <button onClick={() => setMarkersActive(false)} className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded font-medium transition-all flex items-center gap-2">
                                                    <XCircle className="w-3 h-3" /> Clear Data
                                                </button>
                                            )}
                                        </div>
                                    </>
                                )}

                                {/* TAB 2: GENERATOR (Voice/Slider) */}
                                {activeAiTab === 'generator' && (
                                    <>
                                        <div className="flex items-start gap-3 mb-4">
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shrink-0">
                                                <Sparkles className="w-4 h-4 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="text-purple-400 text-sm font-semibold mb-1">AI Architect</h4>
                                                <p className="text-slate-300 text-sm leading-relaxed">
                                                    {isGenerating
                                                        ? "Analyzing voice pattern... Generating step-by-step repair module..."
                                                        : "Record your voice to describe the lesson scenario, then slide to generate."}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Slider Interaction */}
                                        {!isGenerating ? (
                                            <div className="relative h-12 bg-slate-800 rounded-full border border-slate-700 overflow-hidden flex items-center p-1 cursor-pointer group select-none">
                                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-400 transition-colors">Slide to Generate</span>
                                                    <ChevronRight className="w-4 h-4 text-slate-500 ml-1 opacity-50" />
                                                </div>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    defaultValue="0"
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                                    onChange={(e) => {
                                                        if (parseInt(e.target.value) > 90) {
                                                            setIsGenerating(true);
                                                        }
                                                    }}
                                                />
                                                <div className="h-10 w-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shadow-lg flex items-center justify-center z-10 transition-all duration-75 ease-out relative pointer-events-none" style={{ left: '0%' }}>
                                                    <Sparkles className="w-5 h-5 text-white animate-pulse" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="h-12 bg-purple-500/10 border border-purple-500/30 rounded-full flex items-center justify-center gap-3">
                                                <div className="flex gap-1">
                                                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"></div>
                                                </div>
                                                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Processing</span>
                                            </div>
                                        )}
                                    </>
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
            />

        </div>
    );
};

export default SafetyModuleCanvas;