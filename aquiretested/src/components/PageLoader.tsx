import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export default function PageLoader() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => {
    if (window.matchMedia('(max-width: 767px), (prefers-reduced-motion: reduce)').matches) return false;
    try {
      return sessionStorage.getItem('am-loader-seen') !== 'true';
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!visible) return;
    const timeout = window.setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem('am-loader-seen', 'true');
      } catch {
        // Loader can still dismiss when storage is unavailable.
      }
    }, reduceMotion ? 100 : 900);
    return () => window.clearTimeout(timeout);
  }, [reduceMotion, visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          role="status"
          aria-label="Loading A&M Advisory"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.45 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-[#071331]"
        >
          <div className="w-full max-w-xs px-8 text-center">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.88, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="mx-auto grid h-24 w-44 place-items-center"
            >
              <img src="/a&mwhitelogo.png" alt="A&M Advisory" className="max-h-20 max-w-full object-contain" />
            </motion.div>

            <div className="relative mx-auto mt-7 h-12 w-full" aria-hidden="true">
              <div className="absolute bottom-2 left-0 right-0 h-px bg-white/15" />
              <motion.div
                initial={reduceMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.25, delay: 0.2, ease: 'easeInOut' }}
                className="absolute bottom-2 left-0 right-0 h-0.5 origin-left bg-gradient-to-r from-crimson via-[#ff6985] to-white"
              />

              {[8, 30, 57, 78].map((left, index) => (
                <motion.span
                  key={left}
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: `${18 + index * 7}px`, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.35 + index * 0.18 }}
                  className="absolute bottom-2 w-4 border-x border-t border-white/45 bg-white/[0.04]"
                  style={{ left: `${left}%` }}
                >
                  <span className="absolute left-1/2 top-1.5 h-1 w-1 -translate-x-1/2 bg-[#ff6985]" />
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-3 text-[10px] font-bold uppercase tracking-[0.28em] text-white/55"
            >
              Building trusted redevelopment
            </motion.p>
          </div>
          <span className="sr-only">Loading…</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
