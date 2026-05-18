'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ExcalidrawImageProps {
  /** 
   * Path to exported PNG/SVG from Excalidraw in public/diagrams/ folder 
   * Example: "system-design/load-balancer.png"
   */
  src: string;
  
  /** 
   * Alt text for the image 
   */
  alt: string;
  
  /** 
   * Title/caption for the diagram 
   */
  title?: string;
  
  /** 
   * Width of the image 
   */
  width?: number;
  
  /** 
   * Height of the image 
   */
  height?: number;
  
  /** 
   * Optional link to the interactive Excalidraw file 
   */
  interactiveLink?: string;
}

export default function ExcalidrawImage({
  src,
  alt,
  title,
  width = 800,
  height = 600,
  interactiveLink
}: ExcalidrawImageProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className="my-6">
        {title && (
          <h4 className="text-lg font-semibold mb-3 text-center text-red-600">{title}</h4>
        )}
        <div className="flex items-center justify-center bg-red-50 rounded-lg border-2 border-dashed border-red-300 h-96">
          <div className="text-center">
            <p className="text-red-600">Failed to load diagram image</p>
            <p className="text-red-500 text-sm mt-2">Check if file exists: /diagrams/{src}</p>
            {interactiveLink && (
              <a 
                href={interactiveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm mt-2 block"
              >
                View Interactive Version →
              </a>
            )}
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
      <div className="flex justify-center">
        <div className="relative bg-white rounded-lg shadow-sm border p-4">
          <Image
            src={`/diagrams/${src}`}
            alt={alt}
            width={width}
            height={height}
            className="max-w-full h-auto"
            onError={() => setImageError(true)}
          />
          {interactiveLink && (
            <div className="mt-3 text-center">
              <a 
                href={interactiveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Interactive Version
              </a>
            </div>
          )}
        </div>
      </div>
      {title && (
        <p className="text-sm text-gray-600 text-center mt-2 italic">
          System Design Diagram
        </p>
      )}
    </div>
  );
}