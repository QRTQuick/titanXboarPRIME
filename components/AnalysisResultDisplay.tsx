import React from 'react';
import { AnalysisResult } from '../types';
import TechnicalDataGrid from './TechnicalDataGrid';
import JSONViewer from './JSONViewer';

interface AnalysisResultDisplayProps {
  result: AnalysisResult;
  showJson: boolean;
  onToggleJson: () => void;
  onReset: () => void;
}

const AnalysisResultDisplay: React.FC<AnalysisResultDisplayProps> = ({
  result,
  showJson,
  onToggleJson,
  onReset
}) => {
  return (
    <div className="space-y-4 animate-in slide-in-from-bottom-6 duration-500">
      {/* Main Summary */}
      <div className="glass p-6 tech-corner-tl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-12 h-12 flex items-end justify-end pointer-events-none">
          <div className="w-[1px] h-full bg-orange-500/20"></div>
          <div className="w-full h-[1px] bg-orange-500/20"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <h3 className="text-orange-500 mono font-bold text-[10px] uppercase tracking-widest">Diagnostic Summary</h3>
          </div>
          <span className="text-[10px] text-zinc-600 mono font-bold">L_ID: {result.id.toUpperCase()}</span>
        </div>
        <p className="text-xl font-bold text-white leading-tight tracking-tight">
          {result.summary}
        </p>
      </div>

      <TechnicalDataGrid result={result} />

      {/* Detailed Logic Section */}
      <div className="glass p-6 border-b-2 border-orange-500/20 space-y-3">
        <h3 className="text-zinc-500 mono font-black text-[9px] uppercase tracking-[0.3em]">Deep_Logic_Chain</h3>
        <p className="text-zinc-300 text-sm leading-relaxed font-medium">
          {result.detailedAnalysis}
        </p>
        <div className="pt-2 flex flex-wrap gap-1.5">
          {result.detectedObjects.map((obj, i) => (
            <span key={i} className="px-2 py-0.5 bg-zinc-800 text-[9px] text-zinc-400 border border-zinc-700 font-bold uppercase mono">
              {obj}
            </span>
          ))}
        </div>
      </div>

      <JSONViewer 
        result={result}
        showJson={showJson}
        onToggleJson={onToggleJson}
      />

      <button 
        onClick={onReset}
        className="w-full bg-zinc-950 text-zinc-600 font-black py-4 border border-zinc-900 uppercase tracking-[0.3em] text-[10px] hover:bg-zinc-900 hover:text-orange-500 transition-all active:scale-95"
      >
        Purge Current Buffer
      </button>
    </div>
  );
};

export default AnalysisResultDisplay;