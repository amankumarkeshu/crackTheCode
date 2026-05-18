'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Excalidraw to avoid SSR issues
const Excalidraw = dynamic(
  async () => (await import('@excalidraw/excalidraw')).Excalidraw,
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Excalidraw diagram...</p>
        </div>
      </div>
    ),
  }
);

interface ExcalidrawDiagramProps {
  /** 
   * Path to .excalidraw file in public/diagrams/ folder 
   * Example: "system-design/load-balancer.excalidraw"
   */
  src?: string;
  
  /** 
   * Inline Excalidraw data as JSON string 
   */
  data?: string;
  
  /** 
   * Height of the diagram container 
   */
  height?: number | string;
  
  /** 
   * Width of the diagram container 
   */
  width?: number | string;
  
  /** 
   * Title/caption for the diagram 
   */
  title?: string;
  
  /** 
   * Whether to show editing tools (default: false for blog posts) 
   */
  editable?: boolean;
  
  /** 
   * Theme: light or dark 
   */
  theme?: 'light' | 'dark';
}

export default function ExcalidrawDiagram({
  src,
  data,
  height = 400,
  width = '100%',
  title,
  editable = false,
  theme = 'light'
}: ExcalidrawDiagramProps) {
  const [excalidrawData, setExcalidrawData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDiagram = async () => {
      try {
        setLoading(true);
        
        if (data) {
          // Parse inline JSON data
          const parsedData = JSON.parse(data);
          setExcalidrawData(parsedData);
        } else if (src) {
          // Load from external file
          const response = await fetch(`/diagrams/${src}`);
          if (!response.ok) {
            throw new Error(`Failed to load diagram: ${response.statusText}`);
          }
          const diagramData = await response.json();
          setExcalidrawData(diagramData);
        } else {
          // Empty diagram for editing
          setExcalidrawData({ elements: [], appState: {} });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load diagram');
      } finally {
        setLoading(false);
      }
    };

    loadDiagram();
  }, [src, data]);

  if (loading) {
    return (
      <div className="my-6">
        {title && (
          <h4 className="text-lg font-semibold mb-3 text-center">{title}</h4>
        )}
        <div className="flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300" style={{ height, width }}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading diagram...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-6">
        {title && (
          <h4 className="text-lg font-semibold mb-3 text-center text-red-600">{title}</h4>
        )}
        <div className="flex items-center justify-center bg-red-50 rounded-lg border-2 border-dashed border-red-300" style={{ height, width }}>
          <div className="text-center">
            <p className="text-red-600">Failed to load diagram</p>
            <p className="text-red-500 text-sm mt-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-6">
      {title && (
        <h4 className="text-lg font-semibold mb-3 text-center">{title}</h4>
      )}
      <div 
        className="border rounded-lg overflow-hidden shadow-sm"
        style={{ height, width }}
      >
        <Suspense fallback={
          <div className="flex items-center justify-center h-full bg-gray-50">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        }>
          <Excalidraw
            initialData={{
              elements: excalidrawData?.elements || [],
              appState: {
                ...excalidrawData?.appState,
                theme: theme,
                viewModeEnabled: !editable,
                zenModeEnabled: false,
                gridModeEnabled: false,
              },
            }}
            viewModeEnabled={!editable}
            zenModeEnabled={false}
            gridModeEnabled={false}
            theme={theme}
          />
        </Suspense>
      </div>
      {title && !editable && (
        <p className="text-sm text-gray-600 text-center mt-2 italic">
          Interactive diagram - you can zoom and pan
        </p>
      )}
    </div>
  );
}