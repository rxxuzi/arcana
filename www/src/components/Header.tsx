import React from 'react';
import { Layout, Split, Maximize2, Edit, Menu } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
import type { ViewMode } from '../types';

export const Header: React.FC = () => {
  const { viewMode, setViewMode, projectName, setProjectName, setSidebarOpen } = useEditorStore();

  const buttons: { mode: ViewMode; icon: React.ReactNode; label: string }[] = [
    { mode: 'editor', icon: <Edit size={18} />, label: 'Editor' },
    { mode: 'split', icon: <Split size={18} />, label: 'Split' },
    { mode: 'preview', icon: <Maximize2 size={18} />, label: 'Preview' },
  ];

  return (
    <header className="bg-[#1B1A1F] border-b border-[#2A2933] py-2 px-4 flex items-center">
      <button
        onClick={() => setSidebarOpen(true)}
        className="text-[#E7E2FF] hover:text-[#9C79DE] transition-colors mr-4"
      >
        <Menu size={20} />
      </button>

      <div className="flex items-center gap-2">
        <Layout className="text-[#9C79DE]" size={20} />
        <h1 className="text-[#F2F2F2] text-lg font-semibold">Arcana</h1>
      </div>

      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className="ml-4 bg-transparent text-[#E7E2FF] border border-[#2A2933] rounded px-2 py-1 text-sm focus:outline-none focus:border-[#9C79DE] transition-colors"
        placeholder="Project name..."
      />
      
      <div className="flex gap-1 ml-auto">
        {buttons.map(({ mode, icon, label }) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 text-sm transition-colors
              ${viewMode === mode 
                ? 'bg-[#9C79DE] text-white' 
                : 'text-[#E7E2FF] hover:bg-[#2A2933]'
              }`}
          >
            {icon}
            <span>{label}</span>
          </button>
        ))}
      </div>
    </header>
  );
};