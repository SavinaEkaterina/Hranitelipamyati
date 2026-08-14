import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, X, Baby, Heart, Church, Award, Star, Gift, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { ServiceDisplayDemo } from './ServiceDisplayDemo';
import { SERVICES_DATA } from '../data/services';
import { EXHIBITION_DATA, ExhibitionCategory } from '../data/exhibition';
import { ServiceDetail, DisplayType } from '../types';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
  onOpenOrderModal?: (calcResult?: any) => void;
}

interface ServiceModalData {
  title: string;
  subtitle: string;
  serviceId: string;
  price: string;
  displayType: DisplayType;
  imageUrlBefore?: string;
  imageUrlAfter?: string;
  videoUrl?: string;
  posterUrl?: string;
  imageUrl?: string;
  description: string;
  features: string[];
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Baby,
  Heart,
  Church,
  Award,
  Sparkles,
  Star,
  Gift
};

const SmoothMetricPreview: React.FC<{
  imageUrl: string;
  badgeText: string;
  imagesCount?: number;
  currentImageIndex?: number;
  onPrevImage?: () => void;
  onNextImage?: () => void;
}> = ({
  imageUrl,
  badgeText,
  imagesCount = 1,
  currentImageIndex = 0,
  onPrevImage,
  onNextImage
}) => {
  const [displayedUrl, setDisplayedUrl] = useState(imageUrl);
  const [animStage, setAnimStage] = useState<'idle' | 'exiting' | 'entering'>('idle');

  useEffect(() => {
    if (imageUrl !== displayedUrl) {
      setAnimStage('exiting');

      const exitTimer = setTimeout(() => {
        setDisplayedUrl(imageUrl);
        setAnimStage('entering');
      }, 200);

      return () => clearTimeout(exitTimer);
    }
  }, [imageUrl, displayedUrl]);

  useEffect(() => {
    if (animStage === 'entering') {
      const raf = requestAnimationFrame(() => {
        setAnimStage('idle');
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [animStage]);

  let transitionStyle: React.CSSProperties;

  if (animStage === 'exiting') {
    transitionStyle = {
      transform: 'scale(0.98)',
      opacity: 0,
      transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms cubic-bezier(0.16, 1, 0.3, 1)',
      willChange: 'transform, opacity',
    };
  } else if (animStage === 'entering') {
    transitionStyle = {
      transform: 'scale(0.98)',
      opacity: 0,
      transition: 'none',
      willChange: 'transform, opacity',
    };
  } else {
    transitionStyle = {
      transform: 'scale(1)',
      opacity: 1,
      transition: 'transform 350ms cubic-bezier(0.16, 1, 0.3, 1), opacity 350ms cubic-bezier(0.16, 1, 0.3, 1)',
      willChange: 'transform, opacity',
    };
  }

  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        onNextImage?.();
      } else {
        onPrevImage?.();
      }
    }
    setTouchStartX(null);
  };

  return (
    <div
      className="relative w-full h-full group/preview select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div style={transitionStyle} className="w-full h-full">
        <ServiceDisplayDemo
          displayType="zoom"
          imageUrl={displayedUrl}
          aspectRatio="aspect-[16/10]"
          badgeText={badgeText}
        />
      </div>

      {imagesCount > 1 && (
        <>
          {/* Side Overlay Arrow Left */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevImage?.();
            }}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#1C150F]/80 hover:bg-[#C9A96E] text-[#C9A96E] hover:text-[#1C150F] border border-[#C9A96E]/40 flex items-center justify-center transition-all cursor-pointer shadow-xl sm:opacity-0 group-hover/preview:opacity-100"
            title="Предыдущее фото"
            aria-label="Предыдущее фото"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Side Overlay Arrow Right */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNextImage?.();
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#1C150F]/80 hover:bg-[#C9A96E] text-[#C9A96E] hover:text-[#1C150F] border border-[#C9A96E]/40 flex items-center justify-center transition-all cursor-pointer shadow-xl sm:opacity-0 group-hover/preview:opacity-100"
            title="Следующее фото"
            aria-label="Следующее фото"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Bottom Counter Capsule & Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-2.5 z-20 bg-[#1C150F]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C9A96E]/40 shadow-lg">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrevImage?.();
              }}
              className="text-[#C9A96E] hover:text-[#EFE4D2] p-0.5 transition-colors cursor-pointer"
              title="Предыдущее фото"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center space-x-1.5 px-0.5">
              {Array.from({ length: imagesCount }).map((_, idx) => (
                <span
                  key={idx}
                  className={`inline-block rounded-full transition-all ${
                    idx === currentImageIndex
                      ? 'w-2.5 h-2.5 bg-[#C9A96E] shadow'
                      : 'w-1.5 h-1.5 bg-[#D8C29D]/40'
                  }`}
                />
              ))}
            </div>

            <span className="text-[11px] font-mono text-[#D8C29D] font-bold pl-0.5 pr-0.5">
              {currentImageIndex + 1}/{imagesCount}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onNextImage?.();
              }}
              className="text-[#C9A96E] hover:text-[#EFE4D2] p-0.5 transition-colors cursor-pointer"
              title="Следующее фото"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService, onOpenOrderModal }) => {
  // Modal State for "Посмотреть пример"
  const [activeModalData, setActiveModalData] = useState<ServiceModalData | null>(null);
  const [selectedMetricTab, setSelectedMetricTab] = useState<string>(EXHIBITION_DATA[0]?.id || 'birth');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const activeMetric = EXHIBITION_DATA.find((m) => m.id === selectedMetricTab) || EXHIBITION_DATA[0];
  const currentImageUrl = activeMetric.images[currentImageIndex] || activeMetric.images[0] || '';

  const handleCalculateCost = (serviceId: string, price?: number) => {
    if (onOpenOrderModal) {
      if (price) {
        onOpenOrderModal({ quantity: 1, finalTotal: price, discountPercentage: 0 });
      } else {
        onOpenOrderModal();
      }
    } else {
      onSelectService(serviceId);
    }
  };

  const openExampleModal = (service: ServiceDetail) => {
    setActiveModalData({
      title: service.title,
      subtitle: service.shortDesc,
      serviceId: service.id,
      price: service.priceStarting.toString(),
      displayType: service.displayType,
      imageUrlBefore: service.imageUrlBefore,
      imageUrlAfter: service.imageUrlAfter,
      videoUrl: service.videoUrl,
      posterUrl: service.posterUrl,
      imageUrl: service.imageUrl,
      description: service.fullDesc,
      features: service.features
    });
  };

  const openMetricModal = (metric: ExhibitionCategory, imageUrl: string) => {
    setActiveModalData({
      title: metric.title,
      subtitle: metric.label,
      serviceId: 'birth_metrics',
      price: metric.price.toString(),
      displayType: 'zoom',
      imageUrl: imageUrl,
      description: metric.shortDesc,
      features: metric.features
    });
  };

  const restorationService = SERVICES_DATA.find((s) => s.id === 'restoration') || SERVICES_DATA[0];
  const colorizationService = SERVICES_DATA.find((s) => s.id === 'colorization') || SERVICES_DATA[1];
  const revivalService = SERVICES_DATA.find((s) => s.id === 'revival') || SERVICES_DATA[2];
  const mosaicService = SERVICES_DATA.find((s) => s.id === 'mosaic') || SERVICES_DATA[3];
  const enhancementService = SERVICES_DATA.find((s) => s.id === 'enhancement') || SERVICES_DATA[4];
  const birthMetricsService = SERVICES_DATA.find((s) => s.id === 'birth_metrics') || SERVICES_DATA[5];

  return (
    <section id="services" className="py-12 lg:py-16 relative bg-[#FAF6F0] border-t border-[#C9A96E]/30 text-[#3B3128] select-none overflow-hidden">
      
      {/* Background Delicate Paper Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply"
        style={{
          backgroundImage: `
            radial-gradient(circle at 10% 20%, rgba(201, 169, 110, 0.12) 0%, transparent 60%),
            radial-gradient(circle at 90% 80%, rgba(140, 98, 57, 0.1) 0%, transparent 60%),
            radial-gradient(rgba(140, 98, 57, 0.04) 1px, transparent 0)
          `,
          backgroundSize: '100% 100%, 100% 100%, 28px 28px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================= */}
        {/* 1. HEADER (EMOTIONAL & REFINED)                           */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-5 mb-10 sm:mb-12">
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-semibold text-[#2B2017] tracking-tight leading-tight">
            Что мы можем сохранить для вашей семьи
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#6E5A47] leading-relaxed max-w-2xl mx-auto font-normal">
            Каждая фотография хранит воспоминания, которые невозможно повторить. Мы помогаем сохранить их для будущих поколений с помощью современных технологий ИИ и нейросетей.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 2. ASYMMETRIC BENTO EDITORIAL GRID OF SERVICES            */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">

          {/* --------------------------------------------------------- */}
          {/* CARD 1: RESTORATION (beforeAfter)                          */}
          {/* --------------------------------------------------------- */}
          <div className="lg:col-span-7 bg-[#FAF6F0] p-6 sm:p-8 rounded-3xl photo-paper-shadow border border-[#C9A96E]/40 hover:border-[#C9A96E] transition-all duration-500 flex flex-col justify-between group">
            
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B2017] group-hover:text-[#B8894D] transition-colors">
                    {restorationService.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-[#8C6239] font-medium pt-0.5">
                    {restorationService.shortDesc}
                  </p>
                </div>
                <span className="text-xs sm:text-sm font-mono font-bold bg-[#EFE4D2] text-[#2B2017] px-3.5 py-1.5 rounded-full border border-[#C9A96E]/40 shrink-0">
                  от {restorationService.priceStarting} ₽
                </span>
              </div>

              {/* Display Demo Component */}
              <div className="pt-2">
                <ServiceDisplayDemo
                  displayType={restorationService.displayType}
                  imageUrlBefore={restorationService.imageUrlBefore}
                  imageUrlAfter={restorationService.imageUrlAfter}
                  aspectRatio="aspect-[16/10]"
                />
                <p className="text-[11px] font-serif italic text-[#7B6854] text-center mt-2">
                  Потяните ползунок, чтобы увидеть расчистку заломов и трещин с помощью ИИ
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => openExampleModal(restorationService)}
                className="py-3 px-4 rounded-xl bg-[#EFE4D2] hover:bg-[#E2D4BF] text-[#2B2017] font-semibold text-xs transition-all text-center cursor-pointer border border-[#C9A96E]/30"
              >
                Посмотреть пример
              </button>

              <button
                onClick={() => handleCalculateCost(restorationService.id, restorationService.priceStarting)}
                className="py-3 px-4 rounded-xl bg-[#2B2017] hover:bg-[#3B2D22] text-[#C9A96E] font-bold text-xs transition-all text-center flex items-center justify-center space-x-1.5 cursor-pointer shadow-md"
              >
                <span>Сделать заказ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>


          {/* --------------------------------------------------------- */}
          {/* CARD 2: COLORIZATION (beforeAfter)                        */}
          {/* --------------------------------------------------------- */}
          <div className="lg:col-span-5 bg-[#FAF6F0] p-6 sm:p-8 rounded-3xl photo-paper-shadow border border-[#C9A96E]/40 hover:border-[#C9A96E] transition-all duration-500 flex flex-col justify-between group">
            
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#2B2017] group-hover:text-[#B8894D] transition-colors">
                    {colorizationService.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-[#8C6239] font-medium pt-0.5">
                    {colorizationService.shortDesc}
                  </p>
                </div>
                <span className="text-xs sm:text-sm font-mono font-bold bg-[#EFE4D2] text-[#2B2017] px-3.5 py-1.5 rounded-full border border-[#C9A96E]/40 shrink-0">
                  от {colorizationService.priceStarting} ₽
                </span>
              </div>

              {/* Display Demo Component */}
              <div className="pt-2">
                <ServiceDisplayDemo
                  displayType={colorizationService.displayType}
                  imageUrlBefore={colorizationService.imageUrlBefore}
                  imageUrlAfter={colorizationService.imageUrlAfter}
                  aspectRatio="aspect-[16/10]"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => openExampleModal(colorizationService)}
                className="py-3 px-4 rounded-xl bg-[#EFE4D2] hover:bg-[#E2D4BF] text-[#2B2017] font-semibold text-xs transition-all text-center cursor-pointer border border-[#C9A96E]/30"
              >
                Посмотреть пример
              </button>

              <button
                onClick={() => handleCalculateCost(colorizationService.id, colorizationService.priceStarting)}
                className="py-3 px-4 rounded-xl bg-[#2B2017] hover:bg-[#3B2D22] text-[#C9A96E] font-bold text-xs transition-all text-center flex items-center justify-center space-x-1.5 cursor-pointer shadow-md"
              >
                <span>Сделать заказ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>


          {/* --------------------------------------------------------- */}
          {/* CARD 3: LIVING REVIVAL (video)                            */}
          {/* --------------------------------------------------------- */}
          <div className="lg:col-span-12 bg-gradient-to-r from-[#2B1D13] via-[#1C130D] to-[#2B1D13] p-6 sm:p-10 rounded-3xl text-[#FDFBF7] shadow-2xl border border-[#C9A96E]/50 relative overflow-hidden group">
            
            {/* Subtle background glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Info Column */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C9A96E]/20 border border-[#C9A96E]/40 text-[#C9A96E] text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>Кинематографичный эффект</span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#FDFBF7]">
                  {revivalService.title}
                </h3>

                <p className="text-sm sm:text-base font-sans text-[#D8C29D] font-medium">
                  {revivalService.shortDesc}
                </p>

                <p className="text-xs sm:text-sm font-sans text-[#D8C29D]/80 leading-relaxed max-w-xl">
                  {revivalService.fullDesc}
                </p>

                <div className="pt-2 flex items-center space-x-3 text-xs text-[#C9A96E] font-serif italic">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Естественные микро-движения взгляда и улыбки</span>
                </div>

                {/* Price and Action Buttons */}
                <div className="pt-6 flex flex-wrap items-center gap-4">
                  <span className="text-lg font-mono font-bold text-[#FDFBF7] bg-[#3B2A1E] px-4 py-2 rounded-xl border border-[#C9A96E]/40">
                    от {revivalService.priceStarting} ₽
                  </span>

                  <button
                    onClick={() => openExampleModal(revivalService)}
                    className="py-3 px-5 rounded-xl bg-[#FAF6F0] hover:bg-[#EFE8DC] text-[#2B2017] font-semibold text-xs transition-all cursor-pointer shadow-md"
                  >
                    Посмотреть пример
                  </button>

                  <button
                    onClick={() => handleCalculateCost(revivalService.id, revivalService.priceStarting)}
                    className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#C9A96E] via-[#B8894D] to-[#9E733B] hover:from-[#D8B67D] text-[#1C150F] font-bold text-xs transition-all flex items-center space-x-2 cursor-pointer shadow-lg"
                  >
                    <span>Сделать заказ</span>
                    <ArrowRight className="w-4 h-4 text-[#1C150F]" />
                  </button>
                </div>
              </div>

              {/* Right Living Photo Preview Stage */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-3">
                <div className="w-full max-w-[320px] shadow-2xl">
                  <ServiceDisplayDemo
                    displayType={revivalService.displayType}
                    videoUrl={revivalService.videoUrl}
                    posterUrl={revivalService.posterUrl}
                    aspectRatio="aspect-[3/4]"
                    badgeText="Оживление портрета"
                  />
                </div>
              </div>

            </div>

          </div>


          {/* --------------------------------------------------------- */}
          {/* CARD 4: PHOTO MOSAIC (zoom)                               */}
          {/* --------------------------------------------------------- */}
          <div className="lg:col-span-6 md:col-span-6 bg-[#FAF6F0] p-6 sm:p-8 rounded-3xl photo-paper-shadow border border-[#C9A96E]/40 hover:border-[#C9A96E] transition-all duration-500 flex flex-col justify-between group">
            
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#2B2017] group-hover:text-[#B8894D] transition-colors">
                    {mosaicService.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-[#8C6239] font-medium pt-0.5">
                    {mosaicService.shortDesc}
                  </p>
                </div>
                <span className="text-xs sm:text-sm font-mono font-bold bg-[#EFE4D2] text-[#2B2017] px-3.5 py-1.5 rounded-full border border-[#C9A96E]/40 shrink-0">
                  от {mosaicService.priceStarting} ₽
                </span>
              </div>

              {/* Display Demo Component */}
              <div className="pt-2">
                <ServiceDisplayDemo
                  displayType={mosaicService.displayType}
                  imageUrl={mosaicService.imageUrl}
                  aspectRatio="aspect-[16/10]"
                  badgeText="Интерактивная мозаика"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => openExampleModal(mosaicService)}
                className="py-3 px-4 rounded-xl bg-[#EFE4D2] hover:bg-[#E2D4BF] text-[#2B2017] font-semibold text-xs transition-all text-center cursor-pointer border border-[#C9A96E]/30"
              >
                Посмотреть пример
              </button>

              <button
                onClick={() => handleCalculateCost(mosaicService.id, mosaicService.priceStarting)}
                className="py-3 px-4 rounded-xl bg-[#2B2017] hover:bg-[#3B2D22] text-[#C9A96E] font-bold text-xs transition-all text-center flex items-center justify-center space-x-1.5 cursor-pointer shadow-md"
              >
                <span>Сделать заказ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>


          {/* --------------------------------------------------------- */}
          {/* CARD 5: ENHANCEMENT (beforeAfter)                          */}
          {/* --------------------------------------------------------- */}
          <div className="lg:col-span-6 md:col-span-6 bg-[#FAF6F0] p-6 sm:p-8 rounded-3xl photo-paper-shadow border border-[#C9A96E]/40 hover:border-[#C9A96E] transition-all duration-500 flex flex-col justify-between group">
            
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#2B2017] group-hover:text-[#B8894D] transition-colors">
                    {enhancementService.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-[#8C6239] font-medium pt-0.5">
                    {enhancementService.shortDesc}
                  </p>
                </div>
                <span className="text-xs sm:text-sm font-mono font-bold bg-[#EFE4D2] text-[#2B2017] px-3.5 py-1.5 rounded-full border border-[#C9A96E]/40 shrink-0">
                  от {enhancementService.priceStarting} ₽
                </span>
              </div>

              {/* Display Demo Component */}
              <div className="pt-2">
                <ServiceDisplayDemo
                  displayType={enhancementService.displayType}
                  imageUrlBefore={enhancementService.imageUrlBefore}
                  imageUrlAfter={enhancementService.imageUrlAfter}
                  aspectRatio="aspect-[16/10]"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => openExampleModal(enhancementService)}
                className="py-3 px-4 rounded-xl bg-[#EFE4D2] hover:bg-[#E2D4BF] text-[#2B2017] font-semibold text-xs transition-all text-center cursor-pointer border border-[#C9A96E]/30"
              >
                Посмотреть пример
              </button>

              <button
                onClick={() => handleCalculateCost(enhancementService.id, enhancementService.priceStarting)}
                className="py-3 px-4 rounded-xl bg-[#2B2017] hover:bg-[#3B2D22] text-[#C9A96E] font-bold text-xs transition-all text-center flex items-center justify-center space-x-1.5 cursor-pointer shadow-md"
              >
                <span>Сделать заказ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>


          {/* --------------------------------------------------------- */}
          {/* CARD 6: FEATURED METRICS SHOWCASE (FULL WIDTH 12 COLS)    */}
          {/* --------------------------------------------------------- */}
          <div className="lg:col-span-12 bg-gradient-to-r from-[#2B1D13] via-[#1C130D] to-[#2B1D13] p-6 sm:p-10 rounded-3xl text-[#FDFBF7] shadow-2xl border border-[#C9A96E]/50 relative overflow-hidden group">
            
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              
              {/* Header Badge & Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#C9A96E]/20 pb-6">
                <div>
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#C9A96E]/20 border border-[#C9A96E]/40 text-[#C9A96E] text-xs font-semibold mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Памятные семейные реликвии</span>
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#FDFBF7]">
                    Памятные метрики событий
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D8C29D]/80 font-sans mt-1">
                    Сохраняем даты, имена, рост, время, созвездия и важнейшие вехи в музейном эстетичном оформлении.
                  </p>
                </div>

                <div className="shrink-0">
                  <span className="text-lg font-mono font-bold text-[#FDFBF7] bg-[#3B2A1E] px-4 py-2 rounded-xl border border-[#C9A96E]/40">
                    от {birthMetricsService.priceStarting} ₽
                  </span>
                </div>
              </div>

              {/* Category Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {EXHIBITION_DATA.map((metric) => {
                  const Icon = ICON_MAP[metric.iconName] || Sparkles;
                  const isActive = selectedMetricTab === metric.id;
                  return (
                    <button
                      key={metric.id}
                      onClick={() => {
                        setSelectedMetricTab(metric.id);
                        setCurrentImageIndex(0);
                      }}
                      className={`flex items-center justify-center space-x-2 py-3 px-3 sm:px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                        isActive
                          ? 'bg-[#C9A96E] text-[#1C150F] border-[#EBD8AD] shadow-lg scale-[1.02]'
                          : 'bg-[#322317]/80 hover:bg-[#3E2D1E] text-[#D8C29D] border-[#C9A96E]/30'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#1C150F]' : 'text-[#C9A96E]'}`} />
                      <span className="truncate">{metric.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Display Stage */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
                
                {/* Left: Active Metric Info */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-block px-3 py-1 rounded-md bg-[#3B2A1E] text-[#C9A96E] text-[11px] font-mono tracking-wider border border-[#C9A96E]/30 uppercase">
                    {activeMetric.badge}
                  </div>

                  <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#FDFBF7]">
                    {activeMetric.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#D8C29D] font-sans leading-relaxed">
                    {activeMetric.shortDesc}
                  </p>

                  <div className="pt-2">
                    <h5 className="font-serif font-bold text-xs uppercase tracking-wider text-[#C9A96E] mb-2.5">
                      Что входит в макет:
                    </h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {activeMetric.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-[#EFE4D2]/90">
                          <Check className="w-4 h-4 text-[#C9A96E] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => openMetricModal(activeMetric, currentImageUrl)}
                      className="py-3 px-5 rounded-xl bg-[#FAF6F0] hover:bg-[#EFE8DC] text-[#2B2017] font-semibold text-xs transition-all cursor-pointer shadow-md"
                    >
                      Посмотреть пример
                    </button>

                    <button
                      onClick={() => handleCalculateCost('birth_metrics', activeMetric.price)}
                      className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#C9A96E] via-[#B8894D] to-[#9E733B] hover:from-[#D8B67D] text-[#1C150F] font-bold text-xs transition-all flex items-center space-x-2 cursor-pointer shadow-lg"
                    >
                      <span>Сделать заказ</span>
                      <ArrowRight className="w-4 h-4 text-[#1C150F]" />
                    </button>
                  </div>
                </div>

                {/* Right: Active Metric Preview Image with Zoom */}
                <div className="lg:col-span-6 flex justify-center">
                  <div className="w-full max-w-[460px] rounded-2xl overflow-hidden border border-[#C9A96E]/50 shadow-2xl bg-[#1C150F]">
                    <SmoothMetricPreview
                      imageUrl={currentImageUrl}
                      badgeText={activeMetric.label}
                      imagesCount={activeMetric.images.length}
                      currentImageIndex={currentImageIndex}
                      onPrevImage={() => setCurrentImageIndex((prev) => (prev - 1 + activeMetric.images.length) % activeMetric.images.length)}
                      onNextImage={() => setCurrentImageIndex((prev) => (prev + 1) % activeMetric.images.length)}
                    />
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ========================================================= */}
        {/* 3. CLOSING EMOTIONAL QUOTE & SINGLE CTA BUTTON            */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-8 pt-8 border-t border-[#C9A96E]/20">
          
          <div className="space-y-3">
            <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#2B2017] tracking-tight uppercase leading-tight">
              Мы сохраняем не фотографии.
            </h3>
            <p className="font-serif italic text-xl sm:text-3xl text-[#8C6239] font-medium gold-gradient-text">
              Мы сохраняем семейные истории.
            </p>
          </div>

        </div>

      </div>

      {/* ========================================================= */}
      {/* 4. EXAMPLE DETAIL MODAL DIALOG                            */}
      {/* ========================================================= */}
      {activeModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#FAF6F0] rounded-3xl border border-[#C9A96E] p-6 sm:p-8 shadow-2xl text-[#2B2017] space-y-6 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setActiveModalData(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#EFE4D2] hover:bg-[#E2D4BF] text-[#2B2017] transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-serif italic text-[#8C6239] uppercase tracking-wider block">
                {activeModalData.subtitle}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B2017] mt-1">
                {activeModalData.title}
              </h3>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#C9A96E]/40 shadow-inner bg-[#1C150F]">
              <ServiceDisplayDemo
                displayType={activeModalData.displayType}
                imageUrlBefore={activeModalData.imageUrlBefore}
                imageUrlAfter={activeModalData.imageUrlAfter}
                videoUrl={activeModalData.videoUrl}
                posterUrl={activeModalData.posterUrl}
                imageUrl={activeModalData.imageUrl}
                aspectRatio="aspect-[16/10]"
              />
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[#6E5A47]">
              <p className="leading-relaxed font-sans">{activeModalData.description}</p>
              
              <div className="pt-2">
                <h4 className="font-serif font-bold text-[#2B2017] text-xs uppercase tracking-wider mb-2">
                  Особенности работы:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeModalData.features.map((feat, i) => (
                    <li key={i} className="flex items-center space-x-2 text-[#8C6239]">
                      <span className="text-[#C9A96E]">✦</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#C9A96E]/20 flex flex-wrap items-center justify-between gap-3">
              <span className="text-base font-mono font-bold text-[#2B2017]">
                Стоимость: от {activeModalData.price} ₽
              </span>
              <button
                onClick={() => {
                  const id = activeModalData.serviceId;
                  const price = parseInt(activeModalData.price) || undefined;
                  setActiveModalData(null);
                  handleCalculateCost(id, price);
                }}
                className="py-3 px-6 rounded-xl bg-[#2B2017] hover:bg-[#3B2D22] text-[#C9A96E] font-bold text-xs transition-all flex items-center space-x-2 cursor-pointer shadow-lg"
              >
                <span>Заказать эту услугу</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

