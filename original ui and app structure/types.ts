
export interface AnalysisResult {
  id: string;
  timestamp: number;
  imageUrl: string;
  summary: string;
  detailedAnalysis: string;
  detectedObjects: string[];
  vibe: string;
  technicalSpecs?: string;
}

export type View = 'analyze' | 'history' | 'about';
