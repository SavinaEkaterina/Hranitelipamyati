import React, { useState } from 'react';
import { BEFORE_AFTER_EXAMPLES } from '../data/gallery';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { Sparkles, Calendar, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

interface ComparisonGalleryProps {
  onEstimatePhoto: (exampleId: string) => void;
}

export const ComparisonGallery: React.FC<ComparisonGalleryProps> = ({ onEstimatePhoto }) => {
  const [selectedId, setSelectedId] = useState<string>(BEFORE_AFTER_EXAMPLES[0].id);

  const selectedExample = BEFORE_AFTER_EXAMPLES.find((e) => e.id === selectedId) || BEFORE_AFTER_EXAMPLES[0];

  return (
    <section id="examples" className="py-20 lg:py-28 relative bg-[#F5EFE6]/60 border-y border-[#C9A96E]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <span className="text-xs font-semibold text-[#B8894D] uppercase tracking-widest px-3 py-1 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/20 inline-block">
            Примеры работ
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#3B3128]">
            Результаты реставрации (До / После)
          </h2>
          <p className="text-base sm:text-lg text-[#7B6854] font-normal">
            Примеры до и после профессионального восстановления фотографий из семейных архивов
          </p>
        </div>

        {/* Featured Big Interactive Comparison Display */}
        <div className="paper-card p-6 sm:p-8 rounded-3xl mb-12 shadow-xl border border-[#C9A96E]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Big Slider */}
          <div className="lg:col-span-7">
            <BeforeAfterSlider
              imageBefore={selectedExample.imageUrlBefore}
              imageAfter={selectedExample.imageUrlAfter}
              videoUrl={selectedExample.videoUrl}
              posterUrl={selectedExample.posterUrl}
              aspectRatio="aspect-[4/3]"
            />
          </div>

          {/* Details & Restoration Story */}
          <div className="lg:col-span-5 space-y-5">
            
            <div className="flex items-center justify-between pb-2 border-b border-[#C9A96E]/20">
              <span className="text-xs font-semibold text-[#8C6239] uppercase tracking-wider">
                Информация о фотографии
              </span>
            </div>

            {/* Display View */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-xs font-medium text-[#B8894D]">
                {selectedExample.category && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#C9A96E]/15 border border-[#C9A96E]/30">
                    {selectedExample.category}
                  </span>
                )}
                {selectedExample.year && (
                  <span className="flex items-center space-x-1 text-[#7B6854]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{selectedExample.year}</span>
                  </span>
                )}
                {selectedExample.location && (
                  <span className="flex items-center space-x-1 text-[#7B6854]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{selectedExample.location}</span>
                  </span>
                )}
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#3B3128]">
                {selectedExample.title}
              </h3>

              <p className="text-sm text-[#7B6854] leading-relaxed">
                {selectedExample.description}
              </p>

              {/* Damage & Solution breakdown */}
              {(selectedExample.damageDescription || selectedExample.restorationNotes) && (
                <div className="space-y-2 pt-2 border-t border-[#C9A96E]/20 text-xs text-[#3B3128]">
                  {selectedExample.damageDescription && (
                    <div className="bg-[#F8F4EE] p-3 rounded-xl border border-[#C9A96E]/20 space-y-0.5">
                      <span className="font-semibold text-[#8C6239] block">Состояние оригинала:</span>
                      <p className="text-[#7B6854]">{selectedExample.damageDescription}</p>
                    </div>
                  )}

                  {selectedExample.restorationNotes && (
                    <div className="bg-[#F8F4EE] p-3 rounded-xl border border-[#C9A96E]/20 space-y-0.5">
                      <span className="font-semibold text-emerald-800 block">Результат:</span>
                      <p className="text-[#7B6854]">{selectedExample.restorationNotes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* CTA button */}
            <div className="pt-2">
              <button
                onClick={() => onEstimatePhoto(selectedExample.id)}
                className="w-full py-3.5 rounded-xl bg-[#3B3128] text-[#C9A96E] hover:bg-[#54463A] font-semibold text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md"
              >
                <Sparkles className="w-4 h-4 text-[#C9A96E]" />
                <span>У меня похожее фото — рассчитать стоимость</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Thumbnail Picker Grid for all Examples */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {BEFORE_AFTER_EXAMPLES.map((item) => {
            const isSelected = item.id === selectedExample.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`p-2.5 rounded-2xl transition-all text-left flex flex-col space-y-2 cursor-pointer ${
                  isSelected
                    ? 'bg-white shadow-lg border-2 border-[#C9A96E] scale-105'
                    : 'bg-white/60 hover:bg-white hover:shadow-md border border-[#C9A96E]/20'
                }`}
              >
                <div className="aspect-square rounded-xl overflow-hidden relative bg-[#3B3128]">
                  <img
                    src={item.imageUrlAfter}
                    alt={item.title || 'Фото реставрации'}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover filter contrast-[1.02]"
                  />
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 bg-[#C9A96E] text-white p-1 rounded-full shadow-xs">
                      <CheckCircle className="w-3 h-3" />
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-serif text-xs font-semibold text-[#3B3128] line-clamp-1">
                    {item.title}
                  </h4>
                  {item.year && (
                    <span className="text-[10px] text-[#7B6854] block">
                      {item.year}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
