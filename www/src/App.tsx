import React from 'react';
import { Header } from './components/Header';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { Sidebar } from './components/Sidebar';
import { useEditorStore } from './store/editorStore';

function App() {
  const { viewMode, isSidebarOpen } = useEditorStore();

  return (
    <div className="h-screen flex">
      {isSidebarOpen && <Sidebar />}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header />
        <div className="flex-1 flex overflow-hidden">
          <div 
            className={`flex-1 transition-all duration-300 ${
              viewMode === 'preview' ? 'hidden' : 
              viewMode === 'split' ? 'w-1/2' : 'w-full'
            }`}
          >
            <Editor />
          </div>
          <div 
            className={`flex-1 transition-all duration-300 ${
              viewMode === 'editor' ? 'hidden' : 
              viewMode === 'split' ? 'w-1/2' : 'w-full'
            }`}
          >
            <Preview />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;