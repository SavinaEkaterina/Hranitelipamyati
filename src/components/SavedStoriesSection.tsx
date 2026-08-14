import React from 'react';
import { SAVED_STORIES } from '../data/stories';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import {
  Quote,
  MapPin,
  Calendar,
  BookmarkCheck
} from 'lucide-react';

export const SavedStoriesSection: React.FC = () => {
  return (
    <section id="stories" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-semibold text-[#B8894D] uppercase tracking-widest px-3 py-1 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/20 inline-block">
            Живые воспоминания
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#3B3128]">
            Ваши семейные истории
          </h2>
          <p className="text-base sm:text-lg text-[#7B6854] font-normal">
            Истории восстановления архивных кадров и память поколений
          </p>
        </div>

        {/* Stories List */}
        <div className="space-y-12">
          {SAVED_STORIES.map((story, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={story.id}
                className="paper-card rounded-3xl p-6 sm:p-10 shadow-xl border border-[#C9A96E]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative group"
              >
                {/* Embedded Before/After Slider */}
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'} w-full`}>
                  <BeforeAfterSlider
                    imageBefore={story.imageUrlBefore}
                    imageAfter={story.imageUrlAfter}
                    videoUrl={story.videoUrl}
                    posterUrl={story.posterUrl}
                    aspectRatio="aspect-[4/3]"
                  />
                </div>

                {/* Narrative Text Content */}
                <div className={`lg:col-span-6 space-y-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  
                  <div className="flex items-center justify-between pb-2 border-b border-[#C9A96E]/20">
                    <span className="text-xs font-semibold text-[#8C6239] uppercase tracking-wider flex items-center space-x-1.5">
                      <BookmarkCheck className="w-4 h-4 text-[#B8894D]" />
                      <span>История фотографии №{index + 1}</span>
                    </span>
                  </div>

                  {/* Meta Tags */}
                  <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[#B8894D]">
                    {story.clientName && (
                      <span className="flex items-center space-x-1 bg-[#F5EFE6] px-2.5 py-1 rounded-full text-[#3B3128]">
                        <BookmarkCheck className="w-3.5 h-3.5 text-[#B8894D]" />
                        <span>{story.clientName}</span>
                      </span>
                    )}

                    {story.region && (
                      <span className="flex items-center space-x-1 text-[#7B6854]">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{story.region}</span>
                      </span>
                    )}

                    {story.year && (
                      <span className="flex items-center space-x-1 text-[#7B6854]">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{story.year}</span>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  {story.title && (
                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#3B3128] leading-tight">
                      {story.title}
                    </h3>
                  )}

                  {/* Story Text */}
                  {story.storyText && (
                    <p className="text-sm sm:text-base text-[#7B6854] leading-relaxed whitespace-pre-line">
                      {story.storyText}
                    </p>
                  )}

                  {/* Quote Box */}
                  {story.quote && (
                    <div className="p-4 rounded-2xl bg-[#F8F4EE] border-l-4 border-[#C9A96E] space-y-2">
                      <div className="flex items-center space-x-2 text-[#B8894D]">
                        <Quote className="w-4 h-4" />
                        <span className="text-xs font-semibold uppercase tracking-wider">Памятная запись</span>
                      </div>
                      <p className="font-serif italic text-base text-[#3B3128]">
                        «{story.quote}»
                      </p>
                    </div>
                  )}

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
