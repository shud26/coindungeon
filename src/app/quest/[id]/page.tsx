'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, Zap, CheckCircle2, Lock, ChevronRight, FileQuestion, ArrowRight } from 'lucide-react';
import { getQuestById } from '@/data/quests';
import {
  loadProgress,
  saveProgress,
  completeQuest,
  isQuestUnlocked,
  getLevel,
} from '@/lib/progress';
import QuizBlock from '@/components/QuizBlock';
import CompletionModal from '@/components/CompletionModal';
import type { UserProgress } from '@/lib/progress';

const stepTypeConfig = {
  read: { label: '읽기', Icon: BookOpen, color: 'text-primary', bg: 'bg-primary-dim' },
  action: { label: '실행', Icon: Zap, color: 'text-warning', bg: 'bg-warning-dim' },
  verify: { label: '확인', Icon: CheckCircle2, color: 'text-success', bg: 'bg-success-dim' },
};

export default function QuestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const questId = parseInt(id, 10);
  const quest = getQuestById(questId);

  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizDone, setQuizDone] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [levelUp, setLevelUp] = useState<{ level: number; title: string } | null>(null);

  useEffect(() => {
    const p = loadProgress();
    setProgress(p);
    if (p.currentStep[questId]) {
      setCurrentStep(p.currentStep[questId]);
      const completed = new Set<number>();
      for (let i = 0; i < p.currentStep[questId]; i++) {
        completed.add(i);
      }
      setCompletedSteps(completed);
    }
  }, [questId]);

  if (!quest) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-5">
        <p className="text-text-secondary">퀘스트를 찾을 수 없어요</p>
        <button
          onClick={() => router.push('/dungeon')}
          className="mt-4 text-sm text-primary"
        >
          던전으로 돌아가기
        </button>
      </div>
    );
  }

  if (progress && !isQuestUnlocked(questId, progress.completedQuests)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-dim">
          <Lock size={24} className="text-accent" />
        </div>
        <h2 className="mt-4 text-lg font-bold">잠긴 퀘스트</h2>
        <p className="mt-1 text-sm text-text-secondary">
          이전 퀘스트를 먼저 클리어해야 해
        </p>
        <button
          onClick={() => router.push('/dungeon')}
          className="mt-6 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-background"
        >
          던전으로
        </button>
      </div>
    );
  }

  // Already completed - review mode
  if (progress && progress.completedQuests.includes(questId)) {
    return (
      <div className="mx-auto max-w-md px-5 pt-8 pb-8">
        <button
          onClick={() => router.push('/dungeon')}
          className="mb-6 flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary"
        >
          <ArrowLeft size={14} /> 던전
        </button>

        <div className="mb-6 rounded-2xl border border-success/20 bg-surface p-5 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-success-dim">
            <CheckCircle2 size={20} className="text-success" />
          </div>
          <h2 className="mt-3 text-lg font-bold">{quest.title}</h2>
          <p className="mt-0.5 text-xs text-text-secondary">클리어 완료</p>
        </div>

        <div className="space-y-3">
          {quest.steps.map((step, i) => (
            <div key={i} className="rounded-xl border border-border bg-surface p-4">
              <h4 className="text-sm font-semibold text-success">{step.title}</h4>
              <div className="mt-2 whitespace-pre-line text-xs leading-relaxed text-text-secondary">
                {step.content}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-2.5">
          <button
            onClick={() => router.push('/dungeon')}
            className="flex-1 rounded-xl border border-border py-2.5 text-sm text-text-secondary"
          >
            던전으로
          </button>
          {questId < 10 && (
            <button
              onClick={() => router.push(`/quest/${questId + 1}`)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-sm font-semibold text-background"
            >
              다음 <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    );
  }

  const step = quest.steps[currentStep];
  const allStepsComplete = completedSteps.size === quest.steps.length;
  const needsQuiz = quest.quiz && quest.quiz.length > 0;
  const canComplete = allStepsComplete && (!needsQuiz || quizDone);
  const typeConfig = stepTypeConfig[step.type];

  function handleStepComplete() {
    if (!quest) return;
    const newCompleted = new Set(completedSteps);
    newCompleted.add(currentStep);
    setCompletedSteps(newCompleted);

    if (progress) {
      const updated = {
        ...progress,
        currentStep: { ...progress.currentStep, [questId]: currentStep + 1 },
      };
      saveProgress(updated);
      setProgress(updated);
    }

    if (currentStep < quest.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }

  function handleQuestComplete() {
    if (!progress || !quest) return;

    const oldLevel = getLevel(progress.xp).level;
    const updated = completeQuest(progress, questId, quest.xp);
    const newLevelInfo = getLevel(updated.xp);

    const { [questId]: _, ...restSteps } = updated.currentStep;
    updated.currentStep = restSteps;

    saveProgress(updated);
    setProgress(updated);

    if (newLevelInfo.level > oldLevel) {
      setLevelUp({ level: newLevelInfo.level, title: newLevelInfo.title });
    }

    setShowModal(true);
  }

  return (
    <div className="mx-auto max-w-md px-5 pt-8 pb-8">
      {/* Back */}
      <button
        onClick={() => router.push('/dungeon')}
        className="mb-6 flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary"
      >
        <ArrowLeft size={14} /> 던전
      </button>

      {/* Quest Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-primary-dim px-2 py-1 font-mono text-[11px] font-bold text-primary">
            {quest.floor}F
          </span>
          <span className="rounded-lg bg-success-dim px-2 py-1 font-mono text-[11px] font-bold text-success">
            +{quest.xp} XP
          </span>
        </div>
        <h1 className="mt-2 text-xl font-bold">{quest.title}</h1>
        <p className="mt-0.5 text-sm text-text-secondary">{quest.description}</p>
      </div>

      {/* Step Progress Dots */}
      <div className="mb-5 flex items-center gap-1.5">
        {quest.steps.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              completedSteps.has(i)
                ? 'bg-success'
                : i === currentStep
                ? 'bg-primary'
                : 'bg-surface-2'
            }`}
          />
        ))}
      </div>

      {/* Step Tabs */}
      <div className="no-scrollbar mb-5 flex gap-1.5 overflow-x-auto">
        {quest.steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setCurrentStep(i)}
            className={`flex shrink-0 items-center gap-1 rounded-lg px-3 py-1.5 text-[11px] font-medium transition-colors ${
              i === currentStep
                ? 'bg-primary text-background'
                : completedSteps.has(i)
                ? 'bg-success-dim text-success'
                : 'bg-surface-2 text-text-disabled'
            }`}
          >
            {completedSteps.has(i) && <CheckCircle2 size={10} />}
            {s.title}
          </button>
        ))}
      </div>

      {/* Current Step Content */}
      <div className="mb-5 rounded-2xl border border-border bg-surface p-5 animate-in">
        <div className="mb-3 flex items-center gap-2">
          <div className={`flex h-6 w-6 items-center justify-center rounded-md ${typeConfig.bg}`}>
            <typeConfig.Icon size={12} className={typeConfig.color} />
          </div>
          <span className={`text-[11px] font-medium ${typeConfig.color}`}>{typeConfig.label}</span>
          <span className="ml-auto text-[11px] text-text-disabled">
            {currentStep + 1}/{quest.steps.length}
          </span>
        </div>

        <h3 className="mb-3 text-[15px] font-semibold">{step.title}</h3>

        <div className="whitespace-pre-line text-sm leading-relaxed text-text-secondary">
          {step.content.split('\n').map((line, i) => {
            const parts = line.split(/(\*\*[^*]+\*\*)/g);
            return (
              <span key={i}>
                {parts.map((part, j) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                      <strong key={j} className="font-semibold text-text-primary">
                        {part.slice(2, -2)}
                      </strong>
                    );
                  }
                  return part;
                })}
                {i < step.content.split('\n').length - 1 && '\n'}
              </span>
            );
          })}
        </div>

        {/* Complete step button */}
        {!completedSteps.has(currentStep) && (
          <button
            onClick={handleStepComplete}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary-dim py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
          >
            {step.verifyText || '다음 단계'}
            <ChevronRight size={14} />
          </button>
        )}

        {completedSteps.has(currentStep) && (
          <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-success-dim py-2.5 text-sm font-medium text-success">
            <CheckCircle2 size={14} />
            완료
          </div>
        )}
      </div>

      {/* Quiz */}
      {allStepsComplete && needsQuiz && !quizDone && (
        <div className="mb-5">
          {!showQuiz ? (
            <button
              onClick={() => setShowQuiz(true)}
              className="flex w-full items-center gap-4 rounded-2xl border border-purple/20 bg-surface p-5 text-left transition-all hover:bg-surface-hover"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-dim">
                <FileQuestion size={20} className="text-purple" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-purple">퀴즈 풀기</h3>
                <p className="mt-0.5 text-xs text-text-secondary">배운 내용을 확인해보자</p>
              </div>
              <ChevronRight size={16} className="ml-auto text-text-disabled" />
            </button>
          ) : (
            <QuizBlock
              questions={quest.quiz!}
              onComplete={(score) => {
                setQuizDone(true);
                if (progress) {
                  const updated = {
                    ...progress,
                    quizScores: { ...progress.quizScores, [questId]: score },
                  };
                  saveProgress(updated);
                  setProgress(updated);
                }
              }}
            />
          )}
        </div>
      )}

      {/* Complete Button */}
      {canComplete && (
        <button
          onClick={handleQuestComplete}
          className="mb-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-success py-4 text-[15px] font-bold text-background transition-opacity hover:opacity-90"
        >
          퀘스트 완료
          <span className="rounded-full bg-background/20 px-2.5 py-0.5 text-xs font-semibold">
            +{quest.xp} XP
          </span>
        </button>
      )}

      {/* Modal */}
      <CompletionModal
        isOpen={showModal}
        questTitle={quest.title}
        xpGained={quest.xp}
        newLevel={levelUp?.level}
        levelTitle={levelUp?.title}
        onClose={() => {
          setShowModal(false);
          if (questId < 10) {
            router.push(`/quest/${questId + 1}`);
          } else {
            router.push('/dungeon');
          }
        }}
      />
    </div>
  );
}
