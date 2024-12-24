import React, { useEffect, useRef } from 'react';
import { X, Upload, Download } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';

export const Sidebar: React.FC = () => {
  const { content, setContent, projectName, setProjectName, setSidebarOpen } = useEditorStore();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setSidebarOpen]);

  const handleClose = () => {
    if (sidebarRef.current && overlayRef.current) {
      sidebarRef.current.style.transform = 'translateX(-100%)';
      overlayRef.current.style.opacity = '0';
      
      setTimeout(() => {
        setSidebarOpen(false);
      }, 300);
    }
  };

  const handleImport = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.md';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const text = await file.text();
        setContent(text);
        const newProjectName = file.name.replace(/\.md$/, '');
        setProjectName(newProjectName);
      }
    };
    input.click();
  };

  const handleExport = (type: 'md' | 'html') => {
    const exportContent = type === 'md' ? content : `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${projectName}</title>
  <style>
    body { max-width: 800px; margin: 40px auto; padding: 0 20px; }
    pre { background: #f6f8fa; padding: 16px; border-radius: 6px; }
    code { font-family: monospace; }
  </style>
</head>
<body>
  ${document.querySelector('.prose')?.innerHTML || ''}
</body>
</html>`;

    const blob = new Blob([exportContent], { type: `text/${type}` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName}.${type}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        style={{ opacity: 1 }}
      />
      <div
        ref={sidebarRef}
        className="fixed left-0 top-0 h-full w-64 bg-[#1B1A1F] border-r border-[#2A2933] p-4 shadow-xl z-50 transition-transform duration-300 ease-out"
        style={{ transform: 'translateX(0)' }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[#F2F2F2] text-lg font-semibold">Menu</h2>
          <button
            onClick={handleClose}
            className="text-[#E7E2FF] hover:text-[#F499F9] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleImport}
            className="w-full flex items-center gap-2 px-4 py-2 bg-[#2A2933] text-[#E7E2FF] rounded-md hover:bg-[#3A3943] transition-colors"
          >
            <Upload size={18} />
            Import Markdown
          </button>

          <div className="space-y-2">
            <button
              onClick={() => handleExport('md')}
              className="w-full flex items-center gap-2 px-4 py-2 bg-[#2A2933] text-[#E7E2FF] rounded-md hover:bg-[#3A3943] transition-colors"
            >
              <Download size={18} />
              Export as Markdown
            </button>
            <button
              onClick={() => handleExport('html')}
              className="w-full flex items-center gap-2 px-4 py-2 bg-[#2A2933] text-[#E7E2FF] rounded-md hover:bg-[#3A3943] transition-colors"
            >
              <Download size={18} />
              Export as HTML
            </button>
          </div>
        </div>
      </div>
    </>
  );
};