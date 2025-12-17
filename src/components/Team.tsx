import { User } from 'lucide-react';

const Team = () => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    const team = [
        {
            name: 'Asen',
            image: `${basePath}/images/Asen.jpg`,
        },
        {
            name: 'Deniz',
            image: `${basePath}/images/Deniz.png`,
        },
        {
            name: 'Eliott',
            image: `${basePath}/images/eliott.png`,
        },
        {
            name: 'Fariborz',
            image: `${basePath}/images/Fariborz.jpg`,
        },
        {
            name: 'Francesco',
            image: `${basePath}/images/Francesco.jpg`,
        },
        {
            name: 'Niccolo',
            image: `${basePath}/images/Niccolo.png`,
        },
    ];

    return (
        <section id="team" className="py-24 bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Meet the Team</h2>
                    <p className="mt-4 text-lg text-slate-400">
                        The visionaries building the future of immersive learning.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                    {team.map((member) => (
                        <div key={member.name} className="text-center">
                            <div className="space-y-4">
                                <img className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56 object-cover border-4 border-slate-800 shadow-xl" src={member.image} alt={member.name} />
                                <div className="space-y-2">
                                    <div className="text-lg leading-6 font-medium space-y-1">
                                        <h3 className="text-white">{member.name}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
