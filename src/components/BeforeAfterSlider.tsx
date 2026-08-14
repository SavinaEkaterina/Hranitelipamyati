import React, { useState, useRef, useCallback, useEffect } from 'react';
import { SlidersHorizontal, ZoomIn, Play, Pause } from 'lucide-react';
import { getImageUrl } from '../utils/imageResolver';

interface BeforeAfterSliderProps {
  imageBefore: string;
  imageAfter: string;
  videoUrl?: string;
  posterUrl?: string;
  title?: string;
  subtitle?: string;
  year?: string;
  aspectRatio?: string;
  compact?: boolean;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  imageBefore,
  imageAfter,
  videoUrl,
  posterUrl,
  title,
  subtitle,
  year,
  aspectRatio = 'aspect-[4/3]',
  compact = false
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [zoomActive, setZoomActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const resolvedVideoUrl = videoUrl ? getImageUrl(videoUrl) : '';
  const resolvedPosterUrl = posterUrl ? getImageUrl(posterUrl) : (imageAfter ? getImageUrl(imageAfter) : (imageBefore ? getImageUrl(imageBefore) : undefined));

  // Auto-play video on visibility (IntersectionObserver for browser autoplay policy & mobile support)
  useEffect(() => {
    if (!resolvedVideoUrl || !videoRef.current) return;
    const video = videoRef.current;
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
                console.warn('[BeforeAfterSlider Autoplay Notice]:', err?.message || err);
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
  }, [resolvedVideoUrl]);

  const toggleVideoPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const video = videoRef.current;
    video.muted = true;

    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error('[BeforeAfterSlider Play Error]:', err);
          if (video.error) {
            console.error('MediaError details:', {
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
    console.error('[BeforeAfterSlider Video MediaError]:', {
      src: video.currentSrc || video.src,
      code: err?.code,
      message: err?.message,
      ABORTED: err?.code === 1,
      NETWORK: err?.code === 2,
      DECODE: err?.code === 3,
      SRC_NOT_SUPPORTED: err?.code === 4,
    });
  };

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      let percentage = (x / rect.width) * 100;
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;
      setSliderPos(percentage);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  // If videoUrl is provided, render video player card instead of before/after split slider
  if (videoUrl) {
    return (
      <div className="relative group select-none">
        <div
          className={`relative ${aspectRatio} rounded-2xl overflow-hidden shadow-lg border border-[#C9A96E]/30 bg-[#1C150F] flex items-center justify-center`}
        >
          <video
            ref={videoRef}
            src={resolvedVideoUrl}
            poster={resolvedPosterUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onLoadStart={() => console.log('[BeforeAfterSlider Diagnostic] видео найдено:', resolvedVideoUrl)}
            onLoadedData={() => console.log('[BeforeAfterSlider Diagnostic] видео загружено')}
            onCanPlay={() => console.log('[BeforeAfterSlider Diagnostic] видео готово к воспроизведению')}
            onPlay={() => console.log('[BeforeAfterSlider Diagnostic] попытка воспроизведения')}
            onPlaying={() => console.log('[BeforeAfterSlider Diagnostic] успешный запуск воспроизведения')}
            onPause={() => console.log('[BeforeAfterSlider Diagnostic] причина остановки: пауза')}
            onEnded={() => console.log('[BeforeAfterSlider Diagnostic] причина остановки: воспроизведение завершено')}
            onError={handleVideoError}
            className="w-full h-full object-cover transition-transform duration-500 cursor-pointer"
            onClick={(e) => {
              console.log('[BeforeAfterSlider Diagnostic] пользователь нажал на видео');
              toggleVideoPlay(e);
            }}
          >
            {resolvedVideoUrl && <source src={resolvedVideoUrl} type="video/mp4" />}
          </video>

          {/* Badge Overlay */}
          <div className="absolute top-3 left-3 bg-[#3B3128]/90 text-[#C9A96E] text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-md border border-[#C9A96E]/40 pointer-events-none z-10 shadow-sm backdrop-blur-xs flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Оживление фотографий</span>
          </div>

          {/* Video Play / Pause Control Button */}
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

        {(title || subtitle || year) && (
          <div className="mt-3.5 px-0.5 space-y-0.5">
            {title && (
              <div className="font-serif text-lg sm:text-xl font-semibold text-[#2B2017] tracking-tight leading-snug">
                {title}
              </div>
            )}
            {(subtitle || year) && (
              <div className="text-xs sm:text-sm font-serif italic text-[#8C6239] flex items-center space-x-1.5 opacity-90">
                <span>{subtitle || year}</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative group select-none">
      
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className={`relative ${aspectRatio} rounded-2xl overflow-hidden shadow-lg border border-[#C9A96E]/30 cursor-ew-resize bg-[#2D251E]`}
      >
        {/* Before / After Photo Slider */}
        <>
          {/* RESTORED (AFTER) Photo Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${imageAfter}')`,
              filter: `${zoomActive ? 'scale(1.2)' : 'none'}`,
              transition: 'filter 0.3s'
            }}
          />

          {/* Desktop Labels Overlay */}
          <div className="hidden md:flex absolute top-3 right-3 bg-[#3B3128]/90 text-[#C9A96E] text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-md border border-[#C9A96E]/40 pointer-events-none z-10 shadow-sm backdrop-blur-xs items-center space-x-1">
            <span>ПОСЛЕ (Отреставрировано)</span>
          </div>

          {/* OLD (BEFORE) Photo Clipped Foreground Layer */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${imageBefore}')`,
              clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
              filter: `sepia(0.65) contrast(1.1) brightness(0.95) ${zoomActive ? 'scale(1.2)' : ''}`,
              transition: 'filter 0.3s'
            }}
          />

          <div className="hidden md:flex absolute top-3 left-3 bg-[#3B3128]/90 text-[#EFE8DC] text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-md border border-[#C9A96E]/40 pointer-events-none z-10 shadow-sm backdrop-blur-xs items-center space-x-1">
            <span>ДО (Оригинал)</span>
          </div>

          {/* Slider Handle Divider */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#3B3128] text-[#C9A96E] border-2 border-white shadow-xl flex items-center justify-center pointer-events-auto cursor-ew-resize">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
          </div>
        </>

        {/* Action Controls Overlay */}
        {!compact && (
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className="absolute bottom-3 right-3 z-30 flex flex-wrap items-center gap-1.5"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setZoomActive(!zoomActive);
              }}
              title={zoomActive ? 'Уменьшить' : 'Увеличить детали'}
              className="p-1.5 rounded-lg bg-[#3B3128]/90 text-[#F8F4EE] hover:bg-[#C9A96E] hover:text-white transition-colors cursor-pointer border border-[#C9A96E]/30"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>

      {/* Mobile Labels Row (below comparison image on mobile screens) */}
      <div className="flex md:hidden items-center justify-between w-full mt-2.5 px-0.5">
        <div className="bg-[#3B3128]/90 text-[#EFE8DC] text-[10px] xs:text-[11px] font-semibold px-2.5 py-1 rounded-md border border-[#C9A96E]/40 shadow-sm flex items-center space-x-1">
          <span>ДО (Оригинал)</span>
        </div>
        <div className="bg-[#3B3128]/90 text-[#C9A96E] text-[10px] xs:text-[11px] font-semibold px-2.5 py-1 rounded-md border border-[#C9A96E]/40 shadow-sm flex items-center space-x-1">
          <span>ПОСЛЕ (Отреставрировано)</span>
        </div>
      </div>

      {(title || subtitle || year) && (
        <div className="mt-3.5 px-0.5 space-y-0.5">
          {title && (
            <div className="font-serif text-lg sm:text-xl font-semibold text-[#2B2017] tracking-tight leading-snug">
              {title}
            </div>
          )}
          {(subtitle || year) && (
            <div className="text-xs sm:text-sm font-serif italic text-[#8C6239] flex items-center space-x-1.5 opacity-90">
              <span>{subtitle || year}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
