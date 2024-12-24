import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { useEditorStore } from '../store/editorStore';
import 'katex/dist/katex.min.css';

export const Preview: React.FC = () => {
  const { content } = useEditorStore();

  return (
    <div className="h-full overflow-y-auto bg-[#1B1A1F] preview-scrollbar">
      <div className="p-8">
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                
                if (!inline) {
                  return (
                    <pre className="relative">
                      <code
                        className={`block bg-[#2A2933] p-4 rounded-md overflow-x-auto ${
                          match ? `language-${match[1]}` : ''
                        }`}
                        {...props}
                      >
                        {children}
                      </code>
                    </pre>
                  );
                }

                return (
                  <code
                    className="bg-[#2A2933] px-1.5 py-0.5 rounded text-[#F499F9]"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              table({ children }) {
                return (
                  <div className="overflow-x-auto">
                    <table className="border-collapse border border-[#2A2933]">
                      {children}
                    </table>
                  </div>
                );
              },
              p({ children, ...props }) {
                if (typeof children === 'string' && children.trim().startsWith('<') && children.trim().endsWith('>')) {
                  return <div dangerouslySetInnerHTML={{ __html: children }} />;
                }
                return <p {...props}>{children}</p>;
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};