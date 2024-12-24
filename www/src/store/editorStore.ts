import { create } from 'zustand';
import { EditorState } from '../types';

export const useEditorStore = create<EditorState>((set) => ({
  content: '',
  viewMode: 'split',
  projectName: 'untitled',
  isSidebarOpen: false,
  setContent: (content) => set({ content }),
  setViewMode: (viewMode) => set({ viewMode }),
  setProjectName: (projectName) => set({ projectName }),
  setSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
}));