import { Bot, ChevronDown, Plus, Settings } from 'lucide-react';

const Inspector = () => {
  return (
    <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col">
      {/* Properties Panel */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 border-b border-slate-800">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
            Lesson Properties
          </h2>

          <div className="space-y-4">
            {/* Lesson name */}
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Lesson name
              </label>
              <input
                type="text"
                value="GT3RS_BrakePads_Change"
                className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                readOnly
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Internal ID for this XR maintenance scenario.
              </p>
            </div>

            {/* Target vehicle */}
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Target vehicle
              </label>
              <div className="relative">
                <select className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white appearance-none focus:outline-none focus:border-cyan-500">
                  <option>Porsche 911 GT3 RS (992)</option>
                  <option>Tesla Model 3</option>
                  <option>BMW i4</option>
                  <option>Toyota Corolla</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-slate-500 pointer-events-none" />
              </div>
            </div>

            {/* Template / scenario type */}
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Scenario template
              </label>
              <div className="relative">
                <select className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white appearance-none focus:outline-none focus:border-cyan-500">
                  <option>Brake service procedure</option>
                  <option>Track-day pre-inspection</option>
                  <option>High-voltage safety (EV)</option>
                  <option>General workshop safety</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-slate-500 pointer-events-none" />
              </div>
            </div>

            {/* Scenario metadata instead of raw Transform */}
            <div className="pt-4 border-t border-slate-800">
              <h3 className="text-xs font-medium text-slate-500 mb-3">
                Scenario metadata
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-600 uppercase">
                    Level
                  </label>
                  <select className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-[11px] text-white focus:outline-none focus:border-cyan-500">
                    <option>Intermediate</option>
                    <option>Beginner</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-600 uppercase">
                    Duration
                  </label>
                  <input
                    type="text"
                    value="25 min"
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-[11px] text-white"
                    readOnly
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-600 uppercase">
                    Environment
                  </label>
                  <select className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-[11px] text-white focus:outline-none focus:border-cyan-500">
                    <option>Pit-lane garage</option>
                    <option>Workshop bay</option>
                    <option>Outdoor track</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* XR Components (authoring-level, not engine-level) */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              XR Components
            </h2>
            <button className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-2 text-xs">
            {[
              'Vehicle anchor & reset position',
              'Hotspots: wheel, caliper & disc',
              'Torque wrench interaction',
              'PPE & safety overlay (PPE check)',
              'Assessment checkpoints & scoring',
            ].map((comp) => (
              <div
                key={comp}
                className="bg-slate-800/50 rounded px-3 py-2 text-[12px] text-slate-300 flex justify-between items-center border border-slate-800"
              >
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
          <span className="text-sm font-medium text-purple-400">
            AI Lesson Assistant
          </span>
        </div>
        <div className="bg-slate-900 rounded-lg p-3 mb-3 border border-slate-800">
          <p className="text-xs text-slate-300">
            You&apos;re designing a brake pads change lesson for the{" "}
            <span className="text-cyan-400">
              Porsche 911 GT3 RS (992)
            </span>
            . Want me to generate a step-by-step XR flow (lift car, remove
            wheel, inspect pads/discs, reinstall, torque check) with safety
            callouts and markers?
          </p>
        </div>
        <div className="flex space-x-2">
          {/* You can keep your onClick wiring for this button as before */}
          <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-xs py-2 rounded transition-colors">
            Generate lesson flow
          </button>
          <button className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded transition-colors">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inspector;
