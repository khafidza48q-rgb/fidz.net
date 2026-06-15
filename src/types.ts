export interface SmmService {
  id: string;
  name: string;
  platform: 'instagram' | 'tiktok' | 'youtube' | 'shopee' | 'facebook' | 'twitter' | 'other';
  pricePerK: number;
  minOrder: number;
  maxOrder: number;
  description: string;
}

export interface WebProject {
  id: string;
  title: string;
  description: string;
  englishDescription: string;
  tech: string[];
  category: 'programming' | 'smm' | 'automation';
  demoUrl?: string;
  githubUrl?: string;
}

export interface UniversityMilestone {
  id: string;
  year: string;
  title: string;
  englishTitle: string;
  details: string;
  englishDetails: string;
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}
