import React from 'react';
import { AnalysisResult } from '../types';
import HistoryItem from './HistoryItem';

interface HistoryListProps {
  history: AnalysisResult[];
  onSelectItem: (item: AnalysisResult) => void;
  onClearHistory: () => void;
}

const HistoryList: React.FC<HistoryListProps> = ({
  history,
  onSelectItem,
  onClearHistory
}) => {
  return (
    <div className="space-y-3">
      {history.map((item) => (
        <HistoryItem
          key={item.id}
          item={item}
          onSelect={() => onSelectItem(item)}
        />
      ))}
      
      <button 
        onClick={() => { 
          if(confirm('Initiate System Purge?')) {
            onClearHistory();
          }
        }}
        className="w-full py-6 text-[9px] text-zinc-800 uppercase tracking-[0.4em] font-black hover:text-red-900 transition-colors"
      >
        [ Flush History Memory ]
      </button>
    </div>
  );
};

export default HistoryList;