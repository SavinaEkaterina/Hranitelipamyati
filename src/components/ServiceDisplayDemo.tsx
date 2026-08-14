import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { Video, ZoomIn, Play, Pause } from 'lucide-react';
import { DisplayType } from '../types';
import { getImageUrl } from '../utils/imageResolver';

export interface ServiceDisplayDemoProps {
  displayType: DisplayType;
  imageUrlBefore?: string;
  imageUrlAfter?: string;
  videoUrl?: string;
  posterUrl?: string;
  imageUrl?: string;
  aspectRatio?: string;
  className?: string;
  badgeText?: string;
}

export const ServiceDisplayDemo: React.FC<ServiceDisplayDemoProps> = ({
  displayType,
  imageUrlBefore,
  imageUrlAfter,
  videoUrl,
  posterUrl,
  imageUrl,
  aspectRatio = 'aspect-[16/10]',
  className = '',
  badgeText,
}) => {
  // VIDEO STATE & OBSERVER FOR AUTOPLAY
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const resolvedVideoUrl = videoUrl ? getImageUrl(videoUrl) : '';
  const resolvedPosterUrl = posterUrl ? getImageUrl(posterUrl) : (imageUrlAfter ? getImageUrl(imageUrlAfter) : (imageUrlBefore ? getImageUrl(imageUrlBefore) : undefined));

  useEffect(() => {
    if (displayType !== 'video' || !resolvedVideoUrl || !videoRef.current) return;
    const video = videoRef.current;
    // Explicitly enforce DOM muted property for iOS & Chrome autoplay rules
    video.muted = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.muted = true;
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch((err) => {
                console.warn('[ServiceDisplayDemo Autoplay Notice]:', err?.message || err);
                setIsPlaying(false);
              });
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
    };
  }, [displayType, resolvedVideoUrl]);

  const toggleVideoPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const video = videoRef.current;
    video.muted = true;

    if (video.paused) {
      video
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error('[ServiceDisplayDemo Play Error]:', err);
          if (video.error) {
            console.error('MediaError Details:', {
              code: video.error.code,
              message: video.error.message,
              ABORTED: video.error.code === 1,
              NETWORK: video.error.code === 2,
              DECODE: video.error.code === 3,
              SRC_NOT_SUPPORTED: video.error.code === 4,
            });
          }
        });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget;
    const err = video.error;
    console.error('[ServiceDisplayDemo Video MediaError]:', {
      src: video.currentSrc || video.src,
      code: err?.code,
      message: err?.message,
      ABORTED: err?.code === 1,
      NETWORK: err?.code === 2,
      DECODE: err?.code === 3,
      SRC_NOT_SUPPORTED: err?.code === 4,
    });
  };

  // ZOOM STATE & INTERACTIONS FOR MOSAIC
  const zoomContainerRef = useRef<HTMLDivElement | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [pointerPos, setPointerPos] = useState({ x: 50, y: 50 });
  const [zoomLevel, setZoomLevel] = useState(1);

  const handlePointerMove = useCallback((clientX: number, clientY: number) => {
    if (!zoomContainerRef.current) return;
    const rect = zoomContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
    setPointerPos({ x, y });
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    handlePointerMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  // MODE 1: BEFORE / AFTER SLIDER
  if (displayType === 'beforeAfter') {
    return (
      <div className={className}>
        <BeforeAfterSlider
          imageBefore={imageUrlBefore || ''}
          imageAfter={imageUrlAfter || ''}
          aspectRatio={aspectRatio}
        />
      </div>
    );
  }

  // MODE 2: AUTOPLAY MUTED VIDEO WITH POSTER
  if (displayType === 'video') {
    return (
      <div className={`relative ${className}`}>
        <div className={`relative ${aspectRatio} rounded-2xl overflow-hidden bg-[#1C150F] border border-[#C9A96E]/40 shadow-inner group/video select-none`}>
          <video
            ref={videoRef}
            src={resolvedVideoUrl}
            poster={resolvedPosterUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onLoadStart={() => console.log('[Video Diagnostic] видео найдено:', resolvedVideoUrl)}
            onLoadedData={() => console.log('[Video Diagnostic] видео загружено')}
            onCanPlay={() => console.log('[Video Diagnostic] видео готово к воспроизведению')}
            onPlay={() => console.log('[Video Diagnostic] попытка воспроизведения')}
            onPlaying={() => console.log('[Video Diagnostic] успешный запуск воспроизведения')}
            onPause={() => console.log('[Video Diagnostic] причина остановки: пауза')}
            onEnded={() => console.log('[Video Diagnostic] причина остановки: воспроизведение завершено')}
            onError={handleVideoError}
            className="w-full h-full object-cover transition-transform duration-500 cursor-pointer"
            onClick={(e) => {
              console.log('[Video Diagnostic] пользователь нажал на видео');
              toggleVideoPlay(e);
            }}
          >
            {resolvedVideoUrl && <source src={resolvedVideoUrl} type="video/mp4" />}
          </video>

          {/* Badge Overlay */}
          <div className="absolute top-3 left-3 bg-[#3B3128]/90 text-[#C9A96E] text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-md border border-[#C9A96E]/40 pointer-events-none z-10 shadow-sm backdrop-blur-xs flex items-center space-x-1.5">
            <Video className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span>{badgeText || 'Видео без звука'}</span>
          </div>

          {/* Video Control */}
          <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggleVideoPlay}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-[#3B3128]/90 hover:bg-[#C9A96E] text-[#F8F4EE] hover:text-[#1C150F] transition-all cursor-pointer border border-[#C9A96E]/30 text-xs font-medium flex items-center gap-1.5 backdrop-blur-xs shadow-md"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="text-[11px] hidden sm:inline">{isPlaying ? 'Пауза' : 'Воспроизвести'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MODE 3: SINGLE IMAGE WITH SMOOTH ZOOM ON HOVER / TOUCH
  if (displayType === 'zoom') {
    const currentScale = isZoomed ? (zoomLevel > 1 ? zoomLevel : 2.5) : zoomLevel;

    return (
      <div className={`relative ${className}`}>
        <div
          ref={zoomContainerRef}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsZoomed(true)}
          onTouchEnd={() => setIsZoomed(false)}
          onTouchMove={handleTouchMove}
          className={`relative ${aspectRatio} rounded-2xl overflow-hidden bg-[#1A120B] border border-[#C9A96E]/40 shadow-inner group/zoom cursor-crosshair select-none touch-none`}
        >
          <div
            className="w-full h-full transition-transform duration-200 ease-out"
            style={{
              transform: `scale(${currentScale})`,
              transformOrigin: isZoomed || zoomLevel > 1 ? `${pointerPos.x}% ${pointerPos.y}%` : 'center center'
            }}
          >
            <img
              src={imageUrl || posterUrl || imageUrlAfter}
              alt="Увеличение детализации"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Micro mosaic tiles pattern overlay when zoomed in */}
          {(isZoomed || zoomLevel > 1.2) && (
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                opacity: 0.35,
                backgroundImage: `
                  radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px),
                  linear-gradient(to right, rgba(0,0,0,0.25) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0,0,0,0.25) 1px, transparent 1px)
                `,
                backgroundSize: '12px 12px, 16px 16px, 16px 16px'
              }}
            />
          )}

          {/* Badge Overlay */}
          <div className="absolute top-3 left-3 bg-[#3B3128]/90 text-[#C9A96E] text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-md border border-[#C9A96E]/40 pointer-events-none z-10 shadow-sm backdrop-blur-xs flex items-center space-x-1.5">
            <ZoomIn className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span>
              {isZoomed || zoomLevel > 1 ? `Масштаб ${currentScale.toFixed(1)}x` : (badgeText || 'Наведите для детализации')}
            </span>
          </div>

          {/* Zoom Level Range Slider */}
          <div
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#C9A96E]/30 flex items-center gap-3 z-20"
          >
            <span className="text-[10px] font-serif text-[#C9A96E] whitespace-nowrap">1x Общий</span>
            <input
              type="range"
              min="1"
              max="3.5"
              step="0.1"
              value={zoomLevel}
              onChange={(e) => {
                const val = Number(e.target.value);
                setZoomLevel(val);
                if (val > 1) setIsZoomed(true);
              }}
              className="w-full accent-[#C9A96E] h-1.5 bg-[#3B3128] rounded-lg cursor-pointer"
            />
            <span className="text-[10px] font-serif text-[#C9A96E] whitespace-nowrap">3.5x Детали</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
