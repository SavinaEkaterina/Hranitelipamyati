import { getImageUrl } from '../utils/imageResolver';

export interface HeroMedia {
  leftTop: string;
  leftMiddle: string;
  leftBottom: string;
  rightTop: string;
  rightMiddle: string;
  rightBottom: string;
  centerPoster: string;
  videoUrl: string;
}

export const HERO_MEDIA: HeroMedia = {
  leftTop: getImageUrl('/hero/hero-01'),
  leftMiddle: getImageUrl('/hero/hero-02'),
  leftBottom: getImageUrl('/hero/hero-03'),
  rightTop: getImageUrl('/hero/hero-04'),
  rightMiddle: getImageUrl('/hero/hero-05'),
  rightBottom: getImageUrl('/hero/hero-06'),
  centerPoster: getImageUrl('/hero/center-poster.webp'),
  videoUrl: '/hero/video/hero.mp4',
};
