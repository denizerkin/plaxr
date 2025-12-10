"use client";
import { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import {
    useGLTF,
    OrbitControls,
    Environment,
    Html,
    ContactShadows,
    Float,
    Grid
} from '@react-three/drei';
import {
    Move, Maximize, RotateCw, MousePointer2, Globe, Sparkles,
    CheckCircle2, Flame, Fan, XCircle, Box, Layers, Settings, ChevronRight
} from 'lucide-react';

/* --- Types --- */
interface EngineModelProps {
    markersActive: boolean;
}

/* --- 1. Car Model Wrapper --- */
const CarModel = ({ markersActive }: EngineModelProps) => {
    // Use your car file path here
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    const { scene } = useGLTF(`${basePath}/3d/car.glb`);

    return (
        <group dispose={null}>
            <primitive object={scene} scale={1.2} position={[0, -0.5, 0]} />

            {markersActive && (
                <>
                    {/* Marker 1: Engine Block */}
                    <Html position={[0, 0.8, 1.5]} center distanceFactor={8} zIndexRange={[100, 0]}>
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

                    {/* Marker 2: Brake Caliper */}
                    <Html position={[0.9, 0.4, 1.2]} center distanceFactor={8} zIndexRange={[100, 0]}>
                        <div className="flex flex-col items-center min-w-[120px] pointer-events-none">
                            <div className="bg-yellow-500/20 border border-yellow-500 text-yellow-400 px-2 py-1 rounded text-[10px] font-bold mb-1 uppercase tracking-tighter backdrop-blur-sm">
                                Brake Caliper
                            </div>
                            <div className="w-8 h-8 rounded-full border-2 border-yellow-500 flex items-center justify-center bg-black/50">
                                <Fan className="w-4 h-4 text-yellow-500 animate-[spin_3s_linear_infinite]" />
                            </div>
                            <div className="w-px h-6 bg-yellow-500/50"></div>
                            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full shadow-[0_0_10px_yellow]"></div>
                        </div>
                    </Html>
                </>
            )}
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
                    position={[0, -0.6, 0]} args={[10.5, 10.5]} cellSize={0.6} cellThickness={1}
                    cellColor="#06b6d4" sectionSize={3.3} sectionThickness={1.5} sectionColor="#334155"
                    fadeDistance={30} infiniteGrid
                />
            )}
        </>
    );
};


/* --- 4. Main Page --- */
const SafetyModuleCanvas = () => {
    const [environment, setEnvironment] = useState('grid');
    const [showAiLayer, setShowAiLayer] = useState(true);
    const [markersActive, setMarkersActive] = useState(false);
    const [mounted, setMounted] = useState(false);

    // NEW: State to control the dropdown menu
    const [isEnvMenuOpen, setEnvMenuOpen] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    const getBackgroundStyle = () => {
        return environment === 'warehouse'
            ? "bg-slate-900"
            : "bg-[linear-gradient(rgba(30,41,59,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.5)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]";
    };

    return (
        <div className="flex w-full h-screen bg-slate-950 font-sans selection:bg-cyan-500/30 overflow-hidden">

            {/* === LEFT SIDE: 3D CANVAS === */}
            <div className="flex-1 relative flex flex-col h-full relative">

                {/* Toolbar */}
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
                        <div className="flex items-center justify-center h-full text-cyan-500 animate-pulse">Loading 3D Car...</div>
                    ) : (
                        <Canvas camera={{ position: [3, 2, 5], fov: 45 }}>
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
                            <spotLight position={[-5, 5, 5]} intensity={1} color="#06b6d4" />

                            {/* Controller logic for switching grid/warehouse */}
                            <EnvironmentController mode={environment} />

                            <Suspense fallback={null}>
                                <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
                                    <CarModel markersActive={markersActive} />
                                </Float>
                            </Suspense>
                            <ContactShadows position={[0, -0.6, 0]} opacity={0.6} scale={10} blur={2} far={4} />
                            <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
                        </Canvas>
                    )}
                </div>

                {/* AI Assistant Bubble */}
                <div className="absolute bottom-12 right-6 z-50 flex flex-col items-end gap-2 max-w-sm pointer-events-auto">
                    <div className="bg-slate-900/95 backdrop-blur-md border border-purple-500/30 p-4 rounded-2xl rounded-br-none shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-500">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shrink-0">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h4 className="text-purple-400 text-sm font-semibold mb-1">AI Assistant</h4>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    {markersActive
                                        ? "Diagnostics active. Check engine block and wheel calipers."
                                        : "Vehicle loaded. Would you like to run the safety diagnostics?"}
                                </p>
                            </div>
                        </div>
                        <div className="mt-3 flex gap-2 justify-end border-t border-slate-800/50 pt-3">
                            {!markersActive ? (
                                <>
                                    <button className="px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors">Dismiss</button>
                                    <button onClick={() => setMarkersActive(true)} className="px-3 py-1.5 text-xs bg-purple-600 hover:bg-purple-500 text-white rounded font-medium shadow-lg shadow-purple-900/20 transition-all active:scale-95 flex items-center gap-2">
                                        <Sparkles className="w-3 h-3" /> Run Diagnostics
                                    </button>
                                </>
                            ) : (
                                <button onClick={() => setMarkersActive(false)} className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded font-medium transition-all flex items-center gap-2">
                                    <XCircle className="w-3 h-3" /> Hide Diagnostics
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Status Bar */}
                <div className="h-8 bg-slate-900 border-t border-slate-800 flex items-center px-4 text-xs text-slate-500 justify-between z-20">
                    <div className="flex space-x-4 font-mono"><span>X: 12.5</span><span>Y: 0.0</span><span>Z: -5.2</span></div>
                    <div className="flex items-center gap-4"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-500"></span> Online</span><span>Mode: {environment}</span></div>
                </div>
            </div>


        </div>
    );
};

export default SafetyModuleCanvas;