export type ViewMode = 'editor' | 'split' | 'preview';

export interface EditorState {
  content: string;
  viewMode: ViewMode;
  projectName: string;
  isSidebarOpen: boolean;
  setContent: (content: string) => void;
  setViewMode: (mode: ViewMode) => void;
  setProjectName: (name: string) => void;
  setSidebarOpen: (open: boolean) => void;
}