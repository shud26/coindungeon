'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Zap, CheckCircle2, Lock, ChevronRight } from 'lucide-react';
import { getQuestById } from '@/data/quests';
import { loadProgress, saveProgress, completeQuest, isQuestUnlocked, getLevel } from '@/lib/progress';
import QuizBlock from '@/components/QuizBlock';
import CompletionModal from '@/components/CompletionModal';
import type { UserProgress } from '@/lib/progress';

const typeIcon = { read: BookOpen, action: Zap, verify: CheckCircle2 };
const typeLabel = { read: '읽기', action: '실행', verify: '확인' };

export default function QuestClient({ questId }: { questId: number }) {
  const router = useRouter();
  const quest = getQuestById(questId);

  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState<Set<number>>(new Set());
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizDone, setQuizDone] = useState(false);
  const [modal, setModal] = useState(false);
  const [levelUp, setLevelUp] = useState<{ level: number; title: string } | null>(null);

  useEffect(() => {
    const p = loadProgress();
    setProgress(p);
    if (p.currentStep[questId]) {
      setStep(p.currentStep[questId]);
      const s = new Set<number>();
      for (let i = 0; i < p.currentStep[questId]; i++) s.add(i);
      setDone(s);
    }
  }, [questId]);

  if (!quest) return <p className="text-center text-text-tertiary">퀘스트를 찾을 수 없어요</p>;

  if (progress && !isQuestUnlocked(questId, progress.completedQuests)) {
    return (
      <div className="flex flex-col items-center pt-20 text-center">
        <Lock size={22} className="text-text-quaternary" />
        <p className="mt-3 text-sm text-text-tertiary">이전 퀘스트를 먼저 클리어해야 해</p>
        <button onClick={() => router.push('/dungeon')} className="mt-4 text-sm font-medium text-accent">던전으로</button>
      </div>
    );
  }

  if (progress && progress.completedQuests.includes(questId)) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <button onClick={() => router.push('/dungeon')} className="flex items-center gap-1.5 text-sm text-text-tertiary hover:text-text-primary">
          <ArrowLeft size={15} /> 던전
        </button>
        <div className="mt-6 card p-5 text-center">
          <p className="text-xs text-text-quaternary">클리어 완료</p>
          <p className="mt-1.5 text-base font-semibold">{quest.title}</p>
        </div>
        <div className="mt-5 space-y-2.5">
          {quest.steps.map((s, i) => (
            <div key={i} className="card p-4">
              <p className="text-sm font-medium text-text-tertiary">{s.title}</p>
              <div className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-text-secondary">{s.content}</div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex gap-2.5">
          <button onClick={() => router.push('/dungeon')} className="flex-1 rounded-xl border border-border py-3 text-sm text-text-tertiary">던전</button>
          {questId < 30 && (
            <button onClick={() => router.push(`/quest/${questId + 1}`)} className="flex-1 rounded-xl bg-accent py-3 text-sm font-semibold text-white">다음</button>
          )}
        </div>
      </motion.div>
    );
  }

  const cur = quest.steps[step];
  const allDone = done.size === quest.steps.length;
  const hasQuiz = quest.quiz && quest.quiz.length > 0;
  const canFinish = allDone && (!hasQuiz || quizDone);
  const Icon = typeIcon[cur.type];

  function completeStep() {
    if (!quest) return;
    const next = new Set(done);
    next.add(step);
    setDone(next);
    if (progress) {
      const u = { ...progress, currentStep: { ...progress.currentStep, [questId]: step + 1 } };
      saveProgress(u);
      setProgress(u);
    }
    if (step < quest.steps.length - 1) setStep(step + 1);
  }

  function finish() {
    if (!progress || !quest) return;
    const oldLv = getLevel(progress.xp).level;
    const u = completeQuest(progress, questId, quest.xp);
    const { [questId]: _, ...rest } = u.currentStep;
    u.currentStep = rest;
    saveProgress(u);
    setProgress(u);
    const newLv = getLevel(u.xp);
    if (newLv.level > oldLv) setLevelUp({ level: newLv.level, title: newLv.title });
    setModal(true);
  }

  return (
    <>
      {/* Back */}
      <button onClick={() => router.push('/dungeon')} className="flex items-center gap-1.5 text-sm text-text-tertiary hover:text-text-primary">
        <ArrowLeft size={15} /> 던전
      </button>

      {/* Header */}
      <div className="mt-5">
        <div className="flex items-center gap-2.5 text-sm">
          <span className="font-semibold text-accent">{quest.floor}F</span>
          <span className="text-text-quaternary">+{quest.xp} XP</span>
        </div>
        <h1 className="mt-1.5 text-xl font-bold tracking-tight">{quest.title}</h1>
      </div>

      {/* Progress dots */}
      <div className="mt-5 flex gap-1.5">
        {quest.steps.map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${
            done.has(i) ? 'bg-success' : i === step ? 'bg-accent' : 'bg-bg-elevated'
          }`} />
        ))}
      </div>

      {/* Step tabs */}
      <div className="no-scrollbar mt-4 flex gap-1.5 overflow-x-auto">
        {quest.steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              i === step ? 'bg-accent text-white'
              : done.has(i) ? 'bg-success-dim text-success'
              : 'bg-bg-elevated text-text-quaternary'
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.2 }}
          className="mt-5 card p-5"
        >
          <div className="mb-3 flex items-center gap-2 text-xs text-text-quaternary">
            <Icon size={13} />
            <span>{typeLabel[cur.type]}</span>
            <span className="ml-auto">{step + 1}/{quest.steps.length}</span>
          </div>

          <h3 className="text-base font-semibold">{cur.title}</h3>
          <div className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-text-secondary">
            {cur.content.split('\n').map((line, i) => {
              const parts = line.split(/(\*\*[^*]+\*\*)/g);
              return (
                <span key={i}>
                  {parts.map((p, j) =>
                    p.startsWith('**') && p.endsWith('**')
                      ? <strong key={j} className="font-semibold text-text-primary">{p.slice(2, -2)}</strong>
                      : p
                  )}
                  {'\n'}
                </span>
              );
            })}
          </div>

          {!done.has(step) ? (
            <button
              onClick={completeStep}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-accent/20 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent-dim"
            >
              {cur.verifyText || '다음 단계'} <ChevronRight size={15} />
            </button>
          ) : (
            <div className="mt-5 rounded-xl bg-success-dim py-3 text-center text-sm font-medium text-success">완료</div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Quiz */}
      {allDone && hasQuiz && !quizDone && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5">
          {!showQuiz ? (
            <button onClick={() => setShowQuiz(true)} className="w-full card p-5 text-left transition-colors hover:border-border-hover">
              <p className="text-base font-semibold">퀴즈</p>
              <p className="mt-1 text-sm text-text-tertiary">배운 내용 확인</p>
            </button>
          ) : (
            <QuizBlock questions={quest.quiz!} onComplete={score => {
              setQuizDone(true);
              if (progress) {
                const u = { ...progress, quizScores: { ...progress.quizScores, [questId]: score } };
                saveProgress(u);
                setProgress(u);
              }
            }} />
          )}
        </motion.div>
      )}

      {/* Finish */}
      {canFinish && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <button onClick={finish} className="mt-5 w-full rounded-xl bg-accent py-3.5 text-sm font-semibold text-white">
            퀘스트 완료 <span className="ml-1 opacity-70">+{quest.xp} XP</span>
          </button>
        </motion.div>
      )}

      <CompletionModal
        isOpen={modal}
        questTitle={quest.title}
        xpGained={quest.xp}
        newLevel={levelUp?.level}
        levelTitle={levelUp?.title}
        onClose={() => { setModal(false); router.push(questId < 30 ? `/quest/${questId + 1}` : '/dungeon'); }}
      />
    </>
  );
}
