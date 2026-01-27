
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { View, AnalysisResult } from './types';
import { analyzeImage } from './services/geminiService';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('analyze');
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showJson, setShowJson] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('txb_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('txb_history', JSON.stringify(history));
  }, [history]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setCurrentResult(null);
        setShowJson(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    try {
      const data = await analyzeImage(selectedImage);
      const newResult: AnalysisResult = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        imageUrl: selectedImage,
        summary: data.summary,
        detailedAnalysis: data.detailedAnalysis,
        detectedObjects: data.detectedObjects,
        vibe: data.vibe,
        technicalSpecs: data.technicalSpecs
      };
      
      setCurrentResult(newResult);
      setHistory(prev => [newResult, ...prev].slice(0, 20));
    } catch (error) {
      console.error("Analysis failed", error);
      alert("System Overload: Could not process image. Check your matrix connection.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderAnalyzeView = () => (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      {/* Viewport Box */}
      <div className="relative aspect-square w-full tech-corner-br bg-zinc-900 border border-orange-500/20 overflow-hidden group shadow-2xl">
        <div className="grid-bg absolute inset-0 opacity-20 pointer-events-none"></div>
        {selectedImage ? (
          <>
            <img src={selectedImage} alt="Analysis Target" className="w-full h-full object-cover" />
            <div className="scan-line"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
            {!isAnalyzing && !currentResult && (
               <button 
               onClick={() => setSelectedImage(null)}
               className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-lg backdrop-blur-md border border-white/10"
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
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
              <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <p className="text-orange-500/80 font-bold mono text-xs uppercase tracking-[0.2em]">Ready for Capture</p>
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
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

      {selectedImage && !isAnalyzing && !currentResult && (
        <button 
          onClick={handleAnalyze}
          className="w-full prime-gradient text-black font-black py-4 tech-corner-br prime-glow uppercase tracking-[0.25em] text-xs transition-transform active:scale-95"
        >
          Begin Deep Scan
        </button>
      )}

      {currentResult && (
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
              <span className="text-[10px] text-zinc-600 mono font-bold">L_ID: {currentResult.id.toUpperCase()}</span>
            </div>
            <p className="text-xl font-bold text-white leading-tight tracking-tight">
              {currentResult.summary}
            </p>
          </div>

          {/* Technical Data Grid */}
          <div className="grid grid-cols-2 gap-3">
             <div className="tech-corner-br grid-bg bg-orange-500/5 p-4 border border-orange-500/20 relative group overflow-hidden h-28 flex flex-col justify-between">
                <div>
                  <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-orange-500"></div>
                  <span className="block text-[8px] text-orange-500/60 uppercase font-black mb-1 tracking-tighter mono">Atmosphere_Vibe</span>
                  <span className="text-white text-[11px] font-bold leading-tight block uppercase tracking-tight">{currentResult.vibe}</span>
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
                    {currentResult.technicalSpecs || `OPX-PRIME-${Math.random().toString(36).substring(7).toUpperCase()}`}
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

          {/* Detailed Logic Section */}
          <div className="glass p-6 border-b-2 border-orange-500/20 space-y-3">
             <h3 className="text-zinc-500 mono font-black text-[9px] uppercase tracking-[0.3em]">Deep_Logic_Chain</h3>
             <p className="text-zinc-300 text-sm leading-relaxed font-medium">
               {currentResult.detailedAnalysis}
             </p>
             <div className="pt-2 flex flex-wrap gap-1.5">
               {currentResult.detectedObjects.map((obj, i) => (
                 <span key={i} className="px-2 py-0.5 bg-zinc-800 text-[9px] text-zinc-400 border border-zinc-700 font-bold uppercase mono">
                   {obj}
                 </span>
               ))}
             </div>
          </div>

          {/* JSON Worker Terminal */}
          <div className="space-y-2">
            <button 
              onClick={() => setShowJson(!showJson)}
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
                    {JSON.stringify(currentResult, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={() => { setSelectedImage(null); setCurrentResult(null); setShowJson(false); }}
            className="w-full bg-zinc-950 text-zinc-600 font-black py-4 border border-zinc-900 uppercase tracking-[0.3em] text-[10px] hover:bg-zinc-900 hover:text-orange-500 transition-all active:scale-95"
          >
            Purge Current Buffer
          </button>
        </div>
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

  const renderHistoryView = () => (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-2xl font-black tracking-tighter uppercase italic">System Logs</h2>
        <span className="text-[9px] text-zinc-600 mono font-black uppercase">{history.length} Blocks Cached</span>
      </div>

      {history.length === 0 ? (
        <div className="border border-zinc-900 bg-zinc-950/50 rounded-3xl p-16 flex flex-col items-center justify-center text-center space-y-6">
          <div className="text-zinc-800">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
          </div>
          <p className="text-zinc-700 font-bold uppercase tracking-widest text-[10px]">No Previous Diagnostic Data</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div 
              key={item.id} 
              className="bg-zinc-900/50 border border-zinc-800 overflow-hidden flex gap-4 p-3 tech-corner-br hover:border-orange-500/30 transition-all cursor-pointer group active:scale-95"
              onClick={() => {
                setSelectedImage(item.imageUrl);
                setCurrentResult(item);
                setActiveView('analyze');
                setShowJson(false);
              }}
            >
              <div className="w-16 h-16 bg-black border border-zinc-800 p-0.5 flex-shrink-0">
                <img src={item.imageUrl} alt="Log" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <p className="text-[8px] text-zinc-600 mono font-bold uppercase mb-1 flex items-center gap-2">
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
                  <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
                  L_ID:{item.id.toUpperCase()}
                </p>
                <p className="text-[11px] font-bold text-zinc-400 truncate tracking-tight">{item.summary}</p>
                <p className="text-[9px] text-orange-500/60 font-black uppercase mt-1 tracking-widest">{item.vibe}</p>
              </div>
              <div className="flex items-center text-zinc-800 pr-2 group-hover:text-orange-500 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          ))}
          <button 
            onClick={() => { if(confirm('Initiate System Purge?')) setHistory([]); }}
            className="w-full py-6 text-[9px] text-zinc-800 uppercase tracking-[0.4em] font-black hover:text-red-900 transition-colors"
          >
            [ Flush History Memory ]
          </button>
        </div>
      )}
    </div>
  );

  const renderAboutView = () => (
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

  return (
    <Layout activeView={activeView} onViewChange={setActiveView}>
      {activeView === 'analyze' && renderAnalyzeView()}
      {activeView === 'history' && renderHistoryView()}
      {activeView === 'about' && renderAboutView()}
    </Layout>
  );
};

export default App;
