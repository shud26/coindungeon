'use client';

import { useEffect, useRef, useCallback } from 'react';
import { getCharacter } from '@/lib/game/characters';

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

/*
 * Spritesheet frame layout (32x32 per frame, 3 cols x 4 rows = 12 frames):
 *   Row 0 (frames 0-2): walk-down
 *   Row 1 (frames 3-5): walk-left
 *   Row 2 (frames 6-8): walk-right
 *   Row 3 (frames 9-11): walk-up
 *
 * To scale sprite to 2x, change PLAYER_SCALE to 2.
 */
const PLAYER_SCALE = 0.75; /* 64x64 frame → 48px on screen (1.5 tiles, more visible) */

/* ── Component ─────────────────────────────── */
interface Props {
  characterKey: string;
  onNpcInteract: () => void;
  overlayOpen: boolean;
}

export default function PhaserGame({ characterKey, onNpcInteract, overlayOpen }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gameRef = useRef<any>(null);
  const callbackRef = useRef(onNpcInteract);
  const overlayRef = useRef(overlayOpen);
  const nearNpcRef = useRef(false);

  callbackRef.current = onNpcInteract;
  overlayRef.current = overlayOpen;

  const inputRef = useRef({
    up: false,
    down: false,
    left: false,
    right: false,
  });

  /* ── Phaser bootstrap (runs once) ────────── */
  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;

    /* Clear leftover canvas from StrictMode re-mount */
    containerRef.current.innerHTML = '';

    const charMeta = getCharacter(characterKey);

    const init = async () => {
      const Phaser = (await import('phaser')).default;
      if (cancelled) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let player: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let npc: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let walls: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let cursors: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let wasd: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let eKey: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let promptText: any;

      let useFallback = false;

      class DungeonScene extends Phaser.Scene {
        constructor() {
          super({ key: 'Dungeon' });
        }

        preload() {
          /* Try loading spritesheet — set fallback flag on error */
          this.load.spritesheet(charMeta.key, charMeta.spritePath, {
            frameWidth: charMeta.frameWidth,
            frameHeight: charMeta.frameHeight,
          });
          this.load.on('loaderror', () => {
            useFallback = true;
          });
        }

        create() {
          /* floor background */
          this.add.rectangle(WIDTH / 2, HEIGHT / 2, WIDTH, HEIGHT, 0x1a1a2e);

          /* tiles */
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

          /* torches */
          const torches = [
            [2, 1],
            [12, 1],
            [2, 8],
            [12, 8],
          ];
          for (const [tc, tr] of torches) {
            const tx = tc * TILE + TILE / 2;
            const ty = tr * TILE + TILE / 2;
            this.add.rectangle(tx, ty, 6, 6, 0xf59e0b);
            const glow = this.add.circle(tx, ty, 20, 0xf59e0b, 0.08);
            this.tweens.add({
              targets: glow,
              alpha: { from: 0.04, to: 0.14 },
              duration: 1200,
              yoyo: true,
              repeat: -1,
            });
          }

          /* NPC */
          const nx = NPC_COL * TILE + TILE / 2;
          const ny = NPC_ROW * TILE + TILE / 2;
          const npcBody = this.add.rectangle(0, 0, 24, 24, 0x22c55e);
          const npcLabel = this.add
            .text(0, -18, 'NPC', {
              fontSize: '9px',
              color: '#22c55e',
              fontFamily: 'monospace',
            })
            .setOrigin(0.5);
          npc = this.add.container(nx, ny, [npcBody, npcLabel]);
          this.physics.add.existing(npc, true);
          (npc.body as Phaser.Physics.Arcade.StaticBody).setSize(24, 24);
          this.tweens.add({
            targets: npc,
            y: ny - 3,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
          });

          /* ── Player ─────────────────── */
          const px = PLAYER_COL * TILE + TILE / 2;
          const py = PLAYER_ROW * TILE + TILE / 2;

          if (useFallback) {
            /* ▸ Fallback: colored rectangle */
            player = this.add.rectangle(px, py, 20, 20, charMeta.color);
            this.physics.add.existing(player);
            const body = player.body as Phaser.Physics.Arcade.Body;
            body.setSize(20, 20);
            body.setCollideWorldBounds(true);
          } else {
            /* ▸ Sprite with walk animations */
            player = this.physics.add.sprite(px, py, charMeta.key, 0);
            player.setScale(PLAYER_SCALE);
            const body = player.body as Phaser.Physics.Arcade.Body;
            /* Body size in unscaled frame coords; Phaser auto-applies scale */
            body.setSize(
              20 / PLAYER_SCALE,
              20 / PLAYER_SCALE,
            );
            body.setOffset(
              (charMeta.frameWidth - 20 / PLAYER_SCALE) / 2,
              (charMeta.frameHeight - 20 / PLAYER_SCALE) / 2,
            );
            body.setCollideWorldBounds(true);

            /* Walk animations (3 frames per direction, 8 fps) */
            const key = charMeta.key;
            this.anims.create({
              key: 'walk-down',
              frames: this.anims.generateFrameNumbers(key, { start: 0, end: 2 }),
              frameRate: 8,
              repeat: -1,
            });
            this.anims.create({
              key: 'walk-left',
              frames: this.anims.generateFrameNumbers(key, { start: 3, end: 5 }),
              frameRate: 8,
              repeat: -1,
            });
            this.anims.create({
              key: 'walk-right',
              frames: this.anims.generateFrameNumbers(key, { start: 6, end: 8 }),
              frameRate: 8,
              repeat: -1,
            });
            this.anims.create({
              key: 'walk-up',
              frames: this.anims.generateFrameNumbers(key, { start: 9, end: 11 }),
              frameRate: 8,
              repeat: -1,
            });
          }

          this.physics.add.collider(player, walls);
          this.physics.add.collider(player, npc);

          /* Input */
          cursors = this.input.keyboard!.createCursorKeys();
          wasd = {
            W: this.input.keyboard!.addKey('W'),
            A: this.input.keyboard!.addKey('A'),
            S: this.input.keyboard!.addKey('S'),
            D: this.input.keyboard!.addKey('D'),
          };
          eKey = this.input.keyboard!.addKey('E');

          /* Prompt text */
          promptText = this.add
            .text(WIDTH / 2, HEIGHT - 10, '', {
              fontSize: '10px',
              color: '#71717a',
              fontFamily: 'monospace',
            })
            .setOrigin(0.5)
            .setDepth(10);

          this.physics.world.setBounds(0, 0, WIDTH, HEIGHT);
        }

        update() {
          if (!player) return;
          const body = player.body as Phaser.Physics.Arcade.Body;

          /* pause when overlay open */
          if (overlayRef.current) {
            body.setVelocity(0, 0);
            if (!useFallback) player.anims?.stop();
            return;
          }

          /* movement */
          const inp = inputRef.current;
          let vx = 0;
          let vy = 0;
          if (cursors.left.isDown || wasd.A.isDown || inp.left) vx = -SPEED;
          else if (cursors.right.isDown || wasd.D.isDown || inp.right) vx = SPEED;
          if (cursors.up.isDown || wasd.W.isDown || inp.up) vy = -SPEED;
          else if (cursors.down.isDown || wasd.S.isDown || inp.down) vy = SPEED;
          if (vx !== 0 && vy !== 0) {
            vx *= 0.707;
            vy *= 0.707;
          }
          body.setVelocity(vx, vy);

          /* Walk animation (sprite only) */
          if (!useFallback) {
            if (vx < 0) player.anims.play('walk-left', true);
            else if (vx > 0) player.anims.play('walk-right', true);
            else if (vy < 0) player.anims.play('walk-up', true);
            else if (vy > 0) player.anims.play('walk-down', true);
            else {
              player.anims.stop();
              /* idle = first frame of last direction */
            }
          }

          /* NPC proximity */
          const dist = Phaser.Math.Distance.Between(
            player.x,
            player.y,
            npc.x,
            npc.y,
          );
          nearNpcRef.current = dist < NPC_RANGE;

          if (nearNpcRef.current) {
            promptText.setText('[E] 대화하기');
            promptText.setColor('#22c55e');
            if (Phaser.Input.Keyboard.JustDown(eKey)) {
              callbackRef.current();
            }
          } else {
            promptText.setText('방향키 / WASD');
            promptText.setColor('#71717a');
          }
        }
      }

      const game = new Phaser.Game({
        type: Phaser.AUTO,
        width: WIDTH,
        height: HEIGHT,
        parent: containerRef.current!,
        backgroundColor: '#09090b',
        physics: {
          default: 'arcade',
          arcade: { gravity: { x: 0, y: 0 }, debug: false },
        },
        scene: DungeonScene,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
        },
        pixelArt: true,
      });

      gameRef.current = game;
    };

    init();

    return () => {
      cancelled = true;
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, [characterKey]);

  /* ── Touch helpers ───────────────────────── */
  const hold = useCallback((dir: 'up' | 'down' | 'left' | 'right') => {
    inputRef.current[dir] = true;
  }, []);

  const release = useCallback((dir: 'up' | 'down' | 'left' | 'right') => {
    inputRef.current[dir] = false;
  }, []);

  const handleInteract = useCallback(() => {
    if (nearNpcRef.current && !overlayRef.current) {
      callbackRef.current();
    }
  }, []);

  const DPadBtn = ({
    dir,
    label,
  }: {
    dir: 'up' | 'down' | 'left' | 'right';
    label: string;
  }) => (
    <button
      className="flex h-11 w-11 items-center justify-center rounded-lg text-base select-none active:brightness-125"
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        color: 'var(--text-secondary)',
      }}
      onPointerDown={() => hold(dir)}
      onPointerUp={() => release(dir)}
      onPointerLeave={() => release(dir)}
      onContextMenu={(e) => e.preventDefault()}
    >
      {label}
    </button>
  );

  return (
    <div>
      {/* Canvas */}
      <div
        ref={containerRef}
        className="w-full overflow-hidden rounded-xl border border-border"
        style={{ aspectRatio: `${COLS}/${ROWS}` }}
      />

      {/* Virtual D-pad (mobile) */}
      <div className="mt-3 flex items-center justify-between px-4">
        <div className="grid grid-cols-3 gap-1">
          <div />
          <DPadBtn dir="up" label="▲" />
          <div />
          <DPadBtn dir="left" label="◀" />
          <DPadBtn dir="down" label="▼" />
          <DPadBtn dir="right" label="▶" />
        </div>
        <button
          className="flex h-14 w-14 items-center justify-center rounded-xl text-sm font-bold select-none active:brightness-125"
          style={{
            background: 'var(--bg-surface)',
            border: '2px solid var(--accent)',
            color: 'var(--accent)',
          }}
          onPointerDown={handleInteract}
          onContextMenu={(e) => e.preventDefault()}
        >
          E
        </button>
      </div>
    </div>
  );
}
