import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { useEditorStore } from '../store/editorStore';

export const Editor: React.FC = () => {
  const { content, setContent } = useEditorStore();

  return (
    <div className="h-full w-full bg-[#1B1A1F]">
      <CodeMirror
        value={content}
        height="100%"
        width="100%"
        theme={dracula}
        extensions={[markdown()]}
        onChange={(value) => setContent(value)}
        className="h-full editor-scrollbar"
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightSpecialChars: true,
          history: true,
          foldGutter: true,
          drawSelection: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          syntaxHighlighting: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          defaultKeymap: true,
          searchKeymap: true,
          historyKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
        }}
      />
    </div>
  );
};