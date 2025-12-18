"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Box, Settings, FileText, Users, ArrowLeft } from 'lucide-react';

const LinkSidebar = () => {
    const pathname = usePathname();

    const navItems = [
        { name: 'Lessons', id: 'lessons', href: '/lessons', icon: FileText, active: pathname.startsWith('/lessons') },
        { name: 'Assets', id: 'assets', href: '/demo', icon: Box, active: false },
        { name: 'Students', id: 'students', href: '/demo', icon: Users, active: false },
        { name: 'Settings', id: 'settings', href: '/demo', icon: Settings, active: false },
    ];

    return (
        <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full shrink-0">
            <div className="p-4 border-b border-slate-800">
                <Link href="/" className="flex items-center text-slate-400 hover:text-white mb-4 transition-colors group">
                    <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm">Back to Home</span>
                </Link>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    PlaXR Studio
                </h1>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.id}
                        href={item.href}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${item.active
                            ? 'bg-cyan-500/10 text-cyan-400'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.name}</span>
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center space-x-3 text-slate-400">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                        <span className="text-xs font-bold">US</span>
                    </div>
                    <div className="text-sm">
                        <p className="text-white font-medium">User Name</p>
                        <p className="text-xs">Pro Plan</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LinkSidebar;
