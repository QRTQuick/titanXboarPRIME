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
      // Validate file size (max 10MB for mobile compatibility)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        alert('Image too large. Please select an image smaller than 10MB.');
        return;
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Invalid file type. Please select a JPEG, PNG, GIF, or WebP image.');
        return;
      }

      const reader = new FileReader();
      
      reader.onloadstart = () => {
        // Show loading state immediately
        setCurrentResult(null);
        setShowJson(false);
      };
      
      reader.onloadend = () => {
        try {
          const result = reader.result as string;
          if (result) {
            setSelectedImage(result);
          }
        } catch (error) {
          console.error('Error reading file:', error);
          alert('Error reading image file. Please try again.');
        }
      };
      
      reader.onerror = () => {
        console.error('FileReader error');
        alert('Error reading image file. Please try a different image.');
      };
      
      // Use readAsDataURL for better mobile compatibility
      reader.readAsDataURL(file);
    }
    
    // Clear the input value to allow selecting the same file again
    e.target.value = '';
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
        detectedObjects: data.detectedObjects || [],
        vibe: data.vibe,
        technicalSpecs: data.technicalSpecs
      };
      
      setCurrentResult(newResult);
      return newResult;
    } catch (error) {
      console.error("Analysis failed", error);
      
      // More specific error messages
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          throw new Error("API Configuration Error: Please configure your Gemini API key in the environment variables.");
        } else if (error.message.includes('quota') || error.message.includes('limit')) {
          throw new Error("Rate Limit Exceeded: Please wait a moment before analyzing another image.");
        } else if (error.message.includes('Invalid response')) {
          throw new Error("Analysis Error: The AI service returned an invalid response. Please try again.");
        }
      }
      
      throw new Error("System Overload: Could not process image. Check your matrix connection and try again.");
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