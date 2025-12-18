import { Box, Download, Search, Filter, Plus, Grid, List, Folder, FolderOpen } from 'lucide-react';
import { useState } from 'react';

type FolderId = 'all' | 'vmm' | 'corolla' | 'bmw' | 'ncx' | 'general';

const AssetsView = () => {
    const [activeFolder, setActiveFolder] = useState<FolderId>('vmm');
    const [searchTerm, setSearchTerm] = useState('');

    const assets = [
        // 🏭 Bridgeport Series 1 VMM
        { 
            id: 1, 
            name: 'Bridgeport Series 1 – J-Head (Step Pulley)', 
            type: 'Machine', 
            size: '142 MB', 
            date: 'Just now', 
            folder: 'vmm' as FolderId,
            imageUrl: '/images/assets/j-head.png' 
        },
        { 
            id: 2, 
            name: 'J-Head Assembly – Belt Drive System', 
            type: 'Component', 
            size: '45 MB', 
            date: 'Just now', 
            folder: 'vmm' as FolderId,
            imageUrl: '/images/assets/belt-drive.png' 
        },
        { 
            id: 3, 
            name: 'X-Axis Power Feed Unit (Red/White)', 
            type: 'Electronics', 
            size: '12 MB', 
            date: 'Just now', 
            folder: 'vmm' as FolderId,
            imageUrl: '/images/assets/power-feed.png'
        },
        { 
            id: 4, 
            name: 'T-Slot Work Table (Worn Surface Scan)', 
            type: 'Component', 
            size: '38 MB', 
            date: 'Just now', 
            folder: 'vmm' as FolderId,
            imageUrl: '/images/assets/knee-column.png'
        },
        { 
            id: 5, 
            name: 'Precision Machine Vise (6-inch)', 
            type: 'Tool', 
            size: '85 MB', 
            date: '1 hour ago', 
            folder: 'vmm' as FolderId,
            imageUrl: '/images/assets/machine-vise.png'
        },
        { 
            id: 6, 
            name: 'R8 Collet Set & Drawbar', 
            type: 'Tool', 
            size: '5 MB', 
            date: '3 hours ago', 
            folder: 'vmm' as FolderId,
            imageUrl: '/images/assets/collet-drawbar.png'
        },

        // 🏎️ Honda NSX (NC1) - Added Previews
        { 
            id: 8, 
            name: 'Honda NSX (NC1) – Full Body', 
            type: 'Vehicle', 
            size: '52 MB', 
            date: '1 day ago', 
            folder: 'ncx' as FolderId,
            imageUrl: '/images/assets/full_body.png' // Added
        },
        { 
            id: 9, 
            name: 'Honda NSX (NC1) PCCB Front Disc & Pad', 
            type: 'Component', 
            size: '11 MB', 
            date: '1 day ago', 
            folder: 'ncx' as FolderId,
            imageUrl: '/images/assets/disk_caliper.png' // Added
        },
        { 
            id: 10, 
            name: 'Honda NSX (NC1) Rear Wing & Aero Kit – Adjustable', 
            type: 'Component', 
            size: '18 MB', 
            date: '2 days ago', 
            folder: 'ncx' as FolderId,
            imageUrl: '/images/assets/aero_kit.png' // Added
        },
        { 
            id: 11, 
            name: 'Honda NSX (NC1) Roll Cage & 6-Point Harness', 
            type: 'Safety', 
            size: '13 MB', 
            date: '1 week ago', 
            folder: 'ncx' as FolderId,
            imageUrl: '/images/assets/roll_cage.png' // Added
        },

        // 🛠️ General Assets
        { id: 12, name: 'Torque Wrench – 20–200 Nm (XR Tool)', type: 'Tool', size: '3.2 MB', date: '3 days ago', folder: 'general' as FolderId },
        { id: 13, name: 'Floor Jack & Jack Stands Set', type: 'Tool', size: '7.8 MB', date: '4 days ago', folder: 'general' as FolderId },
        { id: 14, name: 'Wheel Nut & Center-Lock Kit', type: 'Component', size: '4.1 MB', date: '2 weeks ago', folder: 'general' as FolderId },
        { id: 15, name: 'Standard PPE Pack (Helmet, Gloves, Boots, Vest)', type: 'PPE', size: '5.6 MB', date: '5 days ago', folder: 'general' as FolderId },
        { id: 16, name: 'Fire Extinguisher – CO₂ 5 kg', type: 'Safety', size: '1.9 MB', date: '6 days ago', folder: 'general' as FolderId },
        { id: 17, name: 'Warning Cones & Barrier Tape Set', type: 'Prop', size: '2.3 MB', date: '1 week ago', folder: 'general' as FolderId },
        { id: 18, name: 'Workshop Garage – 4-Bay Service Area', type: 'Environment', size: '34 MB', date: '2 days ago', folder: 'general' as FolderId },
        { id: 19, name: 'Pit Lane – Track-Day Environment', type: 'Environment', size: '29 MB', date: '3 days ago', folder: 'general' as FolderId },
    ];

    const folders: { id: FolderId; label: string; description: string }[] = [
        { id: 'all', label: 'All Assets', description: 'Everything in your library' },
        { id: 'vmm', label: 'Bridgeport Series 1 VMM', description: 'Vertical Milling Machine' },
        { id: 'ncx', label: 'Honda NSX (NC1)', description: 'Hybrid Supercar' },
        { id: 'general', label: 'General Assets', description: 'Tools, PPE & environments' },
    ];

    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filteredAssets = assets.filter((asset) => {
        const matchesFolder = activeFolder === 'all' || asset.folder === activeFolder;
        const matchesSearch =
            normalizedSearch.length === 0 ||
            asset.name.toLowerCase().includes(normalizedSearch) ||
            asset.type.toLowerCase().includes(normalizedSearch);
        return matchesFolder && matchesSearch;
    });

    return (
        <div className="flex-1 bg-slate-950 p-8 overflow-y-auto h-screen font-sans">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Asset Library</h2>
                    <p className="text-slate-400 mt-1">
                        Browse vehicle-specific folders and shared workshop assets.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center px-4 py-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white rounded-lg shadow-lg shadow-cyan-500/20 transition-all text-sm font-medium">
                        <Plus className="h-4 w-4 mr-2" />
                        Upload Asset
                    </button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search assets by name or type..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
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

            {/* Folder Row */}
            <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
                {folders.map((folder) => {
                    const count = assets.filter((a) => folder.id === 'all' || a.folder === folder.id).length;
                    const isActive = activeFolder === folder.id;

                    return (
                        <button
                            key={folder.id}
                            onClick={() => setActiveFolder(folder.id)}
                            className={`flex flex-col items-start px-3 py-3 rounded-xl border text-left transition-all ${
                                isActive
                                    ? 'border-cyan-500/70 bg-slate-900 shadow-lg shadow-cyan-500/10'
                                    : 'border-slate-800 bg-slate-900/40 hover:border-cyan-500/40 hover:bg-slate-900/70'
                            }`}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                {isActive ? (
                                    <FolderOpen className="h-4 w-4 text-cyan-400" />
                                ) : (
                                    <Folder className="h-4 w-4 text-slate-400" />
                                )}
                                <span className="text-xs font-semibold text-white truncate">
                                    {folder.label}
                                </span>
                            </div>
                            <p className="text-[11px] text-slate-500 truncate mb-1">{folder.description}</p>
                            <span className="text-[10px] text-slate-500">
                                {count} asset{count !== 1 ? 's' : ''}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Grid Section */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredAssets.map((asset) => (
                    <div
                        key={asset.id}
                        className="group bg-slate-900/40 border border-slate-800 rounded-xl p-4 hover:border-cyan-500/30 hover:bg-slate-900/60 transition-all cursor-pointer hover:shadow-lg hover:shadow-cyan-500/5 backdrop-blur-sm flex flex-col"
                    >
                        {/* 🖼️ Zone d'Image / Icône Modifiée */}
                        <div className="aspect-square bg-slate-800/50 rounded-lg mb-4 flex items-center justify-center group-hover:bg-slate-800 transition-colors relative overflow-hidden border border-slate-800/50 group-hover:border-slate-700">
                            
                            {/* LOGIQUE D'AFFICHAGE CONDITIONNEL */}
                            {/* Si une image existe, on l'affiche */}
                            {(asset as any).imageUrl ? (
                                <img 
                                    src={(asset as any).imageUrl} 
                                    alt={asset.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                />
                            ) : (
                                // Sinon, on garde l'icône par défaut
                                <Box className="h-12 w-12 text-slate-600 group-hover:text-cyan-400 transition-all duration-300 group-hover:scale-110" />
                            )}

                            {/* Overlay Actions (Toujours par dessus) */}
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
                            <h3 className="text-sm font-semibold text-white truncate group-hover:text-cyan-400 transition-colors">
                                {asset.name}
                            </h3>
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