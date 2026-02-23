import { Type } from "@google/genai";

export type Page = 'splash' | 'home' | 'health' | 'money' | 'career' | 'daily' | 'results' | 'challenges' | 'profile' | 'calculator';

export interface CalculationResult {
  title: string;
  score: number;
  details: string[];
  formula: string;
  category: string;
  breakdown?: { label: string; value: string }[];
  interpretation?: string;
}

export interface UserData {
  name: string;
  lifeScore: number;
  history: { date: string; score: number }[];
}
