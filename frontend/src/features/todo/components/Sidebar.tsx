import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useTodo } from '../context/TodoContext';

const Sidebar: React.FC = () => {
  const { darkMode, triggerToast } = useTodo();

  const handleExit = () => {
    triggerToast("Ending active session...");
    setTimeout(() => {
      window.location.href = "/";
    }, 1200);
  };

  return (
    <aside id="libre-side-nav" className={`hidden lg:flex flex-col items-center justify-between py-8 w-20 shrink-0 rounded-[32px] border backdrop-blur-md relative z-30 select-none lg:h-full transition-all duration-300 ${
      darkMode 
        ? 'bg-neutral-950/65 border-white/5 text-white shadow-2xl' 
        : 'bg-white/45 border-white text-neutral-900 shadow-[0_8px_32px_0_rgba(230,0,0,0.03)]'
    }`}>
      
      {/* Top Avatar Node with RED background */}
      <div className="flex flex-col items-center gap-8">
        <Link to="/profile" title="Profile" className="relative group animate-fade-in">
          <div className="w-11 h-11 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center font-bold text-white text-base tracking-tighter transition-transform duration-300 group-hover:scale-105">
            L
          </div>
        </Link>

        {/* Mid Geometric Shapes & Routing Indicators */}
        <nav className="flex flex-col items-center gap-6">
          
          {/* Daily Todo Item - ACTIVE CHECK - Solid Circle Highlighted */}
          <Link 
            to="/dailytodo" 
            className={`relative group p-3 transition-all flex items-center justify-center ${
              darkMode ? 'text-white' : 'text-neutral-900'
            }`}
            title="Daily Todo Page"
          >
            <div className={`w-4.5 h-4.5 rounded-full ${
              darkMode ? 'bg-white' : 'bg-neutral-950'
            }`} />
            {/* Micro tooltip pill */}
            <div className={`absolute left-full ml-4 top-1/2 -translate-y-1/2 hidden group-hover:block border px-2.5 py-1 text-[10px] font-mono rounded whitespace-nowrap z-50 shadow-xl transition-colors duration-300 ${
              darkMode 
                ? 'bg-neutral-900 border-white/10 text-white' 
                : 'bg-white border-neutral-200 text-neutral-900 shadow-neutral-200/50'
            }`}>
              Daily Todo [Active Circle]
            </div>
          </Link>

          {/* Sandbox Route - Simple Solid Square */}
          <Link 
            to="/sandbox" 
            className={`relative group p-3 transition-all flex items-center justify-center ${
              darkMode ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-neutral-950'
            }`}
            title="Variables Sandbox"
          >
            <div className={`w-4 h-4 transition-colors rounded-sm ${
              darkMode ? 'bg-neutral-500 hover:bg-white' : 'bg-neutral-600 hover:bg-neutral-950'
            }`} />
            <div className={`absolute left-full ml-4 top-1/2 -translate-y-1/2 hidden group-hover:block border px-2.5 py-1 text-[10px] font-mono rounded whitespace-nowrap z-50 shadow-xl transition-colors duration-300 ${
              darkMode 
                ? 'bg-neutral-900 border-white/10 text-white' 
                : 'bg-white border-neutral-200 text-neutral-900 shadow-neutral-200/50'
            }`}>
              Variables Sandbox (Square)
            </div>
          </Link>

          {/* Dashboard Route - Simple Solid Triangle */}
          <Link
            to="/dashboard" 
            className={`relative group p-3 transition-all flex items-center justify-center ${
              darkMode ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-neutral-950'
            }`}
            title="System Telemetry"
          >
            <div className={`w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-b-[16px] transition-colors ${
              darkMode 
                ? 'border-b-neutral-500 hover:border-b-white' 
                : 'border-b-neutral-600 hover:border-b-neutral-950'
            }`} />
            <div className={`absolute left-full ml-4 top-1/2 -translate-y-1/2 hidden group-hover:block border px-2.5 py-1 text-[10px] font-mono rounded whitespace-nowrap z-50 shadow-xl transition-colors duration-300 ${
              darkMode 
                ? 'bg-neutral-900 border-white/10 text-white' 
                : 'bg-white border-neutral-200 text-neutral-900 shadow-neutral-200/50'
            }`}>
              Dashboard Telemetry (Triangle)
            </div>
          </Link>
        </nav>
      </div>

      {/* Bottom Settings Cog Node - Logout X button */}
      <button 
        onClick={handleExit} 
        className={`group flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all cursor-pointer ${
          darkMode 
            ? 'text-neutral-400 hover:text-red-500 hover:bg-white/5' 
            : 'text-neutral-700 hover:text-red-600 hover:bg-neutral-100'
        }`}
        title="Sovereignty Logout"
      >
        <X className={`w-4 h-4 transition-all duration-300 stroke-[2.5] ${
          darkMode 
            ? 'text-neutral-400 group-hover:text-red-500' 
            : 'text-neutral-700 group-hover:text-red-600'
        }`} />
        <span className={`text-[8px] font-mono font-bold tracking-widest uppercase mt-1 transition-opacity ${
          darkMode ? 'opacity-40 group-hover:opacity-100 text-neutral-400' : 'opacity-65 group-hover:opacity-100 text-neutral-800'
        }`}>Exit</span>
      </button>
    </aside>
  );
};

export default Sidebar;
