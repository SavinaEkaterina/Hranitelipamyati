import React, { useEffect, useRef } from 'react';

interface DustCanvasProps {
  enabled?: boolean;
}

export const DustCanvas: React.FC<DustCanvasProps> = React.memo(({ enabled = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle setup
    const particleCount = Math.min(Math.floor(width / 25), 45);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.4 - 0.1,
      opacity: Math.random() * 0.5 + 0.15,
      pulse: Math.random() * 0.02,
      pulseDirection: 1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Light beam gradient from top-left desk lamp
      const lightBeam = ctx.createLinearGradient(0, 0, width * 0.75, height);
      lightBeam.addColorStop(0, 'rgba(245, 220, 175, 0.08)');
      lightBeam.addColorStop(0.4, 'rgba(214, 176, 122, 0.035)');
      lightBeam.addColorStop(1, 'rgba(248, 244, 238, 0)');
      ctx.fillStyle = lightBeam;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(width * 0.65, 0);
      ctx.lineTo(width * 0.95, height);
      ctx.lineTo(0, height * 0.85);
      ctx.closePath();
      ctx.fill();

      // Render floating dust particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Opacity pulsing
        p.opacity += p.pulse * p.pulseDirection;
        if (p.opacity > 0.6) p.pulseDirection = -1;
        if (p.opacity < 0.1) p.pulseDirection = 1;

        // Wrap around borders
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 169, 110, ${p.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(201, 169, 110, 0.4)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
});
