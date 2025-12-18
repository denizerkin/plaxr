import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative bg-slate-900 overflow-hidden pt-16">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div className="sm:text-center lg:text-left">
                            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                                <span className="block xl:inline">Accelerate Practical Training</span>{' '}
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">with Immersive XR Courses</span>
                            </h1>
                            <p className="mt-3 text-base text-slate-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                PlaXR is the ultimate SaaS platform for creating hands-on, immersive XR training courses. Empower your workforce with practical learning experiences that stick.
                            </p>
                            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                <div className="rounded-md shadow">
                                    <Link href="/lessons/machinery" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 md:py-4 md:text-lg md:px-10 transition-all hover:shadow-lg hover:shadow-cyan-500/25">
                                        See Demo <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </div>
                                <div className="mt-3 sm:mt-0 sm:ml-3">
                                    <Link href="#features" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-cyan-100 bg-slate-800 hover:bg-slate-700 md:py-4 md:text-lg md:px-10 transition-colors">
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-slate-800 flex items-center justify-center overflow-hidden">
                {/* Placeholder for 3D/XR Visual */}
                <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-60"
                        style={{ backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/ai_generated_image.png')` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-transparent to-slate-900"></div>
                    <div className="relative z-10 p-8 text-center">
                        <div className="w-64 h-64 mx-auto bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
