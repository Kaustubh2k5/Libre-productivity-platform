import { useEffect } from 'react';
import { useSandboxUi } from '../context/SandboxUiContext';

export function useKeyboardSave() {
  const { triggerToast } = useSandboxUi();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        triggerToast("Shortcut Save: Matrix synced back securely");
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerToast]);
}
