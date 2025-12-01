import { Save, Bell, Lock, User, Monitor } from 'lucide-react';

const SettingsView = () => {
    return (
        <div className="flex-1 bg-slate-950 p-8 overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>

            <div className="max-w-2xl space-y-8">
                {/* Profile Section */}
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                        <User className="h-5 w-5 text-cyan-400 mr-2" />
                        <h3 className="text-lg font-medium text-white">Profile Settings</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">First Name</label>
                                <input type="text" defaultValue="User" className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-cyan-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Last Name</label>
                                <input type="text" defaultValue="Name" className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-cyan-500" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
                            <input type="email" defaultValue="user@example.com" className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-cyan-500" />
                        </div>
                    </div>
                </div>

                {/* Notifications Section */}
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                        <Bell className="h-5 w-5 text-cyan-400 mr-2" />
                        <h3 className="text-lg font-medium text-white">Notifications</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-slate-300">Email Notifications</span>
                            <div className="w-11 h-6 bg-cyan-600 rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-slate-300">Push Notifications</span>
                            <div className="w-11 h-6 bg-slate-700 rounded-full relative cursor-pointer">
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Appearance Section */}
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                        <Monitor className="h-5 w-5 text-cyan-400 mr-2" />
                        <h3 className="text-lg font-medium text-white">Appearance</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="border-2 border-cyan-500 rounded-lg p-2 bg-slate-800 cursor-pointer">
                            <div className="h-12 bg-slate-900 rounded mb-2"></div>
                            <div className="text-center text-xs text-cyan-400 font-medium">Dark</div>
                        </div>
                        <div className="border border-slate-700 rounded-lg p-2 bg-slate-800 cursor-pointer opacity-50">
                            <div className="h-12 bg-white rounded mb-2"></div>
                            <div className="text-center text-xs text-slate-400 font-medium">Light</div>
                        </div>
                        <div className="border border-slate-700 rounded-lg p-2 bg-slate-800 cursor-pointer opacity-50">
                            <div className="h-12 bg-gradient-to-r from-slate-900 to-white rounded mb-2"></div>
                            <div className="text-center text-xs text-slate-400 font-medium">System</div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button className="flex items-center bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-md font-medium transition-colors shadow-lg shadow-cyan-500/20">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsView;
