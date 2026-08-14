import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Heart, Shield, Sparkles, Film, Quote, ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { GALLERY } from '../data/gallery';

export const StoryManifesto: React.FC = () => {
  const [activeStoryId, setActiveStoryId] = useState<string>(GALLERY[0]?.id || 'featured-00');
  const [isManifestoExpanded, setIsManifestoExpanded] = useState(false);
  const [isStoryExpanded, setIsStoryExpanded] = useState(false);

  // Reset story collapse state whenever active story changes
  useEffect(() => {
    setIsStoryExpanded(false);
  }, [activeStoryId]);

  // Active story object directly from GALLERY data
  const activeStory = GALLERY.find((item) => item.id === activeStoryId) || GALLERY[0];

  // Index navigation
  const currentIndex = GALLERY.findIndex((i) => i.id === activeStory.id);
  
  const handlePrevStory = () => {
    const prevIndex = (currentIndex - 1 + GALLERY.length) % GALLERY.length;
    setActiveStoryId(GALLERY[prevIndex].id);
  };

  const handleNextStory = () => {
    const nextIndex = (currentIndex + 1) % GALLERY.length;
    setActiveStoryId(GALLERY[nextIndex].id);
  };

  const scrollToStories = () => {
    const element = document.getElementById('story-viewer') || document.getElementById('stories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const storyParagraphs = activeStory.story || activeStory.paragraphs || [];

  // =========================================================
  // FILM STRIP SCROLL & DRAG CONTROLS
  // =========================================================
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const hasMoved = useRef(false);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [checkScroll]);

  const isInitialMount = useRef(true);

  // Auto-scroll active photo into view inside the horizontal filmstrip track (without scrolling window)
  useEffect(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const activeEl = container.querySelector(`[data-photo-id="${activeStory.id}"]`) as HTMLElement;
    if (activeEl) {
      const containerWidth = container.clientWidth;
      const elLeft = activeEl.offsetLeft;
      const elWidth = activeEl.clientWidth;
      const targetLeft = elLeft - containerWidth / 2 + elWidth / 2;

      if (isInitialMount.current) {
        isInitialMount.current = false;
        container.scrollLeft = targetLeft;
      } else {
        container.scrollTo({ left: targetLeft, behavior: 'smooth' });
      }
    }
  }, [activeStory.id]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftStart.current = scrollRef.current.scrollLeft;
    lastX.current = e.pageX;
    lastTime.current = Date.now();
    velocity.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.3;
    if (Math.abs(x - startX.current) > 5) {
      hasMoved.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk;

    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      velocity.current = (e.pageX - lastX.current) / dt;
    }
    lastX.current = e.pageX;
    lastTime.current = now;
    checkScroll();
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (Math.abs(velocity.current) > 0.15) {
      let v = velocity.current * 16;
      const momentumStep = () => {
        if (!scrollRef.current || Math.abs(v) < 0.5) return;
        scrollRef.current.scrollLeft -= v;
        v *= 0.92;
        checkScroll();
        requestAnimationFrame(momentumStep);
      };
      requestAnimationFrame(momentumStep);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!scrollRef.current) return;
    if (e.deltaY !== 0) {
      scrollRef.current.scrollLeft += e.deltaY * 1.2;
      checkScroll();
    }
  };

  const scrollBy = (amount: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section id="stories" className="py-12 lg:py-16 relative overflow-hidden bg-[#FAF6F0] border-y border-[#C9A96E]/30 text-[#3B3128] select-none">
      
      {/* Delicate Vintage Archive Paper Texture & Watermarks */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 20%, rgba(201, 169, 110, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 85% 80%, rgba(140, 98, 57, 0.1) 0%, transparent 50%),
            radial-gradient(rgba(140, 98, 57, 0.05) 1px, transparent 0)
          `,
          backgroundSize: '100% 100%, 100% 100%, 32px 32px'
        }}
      />

      {/* Decorative Antique Postmarks & Ink Stamps */}
      <div className="absolute top-12 left-8 sm:left-16 opacity-25 pointer-events-none rotate-[-12deg] hidden md:block">
        <div className="w-28 h-28 rounded-full border-2 border-dashed border-[#8C6239] flex flex-col items-center justify-center p-2 text-center">
          <span className="text-[9px] font-serif uppercase tracking-widest text-[#8C6239]">АРХИВ ПАМЯТИ</span>
          <span className="text-[12px] font-mono font-bold text-[#574435] my-0.5">1912 - 2026</span>
          <span className="text-[8px] font-serif italic text-[#8C6239]">С.ПЕРМЬ</span>
        </div>
      </div>

      <div className="absolute bottom-16 right-10 opacity-20 pointer-events-none rotate-[18deg] hidden md:block">
        <div className="w-32 h-20 border border-[#8C6239] p-2 flex flex-col justify-between">
          <div className="flex justify-between items-center text-[8px] font-serif">
            <span>ПОЧТОВАЯ КАРТОЧКА</span>
            <span>№ 8402</span>
          </div>
          <div className="text-[10px] font-serif italic text-center font-bold">
            Ожившая история
          </div>
          <div className="border-t border-[#8C6239]/40 pt-1 text-[7px] text-right">
            Коллекция семейных снимков
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================= */}
        {/* 1. HEADER & POETIC EMOTIONAL STORYTEXT                     */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-10 sm:mb-12">
          
          {/* Subtle Quote Symbol Badge */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#EFE4D2] text-[#8C6239] border border-[#C9A96E]/40 shadow-sm mx-auto">
            <Quote className="w-5 h-5" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-semibold text-[#2B2017] tracking-tight leading-tight">
            У каждой фотографии есть история
          </h2>

          {/* Poetic Emotional Paragraphs */}
          <div className="space-y-4 pt-4 text-base sm:text-xl font-serif text-[#4A3B2C] leading-relaxed max-w-2xl mx-auto font-normal">
            <p className="italic">
              Иногда это единственная фотография дедушки, сохранившаяся спустя десятилетия.
            </p>

            <div className={`${isManifestoExpanded ? 'block space-y-4' : 'hidden sm:block sm:space-y-4'}`}>
              <p className="italic">
                Иногда — снимок родителей в день их свадьбы.
              </p>
              <p className="italic">
                Иногда — единственное воспоминание о человеке, которого уже нет рядом.
              </p>
              <p className="pt-2 font-medium text-[#2B2017]">
                За каждым таким снимком скрывается целая жизнь.
              </p>
              <p className="pt-2 font-sans text-sm sm:text-base text-[#7B6854] font-medium">
                Поэтому мы не просто восстанавливаем фотографии.
              </p>
              <p className="font-serif italic text-xl sm:text-2xl text-[#2B2017] font-semibold gold-gradient-text pt-1">
                Мы бережно возвращаем к жизни частичку семейной истории.
              </p>
            </div>

            <button
              onClick={() => setIsManifestoExpanded(!isManifestoExpanded)}
              className="sm:hidden inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#EFE4D2] hover:bg-[#C9A96E] text-[#8C6239] hover:text-white text-xs font-semibold border border-[#C9A96E]/40 transition-all cursor-pointer shadow-xs mt-2"
            >
              <span>{isManifestoExpanded ? 'Свернуть текст' : 'Читать историю полностью'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isManifestoExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>

        </div>

        {/* ========================================================= */}
        {/* 2. SPLIT SCREEN: BEFORE/AFTER SLIDER (LEFT) & STORY (RIGHT)*/}
        {/* ========================================================= */}
        <div id="story-viewer" className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-24">
          
          {/* LEFT SIDE: Interactive Before / After Photo Slider */}
          <div className="lg:col-span-7 relative">
            
            {/* Antique Frame Border Box */}
            <div className="bg-[#EFE4D2] p-4 sm:p-6 rounded-3xl photo-paper-shadow border border-[#C9A96E]/40 relative">
              
              {/* Corner Brass Mounting Accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#8C6239]" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#8C6239]" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#8C6239]" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#8C6239]" />

              <BeforeAfterSlider
                imageBefore={activeStory.before}
                imageAfter={activeStory.after}
                videoUrl={activeStory.videoUrl}
                posterUrl={activeStory.posterUrl}
                title={activeStory.title}
                subtitle={activeStory.subtitle}
                aspectRatio="aspect-[4/3]"
              />

              <div className="mt-4 flex items-center justify-between text-[11px] font-serif italic text-[#7B6854]">
                <span>
                  {activeStory.videoUrl
                    ? 'Видеозапись с анимацией движения и мимики лица'
                    : 'Потяните ползунок, чтобы увидеть процесс восстановления'}
                </span>
                <span className="font-mono text-[10px] text-[#8C6239]">
                  {currentIndex + 1} из {GALLERY.length}
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Dynamic Story Narrative for Active Photo */}
          <div className="lg:col-span-5 space-y-5 bg-[#FAF6F0] p-6 sm:p-8 rounded-3xl border border-[#C9A96E]/30 shadow-sm relative transition-all duration-500">
            
            {/* Header Badge & Navigation */}
            <div className="flex items-center justify-between gap-2 border-b border-[#C9A96E]/20 pb-3">
              <div className="inline-block text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-[#8C6239] px-3 py-1 rounded-full bg-[#EFE4D2] border border-[#C9A96E]/30">
                История одного снимка
              </div>

              <div className="flex items-center space-x-1.5">
                {/* Prev / Next Photo Nav */}
                <button
                  onClick={handlePrevStory}
                  className="p-1.5 rounded-lg bg-[#EFE4D2] hover:bg-[#C9A96E] hover:text-white text-[#3B3128] transition-all cursor-pointer border border-[#C9A96E]/30"
                  title="Предыдущая история"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextStory}
                  className="p-1.5 rounded-lg bg-[#EFE4D2] hover:bg-[#C9A96E] hover:text-white text-[#3B3128] transition-all cursor-pointer border border-[#C9A96E]/30"
                  title="Следующая история"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Photo Title & Archive Subtitle */}
            <div className="space-y-1">
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2B2017] tracking-tight">
                {activeStory.title}
              </h3>
              {activeStory.subtitle && (
                <div className="text-xs sm:text-sm font-serif italic text-[#8C6239] font-medium">
                  {activeStory.subtitle}
                </div>
              )}
            </div>

            {/* Story Body Container with Smooth Expand/Collapse */}
            <div className="space-y-3.5">
              {/* First paragraph preview with fade-out when collapsed */}
              <div className="relative">
                <p
                  className={`font-serif text-sm sm:text-base text-[#3B3128] leading-relaxed transition-all duration-300 ${
                    !isStoryExpanded ? 'line-clamp-3 pr-1' : ''
                  }`}
                >
                  {storyParagraphs[0]}
                </p>
                {!isStoryExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#FAF6F0] via-[#FAF6F0]/80 to-transparent pointer-events-none" />
                )}
              </div>

              {/* Additional paragraphs & quote in a smooth CSS grid transition container */}
              <div
                className={`grid transition-all duration-350 ease-in-out ${
                  isStoryExpanded
                    ? 'grid-rows-[1fr] opacity-100 space-y-3.5 mt-3.5'
                    : 'grid-rows-[0fr] opacity-0 mt-0'
                }`}
              >
                <div className="overflow-hidden space-y-3.5">
                  {storyParagraphs.slice(1).map((paragraph, index) => (
                    <p key={index} className="font-serif text-sm sm:text-base text-[#3B3128] leading-relaxed">
                      {paragraph}
                    </p>
                  ))}

                  {/* Quote Block inside expanded content */}
                  {activeStory.quote && activeStory.quote.trim() !== '' && (
                    <div className="pt-4 border-t border-[#C9A96E]/20 relative pl-4 border-l-2 border-l-[#C9A96E] mt-3">
                      <p className="font-serif italic text-sm sm:text-base font-semibold text-[#8C6239] leading-snug">
                        {activeStory.quote}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Expand / Collapse Button */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setIsStoryExpanded((prev) => !prev)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EFE4D2] hover:bg-[#C9A96E] text-[#8C6239] hover:text-white font-medium text-xs sm:text-sm transition-all duration-300 border border-[#C9A96E]/40 shadow-2xs hover:shadow-sm cursor-pointer active:scale-95"
                >
                  <span>{isStoryExpanded ? 'Свернуть ↑' : '📖 Открыть историю'}</span>
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================= */}
        {/* 3. HORIZONTAL VINTAGE FILM STRIP (КИНОПЛЕНКА)             */}
        {/* ========================================================= */}
        <div className="mb-24">
          
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <span className="text-xs font-serif italic text-[#8C6239] uppercase tracking-widest flex items-center gap-2">
              <span>Плёнка воспоминаний</span>
              <span className="text-[#C9A96E]">•</span>
              <span className="text-[#7B6854] font-sans normal-case italic">
                Прокручивайте колесиком, перетаскивайте мышью или листайте
              </span>
            </span>
          </div>

          {/* Vintage Film Strip Outer Frame */}
          <div className="bg-[#1C150F] rounded-2xl p-4 sm:p-6 shadow-2xl border border-[#C9A96E]/40 overflow-hidden relative group">
            
            {/* Left Fade Overlay */}
            <div 
              className={`pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#1C150F] via-[#1C150F]/80 to-transparent z-20 transition-opacity duration-300 ${
                canScrollLeft ? 'opacity-100' : 'opacity-0'
              }`} 
            />

            {/* Right Fade Overlay */}
            <div 
              className={`pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#1C150F] via-[#1C150F]/80 to-transparent z-20 transition-opacity duration-300 ${
                canScrollRight ? 'opacity-100' : 'opacity-0'
              }`} 
            />

            {/* Left Navigation Arrow */}
            {canScrollLeft && (
              <button
                onClick={() => scrollBy(-360)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-[#2B2017]/90 hover:bg-[#C9A96E] text-[#C9A96E] hover:text-[#1C150F] border border-[#C9A96E]/40 transition-all shadow-xl cursor-pointer"
                title="Прокрутить влево"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Right Navigation Arrow */}
            {canScrollRight && (
              <button
                onClick={() => scrollBy(360)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-[#2B2017]/90 hover:bg-[#C9A96E] text-[#C9A96E] hover:text-[#1C150F] border border-[#C9A96E]/40 transition-all shadow-xl cursor-pointer"
                title="Прокрутить вправо"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}

            {/* Scrollable Track Container */}
            <div
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
              onScroll={checkScroll}
              className="overflow-x-auto scrollbar-none py-2 cursor-grab active:cursor-grabbing select-none"
              style={{ scrollBehavior: 'auto', touchAction: 'pan-x' }}
            >
              <div className="flex flex-col min-w-max px-4">
                
                {/* Top Film Sprocket Holes */}
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2.5 gap-3">
                  {[...Array(Math.max(18, GALLERY.length * 3))].map((_, i) => (
                    <div key={`top-hole-${i}`} className="w-3.5 h-4 bg-[#0E0A07] rounded-sm border border-white/20 shrink-0" />
                  ))}
                </div>

                {/* Film Frames Row */}
                <div className="flex space-x-6 px-2">
                  {GALLERY.map((photo) => {
                    const isActive = photo.id === activeStory.id;
                    return (
                      <div
                        key={photo.id}
                        data-photo-id={photo.id}
                        onClick={() => {
                          if (!hasMoved.current) {
                            setActiveStoryId(photo.id);
                            setIsStoryExpanded(true);
                            const viewerEl = document.getElementById('story-viewer');
                            if (viewerEl) {
                              viewerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }
                        }}
                        className="group cursor-pointer flex flex-col items-center select-none shrink-0"
                      >
                        <div
                          className={`relative w-48 sm:w-56 h-36 sm:h-40 rounded-lg bg-[#0F0A07] overflow-hidden border-2 transition-all duration-300 transform ${
                            isActive
                              ? 'border-[#C9A96E] ring-2 ring-[#C9A96E]/60 scale-105 shadow-2xl'
                              : 'border-white/20 group-hover:scale-[1.03] group-hover:border-[#C9A96E]'
                          }`}
                        >
                          <img
                            src={photo.after}
                            alt={photo.title || 'Кадр на плёнке'}
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            referrerPolicy="no-referrer"
                            className={`w-full h-full object-cover transition-all duration-500 pointer-events-none filter ${
                              isActive
                                ? 'sepia-0 grayscale-0 contrast-100'
                                : 'sepia grayscale contrast-125 group-hover:sepia-0 group-hover:grayscale-0 group-hover:contrast-100'
                            }`}
                          />
                          
                          {/* Active Badge */}
                          {isActive && (
                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#C9A96E] text-[#1C150F] text-[9px] font-bold font-sans uppercase tracking-wider shadow-md z-10">
                              Просмотр
                            </div>
                          )}

                          {/* Hover Info Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end text-white z-10">
                            <span className="text-xs font-serif font-bold text-[#FDFBF7] truncate">
                              {photo.title}
                            </span>
                            {photo.subtitle && (
                              <span className="text-[10px] text-[#C9A96E] font-serif italic truncate">
                                {photo.subtitle}
                              </span>
                            )}
                            <span className="mt-1.5 text-[10px] font-bold text-[#1C150F] bg-[#C9A96E] px-2 py-0.5 rounded shadow-sm w-fit flex items-center gap-1">
                              <span>Смотреть историю</span> →
                            </span>
                          </div>
                        </div>

                        <div className="mt-2.5 text-center text-xs font-serif font-semibold text-[#C9A96E] group-hover:text-[#EFE4D2] transition-colors truncate max-w-[200px]">
                          {photo.title}
                        </div>
                        <div className="text-[11px] font-serif italic text-white/60 truncate max-w-[190px]">
                          {photo.subtitle}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Film Sprocket Holes */}
                <div className="flex justify-between items-center mt-4 border-t border-white/10 pt-2.5 gap-3">
                  {[...Array(Math.max(18, GALLERY.length * 3))].map((_, i) => (
                    <div key={`bottom-hole-${i}`} className="w-3.5 h-4 bg-[#0E0A07] rounded-sm border border-white/20 shrink-0" />
                  ))}
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* ========================================================= */}
        {/* 4. FOUR ELEGANT CARDS (HANDMADE CARE, AI, REVIVAL)        */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          
          {/* Card 1 */}
          <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#C9A96E]/30 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EFE4D2] text-[#B8894D] flex items-center justify-center font-bold text-lg group-hover:bg-[#C9A96E] group-hover:text-white transition-colors">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#2B2017]">
                Бережный индивидуальный подход
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#7B6854] leading-relaxed">
                Каждая фотография бережно обрабатывается с помощью передовых нейросетей.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#C9A96E]/30 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EFE4D2] text-[#B8894D] flex items-center justify-center font-bold text-lg group-hover:bg-[#C9A96E] group-hover:text-white transition-colors">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#2B2017]">
                Безопасное хранение
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#7B6854] leading-relaxed">
                Оригиналы не публикуются без разрешения владельца.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#C9A96E]/30 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EFE4D2] text-[#B8894D] flex items-center justify-center font-bold text-lg group-hover:bg-[#C9A96E] group-hover:text-white transition-colors">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#2B2017]">
                Современная реставрация
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#7B6854] leading-relaxed">
                Используем новейшие алгоритмы ИИ и нейросетевой реставрации.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#C9A96E]/30 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EFE4D2] text-[#B8894D] flex items-center justify-center font-bold text-lg group-hover:bg-[#C9A96E] group-hover:text-white transition-colors">
                <Film className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#2B2017]">
                Оживление фотографий
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#7B6854] leading-relaxed">
                Создаём естественную анимацию, сохраняя атмосферу оригинального снимка.
              </p>
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* 5. CLOSING EMOTIONAL QUOTE & CTA BUTTON                   */}
        {/* ========================================================= */}
        <div className="text-center max-w-2xl mx-auto space-y-6 pt-6">
          
          <div className="space-y-2">
            <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl font-semibold text-[#2B2017] tracking-tight uppercase">
              Мы не можем вернуть прошлое.
            </h3>
            <p className="font-serif italic text-lg sm:text-2xl text-[#8C6239] font-normal">
              Но можем сохранить память о нём.
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={scrollToStories}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#C9A96E] via-[#B8894D] to-[#9E733B] hover:from-[#D8B67D] hover:to-[#B8894D] text-[#1C150F] font-bold text-base shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:translate-y-0 inline-flex items-center space-x-2 cursor-pointer border border-[#FDFBF7]/30"
            >
              <span>Посмотреть истории восстановления</span>
              <ArrowRight className="w-5 h-5 text-[#1C150F]" />
            </button>
          </div>

        </div>

      </div>

    </section>
  );
};
