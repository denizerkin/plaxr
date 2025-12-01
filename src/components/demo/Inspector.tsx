import { Bot, ChevronDown, Plus, Settings } from 'lucide-react';

const Inspector = () => {
    return (
        <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col">
            {/* Properties Panel */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-4 border-b border-slate-800">
                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Properties</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Name</label>
                            <input type="text" value="Safety_Module_v2" className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500" readOnly />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Template</label>
                            <div className="relative">
                                <select className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white appearance-none focus:outline-none focus:border-cyan-500">
                                    <option>Industrial Safety</option>
                                    <option>Office Ergonomics</option>
                                    <option>Fire Evacuation</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-slate-500 pointer-events-none" />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-800">
                            <h3 className="text-xs font-medium text-slate-500 mb-3">Transform</h3>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="space-y-1">
                                    <label className="text-[10px] text-slate-600 uppercase">Position</label>
                                    <input type="text" value="12.5" className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-white" readOnly />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] text-slate-600 uppercase">Rotation</label>
                                    <input type="text" value="0" className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-white" readOnly />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] text-slate-600 uppercase">Scale</label>
                                    <input type="text" value="1.0" className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-white" readOnly />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Components</h2>
                        <button className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white">
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="space-y-2">
                        {['Collider', 'RigidBody', 'Script'].map((comp) => (
                            <div key={comp} className="bg-slate-800/50 rounded px-3 py-2 text-sm text-slate-300 flex justify-between items-center border border-slate-800">
                                <span>{comp}</span>
                                <Settings className="h-3 w-3 text-slate-600" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* AI Assistant */}
            <div className="p-4 bg-slate-800/50 border-t border-slate-800">
                <div className="flex items-center space-x-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-purple-400" />
                    </div>
                    <span className="text-sm font-medium text-purple-400">AI Assistant</span>
                </div>
                <div className="bg-slate-900 rounded-lg p-3 mb-3 border border-slate-800">
                    <p className="text-xs text-slate-300">
                        I noticed you're setting up a safety module. Would you like me to add standard hazard markers?
                    </p>
                </div>
                <div className="flex space-x-2">
                    <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-xs py-2 rounded transition-colors">Yes, add markers</button>
                    <button className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded transition-colors">Dismiss</button>
                </div>
            </div>
        </div>
    );
};

export default Inspector;
