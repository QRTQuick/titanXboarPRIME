import { useState } from 'react';
import { AnalysisResult } from '../types';
import { analyzeImage } from '../services/geminiService';
import { generateId } from '../utils';

export const useImageAnalysis = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [showJson, setShowJson] = useState(false);

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

  const handleAnalyze = async (): Promise<AnalysisResult | null> => {
    if (!selectedImage) return null;

    setIsAnalyzing(true);
    try {
      const data = await analyzeImage(selectedImage);
      const newResult: AnalysisResult = {
        id: generateId(),
        timestamp: Date.now(),
        imageUrl: selectedImage,
        summary: data.summary,
        detailedAnalysis: data.detailedAnalysis,
        detectedObjects: data.detectedObjects,
        vibe: data.vibe,
        technicalSpecs: data.technicalSpecs
      };
      
      setCurrentResult(newResult);
      return newResult;
    } catch (error) {
      console.error("Analysis failed", error);
      throw new Error("System Overload: Could not process image. Check your matrix connection.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setCurrentResult(null);
    setShowJson(false);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setCurrentResult(null);
    setShowJson(false);
  };

  const toggleJson = () => {
    setShowJson(prev => !prev);
  };

  const loadResult = (result: AnalysisResult) => {
    setSelectedImage(result.imageUrl);
    setCurrentResult(result);
    setShowJson(false);
  };

  return {
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
  };
};