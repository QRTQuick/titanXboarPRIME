import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => {
  // Get API key from environment variables
  const apiKey = (globalThis as any).VITE_GEMINI_API_KEY || 