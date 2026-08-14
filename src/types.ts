export type ServiceType = 'restoration' | 'colorization' | 'revival' | 'mosaic' | 'enhancement' | 'birth_metrics' | 'canvas_print';

export type DisplayType = 'beforeAfter' | 'video' | 'zoom';

export type DamageLevel = 'light' | 'medium' | 'severe';

export interface ServiceDetail {
  id: ServiceType;
  title: string;
  shortDesc: string;
  fullDesc: string;
  priceStarting: number;
  displayType: DisplayType;
  imageUrlBefore?: string;
  imageUrlAfter?: string;
  videoUrl?: string;
  posterUrl?: string;
  imageUrl?: string;
  features: string[];
  badge?: string;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: string;
  year: string;
  location?: string;
  description: string;
  imageUrlBefore: string;
  imageUrlAfter: string;
  videoUrl?: string;
  posterUrl?: string;
  damageDescription: string;
  restorationNotes: string;
}

export interface SavedStory {
  id: string;
  title: string;
  clientName: string;
  region: string;
  year: string;
  storyText: string;
  quote: string;
  imageUrlBefore: string;
  imageUrlAfter: string;
  videoUrl?: string;
  posterUrl?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  avatar: string;
  text: string;
  rating: number;
}

export interface RegionInfo {
  id: string;
  name: string;
  capital: string;
  deliveryDays: string;
  highlighted: boolean;
}

export interface CalculatorState {
  service: 'restoration' | 'colorization' | 'revival';
  quantity: number;
  damageLevel: DamageLevel;
  addColorization: boolean;
  addRevival: boolean;
}

export interface CalculationResult {
  basePricePerPhoto: number;
  addonsPerPhoto: number;
  pricePerPhoto: number;
  originalTotal: number;
  discountPercentage: number;
  discountAmount: number;
  finalTotal: number;
}
