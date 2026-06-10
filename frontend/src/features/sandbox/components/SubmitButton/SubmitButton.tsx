import React from 'react';
import { useSandboxUi } from '../../context/SandboxUiContext';
import { useSubmitSandbox } from '../../hooks/useSubmitSandbox';

export default function SubmitButton() {
  const { submitAndExit } = useSubmitSandbox();
  const { showControlsDrawer } = useSandboxUi();

  return (
    <div 
      id="submit-matrix-action"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 select-none transition-all duration-300 ${
        showControlsDrawer 
          ? 'z-0 opacity-0 pointer-events-none translate-y-16 scale-90' 
          : 'z-45 opacity-100'
      }`}
    >
      <button
        id="btn-submit-matrix"
        onClick={submitAndExit}
        className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-mono font-bold text-xs uppercase tracking-widest px-8 py-3.5 border border-red-500 shadow-2xl transition-all cursor-pointer flex items-center gap-2.5 rounded-xl hover:scale-102 hover:shadow-red-955/20 duration-150"
        style={{ boxShadow: '0 12px 35px rgba(0, 0, 0, 0.9)' }}
        title="Submit and save matrix changes, then return to dashboard"
      >
        <span>Submit Matrix</span>
        <span className="hidden sm:inline-block text-[9px] bg-black/40 px-1.5 py-0.5 text-zinc-300 border border-white/10 font-medium">SUBMIT</span>
      </button>
    </div>
  );
}
