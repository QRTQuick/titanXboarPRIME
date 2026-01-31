import React from 'react';

const AboutView: React.FC = () => {
  return (
    <div className="p-8 space-y-12 animate-in fade-in duration-500">
      <div className="space-y-6 text-center">
        <div className="relative inline-block group">
          <div className="absolute -inset-4 prime-gradient blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <div className="relative w-24 h-24 prime-gradient rounded-full flex items-center justify-center prime-glow mx-auto mb-2">
            <span className="text-black font-black text-3xl tracking-tighter">TXB</span>
          </div>
        </div>
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tighter uppercase italic">titanXboarPRIME</h2>
          <p className="text-orange-500/80 mono text-[9px] font-black uppercase tracking-[0.4em]">Visual Intel Suite</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-zinc-900 border border-zinc-800 p-8 tech-corner-br relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2">
            <div className="w-2 h-2 bg-orange-500"></div>
          </div>
          <h3 className="text-orange-500 font-black uppercase tracking-[0.2em] text-[10px] mb-4">Manufacturer Profile</h3>
          <p className="text-2xl font-black italic mb-3">Quick Red Tech</p>
          <p className="text-zinc-500 text-xs leading-relaxed font-medium">
            titanXboarPRIME is an enterprise-grade visual intelligence platform. Our proprietary Neural-Boar architecture provides unmatched precision in object recognition and atmosphere analysis.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl space-y-1">
            <span className="block text-zinc-700 font-black uppercase text-[8px] tracking-widest">Core Engine</span>
            <span className="text-zinc-400 text-[10px] mono font-bold">V-BOAR 4.0</span>
          </div>
          <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl space-y-1">
            <span className="block text-zinc-700 font-black uppercase text-[8px] tracking-widest">Protocol</span>
            <span className="text-zinc-400 text-[10px] mono font-bold">PRIME-X_256</span>
          </div>
          <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl space-y-1">
            <span className="block text-zinc-700 font-black uppercase text-[8px] tracking-widest">Status</span>
            <span className="text-green-500 text-[10px] mono font-bold">OPERATIONAL</span>
          </div>
          <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl space-y-1">
            <span className="block text-zinc-700 font-black uppercase text-[8px] tracking-widest">Uptime</span>
            <span className="text-zinc-400 text-[10px] mono font-bold">99.98% PRIME</span>
          </div>
        </div>
      </div>

      <footer className="pt-8 text-center border-t border-zinc-900 space-y-3">
        <div className="flex justify-center gap-4 text-[10px] font-black text-zinc-700 uppercase tracking-widest">
          <span>EULA</span>
          <span>PRIVACY</span>
          <span>SYSTEM</span>
        </div>
        <p className="text-[9px] text-zinc-800 font-black uppercase tracking-[0.5em]">© 2025 QUICK RED TECH VISUAL SYSTEMS</p>
      </footer>
    </div>
  );
};

export default AboutView;