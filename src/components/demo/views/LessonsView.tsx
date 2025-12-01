import { Play, Clock, CheckCircle } from 'lucide-react';

const LessonsView = () => {
    const lessons = [
        { id: 1, title: 'Safety Protocols 101', duration: '15 min', status: 'Completed', progress: 100 },
        { id: 2, title: 'Equipment Handling', duration: '25 min', status: 'In Progress', progress: 45 },
        { id: 3, title: 'Emergency Response', duration: '20 min', status: 'Not Started', progress: 0 },
        { id: 4, title: 'Hazard Identification', duration: '30 min', status: 'Not Started', progress: 0 },
    ];

    return (
        <div className="flex-1 bg-slate-950 p-8 overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Course Lessons</h2>
            <div className="grid gap-4">
                {lessons.map((lesson) => (
                    <div key={lesson.id} className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex items-center justify-between hover:border-cyan-500/50 transition-colors group">
                        <div className="flex items-center space-x-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${lesson.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                                    lesson.status === 'In Progress' ? 'bg-cyan-500/20 text-cyan-400' :
                                        'bg-slate-800 text-slate-500'
                                }`}>
                                {lesson.status === 'Completed' ? <CheckCircle className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                            </div>
                            <div>
                                <h3 className="text-white font-medium group-hover:text-cyan-400 transition-colors">{lesson.title}</h3>
                                <div className="flex items-center text-xs text-slate-500 mt-1 space-x-3">
                                    <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {lesson.duration}</span>
                                    <span>{lesson.status}</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-32">
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${lesson.status === 'Completed' ? 'bg-green-500' : 'bg-cyan-500'
                                        }`}
                                    style={{ width: `${lesson.progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LessonsView;
