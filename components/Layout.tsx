
import React from 'react';
import { View } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: View;
  onViewChange: (view: View) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange }) => {
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto relative bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 glass px-4 sm:px-6 py-4 flex items-center justify-between border-b border-orange-500/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 prime-gradient rounded-sm rotate-45 flex items-center justify-center prime-glow">
            <span className="text-black font-bold -rotate-45 text-xs">TXB</span>
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tighter text-white">
              titanX<span className="text-orange-500">boar</span>PRIME
            </h1>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-zinc-500 font-bold -mt-1">
              by Quick Red Tech
            </p>
          </div>
        </div>
        <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500/50"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500/30"></div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 pb-20 sm:pb-24 mobile-safe-bottom">
        {children}
      </main>

      {/* Bottom Nav - Improved mobile handling */}
      <nav className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-[95%] sm:w-[90%] max-w-[340px] glass rounded-2xl p-2 flex justify-between items-center z-50 border border-orange-500/30 shadow-2xl mobile-safe-bottom">
        <button 
          onClick={() => onViewChange('history')}
          className={`flex-1 flex flex-col items-center py-3 px-2 rounded-xl transition-all touch-manipulation ${activeView === 'history' ? 'bg-orange-500/20 text-orange-500' : 'text-zinc-500'}`}
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="text-[9px] sm:text-[10px] mt-1 font-bold uppercase">Logs</span>
        </button>
        
        <button 
          onClick={() => onViewChange('analyze')}
          className={`flex-1 flex flex-col items-center py-3 px-2 rounded-xl transition-all touch-manipulation ${activeView === 'analyze' ? 'bg-orange-500/20 text-orange-500' : 'text-zinc-500'}`}
        >
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center -mt-6 sm:-mt-8 shadow-xl transition-transform active:scale-95 ${activeView === 'analyze' ? 'prime-gradient prime-glow text-black' : 'bg-zinc-800 text-white'}`}>
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <span className="text-[9px] sm:text-[10px] mt-1 font-bold uppercase">Scan</span>
        </button>

        <button 
          onClick={() => onViewChange('about')}
          className={`flex-1 flex flex-col items-center py-3 px-2 rounded-xl transition-all touch-manipulation ${activeView === 'about' ? 'bg-orange-500/20 text-orange-500' : 'text-zinc-500'}`}
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="text-[9px] sm:text-[10px] mt-1 font-bold uppercase">System</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
