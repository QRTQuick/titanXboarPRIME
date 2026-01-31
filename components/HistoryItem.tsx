import React from 'react';
import { AnalysisResult } from '../types';
import { formatTime } from '../utils';

interface HistoryItemProps {
  item: AnalysisResult;
  onSelect: () => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ item, onSelect }) => {
  return (
    <div 
      className="bg-zinc-900/50 border border-zinc-800 overflow-hidden flex gap-4 p-3 tech-corner-br hover:border-orange-500/30 transition-all cursor-pointer group active:scale-95"
      onClick={onSelect}
    >
      <div className="w-16 h-16 bg-black border border-zinc-800 p-0.5 flex-shrink-0">
        <img 
          src={item.imageUrl} 
          alt="Analysis Log" 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" 
        />
      </div>
      
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <p className="text-[8px] text-zinc-600 mono font-bold uppercase mb-1 flex items-center gap-2">
          {formatTime(item.timestamp)} 
          <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
          L_ID:{item.id.toUpperCase()}
        </p>
        <p className="text-[11px] font-bold text-zinc-400 truncate tracking-tight">{item.summary}</p>
        <p className="text-[9px] text-orange-500/60 font-black uppercase mt-1 tracking-widest">{item.vibe}</p>
      </div>
      
      <div className="flex items-center text-zinc-800 pr-2 group-hover:text-orange-500 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

export default HistoryItem;