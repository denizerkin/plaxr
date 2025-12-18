import Link from 'next/link';
import { Menu } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                            PlaXR
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link href="/" className="group relative px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-cyan-400">
                                <span>Home</span>
                                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            <Link href="#features" className="group relative px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-cyan-400">
                                <span>Features</span>
                                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            <Link href="#team" className="group relative px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-cyan-400">
                                <span>Team</span>
                                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            <Link href="#contact" className="group relative px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-cyan-400">
                                <span>Contact</span>
                                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            <Link href="/lessons/machinery" className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-lg shadow-cyan-500/20">
                                Start Creating
                            </Link>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
