import React, { useState } from 'react';
import { 
  Table as TableIcon, 
  X, 
  ChevronDown, 
  Calendar, 
  Hash, 
  Type, 
  Edit2, 
  Move, 
  Search, 
  Plus, 
  RefreshCw 
} from 'lucide-react';
import { useSandboxStore } from '../../store/sandboxStore';
import { useSandboxUi } from '../../context/SandboxUiContext';
import { useActiveTable } from '../../hooks/useActiveTable';
import { GET_PRESET_TEMPLATES } from '../../utils/presets';
import { validateTableName, getUniqueTableName } from '../../schemas/sandbox.schema';

export default function DesktopToolbar() {
  const {
    tables,
    activeTableId,
    setActiveTableId,
    deleteTable,
    replaceActiveTable,
    factoryResetSystem
  } = useSandboxStore();

  const activeTable = useActiveTable();

  const {
    searchFilter,
    setSearchFilter,
    setShowNewTableModal,
    triggerToast,
    setEditingColumn,
    incrementDragResetKey,
  } = useSandboxUi();

  const [showPresetDropdown, setShowPresetDropdown] = useState(false);
  const [editingTableName, setEditingTableName] = useState(false);
  const [tempTableName, setTempTableName] = useState('');

  const submitTableNameChange = () => {
    if (!tempTableName.trim()) return;
    try {
      const validated = validateTableName(tempTableName.trim());
      const uniqueName = getUniqueTableName(validated, tables, activeTableId);
      replaceActiveTable({ name: uniqueName });
      triggerToast("Table renamed successfully");
    } catch (err: any) {
      triggerToast(err.message);
    }
  };

  return (
    <div id="desktop-toolbar" className="z-35 px-4 sm:px-8 pt-4 sm:pt-5 pb-1 hidden md:flex flex-col xl:flex-row xl:items-center justify-between gap-4 shrink-0 bg-transparent select-none animate-fade-in">
      {/* Left Side: Table Selector, Renamer & Presets */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Table Selector Pills */}
        <div id="desktop-table-selector" className="flex items-center gap-1 bg-black/40 border border-white/10 p-1 rounded-xl">
          {tables.map(t => {
            const isSelected = t.id === activeTableId;
            return (
              <div
                key={t.id}
                onClick={() => {
                  setActiveTableId(t.id);
                  setEditingColumn(null);
                }}
                className={`group px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-2 border ${
                  isSelected 
                    ? 'bg-red-500/10 text-red-300 border-red-500/25 shadow-lg shadow-red-950/10' 
                    : 'text-zinc-500 border-transparent hover:text-zinc-300 hover:bg-white/[0.02]'
                }`}
              >
                <TableIcon size={11} className={isSelected ? 'text-red-400' : 'text-zinc-650'} />
                <span>{t.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    deleteTable(t.id);
                    triggerToast("Matrix discarded");
                  }}
                  className="opacity-40 hover:opacity-100 transition-opacity ml-1.5 p-0.5 hover:bg-white/10 text-zinc-455 hover:text-red-405 rounded cursor-pointer z-20"
                  title="Delete entire matrix"
                >
                  <X size={9} strokeWidth={2.5} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Preset Tables Dropdown Menu */}
        <div className="relative">
          <button
            id="btn-desktop-presets-dropdown"
            onClick={() => setShowPresetDropdown(!showPresetDropdown)}
            className="px-2.5 py-1.5 bg-black/40 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1"
            title="Apply preset structures to current matrix"
          >
            <span>Presets</span>
            <ChevronDown size={10} className={`text-zinc-500 transition-transform duration-200 ${showPresetDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showPresetDropdown && (
            <>
              <div 
                className="fixed inset-0 z-40 bg-transparent" 
                onClick={() => setShowPresetDropdown(false)} 
              />
              <div 
                onClick={(e) => e.stopPropagation()}
                className="absolute left-0 mt-2 w-52 bg-neutral-900/95 backdrop-blur-md border border-white/10 rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.6)] p-1 z-[9999] animate-fade-in flex flex-col gap-0.5"
              >
                <button
                  onClick={() => {
                    const preset = GET_PRESET_TEMPLATES('goal');
                    replaceActiveTable(preset);
                    triggerToast("Loaded milestones preset");
                    setShowPresetDropdown(false);
                  }}
                  className="w-full text-left px-2.5 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-2.5 hover:bg-white/[0.04] text-amber-200"
                >
                  <Calendar size={12} className="text-amber-400 shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-bold text-zinc-100">Milestones</span>
                    <span className="text-[9px] text-zinc-500 font-sans">Goal task scheduler</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    const preset = GET_PRESET_TEMPLATES('progress');
                    replaceActiveTable(preset);
                    triggerToast("Loaded progress preset");
                    setShowPresetDropdown(false);
                  }}
                  className="w-full text-left px-2.5 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-2.5 hover:bg-white/[0.04] text-red-300"
                >
                  <Hash size={12} className="text-red-400 shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-bold text-zinc-100">Stats Tracker</span>
                    <span className="text-[9px] text-zinc-500 font-sans">Progress statistics</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    const preset = GET_PRESET_TEMPLATES('logging');
                    replaceActiveTable(preset);
                    triggerToast("Loaded logging preset");
                    setShowPresetDropdown(false);
                  }}
                  className="w-full text-left px-2.5 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-2.5 hover:bg-white/[0.04] text-blue-300"
                >
                  <Type size={12} className="text-blue-400 shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-bold text-zinc-100">Log Registry</span>
                    <span className="text-[9px] text-zinc-500 font-sans">Event chronologer</span>
                  </div>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Active Title (Dbl Click to Edit) */}
        {activeTable && (
          <div className="flex items-center gap-2 border-l border-white/10 pl-3">
            {editingTableName ? (
               <input
                type="text"
                autoFocus
                value={tempTableName}
                onChange={(e) => setTempTableName(e.target.value)}
                onBlur={() => {
                  submitTableNameChange();
                  setEditingTableName(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    submitTableNameChange();
                    setEditingTableName(false);
                  }
                }}
                className="bg-black/60 border border-red-500/40 rounded-xl px-2.5 py-1 text-xs font-mono tracking-tight text-white outline-none w-44 focus:border-red-500"
              />
            ) : (
              <h2
                onClick={() => {
                  setTempTableName(activeTable.name);
                  setEditingTableName(true);
                }}
                className="text-xs font-mono font-bold uppercase tracking-wider text-red-400 hover:text-red-300 flex items-center gap-1.5 cursor-pointer bg-white/[0.02] border border-white/5 hover:border-white/10 px-2.5 py-1 rounded-lg transition-all"
                title="Click to rename sheet"
              >
                <span>{activeTable.name}</span>
                <Edit2 size={9} className="text-zinc-555 hover:text-white transition-colors" />
              </h2>
            )}
          </div>
        )}
      </div>

      {/* Right Side: Global Settings & Floating Tools */}
      <div className="flex items-center flex-wrap gap-2.5">
        {/* Discrete Recenter / Reset Position Button */}
        <button
          onClick={() => {
            incrementDragResetKey();
            triggerToast("Centered active matrix");
          }}
          className="p-1.5 bg-white/[0.02] hover:bg-white/[0.06] active:scale-95 border border-white/10 rounded-xl text-zinc-400 hover:text-white transition-all cursor-pointer shadow-sm flex items-center justify-center shrink-0"
          title="Recenter Matrix Table"
        >
          <Move size={11} className="text-white" />
        </button>

        {/* Realtime Row Search Filter */}
        <div className="relative">
          <Search size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search cells..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="bg-black/35 border border-white/10 rounded-xl pl-7.5 pr-2.5 py-1 text-xs font-mono placeholder-white/20 focus:outline-none focus:border-red-500/50 w-36 text-white transition-all focus:w-40 focus:bg-black/50"
          />
        </div>

        {/* New Sheet */}
        <button
          id="btn-desktop-new-table"
          onClick={() => {
            if (tables.length >= 2) {
              triggerToast("Sandbox Limit: A maximum of two custom matrices can be active simultaneously");
            } else {
              setShowNewTableModal(true);
            }
          }}
          className={`font-semibold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all ${
            tables.length >= 2
              ? 'bg-neutral-900 text-zinc-500 border border-white/5 cursor-not-allowed opacity-60'
              : 'bg-red-600 hover:bg-red-700 hover:scale-101 text-white font-bold font-mono shadow-md'
          }`}
        >
          <Plus size={11} />
          <span>New Table</span>
        </button>

        {/* Reset button */}
        <button
          onClick={() => {
            factoryResetSystem();
            triggerToast("Clean default workspace restored");
          }}
          className="p-1.5 text-zinc-500 hover:text-white hover:bg-white/5 rounded-xl transition-all cursor-pointer border border-white/5"
          title="Revert modifications to Growth blueprints"
        >
          <RefreshCw size={11} />
        </button>
      </div>
    </div>
  );
}
