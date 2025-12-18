import { Bot, ChevronDown, Plus, Settings, Save } from 'lucide-react';

interface InspectorProps {
  currentScript?: string;
  currentStepTitle?: string;
  onScriptChange?: (newScript: string) => void;
  onStepTitleChange?: (newTitle: string) => void;
  lessonName?: string;
  onLessonNameChange?: (newName: string) => void;
  lessonDuration?: string;
  onLessonDurationChange?: (newDuration: string) => void;
}

const Inspector = ({ currentScript, currentStepTitle, onScriptChange, onStepTitleChange, lessonName, onLessonNameChange, lessonDuration, onLessonDurationChange }: InspectorProps) => {
  return (
    <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col h-full z-20">
      {/* Properties Panel */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Lesson Properties
            </h2>
            <button className="flex items-center gap-1 text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/20 px-2 py-1 rounded transition-colors">
              <Save className="w-3 h-3" />
              SAVE
            </button>
          </div>

          <div className="space-y-4">
            {/* Step Title Field */}
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Step Title
              </label>
              <input
                type="text"
                value={currentStepTitle || ""}
                onChange={(e) => onStepTitleChange?.(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 mb-4"
              />
            </div>

            {/* Script Field (Integrated) */}
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Step Script
              </label>
              <textarea
                value={currentScript || ""}
                onChange={(e) => onScriptChange?.(e.target.value)}
                placeholder="Enter script for this step..."
                className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-cyan-500 min-h-[80px] text-xs leading-relaxed resize-none transition-colors focus:bg-slate-800/80"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Script for current step
              </p>
            </div>

            {/* Lesson name */}
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Lesson name
              </label>
              <input
                type="text"
                value={lessonName}
                onChange={(e) => onLessonNameChange?.(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Internal ID for this XR maintenance scenario.
              </p>
            </div>

            {/* Target Machine */}
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Target Vehicle
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select className="col-span-2 w-full bg-slate-800 border border-slate-700 rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500">
                  <option>Sports Coupe (GT3)</option>
                  <option>Sedan</option>
                  <option>SUV</option>
                  <option>Pick-up Truck</option>
                </select>
              </div>
            </div>

            {/* Scenario template */}
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Scenario template
              </label>
              <select className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500">
                <option>Engine Overhaul</option>
                <option>Routine Maintenance</option>
                <option>Diagnostics (OBDII)</option>
                <option>Brake System Check</option>
              </select>
            </div>

            {/* Scenario metadata instead of raw Transform */}
            <div className="pt-2 border-t border-slate-800">
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
                    value={lessonDuration}
                    onChange={(e) => onLessonDurationChange?.(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-[11px] text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-600 uppercase">
                    Environment
                  </label>
                  <select className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-[11px] text-white focus:outline-none focus:border-cyan-500">
                    <option>Service Bay</option>
                    <option>Garage</option>
                    <option>Showroom</option>
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
              'OBDII Scanner Tool',
              'Hotspots: Engine, Battery, ECU',
              'Part Removal Interaction',
              'Torque Wrench Feedback',
              'Quiz: Identify Failed Part',
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
            You&apos;re designing a diagnostics module for the{" "}
            <span className="text-cyan-400">
              Porsche 911 GT3 RS
            </span>
            . Want me to generate a flow for scanning OBDII codes, inspecting
            spark plugs, and replacing ignition coils?
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
