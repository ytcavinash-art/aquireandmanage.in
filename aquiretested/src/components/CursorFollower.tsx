import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

export default function CursorFollower() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const pointerX = useMotionValue(-40);
  const pointerY = useMotionValue(-40);
  const x = useSpring(pointerX, { stiffness: 380, damping: 30, mass: 0.45 });
  const y = useSpring(pointerY, { stiffness: 380, damping: 30, mass: 0.45 });

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateEnabled = () => setEnabled(finePointer.matches && !reduceMotion);
    updateEnabled();
    finePointer.addEventListener('change', updateEnabled);
    return () => finePointer.removeEventListener('change', updateEnabled);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return;

    const move = (event: PointerEvent) => {
      pointerX.set(event.clientX - 7);
      pointerY.set(event.clientY - 7);
      setVisible(true);
      const target = event.target as HTMLElement | null;
      setInteractive(Boolean(target?.closest('a, button, input, textarea, select, [role="button"], [role="link"]')));
    };
    const hide = () => setVisible(false);

    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('mouseleave', hide);
    window.addEventListener('blur', hide);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('mouseleave', hide);
      window.removeEventListener('blur', hide);
    };
  }, [enabled, pointerX, pointerY]);

  if (!enabled) return null;

  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[120] h-3.5 w-3.5 rounded-full border border-white/80 bg-crimson shadow-[0_0_0_3px_rgba(235,31,84,0.18)] mix-blend-difference"
      style={{ x, y }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: interactive ? 1.75 : 1,
      }}
      transition={{ opacity: { duration: 0.15 }, scale: { duration: 0.2, ease: 'easeOut' } }}
    />
  );
}
