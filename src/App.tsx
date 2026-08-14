import React, { useState, useRef, useEffect } from 'react';
import { DustCanvas } from './components/DustCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StoryManifesto } from './components/StoryManifesto';
import { ServicesSection } from './components/ServicesSection';
import { CalculatorSection } from './components/CalculatorSection';
import { WhyUsSection } from './components/WhyUsSection';
import { ContactsAndMapSection } from './components/ContactsAndMapSection';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';

export default function App() {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedCalcResult, setSelectedCalcResult] = useState<any>(null);
  const [initialServiceForCalc, setInitialServiceForCalc] = useState<string>('restoration');
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);

  // Ensure page starts at top on refresh/load & disable automatic browser scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const audioContextRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);

  // Web Audio API vinyl / projector ambient crackle generator
  const toggleAudio = () => {
    if (audioPlaying) {
      if (audioContextRef.current) {
        audioContextRef.current.suspend();
      }
      setAudioPlaying(false);
    } else {
      try {
        if (!audioContextRef.current) {
          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          const ctx = new AudioContextClass();
          audioContextRef.current = ctx;

          // Create pink noise buffer for warm vinyl/projector crackle
          const bufferSize = ctx.sampleRate * 2;
          const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.012;
            b6 = white * 0.115926;
          }

          const whiteNoise = ctx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;
          whiteNoise.loop = true;

          const gainNode = ctx.createGain();
          gainNode.gain.value = 0.08; // quiet, warm background sound

          whiteNoise.connect(gainNode);
          gainNode.connect(ctx.destination);
          whiteNoise.start(0);
          noiseNodeRef.current = whiteNoise;
        } else {
          audioContextRef.current.resume();
        }
        setAudioPlaying(true);
      } catch (e) {
        console.error('Audio initialization error:', e);
      }
    }
  };

  const handleOpenOrderModal = (calcResult?: any) => {
    setSelectedCalcResult(calcResult || null);
    setOrderModalOpen(true);
  };

  const handleSelectService = (serviceId: string) => {
    setInitialServiceForCalc(serviceId);
    const calcElement = document.getElementById('calculator');
    if (calcElement) {
      calcElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F4EE] text-[#3B3128] paper-texture relative font-sans">
      
      {/* Background Ambient Floating Particles */}
      <DustCanvas enabled={true} />

      {/* Header Navbar */}
      <Navbar
        onOpenOrderModal={() => handleOpenOrderModal()}
        audioPlaying={audioPlaying}
        onToggleAudio={toggleAudio}
        isVisible={isNavVisible}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        
        {/* 1. Hero Section (Wooden Table + Restoration Sweep + Revival Photo) */}
        <HeroSection
          onOpenOrderModal={() => handleOpenOrderModal()}
          onCinematicComplete={() => setIsNavVisible(true)}
        />

        {/* 2. Emotional Manifesto */}
        <StoryManifesto />

        {/* 3. Services Grid */}
        <ServicesSection
          onSelectService={handleSelectService}
          onOpenOrderModal={handleOpenOrderModal}
        />

        {/* 4. 30-Second Interactive Calculator */}
        <CalculatorSection
          onOpenOrderModal={handleOpenOrderModal}
          initialService={initialServiceForCalc}
        />

        {/* 9. Why Choose Us (Standards & Guarantees) */}
        <WhyUsSection />

        {/* 10. Contacts & Regional Map */}
        <ContactsAndMapSection
          onOpenOrderModal={handleOpenOrderModal}
          onSuccessSubmit={() => {}}
        />

      </main>

      {/* Footer */}
      <Footer />

      {/* Order Modal */}
      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        calcResult={selectedCalcResult}
      />

    </div>
  );
}
