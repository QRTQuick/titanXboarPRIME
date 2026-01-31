import React from 'react';
import { AnalysisResult } from '../types';

interface JSONViewerProps {
  result: AnalysisResult;
  showJson: boolean;
  onToggleJson: () => void;
}

const JSONViewer: React.FC<JSONViewerProps> = ({ result, showJson, onToggleJson }) => {
  return (
    <div className="space-y-2">
      <button 
        onClick={onToggleJson}
        className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-600 hover:text-orange-500 transition-colors py-2"
      >
        <div className={`w-2 h-2 rounded-sm ${showJson ? 'bg-orange-500' : 'bg-zinc-800'}`}></div>
        {showJson ? 'Close Jason Worker' : 'Open Jason Worker'}
      </button>
      
      {showJson && (
        <div className="bg-black border border-zinc-800 p-4 rounded-xl overflow-hidden animate-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center mb-3 border-b border-zinc-800 pb-2">
            <span className="text-[8px] text-orange-500 mono font-black">TXB_CORE_STREAM [JSON]</span>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="json-worker max-h-48 overflow-y-auto">
            <pre className="text-[10px] text-orange-200/70 mono leading-tight">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default JSONViewer;