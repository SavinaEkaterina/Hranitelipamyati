import React from 'react';
import { 
  HeartHandshake,
  Scroll,
  Compass,
  ShieldCheck
} from 'lucide-react';
import { getImageUrl } from '../utils/imageResolver';

export const WhyUsSection: React.FC = () => {
  const cards = [
    {
      emoji: '🤖',
      title: 'AI + Human expertise',
      titleRu: 'Нейросети',
      descRu: 'Мы используем передовые алгоритмы искусственного интеллекта для точного восстановления деталей.'
    },
    {
      emoji: '🔒',
      title: 'Complete confidentiality',
      titleRu: 'Полная конфиденциальность',
      descRu: 'Ваши личные архивы остаются только вашими.'
    },
    {
      emoji: '🕰️',
      title: 'Family memories',
      titleRu: 'Семейные ценности',
      descRu: 'Бережное отношение к каждому кадру.'
    }
  ];

  return (
    <section id="why-us" className="py-12 lg:py-16 relative bg-[#F7F1E8] text-[#2C221E] overflow-hidden">
      
      {/* Background Soft Grain & Subtle Gold Light Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 10%, rgba(201, 169, 110, 0.18) 0%, transparent 60%),
            radial-gradient(circle at 80% 80%, rgba(184, 137, 77, 0.12) 0%, transparent 50%),
            repeating-linear-gradient(0deg, rgba(0,0,0,0.015) 0px, rgba(0,0,0,0.015) 1px, transparent 1px, transparent 5px)
          `
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 lg:space-y-12">
        
        {/* ========================================================= */}
        {/* 1. HEADER                                                 */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-[#EFE4D2] border border-[#C9A96E]/40 text-[#7A5628] text-xs font-serif italic shadow-sm">
            <HeartHandshake className="w-4 h-4 text-[#B8894D]" />
            <span className="tracking-wide">Хранители семейного архива</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold text-[#2C221E] tracking-tight leading-[1.15]">
            Мы бережем каждую фотографию как семейную реликвию
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#6E5A47] leading-relaxed max-w-2xl mx-auto font-normal">
            Каждый старинный снимок — это животворящий мост между поколениями, тепло родных глаз и бесценное семейное сокровище.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 2. ATMOSPHERIC MEDIA ON LEFT & CARDS ON RIGHT             */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          {/* LEFT SIDE: Atmospheric Photo */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#C9A96E]/40 shadow-2xl bg-[#1C120B] group h-full min-h-[460px] sm:min-h-[540px] flex flex-col justify-between">
              
              <img
  src={getImageUrl('/why-us/why-us-main')}
  alt="Почему мы"
  loading="lazy"
  className="absolute inset-0 w-full h-full object-cover filter brightness-90 contrast-105 group-hover:scale-105 transition-transform duration-1000"
/>

              {/* Soft Golden Hour Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C120B] via-[#1C120B]/30 to-amber-950/20 pointer-events-none" />

              {/* Top Floating Badges */}
              <div className="relative p-5 sm:p-6 flex flex-wrap items-center justify-between gap-3 z-20">
                <div className="flex flex-wrap gap-2 text-xs font-serif text-[#FDFBF7]">
                  <span className="bg-[#1C120B]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C9A96E]/40 shadow-lg text-[11px] tracking-wide flex items-center space-x-1.5">
                    <Scroll className="w-3.5 h-3.5 text-[#C9A96E]" />
                    <span>Семейный архив & фотоальбомы</span>
                  </span>
                  <span className="bg-[#1C120B]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C9A96E]/40 shadow-lg text-[11px] tracking-wide flex items-center space-x-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#C9A96E]" />
                    <span>Музейный стандарт качества</span>
                  </span>
                </div>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="relative p-6 sm:p-8 bg-gradient-to-t from-[#1C120B] via-[#1C120B]/90 to-transparent text-[#FDFBF7] z-10 space-y-3">
                <div className="flex items-center space-x-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#C9A96E] animate-pulse shadow-[0_0_8px_#C9A96E]" />
                  <span className="font-serif text-xs font-semibold tracking-wider text-[#D8C29D] uppercase">
                    Ваш медиаархив
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#FDFBF7] italic leading-snug">
                  «Мы относимся к каждой фотографии как к семейному сокровищу»
                </h3>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE: 3 Elegant Information Cards */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
            {cards.map((card, idx) => (
              <div
                key={idx}
                className="bg-[#FFFDF9] p-7 sm:p-8 rounded-3xl border border-[#C9A96E]/30 shadow-sm hover:shadow-2xl hover:border-[#C9A96E] transition-all duration-300 space-y-4 group hover:-translate-y-1 flex flex-col justify-between h-full"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#F7F1E8] border border-[#C9A96E]/30 flex items-center justify-center text-xl shadow-inner group-hover:bg-[#EFE4D2] transition-colors">
                      {card.emoji}
                    </div>
                    <span className="text-[10px] font-serif uppercase tracking-widest text-[#B8894D]/70 group-hover:text-[#B8894D] transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#2C221E] group-hover:text-[#B8894D] transition-colors leading-snug">
                      {card.titleRu}
                    </h3>
                    <span className="text-[10px] font-sans text-[#A38A70] block mt-0.5 tracking-wider uppercase font-medium">
                      {card.title}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-sans text-[#6E5A47] leading-relaxed font-normal pt-1">
                    {card.descRu}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#C9A96E]/15 flex items-center justify-between text-[11px] font-serif text-[#A38A70] group-hover:text-[#7A5628] transition-colors">
                  <span>Музейный стандарт</span>
                  <span className="text-[#C9A96E]">✦</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ========================================================= */}
        {/* 3. MUSEUM ARCHIVE PLEDGE BANNER                           */}
        {/* ========================================================= */}
        <div className="max-w-4xl mx-auto pt-4">
          <div className="relative bg-[#FFFDF9] p-8 sm:p-12 md:p-14 rounded-3xl border-2 border-[#C9A96E]/35 shadow-xl overflow-hidden text-center space-y-5">
            
            {/* Corner Decorative Brackets */}
            <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-[#C9A96E]/60" />
            <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[#C9A96E]/60" />
            <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-[#C9A96E]/60" />
            <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-[#C9A96E]/60" />

            <div className="inline-flex items-center space-x-2 text-[#B8894D]">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-serif font-semibold tracking-widest uppercase text-[#8C6239]">
                Гарантия качества и музейного внимания
              </span>
            </div>

            <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-[#2C221E] italic font-medium leading-relaxed max-w-2xl mx-auto">
              «Сохранить взгляд предка, улыбку прабабушки и детали ветхого снимка — наш священный долг перед вашей семейной историей.»
            </blockquote>

            <div className="pt-2 flex items-center justify-center space-x-4">
              <div className="h-px w-16 bg-[#C9A96E]/40" />
              <span className="text-[11px] font-sans text-[#8C6239] uppercase tracking-widest font-medium">
                Архивная реставрационная мастерская
              </span>
              <div className="h-px w-16 bg-[#C9A96E]/40" />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
