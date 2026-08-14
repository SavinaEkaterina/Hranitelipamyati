import React, { useState, useEffect } from 'react';
import { Play, Pause, Video, Sparkles, Smile, RotateCw, ShieldAlert } from 'lucide-react';
import { getImageUrl } from '../utils/imageResolver';

interface PhotoRevivalShowcaseProps {
  onOpenOrderModal: () => void;
}

export const PhotoRevivalShowcase: React.FC<PhotoRevivalShowcaseProps> = ({ onOpenOrderModal }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [smileLevel, setSmileLevel] = useState(60); // 0 to 100
  const [headTilt, setHeadTilt] = useState(0); // -15 to +15 deg
  const [filmGrain, setFilmGrain] = useState(true);

  // Animated parameters loop
  useEffect(() => {
    if (!isPlaying) return;
    let frame: number;
    let angle = 0;

    const animateLoop = () => {
      angle += 0.03;
      const tilt = Math.sin(angle) * 3.5;
      setHeadTilt(tilt);
      frame = requestAnimationFrame(animateLoop);
    };

    frame = requestAnimationFrame(animateLoop);
    return () => cancelAnimationFrame(frame);
  }, [isPlaying]);

  return (
    <section id="revival" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-semibold text-[#B8894D] uppercase tracking-widest px-3 py-1 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/20 inline-block">
            Инновационная услуга
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#3B3128]">
            Оживление старых фотографий
          </h2>
          <p className="text-base sm:text-lg text-[#7B6854] font-normal">
            Снова увидеть родной взгляд, тёплую улыбку и привычное движение головы
          </p>
        </div>

        {/* Video / Interactive Player Canvas Showcase */}
        <div className="paper-card p-6 sm:p-10 rounded-3xl shadow-2xl border border-[#C9A96E]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Portrait Player */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative aspect-[3/4] w-full max-w-md rounded-2xl overflow-hidden bg-[#2D251E] shadow-2xl border-2 border-[#C9A96E]/40 group">
              
              {/* Animated Photo Mode */}
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-300 ease-out"
                style={{
                  backgroundImage: `url('${getImageUrl('/hero/hero-main')}')`,
                  transform: `rotate(${headTilt}deg) scale(${1 + smileLevel / 2000})`,
                  filter: `contrast(1.05) saturate(1.1)`,
                }}
              >
                {/* Simulated Smile Overlay */}
                <div
                  className="w-full h-full bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none transition-opacity duration-300"
                  style={{ opacity: smileLevel / 100 }}
                />

                {/* Film Grain Texture Overlay */}
                {filmGrain && (
                  <div
                    className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
                    style={{
                      backgroundImage: `radial-gradient(#ffffff 1px, transparent 0)`,
                      backgroundSize: '4px 4px'
                    }}
                  />
                )}

                {/* Play/Pause Overlay indicator */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-white flex items-center space-x-2 border border-white/20">
                  <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
                  <span>{isPlaying ? 'Воспроизведение микроанимации' : 'Пауза'}</span>
                </div>

                {/* Bottom Control Bar on Video */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/20 text-white flex items-center justify-between">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 rounded-lg bg-[#C9A96E] text-[#3B3128] hover:bg-white transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>

                  <span className="text-xs font-serif italic text-white/90 truncate max-w-[180px]">
                    Архивный портрет из семейного альбома
                  </span>

                  <button
                    onClick={() => setFilmGrain(!filmGrain)}
                    className={`px-2.5 py-1 rounded-md text-[11px] border transition-colors ${
                      filmGrain ? 'bg-white/20 text-white border-white/40' : 'bg-transparent text-white/60 border-white/20'
                    }`}
                  >
                    Зернистость
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Controls & Natural Motion Explanation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C9A96E]/15 text-[#B8894D] text-xs font-semibold">
                <Video className="w-4 h-4" />
                <span>Естественные микро-движения</span>
              </div>

              <h3 className="font-serif text-3xl font-semibold text-[#3B3128]">
                Фотографии оживают, сохраняя всю строгость и тепло
              </h3>

              <p className="text-sm text-[#7B6854] leading-relaxed">
                Мы используем алгоритмы с нейросетевой проработкой мимики. Человек не выглядит «искусственным кукольным образом» — движения предельно органичны.
              </p>
            </div>

            {/* Interactive Control Sliders */}
            <div className="bg-[#F8F4EE] p-5 rounded-2xl border border-[#C9A96E]/30 space-y-4">
              <h4 className="text-xs font-semibold text-[#3B3128] uppercase tracking-wider flex items-center justify-between">
                <span>Протестируйте параметры мимики:</span>
                <Sparkles className="w-4 h-4 text-[#B8894D]" />
              </h4>

              {/* Slider 1: Smile */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-[#7B6854]">
                  <span className="flex items-center space-x-1.5">
                    <Smile className="w-3.5 h-3.5 text-[#B8894D]" />
                    <span>Мягкая улыбка</span>
                  </span>
                  <span className="font-semibold text-[#3B3128]">{smileLevel}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={smileLevel}
                  onChange={(e) => setSmileLevel(Number(e.target.value))}
                  className="w-full accent-[#C9A96E] cursor-pointer"
                />
              </div>

              {/* Slider 2: Head tilt */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-[#7B6854]">
                  <span className="flex items-center space-x-1.5">
                    <RotateCw className="w-3.5 h-3.5 text-[#B8894D]" />
                    <span>Поворот головы</span>
                  </span>
                  <span className="font-semibold text-[#3B3128]">{Math.round(headTilt)}°</span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  value={headTilt}
                  onChange={(e) => setHeadTilt(Number(e.target.value))}
                  className="w-full accent-[#C9A96E] cursor-pointer"
                />
              </div>
            </div>

            {/* Quality Statement */}
            <div className="p-4 rounded-xl bg-[#F5EFE6] border border-[#C9A96E]/20 text-xs text-[#7B6854] space-y-1">
              <p className="font-semibold text-[#3B3128] flex items-center space-x-1.5">
                <ShieldAlert className="w-4 h-4 text-[#B8894D]" />
                <span>Готовый видеофайл передаётся в HD качестве</span>
              </p>
              <p>Вы сможете сохранить его на смартфон, отправлять в мессенджеры близким и смотреть на цифровых фоторамках.</p>
            </div>

            {/* CTA */}
            <button
              onClick={onOpenOrderModal}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#B8894D] to-[#C9A96E] text-white font-semibold text-sm hover:opacity-95 shadow-md shadow-[#C9A96E]/30 transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <Video className="w-4 h-4" />
              <span>Заказать оживление своего фото (от 500 ₽)</span>
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
