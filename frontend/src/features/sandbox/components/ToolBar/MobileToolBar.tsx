import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  RefreshCw,
  SlidersHorizontal 
} from 'lucide-react';
import { useSandboxStore } from '../../store/sandboxStore';
import { useSandboxUi } from '../../context/SandboxUiContext';
import { useActiveTable } from '../../hooks/useActiveTable';
import { GET_PRESET_TEMPLATES } from '../../utils/presets';
import { validateTableName, getUniqueTableName } from '../../schemas/sandbox.schema';

export default function MobileToolbar() {
  const {
    tables,
    activeTableId,
    setActiveTableId,
    deleteTable,
    replaceActiveTable,
    factoryResetSystem,
  } = useSandboxStore();

  const activeTable = useActiveTable();

  const {
    searchFilter,
    setSearchFilter,
    setShowNewTableModal,
    showControlsDrawer,
    setShowControlsDrawer,
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
    <div id="mobile-toolbar" className="z-35 px-4 pt-4 pb-1 flex flex-col gap-2.5 shrink-0 bg-transparent select-none md:hidden animate-fade-in">
      {/* Row with outside/persistent controls + Options Drawer Trigger */}
      <div className="flex items-center justify-between gap-1.5">
        {/* Centering button (Persistent Outside) */}
        <button
          onClick={() => {
            incrementDragResetKey();
            triggerToast("Centered active matrix");
          }}
          className="p-2 bg-white/[0.02] hover:bg-white/[0.06] active:scale-95 border border-white/10 rounded-xl text-zinc-400 hover:text-white transition-all cursor-pointer shadow-sm flex items-center justify-center shrink-0"
          title="Recenter Matrix Table"
        >
          <Move size={11} className="text-white" />
        </button>

        {/* Realtime Row Search Filter (Persistent Outside) */}
        <div className="relative flex-1">
          <Search size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search cells..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="bg-black/35 border border-white/10 rounded-xl pl-7.5 pr-2.5 py-1.5 text-xs font-mono placeholder-white/20 focus:outline-none focus:border-red-500/50 w-full text-white transition-all focus:bg-black/50"
          />
        </div>

        {/* Option Toggle Activator Button */}
        <button
          id="btn-mobile-options-drawer"
          onClick={() => setShowControlsDrawer(!showControlsDrawer)}
          className={`px-2.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-1 bg-black/40 border ${
            showControlsDrawer 
              ? 'border-red-500/40 text-red-300 bg-red-500/5' 
              : 'border-white/10 text-zinc-300 hover:text-white hover:border-white/20'
          }`}
        >
          <SlidersHorizontal size={11} />
          <span>Options</span>
          <ChevronDown size={10} className={`text-zinc-555 transition-transform duration-200 ${showControlsDrawer ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Sliding Controls Drawer from the right side for Mobile View */}
      <AnimatePresence>
        {showControlsDrawer && (
          <>
            {/* Overlay / Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowControlsDrawer(false)}
              className="fixed inset-0 bg-black z-[10000] md:hidden"
            />

            {/* Drawer Container Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-[270px] bg-[#09090c] border-l border-white/10 p-5 mt-0 shadow-[-10px_0_40px_rgba(0,0,0,0.8)] z-[10010] flex flex-col gap-4 overflow-y-auto md:hidden"
            >
              {/* Header with Title and close button */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest block">Sheet Options</span>
                <button
                  onClick={() => setShowControlsDrawer(false)}
                  className="p-1 hover:bg-white/10 text-zinc-500 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Table Selector Pills */}
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">Select Sheet</span>
                <div className="flex flex-col gap-1.5">
                  {tables.map(t => {
                    const isSelected = t.id === activeTableId;
                    return (
                      <div
                        key={t.id}
                        onClick={() => {
                          setActiveTableId(t.id);
                          setEditingColumn(null);
                        }}
                        className={`group px-3 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center justify-between border ${
                          isSelected 
                            ? 'bg-red-500/10 text-red-300 border-red-500/25' 
                            : 'text-zinc-500 border-white/5 bg-white/[0.01]/50 hover:text-zinc-300 hover:bg-white/[0.02]'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <TableIcon size={12} className={isSelected ? 'text-red-400' : 'text-zinc-650'} />
                          <span className="truncate max-w-[140px]">{t.name}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            deleteTable(t.id);
                            triggerToast("Matrix discarded");
                          }}
                          className="opacity-40 hover:opacity-100 transition-opacity p-1 hover:bg-white/10 text-zinc-500 hover:text-red-400 rounded-lg cursor-pointer"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Presets and Renamer Area */}
              <div className="flex flex-col gap-3 pt-3 border-t border-white/10">
                <span className="text-[9px] font-mono font-bold text-zinc-505 uppercase tracking-widest block">Rename or Load</span>
                
                {/* Renamer Interaction */}
                {activeTable && (
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase">Rename Sheet</span>
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
                        className="bg-black border border-red-500/40 rounded-xl px-2.5 py-1.5 text-xs font-mono text-white outline-none w-full focus:border-red-500"
                      />
                    ) : (
                      <div
                        onClick={() => {
                          setTempTableName(activeTable.name);
                          setEditingTableName(true);
                        }}
                        className="text-xs font-mono font-bold uppercase tracking-wider text-red-500 hover:text-red-300 flex items-center justify-between cursor-pointer bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 px-2.5 py-1.5 rounded-xl transition-all"
                      >
                        <span>{activeTable.name}</span>
                        <Edit2 size={10} className="text-zinc-555" />
                      </div>
                    )}
                  </div>
                )}

                {/* Preset table templates trigger dropdown */}
                <div className="flex flex-col gap-1.5 relative">
                  <span className="text-[9px] font-mono font-bold text-zinc-555 uppercase">Load Blueprint Preset</span>
                  <button
                    onClick={() => setShowPresetDropdown(!showPresetDropdown)}
                    className="px-2.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs font-mono hover:text-white flex items-center justify-between text-zinc-300 w-full"
                  >
                    <span>Presets Options</span>
                    <ChevronDown size={11} className={`text-zinc-555 transition-transform duration-200 ${showPresetDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showPresetDropdown && (
                    <>
                      <div 
                        className="fixed inset-0 z-[1200]" 
                        onClick={() => setShowPresetDropdown(false)} 
                      />
                      <div 
                        onClick={(e) => e.stopPropagation()}
                        className="absolute left-0 right-0 top-full mt-1.5 bg-neutral-900 border border-white/10 rounded-xl shadow-[0_12px_45px_rgba(0,0,0,0.9)] p-1 z-[9999] flex flex-col gap-0.5"
                      >
                        <button
                          onClick={() => {
                            const preset = GET_PRESET_TEMPLATES('goal');
                            replaceActiveTable(preset);
                            triggerToast("Loaded milestones preset");
                            setShowPresetDropdown(false);
                            setShowControlsDrawer(false);
                          }}
                          className="w-full text-left px-2.5 py-2 rounded-lg text-xs font-mono flex items-center gap-2 hover:bg-white/[0.04] text-amber-200"
                        >
                          <Calendar size={11} className="text-amber-400 shrink-0" />
                          <span>Milestones</span>
                        </button>
                        <button
                          onClick={() => {
                            const preset = GET_PRESET_TEMPLATES('progress');
                            replaceActiveTable(preset);
                            triggerToast("Loaded progress preset");
                            setShowPresetDropdown(false);
                            setShowControlsDrawer(false);
                          }}
                          className="w-full text-left px-2.5 py-2 rounded-lg text-xs font-mono flex items-center gap-2 hover:bg-white/[0.04] text-red-300"
                        >
                          <Hash size={11} className="text-red-400 shrink-0" />
                          <span>Progress Stats</span>
                        </button>
                        <button
                          onClick={() => {
                            const preset = GET_PRESET_TEMPLATES('logging');
                            replaceActiveTable(preset);
                            triggerToast("Loaded logging preset");
                            setShowPresetDropdown(false);
                            setShowControlsDrawer(false);
                          }}
                          className="w-full text-left px-2.5 py-2 rounded-lg text-xs font-mono flex items-center gap-2 hover:bg-white/[0.04] text-blue-300"
                        >
                          <Type size={11} className="text-blue-400 shrink-0" />
                          <span>Event Log</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Bottom Actions: New Table & System resetting */}
              <div className="flex flex-col gap-2.5 pt-3.5 border-t border-white/10 mt-auto">
                <button
                  id="btn-mobile-new-table"
                  onClick={() => {
                    if (tables.length >= 2) {
                      triggerToast("Sandbox Limit: A maximum of two custom matrices can be active simultaneously");
                    } else {
                      setShowControlsDrawer(false);
                      setShowNewTableModal(true);
                    }
                  }}
                  className={`font-semibold text-xs px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all w-full ${
                    tables.length >= 2
                      ? 'bg-neutral-900 text-zinc-655 border border-white/5 cursor-not-allowed opacity-60'
                      : 'bg-red-600 text-white font-mono shadow-md cursor-pointer'
                  }`}
                >
                  <Plus size={11} />
                  <span>New Table</span>
                </button>

                <button
                  id="btn-mobile-reset"
                  onClick={() => {
                    setShowControlsDrawer(false);
                    factoryResetSystem();
                    triggerToast("Clean default workspace restored");
                  }}
                  className="px-3 py-2 border border-white/5 bg-white/[0.02] hover:bg-white/5 rounded-xl text-zinc-400 hover:text-white text-xs font-mono flex items-center justify-center gap-1.5 transition-all w-full cursor-pointer"
                  title="Revert system"
                >
                  <RefreshCw size={10} />
                  <span>Reset All Datasets</span>
                </button>
              </div>


            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
