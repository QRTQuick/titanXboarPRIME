import React from 'react';
import { AnalysisResult } from '../../types';
import ImageUpload from '../ImageUpload';
import AnalysisResultDisplay from '../AnalysisResultDisplay';

interface AnalyzeViewProps {
  selectedImage: string | null;
  isAnalyzing: boolean;
  currentResult: AnalysisResult | null;
  showJson: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAnalyze: () => void;
  onRemoveImage: () => void;
  onToggleJson: () => void;
  onReset: () => void;
}

const AnalyzeView: React.FC<AnalyzeViewProps> = ({
  selectedImage,
  isAnalyzing,
  currentResult,
  showJson,
  onFileChange,
  onAnalyze,
  onRemoveImage,
  onToggleJson,
  onReset
}) => {
  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <ImageUpload
        selectedImage={selectedImage}
        isAnalyzing={isAnalyzing}
        currentResult={currentResult}
        onFileChange={onFileChange}
        onRemoveImage={onRemoveImage}
      />

      {selectedImage && !isAnalyzing && !currentResult && (
        <button 
          onClick={onAnalyze}
          className="w-full prime-gradient text-black font-black py-4 tech-corner-br prime-glow uppercase tracking-[0.25em] text-xs transition-transform active:scale-95"
        >
          Begin Deep Scan
        </button>
      )}

      {currentResult && (
        <AnalysisResultDisplay
          result={currentResult}
          showJson={showJson}
          onToggleJson={onToggleJson}
          onReset={onReset}
        />
      )}

      {!selectedImage && (
        <div className="py-8 space-y-6">
          <div className="flex items-center gap-5 opacity-30">
            <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center tech-corner-br">
              <div className="w-4 h-4 bg-orange-500/20 animate-pulse"></div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-1.5 w-full bg-zinc-900 rounded-full"></div>
              <div className="h-1.5 w-2/3 bg-zinc-900 rounded-full"></div>
            </div>
          </div>
          <div className="text-center py-10">
            <p className="text-[9px] text-zinc-800 uppercase tracking-[0.5em] font-black animate-pulse">
              Awaiting External Visual Input
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyzeView;