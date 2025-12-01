import { Target, Eye, Flag } from 'lucide-react';

const MissionVision = () => {
    const cards = [
        {
            title: 'Our Mission',
            description: 'At PlaXR, we empower SMEs with more accessible, affordable, and time efficient XR-based training solutions.',
            icon: Target,
            color: 'text-cyan-400',
            bg: 'bg-cyan-400/10',
        },
        {
            title: 'Our Vision',
            description: 'We envision a future in which Extended Reality (XR) transforms training and learning, where every school, company, and worker has access to it.',
            icon: Eye,
            color: 'text-purple-400',
            bg: 'bg-purple-400/10',
        },
        {
            title: 'Our Goal',
            description: 'To build the foundations for a dynamic ecosystem, where companies can keep pace with a rapidly changing technological framework by continuously upskilling their technicians through emerging technologies.',
            icon: Flag,
            color: 'text-blue-400',
            bg: 'bg-blue-400/10',
        },
    ];

    return (
        <section className="py-16 bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {cards.map((card, index) => (
                        <div key={index} className="bg-slate-800 rounded-xl p-8 border border-slate-700 hover:border-slate-600 transition-colors">
                            <div className={`w-12 h-12 rounded-lg ${card.bg} flex items-center justify-center mb-6`}>
                                <card.icon className={`h-6 w-6 ${card.color}`} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                            <p className="text-slate-400 leading-relaxed">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MissionVision;
