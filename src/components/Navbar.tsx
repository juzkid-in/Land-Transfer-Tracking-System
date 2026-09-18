import React from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Link as LinkIcon, 
  History, 
  ShieldCheck, 
  Dna, 
  Network, 
  Info, 
  Code2, 
  RotateCcw,
  GraduationCap
} from 'lucide-react';

export type TabType = 
  | 'dashboard' 
  | 'add-transfer' 
  | 'blockchain' 
  | 'history' 
  | 'verification' 
  | 'genesis' 
  | 'architecture' 
  | 'about'
  | 'python-viva';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onLoadSampleData: () => void;
  chainValid: boolean;
  totalBlocks: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onLoadSampleData,
  chainValid,
  totalBlocks,
}) => {
  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'add-transfer', label: 'Add Transfer', icon: <PlusCircle className="w-4 h-4" /> },
    { id: 'blockchain', label: 'Blockchain', icon: <LinkIcon className="w-4 h-4" /> },
    { id: 'history', label: 'History', icon: <History className="w-4 h-4" /> },
    { id: 'verification', label: 'Verification', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'genesis', label: 'Genesis Block', icon: <Dna className="w-4 h-4" /> },
    { id: 'architecture', label: 'Architecture', icon: <Network className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
    { id: 'python-viva', label: 'Python & Viva', icon: <Code2 className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* VTU Academic Top Ribbon */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 py-1.5 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-2">
            <span className="bg-blue-600 text-white px-2 py-0.5 rounded font-semibold text-[11px] tracking-wide">
              VTU BIC702
            </span>
            <span className="font-medium text-slate-300">
              Blockchain Technology | Activity Based Learning – Activity 2 (No. 21)
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-slate-400">Student:</span>
              <span className="font-semibold text-white">Sanjai Shanmuga Prabu</span>
            </div>
            <div className="flex items-center space-x-1.5 border-l border-slate-700 pl-3">
              <span className="text-slate-400">USN:</span>
              <span className="font-mono font-bold text-amber-300">1SP23IC047</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center space-x-3 text-left focus:outline-none group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition">
              <LinkIcon className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-base tracking-tight leading-tight flex items-center gap-2">
                <span>Land Transfer Tracking</span>
                <span className={`text-[11px] px-1.5 py-0.5 rounded font-mono font-semibold ${
                  chainValid 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                    : 'bg-rose-100 text-rose-800 border border-rose-300'
                }`}>
                  {chainValid ? 'CHAIN VALID' : 'TAMPER DETECTED'}
                </span>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Using Genesis Block & SHA-256 Hashing
              </div>
            </div>
          </button>

          {/* Quick Action: Load Sample Data */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onLoadSampleData}
              id="load-sample-btn"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition shadow-2xs"
              title="Loads 3 standard demo records (LAND001, LAND002, LAND003)"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
              <span>Load Sample Data</span>
            </button>
            <div className="hidden sm:flex items-center text-xs text-slate-500 font-mono bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
              <span>Blocks: <strong className="text-slate-800">{totalBlocks}</strong></span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Links */}
        <nav className="flex space-x-1 overflow-x-auto pb-1.5 scrollbar-none border-t border-slate-100 pt-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                id={`nav-tab-${item.id}`}
                className={`flex items-center space-x-2 px-3.5 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
