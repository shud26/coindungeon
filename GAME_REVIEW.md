# 코인던전 2D RPG 게임 MVP - 리뷰 요청

## 프로젝트 개요
- **프로젝트**: 코인던전 (coindungeon) - 한국어 크립토 교육 플랫폼
- **배포**: https://coindungeon.vercel.app
- **기술 스택**: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Phaser 3
- **목적**: 기존 퀘스트/퀴즈 학습 플랫폼에 도트풍 2D RPG 던전 탐험 모드 추가

## 스크린샷
```
┌─────────────────────────────────────────────┐
│  ← 🎮 던전 탐험                     XP 0   │
│ ┌─────────────────────────────────────────┐ │
│ │  🟧              NPC              🟧    │ │
│ │  ██████   ┌─────────────┐   ██████     │ │
│ │           │  🟩 NPC     │              │ │
│ │           └─────────────┘              │ │
│ │                                         │ │
│ │  ██████                     ██████     │ │
│ │                                         │ │
│ │                                         │ │
│ │                                         │ │
│ │           🟪 플레이어                   │ │
│ │  🟧   ██████         ██████   🟧      │ │
│ │           방향키 / WASD                 │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│       ▲                                E    │
│     ◀ ▼ ▶                                   │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ NPC(초록)에게 다가가 [E]를 누르면       │ │
│ │ 대화할 수 있어. 퀴즈를 맞추면 XP 획득! │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│  🏠홈  🗺던전  🎮탐험  📖학습  👤프로필   │
└─────────────────────────────────────────────┘
```

---

## 파일 구조

```
src/
├── app/game/
│   └── page.tsx              ← 게임 페이지 (client component)
├── components/game/
│   ├── PhaserGame.tsx        ← Phaser 캔버스 + 모바일 D-pad
│   └── QuestOverlay.tsx      ← NPC 대화 + 퀴즈 오버레이
└── lib/game/
    └── useGameProgress.ts    ← 기존 progress.ts 연동 훅
```

---

## 1. `src/app/game/page.tsx` (게임 페이지)

```tsx
'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, Gamepad2 } from 'lucide-react';
import { useGameProgress } from '@/lib/game/useGameProgress';
import QuestOverlay from '@/components/game/QuestOverlay';
import type { Quest, QuizQuestion } from '@/data/quests';

const PhaserGame = dynamic(() => import('@/components/game/PhaserGame'), {
  ssr: false,
  loading: () => (
    <div
      className="flex items-center justify-center rounded-xl border border-border"
      style={{ aspectRatio: '15/10', background: 'var(--bg-surface)' }}
    >
      <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
        로딩 중...
      </p>
    </div>
  ),
});

export default function GamePage() {
  const { progress, getQuizQuestion, handleCorrectAnswer } = useGameProgress();

  const [overlayOpen, setOverlayOpen] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<{
    quest: Quest;
    question: QuizQuestion;
  } | null>(null);
  const [toast, setToast] = useState('');

  const quizData = progress ? getQuizQuestion() : null;

  /* NPC interaction → snapshot current quiz */
  const handleNpcInteract = useCallback(() => {
    if (overlayOpen) return;
    setActiveQuiz(quizData);
    setOverlayOpen(true);
  }, [overlayOpen, quizData]);

  /* Correct answer → XP + toast */
  const handleCorrect = useCallback(
    (questId: number) => {
      handleCorrectAnswer(questId);
      setToast('클리어! XP +10');
      setTimeout(() => setToast(''), 3000);
    },
    [handleCorrectAnswer],
  );

  /* Close overlay */
  const handleClose = useCallback(() => {
    setOverlayOpen(false);
    setActiveQuiz(null);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}
    >
      <div className="mx-auto max-w-[480px] px-4 pt-3 pb-24">
        {/* Header */}
        <div className="mb-3 flex items-center gap-3">
          <Link href="/dungeon" className="transition-colors" style={{ color: 'var(--text-tertiary)' }}>
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-2">
            <Gamepad2 size={18} style={{ color: 'var(--accent)' }} />
            <h1 className="text-base font-bold">던전 탐험</h1>
          </div>
          {progress && (
            <span className="ml-auto text-xs" style={{ color: 'var(--text-tertiary)' }}>
              XP {progress.xp}
            </span>
          )}
        </div>

        {/* Game canvas + controls */}
        <PhaserGame onNpcInteract={handleNpcInteract} overlayOpen={overlayOpen} />

        {/* Help text */}
        <div className="glass-card mt-3 p-3">
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
            NPC(초록)에게 다가가 <kbd>E</kbd> 를 누르면 대화할 수 있어. 퀴즈를 맞추면 XP를 획득!
          </p>
        </div>
      </div>

      {/* Quest overlay */}
      <QuestOverlay
        visible={overlayOpen}
        onClose={handleClose}
        quest={activeQuiz?.quest ?? null}
        question={activeQuiz?.question ?? null}
        onCorrect={handleCorrect}
        allCleared={overlayOpen && activeQuiz === null && progress !== null}
      />

      {/* Toast */}
      {toast && (
        <div
          className="fixed left-1/2 top-8 z-[60] -translate-x-1/2 rounded-lg px-5 py-2.5 text-sm font-medium shadow-lg"
          style={{ background: 'var(--success)', color: '#fff' }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}
```

### 설계 의도
- `dynamic import`로 Phaser SSR 차단 (Next.js 서버 렌더링 방지)
- `activeQuiz` state로 퀴즈 데이터 스냅샷 (오버레이 열린 동안 데이터 변경 방지)
- `useCallback`으로 Phaser scene에 전달되는 콜백 안정화

---

## 2. `src/components/game/PhaserGame.tsx` (Phaser 캔버스)

```tsx
'use client';

import { useEffect, useRef, useCallback } from 'react';

/* ── Map Constants ─────────────────────────── */
const TILE = 32;
const COLS = 15;
const ROWS = 10;
const WIDTH = COLS * TILE; // 480
const HEIGHT = ROWS * TILE; // 320

// 0 = floor, 1 = wall
const DUNGEON_MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const NPC_COL = 7;
const NPC_ROW = 2;
const PLAYER_COL = 7;
const PLAYER_ROW = 7;
const SPEED = 120;
const NPC_RANGE = 48;

interface Props {
  onNpcInteract: () => void;
  overlayOpen: boolean;
}

export default function PhaserGame({ onNpcInteract, overlayOpen }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<any>(null);
  const callbackRef = useRef(onNpcInteract);
  const overlayRef = useRef(overlayOpen);
  const nearNpcRef = useRef(false);

  callbackRef.current = onNpcInteract;
  overlayRef.current = overlayOpen;

  const inputRef = useRef({
    up: false, down: false, left: false, right: false,
  });

  /* ── Phaser bootstrap (runs once) ────────── */
  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;

    const init = async () => {
      const Phaser = (await import('phaser')).default;
      if (cancelled) return;

      let player: any;
      let npc: any;
      let walls: any;
      let cursors: any;
      let wasd: any;
      let eKey: any;
      let promptText: any;

      class DungeonScene extends Phaser.Scene {
        constructor() { super({ key: 'Dungeon' }); }

        create() {
          // floor background
          this.add.rectangle(WIDTH / 2, HEIGHT / 2, WIDTH, HEIGHT, 0x1a1a2e);

          // tiles + walls (static physics group)
          walls = this.physics.add.staticGroup();
          for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
              const x = c * TILE + TILE / 2;
              const y = r * TILE + TILE / 2;
              if (DUNGEON_MAP[r][c] === 1) {
                const w = this.add.rectangle(x, y, TILE, TILE, 0x3f3f46);
                walls.add(w);
                (w.body as Phaser.Physics.Arcade.StaticBody).setSize(TILE, TILE);
              } else {
                this.add.rectangle(x, y, TILE - 1, TILE - 1, 0x18181b);
              }
            }
          }

          // torches (animated glow)
          for (const [tc, tr] of [[2,1],[12,1],[2,8],[12,8]]) {
            const tx = tc * TILE + TILE / 2;
            const ty = tr * TILE + TILE / 2;
            this.add.rectangle(tx, ty, 6, 6, 0xf59e0b);
            const glow = this.add.circle(tx, ty, 20, 0xf59e0b, 0.08);
            this.tweens.add({
              targets: glow, alpha: { from: 0.04, to: 0.14 },
              duration: 1200, yoyo: true, repeat: -1,
            });
          }

          // NPC (green, static body, idle bounce)
          const nx = NPC_COL * TILE + TILE / 2;
          const ny = NPC_ROW * TILE + TILE / 2;
          const npcBody = this.add.rectangle(0, 0, 24, 24, 0x22c55e);
          const npcLabel = this.add.text(0, -18, 'NPC', {
            fontSize: '9px', color: '#22c55e', fontFamily: 'monospace',
          }).setOrigin(0.5);
          npc = this.add.container(nx, ny, [npcBody, npcLabel]);
          this.physics.add.existing(npc, true);
          (npc.body as Phaser.Physics.Arcade.StaticBody).setSize(24, 24);
          this.tweens.add({
            targets: npc, y: ny - 3, duration: 1000,
            yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
          });

          // Player (indigo, dynamic body)
          const px = PLAYER_COL * TILE + TILE / 2;
          const py = PLAYER_ROW * TILE + TILE / 2;
          player = this.add.rectangle(px, py, 20, 20, 0x6366f1);
          this.physics.add.existing(player);
          const body = player.body as Phaser.Physics.Arcade.Body;
          body.setSize(20, 20);
          body.setCollideWorldBounds(true);

          // collisions
          this.physics.add.collider(player, walls);
          this.physics.add.collider(player, npc);

          // keyboard input
          cursors = this.input.keyboard!.createCursorKeys();
          wasd = {
            W: this.input.keyboard!.addKey('W'),
            A: this.input.keyboard!.addKey('A'),
            S: this.input.keyboard!.addKey('S'),
            D: this.input.keyboard!.addKey('D'),
          };
          eKey = this.input.keyboard!.addKey('E');

          // prompt text (bottom of canvas)
          promptText = this.add.text(WIDTH / 2, HEIGHT - 10, '', {
            fontSize: '10px', color: '#71717a', fontFamily: 'monospace',
          }).setOrigin(0.5).setDepth(10);

          this.physics.world.setBounds(0, 0, WIDTH, HEIGHT);
        }

        update() {
          if (!player) return;
          const body = player.body as Phaser.Physics.Arcade.Body;

          // pause when overlay open
          if (overlayRef.current) { body.setVelocity(0, 0); return; }

          // movement (keyboard + virtual D-pad)
          const inp = inputRef.current;
          let vx = 0, vy = 0;
          if (cursors.left.isDown || wasd.A.isDown || inp.left) vx = -SPEED;
          else if (cursors.right.isDown || wasd.D.isDown || inp.right) vx = SPEED;
          if (cursors.up.isDown || wasd.W.isDown || inp.up) vy = -SPEED;
          else if (cursors.down.isDown || wasd.S.isDown || inp.down) vy = SPEED;
          if (vx !== 0 && vy !== 0) { vx *= 0.707; vy *= 0.707; } // diagonal normalize
          body.setVelocity(vx, vy);

          // NPC proximity check
          const dist = Phaser.Math.Distance.Between(player.x, player.y, npc.x, npc.y);
          nearNpcRef.current = dist < NPC_RANGE;
          if (nearNpcRef.current) {
            promptText.setText('[E] 대화하기');
            promptText.setColor('#22c55e');
            if (Phaser.Input.Keyboard.JustDown(eKey)) { callbackRef.current(); }
          } else {
            promptText.setText('방향키 / WASD');
            promptText.setColor('#71717a');
          }
        }
      }

      const game = new Phaser.Game({
        type: Phaser.AUTO, width: WIDTH, height: HEIGHT,
        parent: containerRef.current!,
        backgroundColor: '#09090b',
        physics: { default: 'arcade', arcade: { gravity: { x: 0, y: 0 }, debug: false } },
        scene: DungeonScene,
        scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_HORIZONTALLY },
        pixelArt: true,
      });
      gameRef.current = game;
    };

    init();
    return () => { cancelled = true; gameRef.current?.destroy(true); gameRef.current = null; };
  }, []);

  /* ── Touch D-pad + E button ──────────────── */
  const hold = useCallback((dir: 'up'|'down'|'left'|'right') => { inputRef.current[dir] = true; }, []);
  const release = useCallback((dir: 'up'|'down'|'left'|'right') => { inputRef.current[dir] = false; }, []);
  const handleInteract = useCallback(() => {
    if (nearNpcRef.current && !overlayRef.current) callbackRef.current();
  }, []);

  return (
    <div>
      <div ref={containerRef} className="w-full overflow-hidden rounded-xl border border-border"
        style={{ aspectRatio: `${COLS}/${ROWS}` }} />
      <div className="mt-3 flex items-center justify-between px-4">
        <div className="grid grid-cols-3 gap-1">
          <div /><DPadBtn dir="up" label="▲" hold={hold} release={release} /><div />
          <DPadBtn dir="left" label="◀" hold={hold} release={release} />
          <DPadBtn dir="down" label="▼" hold={hold} release={release} />
          <DPadBtn dir="right" label="▶" hold={hold} release={release} />
        </div>
        <button onPointerDown={handleInteract}
          style={{ background: 'var(--bg-surface)', border: '2px solid var(--accent)', color: 'var(--accent)' }}
          className="flex h-14 w-14 items-center justify-center rounded-xl text-sm font-bold">E</button>
      </div>
    </div>
  );
}
```

### 핵심 설계
- **Phaser dynamic import**: SSR 방지, `cancelled` 플래그로 React Strict Mode 이중 실행 대응
- **Ref 기반 통신**: `callbackRef`, `overlayRef`, `nearNpcRef`, `inputRef`로 Phaser↔React 간 동기화
- **듀얼 입력**: 키보드(WASD/Arrow/E) + 모바일 터치(D-pad + E 버튼)
- **물리 엔진**: Arcade Physics로 벽 충돌, NPC 충돌 처리
- **대각선 이동**: 0.707 보정으로 대각선 속도 정규화

---

## 3. `src/components/game/QuestOverlay.tsx` (대화/퀴즈 오버레이)

```tsx
'use client';

import { useState, useEffect } from 'react';
import type { Quest, QuizQuestion } from '@/data/quests';

type Phase = 'dialog' | 'quiz' | 'correct' | 'wrong';

interface Props {
  visible: boolean;
  onClose: () => void;
  quest: Quest | null;
  question: QuizQuestion | null;
  onCorrect: (questId: number) => void;
  allCleared: boolean;
}

export default function QuestOverlay({ visible, onClose, quest, question, onCorrect, allCleared }: Props) {
  const [phase, setPhase] = useState<Phase>('dialog');

  useEffect(() => { if (visible) setPhase('dialog'); }, [visible]);

  if (!visible) return null;

  // 올클리어 시 별도 메시지
  if (allCleared) return <Backdrop><Panel>모든 퀘스트를 클리어했어!</Panel></Backdrop>;
  if (!quest || !question) return null;

  const handleAnswer = (idx: number) => {
    if (idx === question.correctIndex) {
      setPhase('correct');
      onCorrect(quest.id);  // XP +10, localStorage 저장
    } else {
      setPhase('wrong');
    }
  };

  // Phase별 UI:
  // 'dialog' → NPC 대화 + "퀴즈 시작" 버튼
  // 'quiz'   → 4지선다 퀴즈
  // 'correct'→ 정답! + 해설 + XP +10
  // 'wrong'  → 오답! + "다시 도전" 버튼
}
```

### 상태 흐름
```
NPC 근처 E → dialog → "퀴즈 시작" → quiz → 정답 → correct → "클리어!" → close
                                         → 오답 → wrong → "다시 도전" → quiz
```

---

## 4. `src/lib/game/useGameProgress.ts` (진행도 연동 훅)

```tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { loadProgress, saveProgress, updateStreak, completeQuest, type UserProgress } from '@/lib/progress';
import { quests, type Quest, type QuizQuestion } from '@/data/quests';

export function useGameProgress() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    const p = loadProgress();
    const updated = updateStreak(p);
    if (updated !== p) saveProgress(updated);
    setProgress(updated);
  }, []);

  // 다음 미완료 퀘스트(퀴즈 있는 것) 반환
  const getQuizQuestion = useCallback((): { quest: Quest; question: QuizQuestion } | null => {
    if (!progress) return null;
    for (const q of quests) {
      if (!progress.completedQuests.includes(q.id) && q.quiz && q.quiz.length > 0) {
        return { quest: q, question: q.quiz[0] };
      }
    }
    return null;
  }, [progress]);

  // 정답 시 퀘스트 완료 + XP 10 부여
  const handleCorrectAnswer = useCallback((questId: number) => {
    if (!progress) return;
    const updated = completeQuest(progress, questId, 10);
    saveProgress(updated);
    setProgress(updated);
  }, [progress]);

  return { progress, getQuizQuestion, handleCorrectAnswer };
}
```

### 기존 시스템과의 연동
- `loadProgress()` / `saveProgress()` — 기존 localStorage 로직 그대로 재사용
- `completeQuest()` — 기존 XP/레벨/스트릭 업데이트 함수 재사용
- 게임에서 얻은 XP가 프로필 페이지, 홈 페이지에도 동일하게 반영됨

---

## 기존 데이터 구조 (참고)

### Quest (src/data/quests.ts)
```ts
interface Quest {
  id: number;           // 1-30
  floor: number;        // 층
  slug: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xp: number;           // 50-200
  category: string;     // 기초, 지갑, 온체인, 트레이딩, 디파이, NFT
  steps: QuestStep[];
  quiz?: QuizQuestion[];
}

interface QuizQuestion {
  question: string;
  options: string[];     // 4지선다
  correctIndex: number;  // 정답 인덱스
  explanation: string;   // 해설
}
```

### UserProgress (src/lib/progress.ts)
```ts
interface UserProgress {
  completedQuests: number[];
  currentStep: Record<number, number>;
  xp: number;
  level: number;          // 1-10
  streak: number;
  lastActiveDate: string;
  quizScores: Record<number, number>;
}
```

---

## 빌드 결과
```
✓ Compiled successfully
✓ Generating static pages (78/78)  ← /game 추가됨 (77→78)
✓ ESLint 에러 없음
✓ TypeScript 에러 없음
```

---

## 리뷰 요청 사항

GPT에게 다음을 확인받고 싶습니다:

### 1. 아키텍처
- [ ] Phaser + Next.js(App Router) 통합 방식이 적절한가?
- [ ] dynamic import + cancelled 플래그로 SSR/Strict Mode 대응이 충분한가?
- [ ] Ref 기반 Phaser↔React 통신이 적절한가? (vs EventEmitter, vs Zustand)

### 2. 게임 디자인
- [ ] 던전 맵 레이아웃이 MVP로 충분한가?
- [ ] placeholder(단색 사각형)에서 스프라이트로 전환할 때 구조 변경이 큰가?
- [ ] 모바일 D-pad UX가 적절한가?

### 3. 진행도 시스템
- [ ] 기존 progress.ts 재사용 방식이 올바른가?
- [ ] 게임 XP(+10)와 퀘스트 XP(50-200)의 밸런스가 맞는가?
- [ ] completeQuest()로 퀘스트를 완료 처리하면 기존 퀘스트 페이지에서도 완료로 뜨는데, 이게 의도한 동작인가?

### 4. 확장성
- [ ] 다중 NPC, 다중 방(맵 전환)으로 확장할 때 구조가 적절한가?
- [ ] 아이템, 인벤토리 추가 시 고려할 점?
- [ ] 사운드 이펙트 추가 시 Phaser Audio vs Web Audio?

### 5. 코드 품질
- [ ] `any` 타입 사용 최소화 가능한가?
- [ ] useCallback 의존성 배열이 정확한가?
- [ ] 메모리 누수 가능성은 없는가? (Phaser destroy 처리)

---

## 다음 단계 (피드백 반영 후)

1. **스프라이트 교체**: 단색 사각형 → 도트 스프라이트 (16x16 또는 32x32)
2. **다중 방**: 맵 배열 확장, 문/포탈로 방 전환
3. **NPC 다양화**: 퀘스트별 NPC (카테고리별 다른 색/위치)
4. **사운드**: 이동, 대화, 정답/오답 효과음
5. **미니맵**: 현재 위치 표시
6. **보스 퀴즈**: 5문제 연속 + 보너스 XP
