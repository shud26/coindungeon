'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, Zap, CheckCircle2, Lock, ChevronRight } from 'lucide-react';
import { getQuestById } from '@/data/quests';
import { loadProgress, saveProgress, completeQuest, isQuestUnlocked, getLevel } from '@/lib/progress';
import QuizBlock from '@/components/QuizBlock';
import CompletionModal from '@/components/CompletionModal';
import type { UserProgress } from '@/lib/progress';

const typeIcon = { read: BookOpen, action: Zap, verify: CheckCircle2 };
const typeLabel = { read: '읽기', action: '실행', verify: '확인' };

export default function QuestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const questId = parseInt(id, 10);
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
        <Lock size={20} className="text-text-quaternary" />
        <p className="mt-3 text-sm text-text-tertiary">이전 퀘스트를 먼저 클리어해야 해</p>
        <button onClick={() => router.push('/dungeon')} className="mt-4 text-sm text-accent">던전으로</button>
      </div>
    );
  }

  if (progress && progress.completedQuests.includes(questId)) {
    return (
      <>
        <button onClick={() => router.push('/dungeon')} className="flex items-center gap-1 text-sm text-text-tertiary hover:text-text-primary">
          <ArrowLeft size={14} /> 던전
        </button>
        <div className="mt-6 rounded-xl border border-border p-4 text-center">
          <p className="text-xs text-text-quaternary">클리어 완료</p>
          <p className="mt-1 text-sm font-semibold">{quest.title}</p>
        </div>
        <div className="mt-4 space-y-2">
          {quest.steps.map((s, i) => (
            <div key={i} className="rounded-lg border border-border p-3">
              <p className="text-xs font-medium text-text-tertiary">{s.title}</p>
              <div className="mt-1 whitespace-pre-line text-xs leading-relaxed text-text-secondary">{s.content}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <button onClick={() => router.push('/dungeon')} className="flex-1 rounded-lg border border-border py-2 text-sm text-text-tertiary">던전</button>
          {questId < 10 && (
            <button onClick={() => router.push(`/quest/${questId + 1}`)} className="flex-1 rounded-lg bg-accent py-2 text-sm font-semibold text-white">다음</button>
          )}
        </div>
      </>
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
      <button onClick={() => router.push('/dungeon')} className="flex items-center gap-1 text-sm text-text-tertiary hover:text-text-primary">
        <ArrowLeft size={14} /> 던전
      </button>

      {/* Header */}
      <div className="mt-4">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-mono text-accent">{quest.floor}F</span>
          <span className="text-text-quaternary">+{quest.xp} XP</span>
        </div>
        <h1 className="mt-1 text-lg font-bold tracking-tight">{quest.title}</h1>
      </div>

      {/* Progress dots */}
      <div className="mt-4 flex gap-1">
        {quest.steps.map((_, i) => (
          <div key={i} className={`h-0.5 flex-1 rounded-full transition-colors ${
            done.has(i) ? 'bg-success' : i === step ? 'bg-accent' : 'bg-bg-elevated'
          }`} />
        ))}
      </div>

      {/* Step tabs */}
      <div className="no-scrollbar mt-3 flex gap-1 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {quest.steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`shrink-0 rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
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
      <div className="mt-4 animate-in rounded-xl border border-border p-4">
        <div className="mb-2 flex items-center gap-1.5 text-xs text-text-quaternary">
          <Icon size={12} />
          <span>{typeLabel[cur.type]}</span>
          <span className="ml-auto font-mono">{step + 1}/{quest.steps.length}</span>
        </div>

        <h3 className="text-sm font-semibold">{cur.title}</h3>
        <div className="mt-2 whitespace-pre-line text-sm leading-relaxed text-text-secondary">
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
            className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-accent/20 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent-dim"
          >
            {cur.verifyText || '다음 단계'} <ChevronRight size={14} />
          </button>
        ) : (
          <div className="mt-4 rounded-lg bg-success-dim py-2 text-center text-xs font-medium text-success">완료</div>
        )}
      </div>

      {/* Quiz */}
      {allDone && hasQuiz && !quizDone && (
        <div className="mt-4">
          {!showQuiz ? (
            <button onClick={() => setShowQuiz(true)} className="w-full rounded-xl border border-border p-4 text-left transition-colors hover:border-border-hover">
              <p className="text-sm font-semibold">퀴즈</p>
              <p className="mt-0.5 text-xs text-text-tertiary">배운 내용 확인</p>
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
        </div>
      )}

      {/* Finish */}
      {canFinish && (
        <button onClick={finish} className="mt-4 w-full rounded-xl bg-accent py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90">
          퀘스트 완료 <span className="ml-1 opacity-70">+{quest.xp} XP</span>
        </button>
      )}

      <CompletionModal
        isOpen={modal}
        questTitle={quest.title}
        xpGained={quest.xp}
        newLevel={levelUp?.level}
        levelTitle={levelUp?.title}
        onClose={() => { setModal(false); router.push(questId < 10 ? `/quest/${questId + 1}` : '/dungeon'); }}
      />
    </>
  );
}
