import LinkSidebar from '@/components/demo/LinkSidebar';

export default function LessonsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-slate-950 text-white font-sans overflow-hidden">
            {/* Permanent Sidebar */}
            <LinkSidebar />

            {/* Main Content Area */}
            <main className="flex-1 h-full overflow-hidden relative">
                {children}
            </main>
        </div>
    );
}
