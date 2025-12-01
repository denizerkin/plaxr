import { Layout, MousePointerClick, Bot } from 'lucide-react';

const Features = () => {
    const features = [
        {
            name: 'Prefabricated Templates',
            description: 'Jumpstart your course creation with industry-standard templates for safety, compliance, and technical skills.',
            icon: Layout,
        },
        {
            name: 'Drag-and-Drop Builder',
            description: 'Intuitively design complex XR scenarios without writing a single line of code. Just drag, drop, and configure.',
            icon: MousePointerClick,
        },
        {
            name: 'AI Assistance',
            description: 'Get intelligent suggestions for scene optimization and learning pathways from our built-in AI copilot.',
            icon: Bot,
        },
    ];

    return (
        <section id="features" className="py-24 bg-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-cyan-400 font-semibold tracking-wide uppercase">Features</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                        Everything you need to build immersive training
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-slate-400 lg:mx-auto">
                        PlaXR combines power with simplicity, giving you the tools to create professional-grade XR content.
                    </p>
                </div>

                <div className="mt-20">
                    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-cyan-500 text-white">
                                        <feature.icon className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-white">{feature.name}</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-slate-400">
                                    {feature.description}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
};

export default Features;
