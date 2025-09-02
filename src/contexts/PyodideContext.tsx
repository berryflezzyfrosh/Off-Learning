import React, { createContext, useContext, useState, useEffect } from 'react';

interface PyodideContextType {
  pyodide: any;
  isLoading: boolean;
  error: string | null;
  runPython: (code: string) => Promise<string>;
}

const PyodideContext = createContext<PyodideContextType | undefined>(undefined);

export function PyodideProvider({ children }: { children: React.ReactNode }) {
  const [pyodide, setPyodide] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPyodide = async () => {
      try {
        const { loadPyodide } = await import('pyodide');
        const pyodideInstance = await loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
        });
        
        // Install common packages
        await pyodideInstance.loadPackage(['numpy', 'pandas', 'matplotlib']);
        
        setPyodide(pyodideInstance);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load Python environment');
        setIsLoading(false);
        console.error('Pyodide loading error:', err);
      }
    };

    loadPyodide();
  }, []);

  const runPython = async (code: string): Promise<string> => {
    if (!pyodide) {
      throw new Error('Python environment not loaded');
    }

    try {
      // Capture stdout
      pyodide.runPython(`
        import sys
        from io import StringIO
        sys.stdout = StringIO()
      `);

      // Run the user code
      pyodide.runPython(code);

      // Get the output
      const output = pyodide.runPython('sys.stdout.getvalue()');
      
      // Reset stdout
      pyodide.runPython('sys.stdout = sys.__stdout__');

      return output || 'Code executed successfully (no output)';
    } catch (err: any) {
      // Reset stdout in case of error
      pyodide.runPython('sys.stdout = sys.__stdout__');
      return `Error: ${err.message}`;
    }
  };

  return (
    <PyodideContext.Provider value={{ pyodide, isLoading, error, runPython }}>
      {children}
    </PyodideContext.Provider>
  );
}

export function usePyodide() {
  const context = useContext(PyodideContext);
  if (context === undefined) {
    throw new Error('usePyodide must be used within a PyodideProvider');
  }
  return context;
}
