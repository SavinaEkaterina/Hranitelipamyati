import React, { useState, useRef, useEffect } from 'react';
import { X, ShieldCheck, Send, MessageCircle } from 'lucide-react';
import { getImageUrl, handleImageError } from '../utils/imageResolver';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  calcResult?: any;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, calcResult }) => {
  // States for logo animation and sequential reveal
  const [videoEnded, setVideoEnded] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const logoVideoUrl = getImageUrl('/logo/logo-animation.mp4');

  // Trigger video animation whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setVideoEnded(false);
      setShowTitle(false);
      setShowText(false);
      setShowButtons(false);
      setVideoError(false);

      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {
          setVideoEnded(true);
        });
      }

      // Fallback timer if video ended event is delayed
      const timer = setTimeout(() => {
        setVideoEnded(true);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && videoEnded) {
      setShowTitle(true);
      const t1 = setTimeout(() => setShowText(true), 200);
      const t2 = setTimeout(() => setShowButtons(true), 400);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [isOpen, videoEnded]);

  const handleVideoEnded = () => {
    setVideoEnded(true);
  };

  const handleVideoError = () => {
    setVideoError(true);
    setVideoEnded(true);
  };

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const buildMessageText = () => {
    let msg = `Здравствуйте! Заявка с сайта «Хранители памяти»:\n\n`;
    if (calcResult) {
      msg += `📊 Предварительный расчёт: ${calcResult.quantity} фото, ${calcResult.finalTotal} ₽\n\n`;
    }
    msg += `Хочу проконсультироваться по бесплатной оценке снимка.`;
    return msg;
  };

  const messageText = buildMessageText();
  const encodedText = encodeURIComponent(messageText);

  const handleMessengerClick = (messenger: 'vk' | 'max' | 'telegram') => {
    const links = {
      vk: 'https://vk.me/savinkl',
      max: 'https://max.ru/u/f9LHodD0cOJDrWIUZMR6bdn9Y72qtC2JycHUPiCBgCX7inoYyVE0U0pqqX8',
      telegram: `https://t.me/savinaek?text=${encodedText}`,
    };

    window.open(links[messenger], '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in transition-all duration-300 select-text"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FAF6F0] rounded-3xl max-w-xl w-full relative shadow-2xl border-2 border-[#C9A96E]/50 max-h-[90vh] flex flex-col overflow-hidden text-[#2C221E]"
      >
        {/* STICKY TOP HEADER WITH CLOSE BUTTON */}
        <div className="bg-[#EFE4D2] px-6 py-4 border-b border-[#C9A96E]/40 flex items-center justify-between shrink-0 sticky top-0 z-20 shadow-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B8894D]" />
            <span className="font-serif text-xs font-bold uppercase tracking-wider text-[#8C6239]">
              Мастерская «Хранители памяти»
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#2C221E] text-[#EFE4D2] hover:bg-[#3D291F] hover:text-[#FFD700] transition-all cursor-pointer text-xs font-semibold shadow-xs"
            title="Закрыть окно (ESC)"
          >
            <span>Закрыть</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-center">

          {/* Animated Logo */}
          <div className="flex justify-center items-center my-1">
            {!videoError ? (
              <video
                ref={videoRef}
                src={logoVideoUrl}
                autoPlay
                muted
                playsInline
                preload="none"
                onLoadStart={() => console.log('[OrderModal Diagnostic] видео логотипа найдено:', logoVideoUrl)}
                onLoadedData={() => console.log('[OrderModal Diagnostic] видео логотипа загружено')}
                onCanPlay={() => console.log('[OrderModal Diagnostic] видео логотипа готово')}
                onPlay={() => console.log('[OrderModal Diagnostic] видео логотипа запуск')}
                onEnded={handleVideoEnded}
                onError={handleVideoError}
                className="w-[130px] sm:w-[150px] h-auto mx-auto object-contain pointer-events-none mix-blend-multiply contrast-[1.08] brightness-[1.02]"
              >
                {logoVideoUrl && <source src={logoVideoUrl} type="video/mp4" />}
              </video>
            ) : (
              <img
                src={getImageUrl('/logo/logo.webp')}
                alt="Хранители памяти"
                loading="lazy"
                onError={handleImageError}
                className="w-[130px] sm:w-[150px] h-auto mx-auto object-contain mix-blend-multiply contrast-[1.08] brightness-[1.02]"
              />
            )}
          </div>

          {/* Title - smoothly reveals after video logo animation */}
          <div
            className={`space-y-1 transition-all duration-700 ease-out ${
              showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <span className="text-[11px] font-mono font-bold text-[#8C6239] uppercase tracking-widest block">
              БЕСПЛАТНАЯ ОЦЕНКА • ВАМ ОТВЕТЯТ В БЛИЖАЙШЕЕ ВРЕМЯ
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C221E]">
              Заявка на бесплатную оценку
            </h3>
          </div>

          {/* Subtitle description */}
          <p
            className={`text-xs sm:text-sm text-[#5C4A3E] max-w-md mx-auto leading-relaxed transition-all duration-700 ease-out ${
              showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            Выберите удобный мессенджер — напишите реставратору напрямую для быстрой оценки снимка и точного расчёта стоимости.
          </p>

          {/* Preliminary Calculator summary if present */}
          {calcResult && (
            <div
              className={`p-4 rounded-2xl bg-[#EFE4D2] border border-[#C9A96E]/50 text-xs text-[#2C221E] space-y-1 shadow-2xs transition-all duration-700 ease-out text-left ${
                showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
            >
              <span className="font-serif font-bold block text-[#8C6239] text-xs uppercase tracking-wider">
                Предварительный расчёт:
              </span>
              <p className="font-medium text-sm">
                {calcResult.quantity} фото • {calcResult.finalTotal} ₽ {calcResult.discountPercentage > 0 ? `(скидка ${calcResult.discountPercentage}%)` : ''}
              </p>
            </div>
          )}

          {/* DIRECT MESSENGER BUTTONS (1: VK, 2: MAX, 3: Telegram) - Styled in site warm colors */}
          <div
            className={`pt-2 space-y-3 transition-all duration-700 ease-out ${
              showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <span className="text-xs font-serif font-bold text-[#8C6239] uppercase tracking-wider block">
              Выберите мессенджер для отправки сообщения:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* 1st Place: ВКонтакте (VK) - Main site gold gradient theme */}
              <button
                type="button"
                onClick={() => handleMessengerClick('vk')}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#C9A96E] via-[#D4AF37] to-[#B8894D] hover:from-[#D4AF37] hover:to-[#C9A96E] text-[#120B07] font-serif text-xs font-bold uppercase tracking-wider border border-[#FFD700]/40 transition-all cursor-pointer shadow-md flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 text-[#120B07] shrink-0" />
                <span>ВКонтакте</span>
              </button>

              {/* 2nd Place: MAX - Dark wood & warm gold border theme */}
              <button
                type="button"
                onClick={() => handleMessengerClick('max')}
                className="w-full py-3.5 px-4 rounded-xl bg-[#2C221E] hover:bg-[#3D291F] text-[#FAF6F0] font-serif text-xs font-bold uppercase tracking-wider border border-[#C9A96E]/50 transition-all cursor-pointer shadow-md flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
              >
                <span className="w-2 h-2 rounded-full bg-[#C9A96E]" />
                <span>MAX</span>
              </button>

              {/* 3rd Place: Telegram - Deep warm espresso theme */}
              <button
                type="button"
                onClick={() => handleMessengerClick('telegram')}
                className="w-full py-3.5 px-4 rounded-xl bg-[#3D291F] hover:bg-[#4A3327] text-[#FAF6F0] font-serif text-xs font-bold uppercase tracking-wider border border-[#C9A96E]/60 transition-all cursor-pointer shadow-md flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4 text-[#C9A96E] shrink-0" />
                <span>Telegram</span>
              </button>
            </div>
          </div>

          <div className="pt-2 text-[10px] text-[#8C6239] flex items-center justify-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B8894D]" />
            <span>Гарантируем конфиденциальность личных архивов</span>
          </div>

        </div>

      </div>
    </div>
  );
};
