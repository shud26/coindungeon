'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  isOpen: boolean;
  questTitle: string;
  xpGained: number;
  newLevel?: number;
  levelTitle?: string;
  onClose: () => void;
}

export default function CompletionModal({ isOpen, questTitle, xpGained, newLevel, levelTitle, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full max-w-sm rounded-2xl border border-border bg-bg-surface p-7 text-center"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-text-tertiary">Quest Clear</p>
            <h2 className="mt-3 text-lg font-semibold">{questTitle}</h2>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5 inline-block rounded-full bg-success-dim px-5 py-2 text-sm font-semibold text-success"
            >
              +{xpGained} XP
            </motion.div>

            {newLevel && levelTitle && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-3 rounded-xl border border-accent/20 bg-accent-dim px-4 py-2.5 text-sm font-medium text-accent"
              >
                Level {newLevel} — {levelTitle}
              </motion.div>
            )}

            <button
              onClick={onClose}
              className="mt-6 w-full rounded-xl bg-accent py-3 text-sm font-semibold text-white"
            >
              계속하기
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
