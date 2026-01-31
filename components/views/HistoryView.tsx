import React from 'react';
import { AnalysisResult, View } from '../../types';
import HistoryList from '../HistoryList';

interface HistoryViewProps {
  history: AnalysisResult[];
  onSelectItem: (item: AnalysisResult) => void;
  onClearHistory: () => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onSelectItem,
  onClearHistory
}) => {
  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-2xl font-black tracking-tighter uppercase italic">System Logs</h2>
        <span className="text-[9px] text-zinc-600 mono font-black uppercase">{history.length} Blocks Cached</span>
      </div>

      {history.length === 0 ? (
        <div className="border border-zinc-900 bg-zinc-950/50 rounded-3xl p-16 flex flex-col items-center justify-center text-center space-y-6">
          <div className="text-zinc-800">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p className="text-zinc-700 font-bold uppercase tracking-widest text-[10px]">No Previous Diagnostic Data</p>
        </div>
      ) : (
        <HistoryList 
          history={history}
          onSelectItem={onSelectItem}
          onClearHistory={onClearHistory}
        />
      )}
    </div>
  );
};

export default HistoryView;