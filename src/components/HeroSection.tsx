import React, { useState, useEffect, useRef } from 'react';
import { HERO_MEDIA } from '../data/hero';
import { getImageUrl } from '../utils/imageResolver';
import {
  Sparkles,
  Volume2,
  VolumeX,
  ShieldCheck,
  Heart,
  CheckCircle2,
} from 'lucide-react';
import { DustCanvas } from './DustCanvas';

interface HeroSectionProps {
  onOpenOrderModal: () => void;
  onCinematicComplete?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenOrderModal,
  onCinematicComplete
}) => {
  // Mouse position for subtle 3D workbench parallax tilt
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredPhotoId, setHoveredPhotoId] = useState<string | null>(null);

  // Scroll position for pull-back camera effect
  const [scrollY, setScrollY] = useState(0);

  // 6 Refined Vintage Archive Photos scattered naturally close around central video
  // 3 Distinct Sizes: Small (~84x110), Medium (~102x132), Large (~122x156)
  const SIDE_PHOTOS = [
    {
      id: 'left-top',
      url: HERO_MEDIA.leftTop,
      alt: 'Архивный портрет',
      widthPx: 122,
      heightPx: 156,
      rotation: -6,
      top: '7%',
      left: '10%',
      parallaxFactor: 0.03,
    },
    {
      id: 'left-middle',
      url: HERO_MEDIA.leftMiddle,
      alt: 'Семейная фотография',
      widthPx: 84,
      heightPx: 110,
      rotation: 5,
      top: '41%',
      left: '14.5%',
      parallaxFactor: 0.04,
    },
    {
      id: 'left-bottom',
      url: HERO_MEDIA.leftBottom,
      alt: 'Ретро фотография',
      widthPx: 102,
      heightPx: 132,
      rotation: -7,
      top: '73%',
      left: '9.5%',
      parallaxFactor: 0.05,
    },
    {
      id: 'right-top',
      url: HERO_MEDIA.rightTop,
      alt: 'Старинный портрет',
      widthPx: 102,
      heightPx: 132,
      rotation: 6,
      top: '11%',
      right: '11%',
      parallaxFactor: 0.03,
    },
    {
      id: 'right-middle',
      url: HERO_MEDIA.rightMiddle,
      alt: 'Исторический снимок',
      widthPx: 120,
      heightPx: 154,
      rotation: -5,
      top: '46%',
      right: '8.5%',
      parallaxFactor: 0.04,
    },
    {
      id: 'right-bottom',
      url: HERO_MEDIA.rightBottom,
      alt: 'Архивный кадр',
      widthPx: 86,
      heightPx: 112,
      rotation: 7,
      top: '77%',
      right: '13%',
      parallaxFactor: 0.05,
    },
  ];

  // Cinematic Timeline Stages
  const [timelineStage] = useState<'darkness' | 'table_focus' | 'restoration' | 'revival' | 'complete'>('complete');

  // Text Reveal Sub-states
  const [headlineLine1] = useState(true);
  const [headlineLine2] = useState(true);
  const [subtitleVisible] = useState(true);
  const [buttonsVisible] = useState(true);

  // Audio State
  const [isAudioActive, setIsAudioActive] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Video Ref & Auto-Mute Enforcement
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const heroVideoUrl = getImageUrl(HERO_MEDIA.videoUrl);
  const heroPosterUrl = getImageUrl(HERO_MEDIA.centerPoster);

  useEffect(() => {
    if (!heroVideoRef.current) return;
    const video = heroVideoRef.current;
    video.muted = true;
    video.play().catch((err) => {
      console.warn('[HeroSection Video Autoplay Notice]:', err?.message || err);
    });
  }, [heroVideoUrl]);

  const handleHeroVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget;
    const err = video.error;
    console.error('[HeroSection Video MediaError]:', {
      src: video.currentSrc || video.src,
      code: err?.code,
      message: err?.message,
    });
  };

  // Handle Scroll listener for Camera Pull-Back
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    setMousePos({ x, y });
  };

  useEffect(() => {
    if (onCinematicComplete) {
      onCinematicComplete();
    }
  }, [onCinematicComplete]);

  // Compute scroll camera pull-back scale factor
  const scrollPullBackScale = Math.max(0.82, 1 - Math.min(scrollY / 500, 0.18));

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-8 pb-12 lg:pt-12 lg:pb-16 overflow-hidden flex items-center justify-center bg-[#17100B] select-none"
    >
      {/* Floating Sunlit Dust Particles */}
      <DustCanvas enabled={true} />

      {/* ========================================================= */}
      {/* 2. BACKGROUND IMAGE LAYER                                 */}
      {/* ========================================================= */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-700 ease-out pointer-events-none bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${getImageUrl('/hero/hero-background')}')`,
          transform: `scale(${scrollPullBackScale}) translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0)`
        }}
      >
        {/* Subtle overlay for text & video contrast */}
        <div className="absolute inset-0 bg-black/5 pointer-events-none" />
      </div>

      {/* ========================================================= */}
      {/* 3. SCATTERED VINTAGE ARCHIVE PHOTOS AROUND DESK (6 TOTAL) */}
      {/* ========================================================= */}
      <div
        className="absolute inset-0 z-10 pointer-events-none transition-transform duration-700 ease-out hidden lg:block overflow-hidden"
        style={{
          transform: `scale(${scrollPullBackScale}) translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0)`
        }}
      >
        {SIDE_PHOTOS.map((photo) => {
          const isHovered = hoveredPhotoId === photo.id;
          const translateX = mousePos.x * photo.parallaxFactor * 25;
          const translateY = mousePos.y * photo.parallaxFactor * 25;

          return (
            <div
              key={photo.id}
              onMouseEnter={() => setHoveredPhotoId(photo.id)}
              onMouseLeave={() => setHoveredPhotoId(null)}
              className="absolute pointer-events-auto transition-all duration-500 ease-out select-none"
              style={{
                top: photo.top,
                left: photo.left,
                right: photo.right,
                zIndex: isHovered ? 25 : 10,
                transform: `
                  translate3d(${translateX}px, ${translateY}px, 0)
                  rotate(${isHovered ? photo.rotation * 0.3 : photo.rotation}deg)
                  scale(${isHovered ? 1.08 : 1})
                `,
              }}
            >
              {/* Photo printed card lying on wooden surface with directional cast shadow (light from top-left) */}
              <div
                className={`
                  relative bg-[#FAF6F0] p-1.5 rounded-md transition-all duration-500 overflow-hidden group border border-[#C9A96E]/30
                  shadow-[12px_18px_36px_rgba(4,2,1,0.85),2px_4px_10px_rgba(0,0,0,0.6)]
                  ${isHovered ? 'ring-1 ring-[#C9A96E]/70 shadow-[20px_32px_52px_rgba(4,2,1,0.95),4px_8px_18px_rgba(0,0,0,0.7)]' : ''}
                `}
                style={{
                  width: `${photo.widthPx}px`,
                  height: `${photo.heightPx}px`,
                }}
              >
                <div className="relative w-full h-full rounded bg-[#1C150F] overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-all duration-700 filter sepia-[0.35] contrast-[1.12] brightness-[0.9] group-hover:sepia-0 group-hover:contrast-100 group-hover:brightness-100"
                  />
                  
                  {/* Subtle inner photo print edge shadow */}
                  <div className="absolute inset-0 shadow-[inset_0_0_8px_rgba(0,0,0,0.45)] pointer-events-none" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* 4. MAIN CENTRAL PHOTO CANVAS ("ОЖИВШАЯ ПАМЯТЬ")            */}
      {/* ========================================================= */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 text-center w-full my-auto pt-6">
        
        {/* Central Physical Photo resting on Wooden Table */}
        <div
          className="relative mx-auto transition-all duration-1000 ease-out"
          style={{
            transform: `scale(${timelineStage === 'table_focus' ? 1.05 : 1})`
          }}
        >
          {/* CINEMATIC WARM DESK LAMP ILLUMINATION (BEHIND CENTRAL VIDEO) */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] sm:w-[860px] md:w-[960px] h-[600px] sm:h-[720px] pointer-events-none rounded-full z-0 blur-[95px] sm:blur-[115px] transition-opacity duration-1000"
            style={{
              opacity: 0.18,
              background: 'radial-gradient(ellipse at center, #F0DBB3 0%, #E2C18D 28%, #D6B07A 50%, rgba(184, 137, 77, 0.2) 72%, rgba(0, 0, 0, 0) 90%)',
            }}
          />

          {/* AUTHENTIC VINTAGE PHOTO RESTING DIRECTLY ON DESK */}
          <div className="relative z-10 mx-auto max-w-[365px] sm:max-w-[425px] md:max-w-[440px] w-full h-[275px] sm:h-[320px] md:h-[335px] shadow-[12px_18px_36px_rgba(4,2,1,0.85),2px_4px_10px_rgba(0,0,0,0.6)] overflow-hidden">
            <video
              ref={heroVideoRef}
              src={heroVideoUrl}
              poster={heroPosterUrl}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              onLoadStart={() => console.log('[HeroSection Diagnostic] видео найдено:', heroVideoUrl)}
              onLoadedData={() => console.log('[HeroSection Diagnostic] видео загружено')}
              onCanPlay={() => console.log('[HeroSection Diagnostic] видео готово к воспроизведению')}
              onPlay={() => console.log('[HeroSection Diagnostic] попытка воспроизведения')}
              onPlaying={() => console.log('[HeroSection Diagnostic] успешный запуск воспроизведения')}
              onPause={() => console.log('[HeroSection Diagnostic] причина остановки: пауза')}
              onEnded={() => console.log('[HeroSection Diagnostic] причина остановки: завершено')}
              onError={handleHeroVideoError}
              className="w-full h-full object-cover"
            >
              {heroVideoUrl && <source src={heroVideoUrl} type="video/mp4" />}
            </video>
          </div>

        </div>

        {/* ========================================================= */}
        {/* 4. HEADLINE & COPY (APPEARS LINE BY LINE AFTER SCENE)     */}
        {/* ========================================================= */}
        <div className="space-y-4 max-w-3xl mx-auto pt-8">
          
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-semibold text-[#FDFBF7] leading-[1.15] tracking-tight min-h-[90px] sm:min-h-[120px] flex flex-col items-center justify-center">
            {headlineLine1 && (
              <span className="block animate-in fade-in slide-in-from-bottom-3 duration-1000">
                Некоторые фотографии невозможно переснять.
              </span>
            )}
            {headlineLine2 && (
              <span className="block italic font-normal gold-gradient-text pt-1.5 animate-in fade-in slide-in-from-bottom-3 duration-1000">
                Но их можно вернуть к жизни.
              </span>
            )}
          </h1>

          {subtitleVisible && (
            <p className="text-sm sm:text-lg text-[#D8C29D]/90 max-w-2xl mx-auto font-sans leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-1000">
              Мы бережно восстанавливаем семейные фотографии, возвращая воспоминания, которые невозможно повторить.
            </p>
          )}

        </div>

        {/* ========================================================= */}
        {/* 5. ACTION BUTTONS (REVEAL AFTER TEXT)                     */}
        {/* ========================================================= */}
        {buttonsVisible && (
          <div className="pt-6 space-y-6 max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
            
            {/* Two Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              {/* Primary CTA: "Вернуть фотографию к жизни" */}
              <button
                onClick={onOpenOrderModal}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-[#C9A96E] via-[#B8894D] to-[#9E733B] hover:from-[#D8B67D] hover:to-[#B8894D] text-[#1C150F] font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl hover:shadow-[#C9A96E]/30 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center space-x-2 cursor-pointer border border-[#FDFBF7]/30"
              >
                <Sparkles className="w-5 h-5 text-[#1C150F] animate-pulse" />
                <span>Вернуть фотографию к жизни</span>
              </button>

              {/* Secondary CTA: "Посмотреть истории восстановления" */}
              <a
                href="#stories"
                onClick={(e) => {
                  e.preventDefault();
                  const storiesEl = document.getElementById('stories');
                  if (storiesEl) {
                    storiesEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-[#2B1D14]/80 hover:bg-[#3B2D22] text-[#FDFBF7] font-semibold text-sm border border-[#C9A96E]/40 shadow-md hover:border-[#C9A96E] transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Посмотреть истории восстановления</span>
              </a>
            </div>

            {/* Compact Secondary Messenger Buttons: VK, MAX, Telegram */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
              <span className="text-xs text-[#C9A96E]/80 font-serif italic mr-1">Быстрая связь:</span>

              {/* VK */}
              <a
                href="https://vk.me/savinkl"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-[#2B1D14]/90 hover:bg-[#3D2B1F] text-[#EFE4D2] hover:text-[#FDFBF7] border border-[#C9A96E]/35 hover:border-[#C9A96E] font-serif text-xs font-medium transition-all shadow-sm flex items-center space-x-1.5 hover:scale-[1.03]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
                <span>VK</span>
              </a>

              {/* MAX */}
              <a
                href="https://max.ru/u/f9LHodD0cOJDrWIUZMR6bdn9Y72qtC2JycHUPiCBgCX7inoYyVE0U0pqqX8"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-[#2B1D14]/90 hover:bg-[#3D2B1F] text-[#EFE4D2] hover:text-[#FDFBF7] border border-[#C9A96E]/35 hover:border-[#C9A96E] font-serif text-xs font-medium transition-all shadow-sm flex items-center space-x-1.5 hover:scale-[1.03]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
                <span>MAX</span>
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/savinaek"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-[#2B1D14]/90 hover:bg-[#3D2B1F] text-[#EFE4D2] hover:text-[#FDFBF7] border border-[#C9A96E]/35 hover:border-[#C9A96E] font-serif text-xs font-medium transition-all shadow-sm flex items-center space-x-1.5 hover:scale-[1.03]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
                <span>Telegram</span>
              </a>
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-3 text-xs text-[#D8C29D]/80 border-t border-[#C9A96E]/20">
              <div className="flex items-center justify-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C9A96E] shrink-0" />
                <span>Без предоплаты за оценку</span>
              </div>
              <div className="flex items-center justify-center space-x-1.5">
                <Heart className="w-4 h-4 text-[#C9A96E] shrink-0" />
                <span>Бережный подход к оригиналу</span>
              </div>
              <div className="flex items-center justify-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C9A96E] shrink-0" />
                <span>100% сохранение памяти</span>
              </div>
            </div>

          </div>
        )}

      </div>

    </section>
  );
};
