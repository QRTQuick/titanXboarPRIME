
import React, { useState } from 'react';
import Layout from './components/Layout';
import { View } from './types';
import { useAnalysisHistory } from './hooks/useAnalysisHistory';
import { useImageAnalysis } from './hooks/useImageAnalysis';
import AnalyzeView from './components/views/AnalyzeView';
import HistoryView from './components/views/HistoryView';
import AboutView from './components/views/AboutView';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('analyze');
  
  const { history, addToHistory, clearHistory } = useAnalysisHistory();
  const {
    selectedImage,
    isAnalyzing,
    currentResult,
    showJson,
    handleFileChange,
    handleAnalyze,
    resetAnalysis,
    removeImage,
    toggleJson,
    loadResult
  } = useImageAnalysis();

  const onAnalyze = async () => {
    try {
      const result = await handleAnalyze();
      if (result) {
        addToHistory(result);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Analysis failed");
    }
  };

  const onSelectHistoryItem = (item: any) => {
    loadResult(item);
    setActiveView('analyze');
  };

  return (
    <Layout activeView={activeView} onViewChange={setActiveView}>
      {activeView === 'analyze' && (
        <AnalyzeView
          selectedImage={selectedImage}
          isAnalyzing={isAnalyzing}
          currentResult={currentResult}
          showJson={showJson}
          onFileChange={handleFileChange}
          onAnalyze={onAnalyze}
          onRemoveImage={removeImage}
          onToggleJson={toggleJson}
          onReset={resetAnalysis}
        />
      )}
      {activeView === 'history' && (
        <HistoryView
          history={history}
          onSelectItem={onSelectHistoryItem}
          onClearHistory={clearHistory}
        />
      )}
      {activeView === 'about' && <AboutView />}
    </Layout>
  );
};

export default App;

export default App;
