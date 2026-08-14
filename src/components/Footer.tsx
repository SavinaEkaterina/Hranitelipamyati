import React, { useState } from 'react';
import { Sparkles, Heart, Shield, Send, X } from 'lucide-react';
import { getImageUrl, handleImageError } from '../utils/imageResolver';

export const Footer: React.FC = () => {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  return (
    <footer className="bg-[#3B3128] text-[#F8F4EE] pt-16 pb-12 border-t border-[#C9A96E]/30 relative z-10">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#C9A96E]/20">
          
          {/* Logo & Slogan Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-[#C9A96E]/60 bg-[#2B221B] p-1.5 shadow-lg flex items-center justify-center shrink-0">
                <img
                  src={getImageUrl('/logo/logo-full.png')}
                  alt="«Хранители памяти»"
                  loading="lazy"
                  className="w-full h-full object-contain rounded-xl"
                  onError={handleImageError}
                />
              </div>

              <div>
                <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#F8F4EE] block leading-tight">
                  «Хранители памяти»
                </span>
              </div>
            </div>

            <p className="font-serif italic text-lg text-[#C9A96E]">
              Сохраняем воспоминания для будущих поколений.
            </p>

            <p className="text-xs text-[#EFE8DC]/70 leading-relaxed max-w-md font-sans">
              Профессиональное бережное восстановление старинных семейных фотографий, удаление повреждений, раскрашивание и оцифровка архивов с 2012 года.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center space-x-2 text-xs font-serif text-[#C9A96E] bg-[#2B221B] px-3.5 py-1.5 rounded-full border border-[#C9A96E]/30">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                <span>Бережное отношение к каждому кадру</span>
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3 text-xs font-sans">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#C9A96E]">
              Разделы
            </h4>
            <ul className="space-y-2 text-[#EFE8DC]/80">
              <li>
                <a href="#services" className="hover:text-[#C9A96E] transition-colors">
                  Виды реставрации
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-[#C9A96E] transition-colors">
                  Калькулятор стоимости
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[#C9A96E] transition-colors">
                  Стандарты и гарантии
                </a>
              </li>
              <li>
                <a href="#contacts" className="hover:text-[#C9A96E] transition-colors">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Support & Messengers */}
          <div className="md:col-span-4 space-y-3 text-xs font-sans">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#C9A96E]">
              Прямая связь с мастером
            </h4>
            
            <p className="text-[#EFE8DC]/80 leading-relaxed">
              Вы можете отправить фотографию напрямую в удобном мессенджере для бесплатной первичной оценки:
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="https://vk.com"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#2B221B] hover:bg-[#C9A96E] hover:text-[#1C120B] text-[#C9A96E] font-semibold transition-all border border-[#C9A96E]/30 flex items-center space-x-1.5"
              >
                <span>ВКонтакте</span>
              </a>

              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#2B221B] hover:bg-[#C9A96E] hover:text-[#1C120B] text-[#C9A96E] font-semibold transition-all border border-[#C9A96E]/30 flex items-center space-x-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram</span>
              </a>
            </div>

            <div className="pt-2 text-[11px] text-[#EFE8DC]/60">
              <span>Режим работы мастерской: Ежедневно с 09:00 до 21:00</span>
            </div>
          </div>

        </div>

        {/* Bottom Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#EFE8DC]/60 font-sans gap-4">
          <div>
            <span>© {new Date().getFullYear()} «Хранители памяти». Все права защищены.</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setPrivacyModalOpen(true)}
              className="hover:text-[#C9A96E] underline transition-colors cursor-pointer"
            >
              Политика конфиденциальности
            </button>
          </div>
        </div>

      </div>

      {/* Privacy Policy Modal */}
      {privacyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FAF6F0] text-[#3B3128] rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl border border-[#C9A96E]/40 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setPrivacyModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#EFE8DC] text-[#3B3128] hover:bg-[#C9A96E] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4 text-xs font-sans leading-relaxed">
              <h3 className="font-serif text-xl font-bold text-[#3B3128]">
                Политика конфиденциальности и защита семейных архивов
              </h3>

              <p>
                1. <strong>Полная конфиденциальность:</strong> Все переданные фотографии и личные архивы обрабатываются исключительно в целях проведения работ по реставрации.
              </p>

              <p>
                2. <strong>Запрет на публичное размещение:</strong> Ни одна фотография из вашего заказа никогда не будет опубликована в сети Интернет, галерее или социальных сетях без вашего письменного согласия.
              </p>

              <p>
                3. <strong>Безопасное хранение:</strong> Исходники и готовые реставрации хранятся на защищенном архивном сервере в течение 30 дней после выполнения заказа для вашей безопасности (в случае утери оригинала), после чего автоматически удаляются.
              </p>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setPrivacyModalOpen(false)}
                  className="px-5 py-2 rounded-xl bg-[#3B3128] text-[#C9A96E] font-bold cursor-pointer"
                >
                  Понятно
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};
