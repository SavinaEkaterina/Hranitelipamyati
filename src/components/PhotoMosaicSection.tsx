import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Grid, Sparkles, Heart, Layers } from 'lucide-react';
import { getImageUrl } from '../utils/imageResolver';

export const PhotoMosaicSection: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState(1); // 1 to 5 zoom factor

  // Small sample photo tiles for the mosaic grid effect
  const tilePhotos = [
    getImageUrl('/examples/before-01.jpg'),
    getImageUrl('/examples/before-02.jpg'),
    getImageUrl('/gallery/story-01-before.jpeg'),
    getImageUrl('/gallery/story-02-before.jpeg'),
    getImageUrl('/gallery/story-03-before.jpeg'),
    getImageUrl('/gallery/story-04-before.jpg'),
  ];

  return (
    <section id="mosaic" className="py-20 lg:py-28 relative bg-[#F5EFE6]/60 border-y border-[#C9A96E]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-semibold text-[#B8894D] uppercase tracking-widest px-3 py-1 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/20 inline-block">
            Особенный подарок
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#3B3128]">
            Фотомозаика из семейных архивов
          </h2>
          <p className="text-base sm:text-lg text-[#7B6854] font-normal">
            Издалека — это единый портрет. Вблизи — сотни любимых моментов вашей жизни
          </p>
        </div>

        {/* Interactive Mosaic Canvas Showcase */}
        <div className="paper-card p-6 sm:p-10 rounded-3xl shadow-xl border border-[#C9A96E]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Mosaic Display Area */}
          <div className="lg:col-span-8 flex flex-col items-center">
            
            {/* Zoom Control Header */}
            <div className="w-full max-w-lg mb-4 flex items-center justify-between bg-white p-3 rounded-2xl border border-[#C9A96E]/30 text-xs font-medium text-[#3B3128] shadow-xs">
              <span className="flex items-center space-x-1.5 text-[#B8894D]">
                <Grid className="w-4 h-4" />
                <span>Масштаб приближения: {zoomLevel.toFixed(1)}x</span>
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setZoomLevel(Math.max(1, zoomLevel - 0.5))}
                  className="p-1.5 rounded-lg bg-[#F5EFE6] hover:bg-[#C9A96E] hover:text-white transition-colors cursor-pointer"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="0.1"
                  value={zoomLevel}
                  onChange={(e) => setZoomLevel(Number(e.target.value))}
                  className="w-28 sm:w-36 accent-[#C9A96E] cursor-pointer"
                />
                <button
                  onClick={() => setZoomLevel(Math.min(4, zoomLevel + 0.5))}
                  className="p-1.5 rounded-lg bg-[#F5EFE6] hover:bg-[#C9A96E] hover:text-white transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Mosaic Viewer Box */}
            <div className="relative aspect-[4/3] w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border-2 border-[#C9A96E]/40 bg-[#2D251E]">
              
              {/* Inner Zoom Container */}
              <div
                className="w-full h-full relative transition-transform duration-300 ease-out origin-center"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                {/* 1. Master Portrait Image Layer */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
                  style={{
                    backgroundImage: `url('${getImageUrl('/gallery/after-01')}')`,
                    opacity: Math.max(0.2, 1 - (zoomLevel - 1) * 0.28)
                  }}
                />

                {/* 2. Micro Tile Grid Layer (Appears as user zooms in) */}
                <div
                  className="absolute inset-0 grid grid-cols-12 grid-rows-8 gap-0.5 pointer-events-none transition-opacity duration-300 mix-blend-overlay"
                  style={{ opacity: Math.min(1, (zoomLevel - 1) * 0.45) }}
                >
                  {Array.from({ length: 96 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="bg-cover bg-center border-[0.5px] border-white/20"
                      style={{
                        backgroundImage: `url('${tilePhotos[idx % tilePhotos.length]}')`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Instructions */}
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs border border-white/20 flex items-center space-x-2 pointer-events-none">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
                <span>Потяните ползунок, чтобы увидеть микро-снимки в мозаике</span>
              </div>

            </div>

          </div>

          {/* Right Info Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#C9A96E]/15 text-[#B8894D] text-xs font-semibold">
                <Layers className="w-4 h-4" />
                <span>От 100 до 2000 снимков</span>
              </div>

              <h3 className="font-serif text-3xl font-semibold text-[#3B3128]">
                Вся история вашей семьи на одном холсте
              </h3>

              <p className="text-sm text-[#7B6854] leading-relaxed">
                Вы отправляете нам личный фотоархив (семейные праздники, отпуск, детские снимки), а мы бережно собираем из них один главный портрет.
              </p>
            </div>

            <div className="bg-[#F8F4EE] p-5 rounded-2xl border border-[#C9A96E]/20 space-y-3 text-xs text-[#3B3128]">
              <div className="flex items-start space-x-2">
                <Heart className="w-4 h-4 text-[#B8894D] shrink-0 mt-0.5" />
                <span>Каждое микро-изображение можно рассмотреть по отдельности</span>
              </div>
              <div className="flex items-start space-x-2">
                <Grid className="w-4 h-4 text-[#B8894D] shrink-0 mt-0.5" />
                <span>Утверждаем макет перед отправкой в печать</span>
              </div>
              <div className="flex items-start space-x-2">
                <Sparkles className="w-4 h-4 text-[#B8894D] shrink-0 mt-0.5" />
                <span>Идеальный подарок на свадьбу, юбилей или новоселье</span>
              </div>
            </div>

            <a
              href="#calculator"
              className="w-full py-3.5 rounded-xl bg-[#3B3128] text-[#C9A96E] hover:bg-[#54463A] font-semibold text-xs sm:text-sm transition-colors text-center block shadow-md"
            >
              Рассчитать фотомозаику (от 1 500 ₽)
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};
