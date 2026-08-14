import React, { useState, useMemo } from 'react';
import { DamageLevel, CalculatorState, CalculationResult } from '../types';
import { getImageUrl } from '../utils/imageResolver';
import { 
  Sparkles, 
  Check, 
  Plus, 
  Minus, 
  Camera, 
  Palette, 
  Wand2, 
  Search, 
  FileText, 
  Award,
  Heart
} from 'lucide-react';

const DEFAULT_DAMAGE_IMAGES: Record<DamageLevel, string> = {
  light: getImageUrl('/calculator/light-damage'),
  medium: getImageUrl('/calculator/medium-damage'),
  severe: getImageUrl('/calculator/heavy-damage')
};

interface CalculatorSectionProps {
  onOpenOrderModal: (calcResult?: CalculationResult & CalculatorState) => void;
  initialService?: string;
}

export const CalculatorSection: React.FC<CalculatorSectionProps> = ({
  onOpenOrderModal,
  initialService = 'restoration'
}) => {
  const [calcState, setCalcState] = useState<CalculatorState>({
    service: (initialService === 'colorization' || initialService === 'revival' ? initialService : 'restoration') as any,
    quantity: 1,
    damageLevel: 'medium',
    addColorization: initialService === 'colorization',
    addRevival: initialService === 'revival',
  });

  // Calculate pricing
  const calculation: CalculationResult = useMemo(() => {
    let basePrice = 300;
    if (calcState.damageLevel === 'light') basePrice = 300;
    else if (calcState.damageLevel === 'medium') basePrice = 400;
    else if (calcState.damageLevel === 'severe') basePrice = 500;

    let addons = 0;
    if (calcState.addColorization) addons += 400;
    if (calcState.addRevival) addons += 500;

    const pricePerPhoto = basePrice + addons;
    const qty = Math.max(1, calcState.quantity || 1);
    const originalTotal = pricePerPhoto * qty;

    const discountPercentage = qty >= 10 ? 10 : 0;
    const discountAmount = Math.round((originalTotal * discountPercentage) / 100);
    const finalTotal = originalTotal - discountAmount;

    return {
      basePricePerPhoto: basePrice,
      addonsPerPhoto: addons,
      pricePerPhoto,
      originalTotal,
      discountPercentage,
      discountAmount,
      finalTotal,
    };
  }, [calcState]);

  // Real photos for damage levels
  const damageCards = [
    {
      id: 'light' as DamageLevel,
      title: 'Лёгкие повреждения',
      desc: 'Небольшие царапины и потеря контраста.',
      price: '300 ₽',
      image: DEFAULT_DAMAGE_IMAGES.light,
    },
    {
      id: 'medium' as DamageLevel,
      title: 'Средние повреждения',
      desc: 'Трещины, заломы, пятна.',
      price: '400 ₽',
      image: DEFAULT_DAMAGE_IMAGES.medium,
    },
    {
      id: 'severe' as DamageLevel,
      title: 'Сильные повреждения',
      desc: 'Разрывы, утраченные фрагменты, сильное выцветание.',
      price: '500 ₽',
      image: DEFAULT_DAMAGE_IMAGES.severe,
    }
  ];

  return (
    <section id="calculator" className="py-12 lg:py-16 relative bg-[#1A120B] text-[#FDFBF7] overflow-hidden select-none">
      
      {/* Sunlight Beam & Atmospheric Warm Backlight */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-amber-500/15 via-amber-900/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-radial from-yellow-600/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Wood Grain & Canvas Paper Background Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(201, 169, 110, 0.08) 0%, transparent 80%),
            repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 4px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 100% 8px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================= */}
        {/* 1. HEADER                                                 */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-8 sm:mb-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#C9A96E]/15 border border-[#C9A96E]/30 text-[#C9A96E] text-xs font-serif italic">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span>Мастерская реставратора</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-semibold text-[#FDFBF7] tracking-tight leading-tight">
            Давайте посмотрим, что можно вернуть к жизни
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#D8C29D]/80 leading-relaxed font-normal max-w-2xl mx-auto">
            Ответьте на несколько простых вопросов, и мы покажем предварительную стоимость восстановления именно вашей фотографии.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 2. THE WORKSHOP DESK SURFACE                              */}
        {/* ========================================================= */}
        <div className="bg-gradient-to-b from-[#2B1E14] via-[#231710] to-[#1C120B] p-6 sm:p-10 lg:p-12 rounded-3xl border border-[#C9A96E]/40 shadow-2xl relative">
          
          {/* Decorative Desk Tools around the Workshop */}
          <div className="hidden lg:flex items-center justify-between text-[11px] font-serif text-[#C9A96E]/60 pb-6 border-b border-[#C9A96E]/20 mb-8">
            <div className="flex items-center space-x-6">
              <span className="flex items-center space-x-1.5">
                <Search className="w-3.5 h-3.5 text-[#C9A96E]" />
                <span>Оптическая лупа 4x</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Wand2 className="w-3.5 h-3.5 text-[#C9A96E]" />
                <span>Мягкая беличья кисть</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Heart className="w-3.5 h-3.5 text-[#C9A96E]" />
                <span>Хлопковые перчатки</span>
              </span>
            </div>
            <div className="flex items-center space-x-4 italic">
              <span>Стол масляного дуба • Экспертный осмотр ИИ</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* ------------------------------------------------------- */}
            {/* LEFT COLUMN: INTERACTIVE CONTROLS                       */}
            {/* ------------------------------------------------------- */}
            <div className="lg:col-span-7 space-y-10">
              
              {/* STEP 1: DAMAGE SELECTION (REAL PHOTO CARDS) */}
              <div className="space-y-4">
                <label className="text-xs font-serif font-bold text-[#C9A96E] uppercase tracking-wider block flex items-center justify-between">
                  <span>1. Выберите степень повреждения снимка</span>
                  <span className="text-[11px] text-[#D8C29D]/60 lowercase font-normal italic">нажмите на подходящий пример</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {damageCards.map((card) => {
                    const isSelected = calcState.damageLevel === card.id;
                    return (
                      <div
                        key={card.id}
                        role="button"
                        tabIndex={0}
                        onClick={() =>
                          setCalcState((prev) => ({
                            ...prev,
                            damageLevel: card.id,
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setCalcState((prev) => ({
                              ...prev,
                              damageLevel: card.id,
                            }));
                          }
                        }}
                        className={`p-3 rounded-2xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between group ${
                          isSelected
                            ? 'bg-[#3B291C] border-[#C9A96E] ring-2 ring-[#C9A96E]/50 scale-[1.02] shadow-xl'
                            : 'bg-[#231710]/80 border-[#C9A96E]/25 hover:border-[#C9A96E]/60 hover:bg-[#2B1D13]'
                        }`}
                      >
                        {/* Mini Photo Thumbnail */}
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-2.5 border border-black/40">
                          <img
                            src={card.image}
                            alt={card.title}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                          />

                          {/* Selected Check Badge */}
                          {isSelected && (
                            <div className="absolute top-1.5 right-1.5 bg-[#C9A96E] text-[#1C120B] p-1 rounded-full shadow-md z-10">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-serif text-xs font-bold text-[#FDFBF7] group-hover:text-[#C9A96E] transition-colors">
                              {card.title}
                            </span>
                          </div>
                          <p className="text-[10.5px] font-sans text-[#D8C29D]/70 leading-snug line-clamp-2 mb-2">
                            {card.desc}
                          </p>
                          <span className="inline-block text-xs font-mono font-bold text-[#C9A96E] bg-black/40 px-2 py-0.5 rounded border border-[#C9A96E]/30">
                            {card.price}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: QUANTITY SELECTION (VISUAL PHOTO STACK) */}
              <div className="space-y-4 pt-4 border-t border-[#C9A96E]/20">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-serif font-bold text-[#C9A96E] uppercase tracking-wider block">
                    2. Сколько фотографий требуется восстановить?
                  </label>

                  <span className="text-xs font-mono font-bold text-[#FDFBF7] bg-[#3B291C] px-3 py-1 rounded-full border border-[#C9A96E]/40">
                    {calcState.quantity} {calcState.quantity === 1 ? 'снимок' : calcState.quantity < 5 ? 'снимка' : 'снимков'}
                  </span>
                </div>

                <div className="bg-[#1C120B]/90 p-4 sm:p-5 rounded-2xl border border-[#C9A96E]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  
                  {/* Quantity Stepper */}
                  <div className="flex items-center space-x-3 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        setCalcState((prev) => ({
                          ...prev,
                          quantity: Math.max(1, prev.quantity - 1),
                        }))
                      }
                      className="w-10 h-10 rounded-xl bg-[#2B1D13] hover:bg-[#C9A96E] text-[#D8C29D] hover:text-[#1C120B] font-bold text-lg transition-all cursor-pointer border border-[#C9A96E]/40 flex items-center justify-center active:scale-95"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={calcState.quantity}
                      onChange={(e) =>
                        setCalcState((prev) => ({
                          ...prev,
                          quantity: Math.max(1, parseInt(e.target.value) || 1),
                        }))
                      }
                      className="w-16 py-2 text-center font-serif font-bold text-xl text-[#FDFBF7] bg-[#2B1D13] rounded-xl border border-[#C9A96E]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setCalcState((prev) => ({
                          ...prev,
                          quantity: prev.quantity + 1,
                        }))
                      }
                      className="w-10 h-10 rounded-xl bg-[#2B1D13] hover:bg-[#C9A96E] text-[#D8C29D] hover:text-[#1C120B] font-bold text-lg transition-all cursor-pointer border border-[#C9A96E]/40 flex items-center justify-center active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Visual Photo Stack Preview */}
                  <div className="flex-1 flex items-center justify-center sm:justify-end space-x-1 overflow-hidden">
                    <div className="relative w-28 h-14 flex items-center justify-center">
                      {[...Array(Math.min(5, calcState.quantity))].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-12 h-10 rounded bg-[#3B291C] border border-[#C9A96E]/60 shadow-lg transition-transform duration-300 flex items-center justify-center"
                          style={{
                            transform: `rotate(${(i - 2) * 6}deg) translate(${i * 4}px, ${i * -2}px)`,
                            zIndex: i,
                          }}
                        >
                          <Camera className="w-3.5 h-3.5 text-[#C9A96E]" />
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Golden Archive Seal for 10+ photos */}
                {calcState.quantity >= 10 && (
                  <div className="bg-gradient-to-r from-amber-900/40 via-[#3B2B1B] to-amber-900/40 p-3.5 rounded-2xl border border-[#C9A96E] flex items-center space-x-3 animate-in fade-in zoom-in duration-500">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#8C6239] text-[#1C120B] flex items-center justify-center font-serif font-bold text-xs shrink-0 shadow-lg border border-amber-200">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-serif text-xs font-bold text-[#C9A96E] block">
                        🎉 Золотая архивная печать скидки
                      </span>
                      <p className="text-[11px] font-sans text-[#FDFBF7]/90">
                        Скидка 10% применена автоматически к вашему заказу!
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* STEP 3: ADDITIONAL SERVICES (CARDS) */}
              <div className="space-y-4 pt-4 border-t border-[#C9A96E]/20">
                <label className="text-xs font-serif font-bold text-[#C9A96E] uppercase tracking-wider block">
                  3. Желаете добавить живости и цвета?
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Option 1: Colorization */}
                  <button
                    type="button"
                    onClick={() =>
                      setCalcState((prev) => ({
                        ...prev,
                        addColorization: !prev.addColorization,
                      }))
                    }
                    className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex items-start space-x-3 ${
                      calcState.addColorization
                        ? 'bg-[#3B291C] border-[#C9A96E] ring-2 ring-[#C9A96E]/40 shadow-lg'
                        : 'bg-[#231710]/80 border-[#C9A96E]/20 hover:border-[#C9A96E]/50'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl shrink-0 ${
                      calcState.addColorization ? 'bg-[#C9A96E] text-[#1C120B]' : 'bg-[#1C120B] text-[#C9A96E]'
                    }`}>
                      <Palette className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-serif text-xs font-bold text-[#FDFBF7]">🎨 Раскрашивание</span>
                        <span className="text-xs font-mono font-bold text-[#C9A96E]">+400 ₽</span>
                      </div>
                      <p className="text-[10.5px] font-sans text-[#D8C29D]/70 leading-snug">
                        После выбора фотография постепенно становится цветной с историческими оттенками.
                      </p>
                    </div>
                  </button>

                  {/* Option 2: Revival */}
                  <button
                    type="button"
                    onClick={() =>
                      setCalcState((prev) => ({
                        ...prev,
                        addRevival: !prev.addRevival,
                      }))
                    }
                    className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex items-start space-x-3 ${
                      calcState.addRevival
                        ? 'bg-[#3B291C] border-[#C9A96E] ring-2 ring-[#C9A96E]/40 shadow-lg'
                        : 'bg-[#231710]/80 border-[#C9A96E]/20 hover:border-[#C9A96E]/50'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl shrink-0 ${
                      calcState.addRevival ? 'bg-[#C9A96E] text-[#1C120B]' : 'bg-[#1C120B] text-[#C9A96E]'
                    }`}>
                      <Wand2 className="w-5 h-5 animate-pulse" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-serif text-xs font-bold text-[#FDFBF7]">✨ Оживление</span>
                        <span className="text-xs font-mono font-bold text-[#C9A96E]">+500 ₽</span>
                      </div>
                      <p className="text-[10.5px] font-sans text-[#D8C29D]/70 leading-snug">
                        Человек на фотографиях мягко моргает, слегка улыбается и делает едва заметное движение.
                      </p>
                    </div>
                  </button>

                </div>
              </div>

            </div>

            {/* ------------------------------------------------------- */}
            {/* RIGHT COLUMN: ARCHIVAL MASTER ASSESSMENT RECEIPT        */}
            {/* ------------------------------------------------------- */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
              
              {/* ARCHIVAL MASTER CARD RECEIPT (ПРЕДВАРИТЕЛЬНАЯ ОЦЕНКА) */}
              <div className="bg-[#FAF6F0] p-6 sm:p-7 rounded-3xl text-[#2B2017] shadow-2xl border-2 border-[#C9A96E]/50 relative overflow-hidden font-serif space-y-5">
                
                {/* Vintage Deckled Paper Corner Effect */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#EFE4D2] -rotate-45 transform translate-x-8 -translate-y-8 border-b border-[#C9A96E]/40" />

                <div className="border-b border-[#C9A96E]/30 pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#8C6239] uppercase tracking-widest block">
                      Архивная карточка реставратора
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#2B2017]">
                      Предварительная оценка
                    </h3>
                  </div>
                  <FileText className="w-6 h-6 text-[#8C6239] opacity-80" />
                </div>

                {/* Calculation Line Items */}
                <div className="space-y-2.5 text-xs font-sans">
                  
                  <div className="flex justify-between py-1 border-b border-dashed border-[#C9A96E]/30">
                    <span className="text-[#6E5A47]">Вид работы (Реставрация):</span>
                    <span className="font-semibold text-[#2B2017]">
                      {calcState.damageLevel === 'light' ? '300 ₽' : calcState.damageLevel === 'medium' ? '400 ₽' : '500 ₽'} / фото
                    </span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-dashed border-[#C9A96E]/30">
                    <span className="text-[#6E5A47]">Количество фотографий:</span>
                    <span className="font-semibold text-[#2B2017]">{calcState.quantity} шт.</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-dashed border-[#C9A96E]/30">
                    <span className="text-[#6E5A47]">Дополнительные услуги:</span>
                    <span className="font-semibold text-[#2B2017]">
                      {calcState.addColorization && calcState.addRevival
                        ? '+900 ₽ / фото'
                        : calcState.addColorization
                        ? '+400 ₽ / фото'
                        : calcState.addRevival
                        ? '+500 ₽ / фото'
                        : 'Не выбраны'}
                    </span>
                  </div>

                  {calculation.discountPercentage > 0 && (
                    <div className="flex justify-between py-1 text-emerald-800 font-semibold bg-emerald-100/60 px-2 rounded-lg">
                      <span>Скидка мастера ({calculation.discountPercentage}%):</span>
                      <span>-{calculation.discountAmount} ₽</span>
                    </div>
                  )}

                </div>

                {/* Total Section */}
                <div className="pt-3 border-t-2 border-[#C9A96E]/40 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs font-sans text-[#6E5A47] block">Предварительный итог:</span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#2B2017] gold-gradient-text">
                      {calculation.finalTotal} ₽
                    </span>
                  </div>
                  <span className="text-[11px] font-sans text-[#8C6239] italic">Оплата после работы</span>
                </div>

                {/* Round Archival Wax Seal at bottom */}
                <div className="pt-2 flex items-center justify-center">
                  <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#EFE4D2] border border-[#C9A96E]/60 text-[11px] font-serif italic text-[#8C6239] shadow-inner">
                    <span className="w-2 h-2 rounded-full bg-[#B8894D]" />
                    <span>Печать: Предварительный расчёт</span>
                  </div>
                </div>

                {/* Main Action Button */}
                <div className="pt-2 space-y-2">
                  <button
                    type="button"
                    onClick={() => onOpenOrderModal({ ...calculation, ...calcState })}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#C9A96E] via-[#B8894D] to-[#9E733B] hover:from-[#D8B67D] hover:to-[#B8894D] text-[#1C120B] font-extrabold text-sm sm:text-base shadow-xl hover:shadow-2xl hover:shadow-[#C9A96E]/30 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center space-x-2 border border-[#FDFBF7]/30"
                  >
                    <Camera className="w-5 h-5 text-[#1C120B]" />
                    <span>Рассчитать стоимость реставрации</span>
                  </button>

                  <p className="text-[10.5px] font-sans text-[#6E5A47] text-center italic leading-tight">
                    Мы внимательно изучим фотографию и сообщим окончательную стоимость до начала работы.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
