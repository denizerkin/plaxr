"use client";
import { useState } from 'react';
import { 
  Move, 
  Maximize, 
  RotateCw, 
  MousePointer2, 
  Globe, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Wrench, 
  Hammer, 
  Flame, 
  Fan 
} from 'lucide-react';

const SafetyModuleCanvas = () => {
    const [environment, setEnvironment] = useState('grid');
    const [showAiLayer, setShowAiLayer] = useState(true);
    const [markersActive, setMarkersActive] = useState(false);

    const getBackgroundStyle = () => {
        switch (environment) {
            case 'warehouse':
                return "bg-slate-900"; // Fallback if image missing, normally url('/images/warehouse.png')
            case 'office':
                return "bg-slate-800";
            case 'outdoor':
                return "bg-sky-950";
            default: // grid
                return "bg-[linear-gradient(rgba(30,41,59,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.5)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]";
        }
    };

    return (
        <div className="flex-1 w-full h-screen bg-slate-950 relative overflow-hidden flex flex-col font-sans selection:bg-cyan-500/30">
            
            {/* --- AI Preview Label (Top Center) --- */}
            {showAiLayer && (
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-30 animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 px-6 py-2 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.2)] flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                        <span className="text-slate-200 text-sm font-medium tracking-wide">
                            AI Preview: <span className="text-cyan-400">Plane Engine Maintenance Safety Module</span>
                        </span>
                    </div>
                </div>
            )}

            {/* --- Toolbar --- */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-slate-800/90 backdrop-blur rounded-lg p-2 flex space-x-2 border border-slate-700 shadow-xl z-40">
                <button className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-700 rounded transition-colors" title="Select">
                    <MousePointer2 className="h-5 w-5" />
                </button>
                <button className="p-2 text-cyan-400 bg-slate-700 rounded transition-colors" title="Move">
                    <Move className="h-5 w-5" />
                </button>
                <button className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-700 rounded transition-colors" title="Rotate">
                    <RotateCw className="h-5 w-5" />
                </button>
                <button className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-700 rounded transition-colors" title="Scale">
                    <Maximize className="h-5 w-5" />
                </button>
                <div className="w-px h-8 bg-slate-700 mx-2"></div>
                <div className="relative group">
                    <button className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-700 rounded transition-colors flex items-center space-x-2" title="Environment">
                        <Globe className="h-5 w-5" />
                    </button>
                    {/* Dropdown */}
                    <div className="absolute top-full left-0 mt-2 w-32 bg-slate-800 border border-slate-700 rounded-md shadow-xl overflow-hidden hidden group-hover:block">
                        <button onClick={() => setEnvironment('grid')} className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-700 ${environment === 'grid' ? 'text-cyan-400' : 'text-slate-300'}`}>Grid View</button>
                        <button onClick={() => setEnvironment('warehouse')} className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-700 ${environment === 'warehouse' ? 'text-cyan-400' : 'text-slate-300'}`}>Warehouse</button>
                        <button onClick={() => setEnvironment('office')} className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-700 ${environment === 'office' ? 'text-cyan-400' : 'text-slate-300'}`}>Office</button>
                        <button onClick={() => setEnvironment('outdoor')} className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-700 ${environment === 'outdoor' ? 'text-cyan-400' : 'text-slate-300'}`}>Outdoor</button>
                    </div>
                </div>
                <button 
                    onClick={() => setShowAiLayer(!showAiLayer)}
                    className={`p-2 rounded transition-colors ml-2 ${showAiLayer ? 'text-purple-400 bg-purple-900/30' : 'text-slate-400 hover:text-purple-400'}`} 
                    title="Toggle AI Layer"
                >
                    <Sparkles className="h-5 w-5" />
                </button>
            </div>

            {/* --- 3D Viewport --- */}
            <div className="flex-1 relative grid place-items-center transition-colors duration-500 perspective-[2000px] overflow-hidden group">
                <div className={`absolute inset-0 ${getBackgroundStyle()}`}></div>

                {/* Simulated Floor Plane */}
                {environment !== 'grid' && (
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-900/80 to-transparent transform rotate-x-60 origin-bottom">
                         <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    </div>
                )}

                {/* === MAIN SCENE CONTENT === */}
                <div className="relative transform-style-3d rotate-x-10 transition-transform duration-700 scale-90 group-hover:scale-100">
                    
                    {/* 1. The Engine (CSS Constructed) */}
                    <div className="relative w-96 h-96 flex items-center justify-center">
                        
                        {/* Engine Glow */}
                        <div className="absolute inset-0 bg-cyan-500/20 blur-[60px] rounded-full animate-pulse"></div>
                        
                        {/* Outer Casing */}
                        <div className="absolute inset-4 rounded-full border-4 border-slate-600/50 bg-slate-900/40 backdrop-blur-sm shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]"></div>
                        <div className="absolute inset-4 rounded-full border border-cyan-400/30 opacity-50"></div>

                        {/* Turbine Blades (CSS Conic Gradient) */}
                        <div className="absolute inset-10 rounded-full animate-[spin_10s_linear_infinite]"
                             style={{
                                 background: 'repeating-conic-gradient(from 0deg, #334155 0deg 10deg, transparent 10deg 20deg)',
                                 maskImage: 'radial-gradient(circle, transparent 20%, black 21%)'
                             }}>
                        </div>
                        <div className="absolute inset-10 rounded-full opacity-30 animate-[spin_15s_linear_infinite_reverse]"
                             style={{
                                 background: 'repeating-conic-gradient(from 15deg, #0ea5e9 0deg 5deg, transparent 5deg 15deg)',
                                 maskImage: 'radial-gradient(circle, transparent 20%, black 21%)'
                             }}>
                        </div>

                        {/* Center Spinner */}
                        <div className="absolute w-20 h-20 bg-slate-800 rounded-full border border-slate-600 flex items-center justify-center shadow-2xl z-10">
                            <div className="w-4 h-4 bg-cyan-400/50 rounded-full blur-sm"></div>
                        </div>

                        {/* Holographic Wireframe Overlay */}
                        <div className="absolute -inset-8 border border-cyan-500/20 rounded-full border-dashed animate-[spin_60s_linear_infinite]"></div>
                        <div className="absolute -inset-8 border-l border-r border-cyan-500/10 rounded-full skew-y-12"></div>
                    </div>

                    {/* 2. Safety Railings (Perspective CSS) */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[140%] h-32 flex justify-between items-end pointer-events-none">
                         {/* Left Rail */}
                         <div className="h-24 w-40 border-2 border-yellow-500/60 bg-yellow-500/5 -skew-x-12 transform origin-bottom-right translate-x-10 rounded-sm">
                             <div className="w-full h-1/2 border-b border-yellow-500/40"></div>
                             {markersActive && (
                                <div className="absolute -top-12 left-1/2 animate-bounce bg-black/80 text-yellow-500 p-2 rounded border border-yellow-500/50">
                                    <AlertTriangle size={20} />
                                </div>
                             )}
                         </div>
                         {/* Right Rail */}
                         <div className="h-24 w-40 border-2 border-yellow-500/60 bg-yellow-500/5 skew-x-12 transform origin-bottom-left -translate-x-10 rounded-sm">
                             <div className="w-full h-1/2 border-b border-yellow-500/40"></div>
                             {markersActive && (
                                <div className="absolute -top-12 left-1/2 animate-bounce bg-black/80 text-yellow-500 p-2 rounded border border-yellow-500/50 delay-100">
                                    <AlertTriangle size={20} />
                                </div>
                             )}
                         </div>
                    </div>

                    {/* 3. Floating Tools (Left Side) */}
                    <div className="absolute top-0 -left-40 flex flex-col gap-4">
                        <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-lg hover:border-cyan-400/50 hover:bg-slate-700/80 transition-all cursor-pointer group/tool">
                            <Wrench className="w-5 h-5 text-slate-400 group-hover/tool:text-cyan-400" />
                        </div>
                        <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-lg hover:border-cyan-400/50 hover:bg-slate-700/80 transition-all cursor-pointer group/tool">
                            <Hammer className="w-5 h-5 text-slate-400 group-hover/tool:text-cyan-400" />
                        </div>
                    </div>

                    {/* 4. Floating Checklist (Right Side) */}
                    {showAiLayer && (
                        <div className="absolute -top-10 -right-56 w-48 bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-lg p-3 shadow-2xl animate-in slide-in-from-right-8 duration-700">
                            <div className="flex justify-between items-center mb-3 border-b border-slate-800 pb-2">
                                <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-wider">Safety Checklist</h3>
                                <CheckCircle2 className="w-3 h-3 text-green-500" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-xs text-slate-300">
                                    <div className="w-3 h-3 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <CheckCircle2 className="w-2 h-2 text-green-500" />
                                    </div>
                                    <span>Safety Boards</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-300">
                                    <div className="w-3 h-3 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <CheckCircle2 className="w-2 h-2 text-green-500" />
                                    </div>
                                    <span>Clearance Check</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-400 opacity-50">
                                    <div className="w-3 h-3 rounded-full border border-slate-600"></div>
                                    <span>Debris Scan</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 5. AR Markers (On Engine) */}
                    {markersActive && (
                        <>
                            {/* Hot Surface Marker */}
                            <div className="absolute top-10 right-10 flex flex-col items-center animate-in zoom-in duration-300">
                                <div className="bg-orange-500/20 border border-orange-500 text-orange-400 px-2 py-1 rounded text-[10px] font-bold mb-1 uppercase tracking-tighter backdrop-blur-sm">
                                    Hot Surface
                                </div>
                                <div className="w-8 h-8 rounded-full border-2 border-orange-500 flex items-center justify-center bg-black/50">
                                    <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                                </div>
                                <div className="w-px h-8 bg-orange-500/50"></div>
                            </div>

                            {/* Rotating Parts Marker */}
                            <div className="absolute bottom-20 left-10 flex flex-col items-center animate-in zoom-in duration-300 delay-150">
                                <div className="bg-yellow-500/20 border border-yellow-500 text-yellow-400 px-2 py-1 rounded text-[10px] font-bold mb-1 uppercase tracking-tighter backdrop-blur-sm">
                                    Rotating Parts
                                </div>
                                <div className="w-8 h-8 rounded-full border-2 border-yellow-500 flex items-center justify-center bg-black/50">
                                    <Fan className="w-4 h-4 text-yellow-500 animate-[spin_3s_linear_infinite]" />
                                </div>
                                <div className="w-px h-6 bg-yellow-500/50"></div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* --- AI Assistant (Bottom Right) --- */}
            <div className="absolute bottom-12 right-6 z-50 flex flex-col items-end gap-2 max-w-sm">
                
                {/* Chat Bubble */}
                <div className="bg-slate-900/95 backdrop-blur-md border border-purple-500/30 p-4 rounded-2xl rounded-br-none shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-500">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shrink-0">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h4 className="text-purple-400 text-sm font-semibold mb-1">AI Assistant</h4>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                I've generated the preview for the <span className="text-cyan-400">Jet Engine Safety Module</span>. 
                                Would you like me to finalize the boundary zones and add standard hazard markers?
                            </p>
                        </div>
                    </div>
                    
                    {/* Actions */}
                    {!markersActive ? (
                        <div className="mt-3 flex gap-2 justify-end">
                            <button 
                                onClick={() => setMarkersActive(false)} 
                                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                            >
                                Dismiss
                            </button>
                            <button 
                                onClick={() => setMarkersActive(true)}
                                className="px-3 py-1.5 text-xs bg-purple-600 hover:bg-purple-500 text-white rounded font-medium shadow-lg shadow-purple-900/20 transition-all active:scale-95 flex items-center gap-2"
                            >
                                <Sparkles className="w-3 h-3" />
                                Yes, add markers
                            </button>
                        </div>
                    ) : (
                        <div className="mt-3 text-right">
                             <span className="text-xs text-green-400 flex items-center justify-end gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Markers added successfully
                             </span>
                        </div>
                    )}
                </div>
            </div>

            {/* --- Bottom Status Bar --- */}
            <div className="h-8 bg-slate-900 border-t border-slate-800 flex items-center px-4 text-xs text-slate-500 justify-between z-20">
                <div className="flex space-x-4 font-mono">
                    <span>X: 12.5</span>
                    <span>Y: 0.0</span>
                    <span>Z: -5.2</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-500"></span> Online</span>
                    <span>Grid: 1m</span>
                </div>
            </div>
        </div>
    );
};

export default SafetyModuleCanvas;