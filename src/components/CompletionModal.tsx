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
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="card-elevated w-full max-w-sm p-8 text-center"
          >
            <p className="text-[13px] font-medium text-text-tertiary">Quest Clear</p>
            <h2 className="mt-2 text-lg font-semibold">{questTitle}</h2>

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5 inline-block rounded-xl bg-success-dim px-5 py-2 text-[14px] font-semibold text-success"
            >
              +{xpGained} XP
            </motion.div>

            {newLevel && levelTitle && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-3 rounded-xl bg-accent-dim px-4 py-2.5 text-[14px] font-medium text-accent"
              >
                Level {newLevel} — {levelTitle}
              </motion.div>
            )}

            <button
              onClick={onClose}
              className="mt-7 w-full rounded-xl bg-accent py-3 text-[14px] font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              계속하기
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
