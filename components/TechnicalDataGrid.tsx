import React from 'react';
import { AnalysisResult } from '../types';
import { generateTechnicalSpecs } from '../utils';

interface TechnicalDataGridProps {
  result: AnalysisResult;
}

const TechnicalDataGrid: React.FC<TechnicalDataGridProps> = ({ result }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="tech-corner-br grid-bg bg-orange-500/5 p-4 border border-orange-500/20 relative group overflow-hidden h-28 flex flex-col justify-between">
        <div>
          <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-orange-500"></div>
          <span className="block text-[8px] text-orange-500/60 uppercase font-black mb-1 tracking-tighter mono">Atmosphere_Vibe</span>
          <span className="text-white text-[11px] font-bold leading-tight block uppercase tracking-tight">{result.vibe}</span>
        </div>
        <div className="flex items-end gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`h-1 flex-1 bg-orange-500/${(i+1)*20}`}></div>
          ))}
        </div>
      </div>
      
      <div className="tech-corner-tl grid-bg bg-zinc-900 p-4 border border-zinc-800 relative group overflow-hidden h-28 flex flex-col justify-between">
        <div>
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-zinc-600"></div>
          <span className="block text-[8px] text-zinc-500 uppercase font-black mb-1 tracking-tighter mono">Optical_Specs</span>
          <span className="text-orange-500 text-[9px] mono font-bold block leading-none break-all">
            {result.technicalSpecs || generateTechnicalSpecs()}
          </span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-0.5">
            <div className="w-1.5 h-1.5 bg-green-500"></div>
            <div className="w-1.5 h-1.5 bg-green-500/20"></div>
          </div>
          <span className="text-[7px] text-zinc-600 font-black mono">LINK_ESTABLISHED</span>
        </div>
      </div>
    </div>
  );
};

export default TechnicalDataGrid;