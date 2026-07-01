import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { SandboxColumn, ConfirmDialogState } from '../types/sandbox.types';

interface SandboxUiContextType {
  searchFilter: string;
  setSearchFilter: (val: string) => void;
  showNewTableModal: boolean;
  setShowNewTableModal: (val: boolean) => void;
  showHelpCarousel: boolean;
  setShowHelpCarousel: (val: boolean) => void;
  showHelpTooltip: boolean;
  setShowHelpTooltip: (val: boolean) => void;
  carouselIndex: number;
  setCarouselIndex: React.Dispatch<React.SetStateAction<number>>;
  showControlsDrawer: boolean;
  setShowControlsDrawer: (val: boolean) => void;
  toastMessage: string | null;
  triggerToast: (msg: string) => void;
  editingColumn: SandboxColumn | null;
  setEditingColumn: (col: SandboxColumn | null) => void;
  confirmDialog: ConfirmDialogState | null;
  setConfirmDialog: (val: ConfirmDialogState | null) => void;
  dragResetKey: number;
  incrementDragResetKey: () => void;
}

const SandboxUiContext = createContext<SandboxUiContextType | undefined>(undefined);

export function SandboxUiProvider({ children }: { children: ReactNode }) {
  const [searchFilter, setSearchFilter] = useState('');
  const [showNewTableModal, setShowNewTableModal] = useState(false);
  const [showHelpCarousel, setShowHelpCarousel] = useState(false);
  const [showHelpTooltip, setShowHelpTooltip] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showControlsDrawer, setShowControlsDrawer] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [editingColumn, setEditingColumn] = useState<SandboxColumn | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState | null>(null);
  const [dragResetKey, setDragResetKey] = useState<number>(0);

  const incrementDragResetKey = () => {
    setDragResetKey((prev) => prev + 1);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Help tooltip auto-displays 700ms after entry and disappears after 6700ms
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowHelpTooltip(true);
    }, 700);

    const hideTimer = setTimeout(() => {
      setShowHelpTooltip(false);
    }, 6700);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <SandboxUiContext.Provider
      value={{
        searchFilter,
        setSearchFilter,
        showNewTableModal,
        setShowNewTableModal,
        showHelpCarousel,
        setShowHelpCarousel,
        showHelpTooltip,
        setShowHelpTooltip,
        carouselIndex,
        setCarouselIndex,
        showControlsDrawer,
        setShowControlsDrawer,
        toastMessage,
        triggerToast,
        editingColumn,
        setEditingColumn,
        confirmDialog,
        setConfirmDialog,
        dragResetKey,
        incrementDragResetKey,
      }}
    >
      {children}
    </SandboxUiContext.Provider>
  );
}

export function useSandboxUi() {
  const context = useContext(SandboxUiContext);
  if (!context) {
    throw new Error('useSandboxUi must be used within a SandboxUiProvider');
  }
  return context;
}
