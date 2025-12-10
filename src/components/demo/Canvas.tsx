"use client";
import { useState } from 'react';
import { Move, Maximize, RotateCw, MousePointer2, Globe } from 'lucide-react';

const Canvas = () => {
    const [environment, setEnvironment] = useState('grid');

    const getBackgroundStyle = () => {
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
        switch (environment) {
            case 'warehouse':
                return { className: "bg-cover bg-center", style: { backgroundImage: `url('${basePath}/images/warehouse.png')` } };
            case 'office':
                return { className: "bg-cover bg-center", style: { backgroundImage: `url('${basePath}/images/office.png')` } };
            case 'outdoor':
                return { className: "bg-cover bg-center", style: { backgroundImage: `url('${basePath}/images/outdoor.png')` } };
            default: // grid
                return {
                    className: "bg-[linear-gradient(rgba(30,41,59,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.5)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]",
                    style: {}
                };
        }
    };

    return (
        <div className="flex-1 bg-slate-950 relative overflow-hidden flex flex-col">
            {/* Toolbar */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-slate-800/90 backdrop-blur rounded-lg p-2 flex space-x-2 border border-slate-700 shadow-xl z-10">
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
            </div>

            {/* 3D Viewport Placeholder */}
            <div className="flex-1 relative grid place-items-center transition-colors duration-500">
                <div className={`absolute inset-0 ${getBackgroundStyle().className}`} style={getBackgroundStyle().style}></div>

                {/* Simulated Floor Plane for 3D feel */}
                {environment !== 'grid' && (
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-900/80 to-transparent transform perspective-[1000px] rotate-x-60 origin-bottom">
                        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    </div>
                )}

                {/* Mock 3D Object */}
                <div className="relative w-96 h-64 border-2 border-cyan-500/50 bg-cyan-500/5 rounded-lg flex items-center justify-center backdrop-blur-sm z-10">
                    <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-cyan-400"></div>
                    <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-cyan-400"></div>
                    <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-cyan-400"></div>
                    <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-cyan-400"></div>

                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-cyan-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                        <p className="mt-4 text-cyan-400 font-mono text-sm">Selected: Safety_Module_v2</p>
                        <p className="text-xs text-slate-500 mt-1">Env: {environment}</p>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="h-8 bg-slate-900 border-t border-slate-800 flex items-center px-4 text-xs text-slate-500 justify-between z-20">
                <div className="flex space-x-4">
                    <span>X: 12.5</span>
                    <span>Y: 0.0</span>
                    <span>Z: -5.2</span>
                </div>
                <div>
                    <span>Grid: 1m</span>
                </div>
            </div>
        </div>
    );
};

export default Canvas;
