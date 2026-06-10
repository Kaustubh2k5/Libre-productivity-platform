export interface SandboxColumn {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date';
  isTracked: boolean;
}

export interface SandboxTable {
  id: string;
  name: string;
  description: string;
  columns: SandboxColumn[];
  rows: Record<string, string | number>[];
}

export interface ConfirmDialogState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
}
