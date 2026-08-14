import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Phone, MessageCircle, Send, Menu, X, Volume2, VolumeX, HeartHandshake, Upload, Image as ImageIcon, RotateCcw } from 'lucide-react';
import { getImageUrl, handleImageError } from '../utils/imageResolver';

interface NavbarProps {
  onOpenOrderModal: (service?: string) => void;
  audioPlaying: boolean;
  onToggleAudio: () => void;
  isVisible?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenOrderModal,
  audioPlaying,
  onToggleAudio,
  isVisible = true,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Услуги и примеры', href: '#services' },
    { name: 'Калькулятор стоимости', href: '#calculator' },
    { name: 'Гарантии', href: '#why-us' },
    { name: 'Контакты', href: '#contacts' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-1000 ${
        !isVisible && !scrolled ? 'opacity-0 pointer-events-none -translate-y-4' : 'opacity-100 translate-y-0'
      } ${
        scrolled
          ? 'bg-[#F8F4EE]/90 backdrop-blur-md shadow-sm border-b border-[#C9A96E]/20 py-3'
          : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Slogan */}
          <div className="flex items-center space-x-3">
            <a href="#" className="relative group block shrink-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border border-[#C9A96E]/50 bg-black/30 p-1 shadow-md flex items-center justify-center transition-transform group-hover:scale-105">
                <img
                  src={getImageUrl('/logo/logo-icon.webp')}
                  alt="«Хранители памяти»"
                  className="w-full h-full object-contain rounded-xl"
                  onError={handleImageError}
                />
              </div>
            </a>

            <div>
              <div className="flex items-center space-x-2">
                <a href="#" className={`font-serif text-xl sm:text-2xl font-semibold tracking-tight block leading-none ${scrolled ? 'text-[#3B3128]' : 'text-[#FDFBF7]'}`}>
                  «Хранители памяти»
                </a>
              </div>

              <span className={`text-xs sm:text-[12px] font-medium tracking-wide block mt-1 transition-colors ${
                scrolled ? 'text-[#523F31]' : 'text-[#EADBB8] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
              }`}>
                Возвращаем к жизни семейные воспоминания
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs uppercase tracking-widest font-medium transition-colors relative py-1 ${
                  scrolled
                    ? 'text-[#3B3128]/80 hover:text-[#B8894D]'
                    : 'text-[#FDFBF7]/85 hover:text-[#C9A96E]'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Audio Toggle button */}
            <button
              onClick={onToggleAudio}
              title={audioPlaying ? 'Выключить атмосферный звук' : 'Включить атмосферный звук'}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                audioPlaying
                  ? 'bg-[#C9A96E] text-white border-[#C9A96E]'
                  : scrolled
                    ? 'bg-white/80 text-[#7B6854] border-[#C9A96E]/30 hover:border-[#C9A96E]'
                    : 'bg-black/40 text-[#C9A96E] border-[#C9A96E]/40 hover:bg-black/60'
              }`}
            >
              {audioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* CTA Button */}
            <button
              onClick={() => onOpenOrderModal()}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#B8894D] to-[#C9A96E] text-white text-xs font-semibold hover:opacity-95 shadow-md shadow-[#C9A96E]/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center space-x-1.5 cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Рассчитать фото</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={onToggleAudio}
              className={`p-2 rounded-full border transition-colors ${
                scrolled
                  ? 'bg-white/80 border-[#C9A96E]/30 text-[#7B6854]'
                  : 'bg-black/50 border-[#C9A96E]/40 text-[#C9A96E]'
              }`}
            >
              {audioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg border transition-colors ${
                scrolled
                  ? 'bg-white/80 border-[#C9A96E]/30 text-[#3B3128]'
                  : 'bg-black/50 border-[#C9A96E]/40 text-[#FDFBF7]'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F8F4EE] border-b border-[#C9A96E]/30 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3 mb-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#3B3128] hover:text-[#B8894D] py-1 border-b border-[#C9A96E]/10"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="flex flex-col space-y-2.5">
            <div className="grid grid-cols-3 gap-2">
              <a
                href="https://vk.me/savinkl"
                target="_blank"
                rel="noreferrer"
                className="py-2 rounded-lg bg-white border border-[#C9A96E]/20 text-xs font-medium text-[#3B3128] text-center"
              >
                VK
              </a>
              <a
                href="https://max.ru/u/f9LHodD0cOJDrWIUZMR6bdn9Y72qtC2JycHUPiCBgCX7inoYyVE0U0pqqX8"
                target="_blank"
                rel="noreferrer"
                className="py-2 rounded-lg bg-white border border-[#C9A96E]/20 text-xs font-medium text-[#3B3128] text-center"
              >
                MAX
              </a>
              <a
                href="https://t.me/savinaek"
                target="_blank"
                rel="noreferrer"
                className="py-2 rounded-lg bg-white border border-[#C9A96E]/20 text-xs font-medium text-[#3B3128] text-center"
              >
                Telegram
              </a>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="w-full py-3 rounded-xl bg-[#3B3128] text-[#C9A96E] font-medium text-sm text-center shadow-md cursor-pointer"
            >
              Сделать заказ
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
