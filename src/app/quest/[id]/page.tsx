'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
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
    // Restore step progress
    if (p.currentStep[questId]) {
      setCurrentStep(p.currentStep[questId]);
      // Mark all previous steps as completed
      const completed = new Set<number>();
      for (let i = 0; i < p.currentStep[questId]; i++) {
        completed.add(i);
      }
      setCompletedSteps(completed);
    }
  }, [questId]);

  if (!quest) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-text-secondary">퀘스트를 찾을 수 없어요</div>
      </div>
    );
  }

  if (progress && !isQuestUnlocked(questId, progress.completedQuests)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="text-5xl">🔒</div>
        <h2 className="mt-4 text-xl font-bold">잠긴 퀘스트</h2>
        <p className="mt-2 text-center text-text-secondary">
          이전 퀘스트를 먼저 클리어해야 해!
        </p>
        <button
          onClick={() => router.push('/dungeon')}
          className="mt-6 rounded-lg bg-primary px-6 py-2.5 font-bold text-background"
        >
          던전으로 돌아가기
        </button>
      </div>
    );
  }

  if (progress && progress.completedQuests.includes(questId)) {
    return (
      <div className="mx-auto max-w-md px-4 pt-8">
        <div className="mb-6 rounded-2xl border border-success/30 bg-surface p-6 text-center">
          <div className="text-5xl">✅</div>
          <h2 className="mt-3 text-xl font-bold text-success">이미 클리어!</h2>
          <p className="mt-1 text-text-secondary">{quest.title}</p>
        </div>

        {/* Show steps for review */}
        <div className="space-y-4">
          {quest.steps.map((step, i) => (
            <div key={i} className="rounded-xl border border-border bg-surface p-4">
              <h4 className="font-bold text-success">✓ {step.title}</h4>
              <div className="mt-2 whitespace-pre-line text-sm text-text-secondary">
                {step.content}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => router.push('/dungeon')}
            className="flex-1 rounded-lg border border-border py-2.5 text-text-secondary"
          >
            던전으로
          </button>
          {questId < 10 && (
            <button
              onClick={() => router.push(`/quest/${questId + 1}`)}
              className="flex-1 rounded-lg bg-primary py-2.5 font-bold text-background"
            >
              다음 퀘스트
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

  function handleStepComplete() {
    if (!quest) return;
    const newCompleted = new Set(completedSteps);
    newCompleted.add(currentStep);
    setCompletedSteps(newCompleted);

    // Save step progress
    if (progress) {
      const updated = {
        ...progress,
        currentStep: { ...progress.currentStep, [questId]: currentStep + 1 },
      };
      saveProgress(updated);
      setProgress(updated);
    }

    // Auto-advance to next step
    if (currentStep < quest.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }

  function handleQuestComplete() {
    if (!progress || !quest) return;

    const oldLevel = getLevel(progress.xp).level;
    const updated = completeQuest(progress, questId, quest.xp);
    const newLevelInfo = getLevel(updated.xp);

    // Clean up currentStep
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
    <div className="mx-auto max-w-md px-4 pt-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.push('/dungeon')}
          className="mb-3 text-sm text-text-secondary hover:text-text-primary"
        >
          ← 던전으로
        </button>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{quest.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-primary/20 px-2 py-0.5 font-mono text-xs text-primary">
                {quest.floor}F
              </span>
              <span className="rounded bg-success/20 px-2 py-0.5 text-xs text-success">
                +{quest.xp} XP
              </span>
            </div>
            <h1 className="mt-1 text-xl font-bold">{quest.title}</h1>
          </div>
        </div>
      </div>

      {/* Step Progress */}
      <div className="mb-6 flex items-center gap-2">
        {quest.steps.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              completedSteps.has(i)
                ? 'bg-success'
                : i === currentStep
                ? 'bg-primary'
                : 'bg-surface'
            }`}
          />
        ))}
      </div>

      {/* Step Navigation Tabs */}
      <div className="mb-4 flex gap-2 overflow-x-auto">
        {quest.steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setCurrentStep(i)}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              i === currentStep
                ? 'bg-primary text-background'
                : completedSteps.has(i)
                ? 'bg-success/20 text-success'
                : 'bg-surface text-text-disabled'
            }`}
          >
            {completedSteps.has(i) ? '✓ ' : ''}
            {i + 1}. {s.title}
          </button>
        ))}
      </div>

      {/* Current Step */}
      <div className="mb-6 rounded-xl border border-border bg-surface p-5">
        <div className="mb-3 flex items-center gap-2">
          <span
            className={`rounded px-2 py-0.5 text-xs font-bold ${
              step.type === 'read'
                ? 'bg-primary/20 text-primary'
                : step.type === 'action'
                ? 'bg-warning/20 text-warning'
                : 'bg-success/20 text-success'
            }`}
          >
            {step.type === 'read' ? '📖 읽기' : step.type === 'action' ? '⚡ 실행' : '✅ 확인'}
          </span>
          <h3 className="text-lg font-bold">{step.title}</h3>
        </div>

        <div className="whitespace-pre-line text-sm leading-relaxed text-text-secondary">
          {step.content.split('\n').map((line, i) => {
            // Simple markdown-like bold
            const parts = line.split(/(\*\*[^*]+\*\*)/g);
            return (
              <span key={i}>
                {parts.map((part, j) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                      <strong key={j} className="text-text-primary">
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

        {/* Step complete button */}
        {!completedSteps.has(currentStep) && (
          <button
            onClick={handleStepComplete}
            className="mt-4 w-full rounded-lg border border-primary bg-primary/10 py-2.5 font-bold text-primary transition-colors hover:bg-primary/20"
          >
            {step.verifyText || '다음 단계로'}
          </button>
        )}

        {completedSteps.has(currentStep) && (
          <div className="mt-4 rounded-lg bg-success/10 py-2 text-center text-sm font-bold text-success">
            ✓ 완료됨
          </div>
        )}
      </div>

      {/* Quiz Section */}
      {allStepsComplete && needsQuiz && !quizDone && (
        <div className="mb-6">
          {!showQuiz ? (
            <button
              onClick={() => setShowQuiz(true)}
              className="w-full rounded-xl border border-warning/50 bg-surface p-5 text-center transition-all hover:bg-surface-hover"
            >
              <div className="text-3xl">📝</div>
              <h3 className="mt-2 text-lg font-bold text-warning">퀴즈 풀기</h3>
              <p className="text-sm text-text-secondary">배운 내용을 확인해보자!</p>
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

      {/* Complete Quest Button */}
      {canComplete && (
        <button
          onClick={handleQuestComplete}
          className="glow-success mb-6 w-full rounded-xl bg-success py-4 text-lg font-bold text-background transition-opacity hover:opacity-90"
        >
          🎉 퀘스트 완료! (+{quest.xp} XP)
        </button>
      )}

      {/* Completion Modal */}
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
