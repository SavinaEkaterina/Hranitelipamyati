import React from 'react';
import { Sparkles, Check, Camera, Mail, Send, Feather } from 'lucide-react';
import { getImageUrl } from '../utils/imageResolver';

interface ContactsAndMapSectionProps {
  onOpenOrderModal?: () => void;
  onSuccessSubmit?: () => void;
}

export const ContactsAndMapSection: React.FC<ContactsAndMapSectionProps> = ({
  onOpenOrderModal,
}) => {
  // Animation state for Row 004 in the archival ledger
  const row004Ref = React.useRef<HTMLTableRowElement>(null);
  const [rowStage, setRowStage] = React.useState<number>(0);
  const hasAnimatedRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    const el = row004Ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            // 1. After 300ms: reveal "Ваш семейный архив" from left to right
            setTimeout(() => setRowStage(1), 300);
            // 2. After 900ms: reveal "Ожидает поступления…"
            setTimeout(() => setRowStage(2), 900);
            // 3. After 1500ms: reveal button "Передать фотографию →"
            setTimeout(() => setRowStage(3), 1500);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  // 4 Core Advantages
  const benefits = [
    'Работаем по всей России',
    'Онлайн-приём фотографий',
    'Бесплатная предварительная оценка',
    'Безопасная отправка готовых работ',
  ];

  return (
    <section id="contacts" className="py-16 sm:py-24 relative bg-[#2D1E17] text-[#FAF6F0] overflow-hidden">
      
      {/* Warm Ambient Backlight & Milk Chocolate Texture */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-25 mix-blend-screen"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 65% 50% at 50% 25%, rgba(201, 169, 110, 0.25) 0%, transparent 80%),
            radial-gradient(ellipse 50% 50% at 80% 75%, rgba(184, 137, 77, 0.15) 0%, transparent 70%)
          `
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20 relative z-10">
        
        {/* ========================================================= */}
        {/* 1. SECTION: «ПАМЯТЬ НЕ ЗНАЕТ РАССТОЯНИЙ»                    */}
        {/* ========================================================= */}
        <div id="geography" className="memory-mail space-y-12">
          
          {/* Section Header Text */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h3 className="font-serif text-3xl sm:text-5xl font-semibold text-[#FAF6F0] tracking-tight">
              Память не знает расстояний
            </h3>

            <div className="font-sans text-sm sm:text-base text-[#D8C29D]/90 leading-relaxed space-y-1 max-w-2xl mx-auto">
              <p>Мы принимаем фотографии из любого региона России.</p>
              <p>Большинство заказов выполняется полностью онлайн.</p>
              <p>Готовые работы бережно возвращаются своим владельцам по всей стране.</p>
            </div>
          </div>

          {/* ========================================================= */}
          {/* ENVELOPE CONTAINER                                        */}
          {/* ========================================================= */}
          <div className="relative max-w-4xl mx-auto my-8">
            
            {/* 1. WOODEN DESK SURFACE PLATFORM (ФОН) */}
            <div className="relative bg-[#1F140D] p-3 sm:p-6 rounded-3xl border border-[#C9A96E]/30 shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden">
              
              {/* Wood Grain Pattern Overlay */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
                style={{
                  backgroundImage: `repeating-linear-gradient(90deg, #000 0px, #000 2px, transparent 2px, transparent 18px)`,
                }}
              />

              {/* 2. ENVELOPE SINGLE BACKGROUND IMAGE CONTAINER (ПОДЛОЖКА) */}
              <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(80,55,25,0.18)] border border-[#C9A96E]/40 bg-[#FAF6F0]">
                
                {/* Single Background Envelope Image */}
                <img
                  src={getImageUrl('/post/envelope-bg.webp')}
                  alt="Архивный почтовый конверт"
                  loading="lazy"
                  className="w-full h-auto object-contain block rounded-2xl"
                />

              </div>

            </div>

          </div>

          {/* ========================================================= */}
          {/* ADVANTAGES CARDS BELOW ENVELOPE                           */}
          {/* ========================================================= */}
          <div className="max-w-4xl mx-auto pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {benefits.map((text, idx) => (
                <div
                  key={idx}
                  className="bg-[#38261D] p-4 rounded-xl border border-[#C9A96E]/25 shadow-md flex items-start space-x-3 text-left"
                >
                  <div className="p-1 rounded-md bg-[#4D3629] text-[#C9A96E] shrink-0 mt-0.5 border border-[#C9A96E]/30">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm font-serif text-[#FAF6F0] leading-snug">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CALL TO ACTION BUTTON */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={onOpenOrderModal}
              className="py-3.5 px-8 rounded-xl bg-gradient-to-r from-[#C9A96E] via-[#D4AF37] to-[#B8894D] hover:from-[#D4AF37] hover:to-[#C9A96E] text-[#120B07] text-xs sm:text-sm font-serif font-bold transition-all border border-[#FFD700]/40 shadow-xl inline-flex items-center space-x-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Camera className="w-4 h-4 text-[#120B07]" />
              <span>Отправить фотографию на бесплатную оценку</span>
            </button>
          </div>

        </div>

        {/* ========================================================= */}
        {/* 2. ARCHIVAL REGISTRATION LEDGER BOOK ON WOODEN DESK       */}
        {/* ========================================================= */}
        <div id="contact" className="relative max-w-5xl mx-auto pt-6">
          
          {/* WOODEN DESK PLATFORM FRAME */}
          <div className="relative bg-[#1F140D] p-3 sm:p-6 md:p-8 rounded-3xl border border-[#C9A96E]/30 shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden">
            
            {/* Wood Grain Pattern Overlay */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, #000 0px, #000 2px, transparent 2px, transparent 18px)`,
              }}
            />

            {/* ARCHIVAL LEDGER SHEET / КНИГА УЧЁТА АРХИВНЫХ ПОСТУПЛЕНИЙ */}
            <div className="relative bg-[#FAF6F0] p-5 sm:p-8 md:p-10 rounded-2xl border-2 border-[#C9A96E]/60 shadow-[0_15px_40px_rgba(0,0,0,0.35)] text-[#2C221E] overflow-hidden">
              
              {/* Aged Paper Texture & Grid Watermark Overlay */}
              <div 
                className="pointer-events-none absolute inset-0 opacity-25 mix-blend-multiply"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 50% 10%, rgba(201, 169, 110, 0.3) 0%, transparent 80%),
                    repeating-linear-gradient(0deg, rgba(0,0,0,0.02) 0px, rgba(0,0,0,0.02) 1px, transparent 1px, transparent 6px)
                  `
                }}
              />

              {/* Archival Stamp Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b-2 border-[#C9A96E]/40 text-xs font-serif text-[#8C6239] relative z-10">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B8894D] shadow-xs" />
                  <span className="font-mono font-bold tracking-widest text-[11px] text-[#5C4A3E]">
                    АРХИВНЫЙ ФОНД № 1924 • СЕКЦИЯ УЧЁТА
                  </span>
                </div>
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded bg-[#EFE4D2] border border-[#C9A96E]/50 text-[#8C6239] text-[11px] font-serif uppercase tracking-wider font-bold shadow-2xs">
                  <Sparkles className="w-3 h-3 text-[#B8894D]" />
                  <span>Регистрационный реестр</span>
                </div>
              </div>

              {/* Ledger Book Title & Archival Subtitle */}
              <div className="text-center max-w-3xl mx-auto space-y-2 mb-8 relative z-10">
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C221E] tracking-tight leading-tight">
                  Журнал приёма семейных архивов
                </h2>
                <p className="font-mono text-xs sm:text-sm text-[#8C6239] uppercase tracking-wider">
                  Регистрационный журнал. Дело № 1924-СВ.
                </p>
              </div>

              {/* ARCHIVAL LEDGER TABLE */}
              <div className="relative z-10 overflow-x-auto border-2 border-[#C9A96E]/50 rounded-xl bg-[#F7F1E8] shadow-sm">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  
                  {/* Table Column Headers */}
                  <thead>
                    <tr className="bg-[#EFE4D2] border-b-2 border-[#C9A96E]/50 text-xs font-serif text-[#5C4A3E] uppercase tracking-wider font-bold">
                      <th className="py-3 px-4 sm:px-6 border-r border-[#C9A96E]/40 w-16 text-center">№</th>
                      <th className="py-3 px-4 sm:px-6 border-r border-[#C9A96E]/40">Способ передачи</th>
                      <th className="py-3 px-4 sm:px-6 border-r border-[#C9A96E]/40">Назначение</th>
                      <th className="py-3 px-4 sm:px-6 text-right">Статус</th>
                    </tr>
                  </thead>

                  {/* Table Entries */}
                  <tbody className="divide-y divide-[#C9A96E]/35 text-xs sm:text-sm font-serif text-[#2C221E]">
                    
                    {/* Row 001: VK */}
                    <tr className="hover:bg-[#EFE4D2]/60 transition-colors group">
                      <td className="py-3.5 px-4 sm:px-6 border-r border-[#C9A96E]/35 font-mono text-center font-bold text-[#8C6239] bg-[#EFE4D2]/30">
                        001
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 border-r border-[#C9A96E]/35 font-bold text-[#2C221E] group-hover:text-[#8C6239] transition-colors">
                        ВКонтакте
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 border-r border-[#C9A96E]/35 text-[#5C4A3E]">
                        Быстрый ответ
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right">
                        <a
                          href="https://vk.me/savinkl"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center space-x-1 text-[#8C6239] hover:text-[#2C221E] font-bold underline decoration-[#C9A96E]/60 underline-offset-4 hover:decoration-[#2C221E] transition-all"
                        >
                          <span>Открыть</span>
                          <span className="text-[11px]">→</span>
                        </a>
                      </td>
                    </tr>

                    {/* Row 002: MAX */}
                    <tr className="hover:bg-[#EFE4D2]/60 transition-colors group">
                      <td className="py-3.5 px-4 sm:px-6 border-r border-[#C9A96E]/35 font-mono text-center font-bold text-[#8C6239] bg-[#EFE4D2]/30">
                        002
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 border-r border-[#C9A96E]/35 font-bold text-[#2C221E] group-hover:text-[#8C6239] transition-colors">
                        MAX
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 border-r border-[#C9A96E]/35 text-[#5C4A3E]">
                        Личная консультация
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right">
                        <a
                          href="https://max.ru/u/f9LHodD0cOJDrWIUZMR6bdn9Y72qtC2JycHUPiCBgCX7inoYyVE0U0pqqX8"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center space-x-1 text-[#8C6239] hover:text-[#2C221E] font-bold underline decoration-[#C9A96E]/60 underline-offset-4 hover:decoration-[#2C221E] transition-all"
                        >
                          <span>Написать</span>
                          <span className="text-[11px]">→</span>
                        </a>
                      </td>
                    </tr>

                    {/* Row 003: Telegram */}
                    <tr className="hover:bg-[#EFE4D2]/60 transition-colors group">
                      <td className="py-3.5 px-4 sm:px-6 border-r border-[#C9A96E]/35 font-mono text-center font-bold text-[#8C6239] bg-[#EFE4D2]/30">
                        003
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 border-r border-[#C9A96E]/35 font-bold text-[#2C221E] group-hover:text-[#8C6239] transition-colors">
                        Telegram
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 border-r border-[#C9A96E]/35 text-[#5C4A3E]">
                        Альтернативный способ связи
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right">
                        <a
                          href="https://t.me/savinaek"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center space-x-1 text-[#8C6239] hover:text-[#2C221E] font-bold underline decoration-[#C9A96E]/60 underline-offset-4 hover:decoration-[#2C221E] transition-all"
                        >
                          <span>Перейти</span>
                          <span className="text-[11px]">→</span>
                        </a>
                      </td>
                    </tr>

                    {/* Row 004: ARCHIVAL ENTRY (UNFILLED LEDGER ROW WITH SEQUENTIAL REVEAL) */}
                    <tr 
                      ref={row004Ref}
                      onClick={onOpenOrderModal}
                      className="bg-[#EFE4D2]/60 hover:bg-[#E8D8BF] transition-colors duration-300 cursor-pointer group border-t-2 border-dashed border-[#C9A96E]/70 relative"
                    >
                      {/* Column 1: Number 004 always visible */}
                      <td className="py-4 px-4 sm:px-6 border-r border-[#C9A96E]/40 font-mono text-center font-bold text-[#8C6239] bg-[#E5D7BF]/60 group-hover:bg-[#DFCFA8] transition-colors">
                        004
                      </td>

                      {/* Column 2: Способ передачи ("Ваш семейный архив") */}
                      <td className="py-4 px-4 sm:px-6 border-r border-[#C9A96E]/40 font-bold text-[#2C221E] group-hover:text-[#8C6239] transition-colors relative min-w-[180px]">
                        {/* Archival Ledger Blank Line Guide */}
                        <div className="absolute inset-x-4 bottom-3 border-b border-dashed border-[#C9A96E]/40 pointer-events-none" />

                        {/* Smooth left-to-right reveal for "Ваш семейный архив" */}
                        <div 
                          className={`flex items-center space-x-2 overflow-hidden transition-all duration-700 ease-out ${
                            rowStage >= 1 ? 'max-w-[300px] opacity-100' : 'max-w-0 opacity-0'
                          }`}
                        >
                          <span className="inline-block w-2 h-2 rounded-full bg-[#B8894D] animate-pulse shrink-0" />
                          <span className="whitespace-nowrap">Ваш семейный архив</span>
                        </div>
                      </td>

                      {/* Column 3: Назначение ("Ожидает поступления…") */}
                      <td className="py-4 px-4 sm:px-6 border-r border-[#C9A96E]/40 text-[#5C4A3E] font-serif italic relative min-w-[180px]">
                        {/* Archival Ledger Blank Line Guide */}
                        <div className="absolute inset-x-4 bottom-3 border-b border-dashed border-[#C9A96E]/40 pointer-events-none" />

                        {/* Smooth fade-in for "Ожидает поступления…" */}
                        <div 
                          className={`transition-opacity duration-700 ease-out whitespace-nowrap ${
                            rowStage >= 2 ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          Ожидает поступления…
                        </div>
                      </td>

                      {/* Column 4: Статус ("Передать фотографию →") */}
                      <td className="py-4 px-4 sm:px-6 text-right relative min-w-[170px]">
                        {/* Archival Ledger Blank Line Guide */}
                        <div className="absolute inset-x-4 bottom-3 border-b border-dashed border-[#C9A96E]/30 pointer-events-none" />

                        {/* Smooth fade-in button */}
                        <div 
                          className={`transition-all duration-700 ease-out ${
                            rowStage >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
                          }`}
                        >
                          <span className="inline-flex items-center space-x-1.5 py-1 px-3.5 rounded bg-[#2C221E] text-[#EFE4D2] group-hover:bg-[#3D291F] font-serif text-xs font-semibold uppercase tracking-wider transition-all border border-[#C9A96E]/60 shadow-xs">
                            <span>Передать фотографию</span>
                            <span className="text-[#C9A96E]">→</span>
                          </span>
                        </div>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>

              {/* Bottom Archival Footnote */}
              <div className="mt-6 pt-4 border-t border-[#C9A96E]/35 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-serif text-[#8C6239] relative z-10 italic">
                <span>«Хранители памяти» • Главная реставрационная мастерская</span>
                <span>Бесплатная первоначальная экспертиза и оценка</span>
              </div>

            </div>

          </div>
        </div>

      </div>

    </section>
  );
};

