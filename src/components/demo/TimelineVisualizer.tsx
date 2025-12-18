import { Trash2 } from 'lucide-react';

interface Step {
    id: number;
    title: string;
    script: string;
}

interface TimelineVisualizerProps {
    steps: Step[];
    activeStepIndex?: number;
}

const TimelineVisualizer = ({ steps, activeStepIndex = 0 }: TimelineVisualizerProps) => {
    return (
        <div className="w-full flex items-center relative overflow-x-auto custom-scrollbar px-12 py-6">
            {/* Container for content that grows - Centered using mx-auto */}
            <div className="relative flex items-start pl-4 pr-12 mx-auto w-fit">

                {/* Steps Group */}
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-start">
                        <div className="flex flex-col items-center group/item relative focus:outline-none">
                            {/* Container for Dot */}
                            <div className="relative">
                                {/* Indicator Dot */}
                                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg font-bold z-10 transition-all duration-300 bg-slate-900 ${index === activeStepIndex
                                    ? 'border-cyan-500 text-cyan-400 scale-110 shadow-[0_0_25px_rgba(6,182,212,0.4)]'
                                    : 'border-slate-600 text-slate-500'
                                    }`}>
                                    {index + 1}
                                </div>
                            </div>

                            {/* Text Label */}
                            <div className="mt-3 w-0 flex justify-center overflow-visible">
                                <span className={`whitespace-nowrap text-xs font-bold px-2 py-1 rounded transition-all duration-300 ${index === activeStepIndex
                                    ? 'text-cyan-400 bg-slate-800 border border-cyan-500/30'
                                    : 'text-slate-400 bg-transparent border border-transparent'
                                    }`}>
                                    {step.title}
                                </span>
                            </div>
                        </div>

                        {/* Dashed Line Connector */}
                        {index < steps.length - 1 && (
                            <div className="w-16 h-0.5 border-t-2 border-dashed border-slate-700 mx-2 mt-6"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimelineVisualizer;
