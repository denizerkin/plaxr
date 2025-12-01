import { Box, Download, Search, Filter, Plus, Grid, List } from 'lucide-react';

const AssetsView = () => {
    const assets = [
        { id: 1, name: 'Forklift v2', type: 'Vehicle', size: '12 MB', date: '2 days ago' },
        { id: 2, name: 'Safety Helmet', type: 'Equipment', size: '2.4 MB', date: '1 week ago' },
        { id: 3, name: 'Warehouse Rack', type: 'Structure', size: '5.1 MB', date: '3 days ago' },
        { id: 4, name: 'Fire Extinguisher', type: 'Safety', size: '1.8 MB', date: '1 day ago' },
        { id: 5, name: 'Pallet Jack', type: 'Vehicle', size: '8 MB', date: '5 days ago' },
        { id: 6, name: 'Warning Sign', type: 'Prop', size: '0.5 MB', date: '2 weeks ago' },
        { id: 7, name: 'Industrial Lamp', type: 'Prop', size: '1.2 MB', date: '1 day ago' },
        { id: 8, name: 'Conveyor Belt', type: 'Machine', size: '15 MB', date: '3 days ago' },
    ];

    return (
        <div className="flex-1 bg-slate-950 p-8 overflow-y-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Asset Library</h2>
                    <p className="text-slate-400 mt-1">Manage and organize your 3D assets and resources.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center px-4 py-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white rounded-lg shadow-lg shadow-cyan-500/20 transition-all text-sm font-medium">
                        <Plus className="h-4 w-4 mr-2" />
                        Upload Asset
                    </button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search assets..."
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600"
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button className="flex items-center px-4 py-2.5 bg-slate-900/50 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-lg transition-colors text-sm font-medium">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                    </button>
                    <div className="h-8 w-px bg-slate-800 mx-2 hidden md:block"></div>
                    <div className="flex bg-slate-900/50 border border-slate-800 rounded-lg p-1">
                        <button className="p-2 bg-slate-800 text-cyan-400 rounded-md shadow-sm">
                            <Grid className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-slate-500 hover:text-slate-300 transition-colors">
                            <List className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid Section */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {assets.map((asset) => (
                    <div key={asset.id} className="group bg-slate-900/40 border border-slate-800 rounded-xl p-4 hover:border-cyan-500/30 hover:bg-slate-900/60 transition-all cursor-pointer hover:shadow-lg hover:shadow-cyan-500/5 backdrop-blur-sm flex flex-col">
                        <div className="aspect-square bg-slate-800/50 rounded-lg mb-4 flex items-center justify-center group-hover:bg-slate-800 transition-colors relative overflow-hidden border border-slate-800/50 group-hover:border-slate-700">
                            <Box className="h-12 w-12 text-slate-600 group-hover:text-cyan-400 transition-all duration-300 group-hover:scale-110" />

                            {/* Overlay Actions */}
                            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                                <button className="p-2 bg-cyan-600 rounded-lg text-white hover:bg-cyan-500 transition-colors shadow-lg transform translate-y-2 group-hover:translate-y-0 duration-300">
                                    <Download className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Type Badge */}
                            <div className="absolute top-2 left-2">
                                <span className="px-2 py-1 bg-slate-950/80 backdrop-blur-md rounded-md text-[10px] font-medium text-slate-300 border border-slate-800">
                                    {asset.type.toUpperCase()}
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col">
                            <h3 className="text-sm font-semibold text-white truncate group-hover:text-cyan-400 transition-colors">{asset.name}</h3>
                            <div className="flex items-center justify-between mt-auto pt-3 text-xs text-slate-500">
                                <span>{asset.size}</span>
                                <span>{asset.date}</span>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Upload Placeholder */}
                <div className="border-2 border-dashed border-slate-800 rounded-xl p-4 hover:border-cyan-500/30 hover:bg-slate-900/30 transition-all cursor-pointer flex flex-col items-center justify-center text-slate-500 hover:text-cyan-400 min-h-[200px]">
                    <Plus className="h-8 w-8 mb-3 opacity-50" />
                    <span className="text-sm font-medium">Upload New</span>
                </div>
            </div>
        </div>
    );
};

export default AssetsView;
