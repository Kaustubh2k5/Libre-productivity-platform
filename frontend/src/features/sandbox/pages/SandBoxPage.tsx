import React from 'react';
import { useSandboxStore } from '../store/sandboxStore';
import { useActiveTable } from '../hooks/useActiveTable';
import { useKeyboardSave } from '../hooks/useKeyboardSave';
import DesktopToolbar from '../components/ToolBar/DesktopToolBar';
import MobileToolbar from '../components/ToolBar/MobileToolBar';
import SandboxTable from '../components/Table/SandboxTable';
import EmptyState from '../components/Empty-state/EmptyState';
import ToastSystem from '../components/Toast/ToastSystem';
import SubmitButton from '../components/SubmitButton/SubmitButton';
import FloatingActions from '../components/FloatingAction/FloatingAction';

import NewTableModal from '../modals/NewTableModal';
import ColumnEditorModal from '../modals/ColumnEditorModal';
import ConfirmDialog from '../modals/ConfirmDialog';
import HelpCarousel from '../modals/HelpCarousel';

import { SandboxUiProvider } from '../context/SandboxUiContext';

function SandboxShell() {
  const tables = useSandboxStore((s) => s.tables);
  const activeTable = useActiveTable();
  useKeyboardSave();

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#050507] text-white flex flex-col justify-between font-sans selection:bg-red-500/20 selection:text-red-200">
      
      {/* 0. DEEP COSMIC CANVAS SCI-FI STARFIELD WITH DUST NOISE */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Ambient starfield background pattern */}
        <div 
          className="absolute inset-x-0 inset-y-0 opacity-[0.02]" 
          style={{ 
            backgroundImage: `radial-gradient(ellipse at center, rgba(255, 255, 255, 0.15) 0%, transparent 80%)`,
            backgroundSize: '24px 24px'
          }} 
        />
        {/* Subtle grid mesh overlays to evoke modular design schematic vibes */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)]"
          style={{ backgroundSize: '40px 40px' }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.03) 0%, rgba(0, 0, 0, 0) 70%)'
          }}
        />
      </div>

      {/* HEADER SECTION LAYOUT WITH CONTROL SYSTEMS */}
      <div className="z-50 relative flex-none">
        {/* Top brand header band */}
        <header className="relative z-50 flex items-center justify-between px-4 sm:px-8 py-3.5 border-b border-white/5 bg-neutral-950/20 backdrop-blur-sm select-none">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest font-semibold">
              Platform Canvas • Sandbox Matrix
            </span>
          </div>

          <FloatingActions />
        </header>

        {/* 1A. DESKTOP VIEW TOOLBAR */}
        <DesktopToolbar />

        {/* 1B. MOBILE VIEW TOOLBAR */}
        <MobileToolbar />
      </div>

      {/* MAIN INFINITE VIEWPORT PANEL FOR SANDBOX GRID */}
      <main className="flex-1 relative z-10 w-full overflow-hidden select-none inline-flex items-center justify-center p-6 md:p-12">
        {tables.length === 0 || !activeTable ? (
          <EmptyState />
        ) : (
          <SandboxTable />
        )}
      </main>

      {/* SUBMIT BUTTON */}
      <SubmitButton />

      {/* PORTALS & MODALS DRAWERS FOR SYSTEM METRICS CONFIGURATION */}
      <NewTableModal />
      <ColumnEditorModal />
      <ConfirmDialog />
      <HelpCarousel />

      {/* Toast Notification HUD alert */}
      <ToastSystem />

    </div>
  );
}

export default function SandboxPage() {
  return (
    <SandboxUiProvider>
      <SandboxShell />
    </SandboxUiProvider>
  );
}
