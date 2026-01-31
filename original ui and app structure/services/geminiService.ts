
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeImage = async (base64Image: string): Promise<any> => {
  const ai = getAI();
  
  const systemInstruction = `
    You are titanXboarPRIME, a high-performance visual intelligence system developed by Quick Red Tech.
    Analyze the provided image with extreme precision.
    Return your response strictly in JSON format.
    Provide a concise summary, a detailed description, a list of detected objects, and the "vibe" or atmosphere of the image.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image.split(',')[1] || base64Image,
            },
          },
          { text: "Analyze this image and provide a technical and stylistic breakdown." }
        ],
      },
    ],
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          detailedAnalysis: { type: Type.STRING },
          detectedObjects: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          vibe: { type: Type.STRING },
          technicalSpecs: { type: Type.STRING, description: "Hypothetical optical analysis specs" }
        },
        required: ["summary", "detailedAnalysis", "detectedObjects", "vibe"]
      }
    },
  });

  return JSON.parse(response.text || '{}');
};
