import React from 'react';
import { AnalysisResult } from '../types';

interface ImageUploadProps {
  selectedImage: string | null;
  isAnalyzing: boolean;
  currentResult: AnalysisResult | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedImage,
  isAnalyzing,
  currentResult,
  onFileChange,
  onRemoveImage
}) => {
  return (
    <div className="relative aspect-square w-full max-h-[70vh] tech-corner-br bg-zinc-900 border border-orange-500/20 overflow-hidden group shadow-2xl">
      <div className="grid-bg absolute inset-0 opacity-20 pointer-events-none"></div>
      
      {selectedImage ? (
        <>
          <img 
            src={selectedImage} 
            alt="Analysis Target" 
            className="w-full h-full object-cover" 
          />
          <div className="scan-line"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
          
          {!isAnalyzing && !currentResult && (
            <button 
              onClick={onRemoveImage}
              className="absolute top-4 right-4 bg-black/60 text-white p-3 rounded-lg backdrop-blur-md border border-white/10 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Remove image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          
          {/* HUD Elements */}
          <div className="absolute top-4 left-4 flex flex-col gap-1">
            <div className="w-8 h-[1px] bg-orange-500"></div>
            <div className="w-[1px] h-8 bg-orange-500"></div>
          </div>
        </>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-orange-500/5 transition-colors">
          <div className="w-20 h-20 border border-orange-500/30 rounded-full flex items-center justify-center mb-4 relative">
            <div className="absolute inset-0 rounded-full animate-ping bg-orange-500/10"></div>
            <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="text-orange-500/80 font-bold mono text-xs sm:text-sm uppercase tracking-[0.2em]">Ready for Capture</p>
          <input 
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={onFileChange} 
          />
        </label>
      )}

      {isAnalyzing && (
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center space-y-4 backdrop-blur-md">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-orange-500/20 rounded-full border-t-orange-500 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="mono text-[8px] text-orange-500 font-bold animate-pulse">TXB-X</span>
            </div>
          </div>
          <p className="mono text-orange-500 text-[10px] font-black tracking-[0.3em] uppercase">Reticulating Splines...</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;