import React, { useRef, useEffect, useState } from 'react';
import * as monaco from 'monaco-editor';
import { Play, RotateCcw, Copy, Check, Maximize2, Minimize2 } from 'lucide-react';

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
  onRun?: () => void;
  onReset?: () => void;
  height?: string;
  readOnly?: boolean;
}

export default function CodeEditor({ 
  language, 
  value, 
  onChange, 
  onRun, 
  onReset,
  height = '400px',
  readOnly = false
}: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (editorRef.current) {
      const monacoEditor = monaco.editor.create(editorRef.current, {
        value,
        language: language === 'javascript' ? 'javascript' : language === 'python' ? 'python' : language,
        theme: 'vs-dark',
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        automaticLayout: true,
        readOnly,
        wordWrap: 'on',
        folding: true,
        lineDecorationsWidth: 10,
        lineNumbersMinChars: 3,
      });

      if (!readOnly) {
        monacoEditor.onDidChangeModelContent(() => {
          onChange(monacoEditor.getValue());
        });
      }

      setEditor(monacoEditor);

      return () => {
        monacoEditor.dispose();
      };
    }
  }, [readOnly]);

  useEffect(() => {
    if (editor && editor.getValue() !== value) {
      editor.setValue(value);
    }
  }, [value, editor]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`border border-gray-300 rounded-lg overflow-hidden ${
      isFullscreen ? 'fixed inset-4 z-50 bg-white' : ''
    }`}>
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
        <span className="text-white text-sm font-medium">
          {language.toUpperCase()} Editor
        </span>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className="flex items-center px-2 py-1 bg-gray-600 hover:bg-gray-500 text-white text-xs rounded transition-colors"
            title="Copy code"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
          
          <button
            onClick={toggleFullscreen}
            className="flex items-center px-2 py-1 bg-gray-600 hover:bg-gray-500 text-white text-xs rounded transition-colors"
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>

          {onReset && (
            <button
              onClick={onReset}
              className="flex items-center px-2 py-1 bg-gray-600 hover:bg-gray-500 text-white text-xs rounded transition-colors"
              title="Reset code"
            >
              <RotateCcw size={14} className="mr-1" />
              Reset
            </button>
          )}
          
          {onRun && (
            <button
              onClick={onRun}
              className="flex items-center px-2 py-1 bg-green-600 hover:bg-green-500 text-white text-xs rounded transition-colors"
              title="Run code"
            >
              <Play size={14} className="mr-1" />
              Run
            </button>
          )}
        </div>
      </div>
      
      <div 
        ref={editorRef} 
        style={{ height: isFullscreen ? 'calc(100vh - 120px)' : height }}
        className="w-full"
      />
    </div>
  );
}
