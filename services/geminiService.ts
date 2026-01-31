
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
    throw new Error('⚠️ API KEY REQUIRED: Please set your real Gemini API key in .env.local file. Get one from https://ai.google.dev/');
  }
  return new GoogleGenAI({ apiKey });
};

const detectMimeType = (base64String: string): string => {
  if (base64String.startsWith('data:image/')) {
    const mimeMatch = base64String.match(/data:image\/([^;]+)/);
    return mimeMatch ? `image/${mimeMatch[1]}` : 'image/jpeg';
  }
  return 'image/jpeg'; // Default fallback
};

export const analyzeImage = async (base64Image: string): Promise<any> => {
  try {
    const ai = getAI();
    
    const systemInstruction = `
      You are titanXboarPRIME, a high-performance visual intelligence system developed by Quick Red Tech.
      Analyze ANY type of image with extreme precision - whether it's gaming content, nature, people, objects, art, or anything else.
      You must analyze ALL images regardless of content type.
      Return your response strictly in JSON format.
      Provide a concise summary, a detailed description, a list of detected objects, and the "vibe" or atmosphere of the image.
      Be comprehensive and detailed in your analysis.
    `;

    const mimeType = detectMimeType(base64Image);
    const imageData = base64Image.includes(',') ? base64Image.split(',')[1] : base64Image;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType,
                data: imageData,
              },
            },
            { text: "Analyze this image comprehensively and provide a detailed technical and stylistic breakdown. Include all visible elements, colors, composition, and atmosphere." }
          ],
        },
      ],
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "Brief summary of the image content" },
            detailedAnalysis: { type: Type.STRING, description: "Comprehensive analysis of the image" },
            detectedObjects: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of all objects, people, or elements detected in the image"
            },
            vibe: { type: Type.STRING, description: "Overall atmosphere or mood of the image" },
            technicalSpecs: { type: Type.STRING, description: "Technical analysis or hypothetical camera/optical specs" }
          },
          required: ["summary", "detailedAnalysis", "detectedObjects", "vibe"]
        }
      },
    });

    const result = JSON.parse(response.text || '{}');
    
    // Validate the response has required fields
    if (!result.summary || !result.detailedAnalysis || !result.detectedObjects || !result.vibe) {
      throw new Error('Invalid response format from Gemini API');
    }

    return result;
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // Provide specific error messages
    if (error instanceof Error) {
      if (error.message.includes('API KEY REQUIRED')) {
        throw error; // Re-throw API key errors with clear message
      } else if (error.message.includes('API_KEY_INVALID') || error.message.includes('invalid API key')) {
        throw new Error('🔑 INVALID API KEY: Your Gemini API key is invalid. Please check your key at https://ai.google.dev/');
      } else if (error.message.includes('quota') || error.message.includes('limit')) {
        throw new Error('📊 QUOTA EXCEEDED: You have reached your API usage limit. Please check your quota at https://ai.google.dev/');
      } else if (error.message.includes('PERMISSION_DENIED')) {
        throw new Error('🚫 PERMISSION DENIED: Your API key does not have permission to use Gemini. Please check your API settings.');
      } else if (error.message.includes('Invalid response')) {
        throw new Error('🤖 AI RESPONSE ERROR: The AI service returned an invalid response. Please try again.');
      }
    }
    
    throw new Error('🔧 SYSTEM ERROR: Could not process image. Please check your internet connection and try again.');
  }
};
