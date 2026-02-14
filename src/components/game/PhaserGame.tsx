'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { getCharacter } from '@/lib/game/characters';
import { getRoom, ROOM_ORDER } from '@/lib/game/rooms';
import type { RoomData } from '@/lib/game/rooms';

/* ── Constants ───────────────────────────────── */
const TILE = 32;
const COLS = 15;
const ROWS = 10;
const WIDTH = COLS * TILE;
const HEIGHT = ROWS * TILE;
const SPEED = 120;
const NPC_RANGE = 48;
const DOOR_RANGE = 20;

/* ── Component ───────────────────────────────── */
interface Props {
  characterKey: string;
  onNpcInteract: (roomId: string) => void;
  onRoomChange: (roomId: string) => void;
  checkDoorUnlocked: (targetRoomId: string) => boolean;
  overlayOpen: boolean;
}

export default function PhaserGame({
  characterKey,
  onNpcInteract,
  onRoomChange,
  checkDoorUnlocked,
  overlayOpen,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gameRef = useRef<any>(null);
  const callbackRef = useRef(onNpcInteract);
  const overlayRef = useRef(overlayOpen);
  const checkDoorRef = useRef(checkDoorUnlocked);
  const nearNpcRef = useRef(false);

  const [currentRoomId, setCurrentRoomId] = useState('lobby');
  const [coinCount, setCoinCount] = useState(0);
  const [coinFact, setCoinFact] = useState('');

  callbackRef.current = onNpcInteract;
  overlayRef.current = overlayOpen;
  checkDoorRef.current = checkDoorUnlocked;

  const inputRef = useRef({
    up: false,
    down: false,
    left: false,
    right: false,
  });

  /* Room transition ref (so Phaser scene can trigger React state) */
  const pendingRoomRef = useRef<{ roomId: string; spawnCol: number; spawnRow: number } | null>(null);

  /* ── Prevent arrow keys from scrolling page ── */
  useEffect(() => {
    const prevent = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', prevent, { passive: false });
    return () => window.removeEventListener('keydown', prevent);
  }, []);

  /* ── Re-focus canvas on click ──────────────── */
  const focusCanvas = useCallback(() => {
    const canvas = containerRef.current?.querySelector('canvas');
    if (canvas) (canvas as HTMLCanvasElement).focus();
  }, []);

  /* ── Phaser bootstrap ─────────────────────── */
  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;
    containerRef.current.innerHTML = '';

    const charMeta = getCharacter(characterKey);
    let currentRoom = getRoom(currentRoomId);

    const init = async () => {
      const Phaser = (await import('phaser')).default;
      if (cancelled) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let player: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let npcs: any[] = [];
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let coinGroup: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let doorZones: any[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let dustEmitter: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let fogRT: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let visionMask: any;

      let lastFootstep = 0;
      let spawnCol = currentRoom.playerSpawn.col;
      let spawnRow = currentRoom.playerSpawn.row;

      /* Check if there's a pending room transition */
      if (pendingRoomRef.current) {
        currentRoom = getRoom(pendingRoomRef.current.roomId);
        spawnCol = pendingRoomRef.current.spawnCol;
        spawnRow = pendingRoomRef.current.spawnRow;
        pendingRoomRef.current = null;
      }

      /* ── Helper: draw pixel art from 2D array ── */
      function drawPixelArt(
        scene: Phaser.Scene,
        pixels: (number | null)[][],
        cellSize: number,
      ): Phaser.GameObjects.Graphics {
        const gfx = scene.add.graphics();
        const rows = pixels.length;
        const cols = pixels[0]?.length ?? 0;
        const offsetX = -(cols * cellSize) / 2;
        const offsetY = -(rows * cellSize) / 2;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const color = pixels[r][c];
            if (color !== null) {
              gfx.fillStyle(color, 1);
              gfx.fillRect(offsetX + c * cellSize, offsetY + r * cellSize, cellSize, cellSize);
            }
          }
        }
        return gfx;
      }

      /* ── Helper: generate texture from pixel art ── */
      function generatePixelTexture(
        scene: Phaser.Scene,
        key: string,
        pixels: (number | null)[][],
        cellSize: number,
      ) {
        const gfx = scene.add.graphics();
        gfx.setVisible(false);
        const rows = pixels.length;
        const cols = pixels[0]?.length ?? 0;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const color = pixels[r][c];
            if (color !== null) {
              gfx.fillStyle(color, 1);
              gfx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
            }
          }
        }
        gfx.generateTexture(key, cols * cellSize, rows * cellSize);
        gfx.destroy();
      }

      class DungeonScene extends Phaser.Scene {
        constructor() {
          super({ key: 'Dungeon' });
        }

        preload() {
          /* Load sounds */
          this.load.audio('sfx-footstep', '/assets/sfx/footstep.wav');
          this.load.audio('sfx-talk', '/assets/sfx/talk.wav');
          this.load.audio('sfx-correct', '/assets/sfx/correct.wav');
          this.load.audio('sfx-coin', '/assets/sfx/coin.wav');
          this.load.audio('sfx-door', '/assets/sfx/door.wav');
        }

        create() {
          const theme = currentRoom.theme;

          /* ── Generate pixel-art textures ── */
          this.generateTileTextures(theme);

          /* ── Generate player texture from pixel art ── */
          generatePixelTexture(this, 'player-sprite', charMeta.pixels, 2);

          /* ── Floor background ──────────── */
          this.add.rectangle(WIDTH / 2, HEIGHT / 2, WIDTH, HEIGHT, theme.floor);

          /* ── Tiles (walls + floors) ────── */
          walls = this.physics.add.staticGroup();
          const map = currentRoom.map;

          for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
              const x = c * TILE + TILE / 2;
              const y = r * TILE + TILE / 2;

              if (map[r][c] === 1) {
                const hasFloorBelow = r < ROWS - 1 && map[r + 1]?.[c] === 0;
                const texKey = hasFloorBelow ? 'wall-face' : 'wall-top';
                this.add.image(x, y, texKey);

                const wallRect = this.add.zone(x, y, TILE, TILE);
                walls.add(wallRect);
                (wallRect.body as Phaser.Physics.Arcade.StaticBody).setSize(TILE, TILE);
              } else {
                const texKey = ((c + r) % 3 === 0) ? 'floor-alt' : 'floor-main';
                this.add.image(x, y, texKey);
              }
            }
          }

          /* ── Torches with particles ────── */
          const fireGfx = this.add.graphics();
          fireGfx.setVisible(false);
          fireGfx.fillStyle(0xffffff, 1);
          fireGfx.fillRect(0, 0, 3, 3);
          fireGfx.generateTexture('fire-px', 3, 3);
          fireGfx.destroy();

          for (const [tc, tr] of currentRoom.torches) {
            const tx = tc * TILE + TILE / 2;
            const ty = tr * TILE + TILE / 2;

            /* Torch holder */
            this.add.rectangle(tx, ty + 2, 4, 8, 0x6b4423);
            this.add.rectangle(tx, ty - 2, 6, 3, 0x8b5e34);

            /* Warm glow */
            const glow = this.add.circle(tx, ty - 4, 28, theme.torchColor, 0.06);
            this.tweens.add({
              targets: glow,
              alpha: { from: 0.04, to: 0.09 },
              scaleX: { from: 0.9, to: 1.1 },
              scaleY: { from: 0.9, to: 1.1 },
              duration: 1200 + Math.random() * 600,
              yoyo: true,
              repeat: -1,
            });

            /* Fire particles */
            this.add.particles(tx, ty - 6, 'fire-px', {
              speed: { min: 5, max: 25 },
              angle: { min: 250, max: 290 },
              scale: { start: 1, end: 0 },
              alpha: { start: 0.9, end: 0 },
              lifespan: 450,
              frequency: 100,
              quantity: 1,
              tint: [theme.torchColor, 0xffd700, 0xff6b35],
              blendMode: 'ADD',
            });
          }

          /* ── Doors ────────────────────── */
          doorZones = [];
          for (const door of currentRoom.doors) {
            const dx = door.col * TILE + TILE / 2;
            const dy = door.row * TILE + TILE / 2;

            /* Door frame */
            this.add.rectangle(dx, dy, TILE - 2, TILE - 2, theme.accent, 0.08);
            this.add.rectangle(dx, dy, TILE - 6, TILE - 6, theme.accent, 0.15);

            /* Door glow pulse */
            const doorGlow = this.add.rectangle(dx, dy, TILE, TILE, theme.accent, 0.2);
            this.tweens.add({
              targets: doorGlow,
              alpha: { from: 0.1, to: 0.35 },
              duration: 1200,
              yoyo: true,
              repeat: -1,
              ease: 'Sine.easeInOut',
            });

            /* Door label */
            const accentHex = '#' + theme.accent.toString(16).padStart(6, '0');
            this.add.text(dx, dy - 20, door.label, {
              fontSize: '8px',
              color: accentHex,
              fontFamily: 'system-ui, sans-serif',
              fontStyle: 'bold',
            }).setOrigin(0.5).setAlpha(0.85);

            /* Portal particles */
            this.add.particles(dx, dy, 'fire-px', {
              speed: { min: 8, max: 25 },
              angle: { min: 0, max: 360 },
              scale: { start: 0.7, end: 0 },
              alpha: { start: 0.5, end: 0 },
              lifespan: 700,
              frequency: 250,
              quantity: 1,
              tint: [theme.accent],
              blendMode: 'ADD',
              emitZone: {
                type: 'edge',
                source: new Phaser.Geom.Circle(0, 0, 10),
                quantity: 8,
              },
            });

            doorZones.push({ x: dx, y: dy, door });
          }

          /* ── Coins ────────────────────── */
          coinGroup = this.physics.add.staticGroup();
          for (const coin of currentRoom.coins) {
            const cx = coin.col * TILE + TILE / 2;
            const cy = coin.row * TILE + TILE / 2;

            /* Coin shadow */
            this.add.ellipse(cx, cy + 4, 10, 4, 0x000000, 0.15);

            /* Coin body */
            const coinSprite = this.add.circle(cx, cy, 5, 0xfbbf24);
            /* Inner highlight */
            this.add.circle(cx - 1, cy - 1, 2, 0xfde68a, 0.6);

            this.physics.add.existing(coinSprite, true);
            (coinSprite as unknown as { coinData: typeof coin }).coinData = coin;
            coinGroup.add(coinSprite);

            this.tweens.add({
              targets: coinSprite,
              y: cy - 2,
              duration: 800 + Math.random() * 400,
              yoyo: true,
              repeat: -1,
              ease: 'Sine.easeInOut',
            });
          }

          /* ── NPCs ─────────────────────── */
          npcs = [];
          for (let ni = 0; ni < currentRoom.npcs.length; ni++) {
            const npcData = currentRoom.npcs[ni];
            const nx = npcData.col * TILE + TILE / 2;
            const ny = npcData.row * TILE + TILE / 2;

            /* NPC pixel art body */
            const npcGfx = this.add.graphics();
            const nc = npcData.color;
            const ncDark = this.darkenColor(nc, 30);

            /* Shadow */
            npcGfx.fillStyle(0x000000, 0.2);
            npcGfx.fillEllipse(0, 12, 18, 6);

            /* Body */
            npcGfx.fillStyle(nc, 1);
            npcGfx.fillRect(-7, -2, 14, 14);
            npcGfx.fillStyle(ncDark, 1);
            npcGfx.fillRect(-7, 8, 14, 4);

            /* Head */
            npcGfx.fillStyle(0xf5c6a0, 1); // skin
            npcGfx.fillRect(-5, -10, 10, 9);

            /* Hair/hat */
            npcGfx.fillStyle(nc, 1);
            npcGfx.fillRect(-6, -13, 12, 5);
            npcGfx.fillStyle(ncDark, 1);
            npcGfx.fillRect(-6, -13, 12, 2);

            /* Eyes */
            npcGfx.fillStyle(0x1a1a2e, 1);
            npcGfx.fillRect(-3, -7, 2, 2);
            npcGfx.fillRect(2, -7, 2, 2);

            /* Mouth */
            npcGfx.fillStyle(0xd4a574, 1);
            npcGfx.fillRect(-1, -4, 3, 1);

            /* NPC label */
            const npcLabel = this.add.text(0, -19, npcData.label, {
              fontSize: '8px',
              color: '#' + npcData.color.toString(16).padStart(6, '0'),
              fontFamily: 'system-ui, sans-serif',
              fontStyle: 'bold',
            }).setOrigin(0.5);

            /* Interaction indicator */
            const indicator = this.add.text(0, -26, '!', {
              fontSize: '10px',
              color: '#fbbf24',
              fontFamily: 'system-ui, sans-serif',
              fontStyle: 'bold',
            }).setOrigin(0.5);
            this.tweens.add({
              targets: indicator,
              y: -29,
              alpha: { from: 1, to: 0.5 },
              duration: 600,
              yoyo: true,
              repeat: -1,
            });

            const npcContainer = this.add.container(nx, ny, [npcGfx, npcLabel, indicator]);
            this.physics.add.existing(npcContainer, true);
            (npcContainer.body as Phaser.Physics.Arcade.StaticBody).setSize(20, 24);

            /* Bob animation */
            this.tweens.add({
              targets: npcContainer,
              y: ny - 2,
              duration: 1200,
              yoyo: true,
              repeat: -1,
              ease: 'Sine.easeInOut',
            });

            npcs.push(npcContainer);
          }

          /* ── Player ───────────────────── */
          const px = spawnCol * TILE + TILE / 2;
          const py = spawnRow * TILE + TILE / 2;

          /* Draw player as pixel art container */
          const playerGfx = drawPixelArt(this, charMeta.pixels, 2);

          /* Player shadow */
          const playerShadow = this.add.ellipse(0, 14, 16, 5, 0x000000, 0.2);

          const playerContainer = this.add.container(px, py, [playerShadow, playerGfx]);
          this.physics.add.existing(playerContainer);
          player = playerContainer;

          const body = player.body as Phaser.Physics.Arcade.Body;
          body.setSize(16, 18);
          body.setOffset(-8, -6);
          body.setCollideWorldBounds(true);

          /* Player depth above floor/coins */
          player.setDepth(5);

          /* Colliders */
          this.physics.add.collider(player, walls);
          for (const n of npcs) {
            this.physics.add.collider(player, n);
          }

          /* Coin pickup */
          this.physics.add.overlap(player, coinGroup, (_p, coinObj) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data = (coinObj as any).coinData;
            coinObj.destroy();
            try { this.sound.play('sfx-coin', { volume: 0.4 }); } catch { /* */ }
            setCoinCount(prev => prev + 1);
            if (data?.fact) {
              setCoinFact(data.fact);
              setTimeout(() => setCoinFact(''), 2500);
            }
            /* Gold burst */
            const burst = this.add.particles(
              (coinObj as unknown as { x: number }).x,
              (coinObj as unknown as { y: number }).y,
              'fire-px',
              {
                speed: { min: 30, max: 80 },
                angle: { min: 0, max: 360 },
                scale: { start: 1.2, end: 0 },
                alpha: { start: 1, end: 0 },
                lifespan: 400,
                tint: [0xfbbf24, 0xfde68a],
                blendMode: 'ADD',
                emitting: false,
              },
            );
            burst.explode(10);
            this.time.delayedCall(500, () => burst.destroy());
          });

          /* ── Dust particles ─────────── */
          const dustGfx = this.add.graphics();
          dustGfx.setVisible(false);
          dustGfx.fillStyle(0xffffff, 1);
          dustGfx.fillRect(0, 0, 2, 2);
          dustGfx.generateTexture('dust-px', 2, 2);
          dustGfx.destroy();

          dustEmitter = this.add.particles(0, 0, 'dust-px', {
            speed: { min: 5, max: 20 },
            angle: { min: 200, max: 340 },
            scale: { start: 0.8, end: 0 },
            alpha: { start: 0.25, end: 0 },
            lifespan: 350,
            gravityY: -10,
            tint: theme.wallHighlight,
            emitting: false,
          });
          dustEmitter.setDepth(4);

          /* ── Fog of War ─────────────── */
          const visionGfx = this.add.graphics();
          visionGfx.setVisible(false);
          for (let i = 100; i > 0; i--) {
            const t = i / 100;
            const alpha = t * t;
            visionGfx.fillStyle(0xffffff, alpha);
            visionGfx.fillCircle(100, 100, i);
          }
          visionGfx.generateTexture('vision-circle', 200, 200);
          visionGfx.destroy();

          fogRT = this.add.renderTexture(0, 0, WIDTH, HEIGHT);
          fogRT.fill(0x000000, 0.85);
          fogRT.setDepth(50);

          visionMask = new Phaser.GameObjects.Image(this, px, py, 'vision-circle');
          visionMask.setScale(1.8);

          fogRT.mask = new Phaser.Display.Masks.BitmapMask(this, visionMask);
          fogRT.mask.invertAlpha = true;

          /* ── Input ──────────────────── */
          cursors = this.input.keyboard!.createCursorKeys();
          wasd = {
            W: this.input.keyboard!.addKey('W'),
            A: this.input.keyboard!.addKey('A'),
            S: this.input.keyboard!.addKey('S'),
            D: this.input.keyboard!.addKey('D'),
          };
          eKey = this.input.keyboard!.addKey('E');

          /* ── Prompt text ────────────── */
          promptText = this.add.text(WIDTH / 2, HEIGHT - 12, '', {
            fontSize: '10px',
            color: '#71717a',
            fontFamily: 'system-ui, sans-serif',
          }).setOrigin(0.5).setDepth(60);

          /* ── Room title (fade in) ───── */
          const accentHex = '#' + theme.accent.toString(16).padStart(6, '0');
          const roomTitle = this.add.text(WIDTH / 2, 22, currentRoom.theme.name, {
            fontSize: '13px',
            fontFamily: 'system-ui, sans-serif',
            fontStyle: 'bold',
            color: accentHex,
          }).setOrigin(0.5).setDepth(60).setAlpha(0);

          /* Background pill for room title */
          const titleBg = this.add.rectangle(
            WIDTH / 2, 22,
            roomTitle.width + 16, 20,
            0x000000, 0
          ).setDepth(59);

          this.tweens.add({
            targets: [roomTitle, titleBg],
            alpha: { from: 0, to: 0.9 },
            duration: 400,
            yoyo: true,
            hold: 2000,
            onComplete: () => {
              roomTitle?.setAlpha(0);
              titleBg?.setAlpha(0);
            },
          });

          /* Mini-map */
          this.drawMiniMap(theme.accent);

          this.physics.world.setBounds(0, 0, WIDTH, HEIGHT);

          /* Camera fade in */
          this.cameras.main.fadeIn(400, 0, 0, 0);
        }

        darkenColor(color: number, amount: number): number {
          const r = Math.max(0, ((color >> 16) & 0xff) - amount);
          const g = Math.max(0, ((color >> 8) & 0xff) - amount);
          const b = Math.max(0, (color & 0xff) - amount);
          return (r << 16) | (g << 8) | b;
        }

        generateTileTextures(t: typeof currentRoom.theme) {
          const S = TILE;

          const shift = (color: number, amount: number) => {
            const r = Math.min(255, Math.max(0, ((color >> 16) & 0xff) + amount));
            const g = Math.min(255, Math.max(0, ((color >> 8) & 0xff) + amount));
            const b = Math.min(255, Math.max(0, (color & 0xff) + amount));
            return (r << 16) | (g << 8) | b;
          };

          /* ── Wall front-face (brick pattern) ── */
          const wf = this.add.graphics();
          wf.fillStyle(t.wall, 1);
          wf.fillRect(0, 0, S, S);
          const brickH = 7;
          const mortar = shift(t.wall, -15);
          for (let row = 0; row < 5; row++) {
            const by = row * brickH;
            const offset = (row % 2) * (S / 2);
            wf.lineStyle(1, mortar, 0.5);
            wf.lineBetween(0, by, S, by);
            for (let bx = offset; bx < S; bx += S / 2) {
              wf.lineBetween(bx, by, bx, by + brickH);
            }
            wf.lineStyle(1, t.wallHighlight, 0.12);
            wf.lineBetween(0, by + 1, S, by + 1);
          }
          /* Top/bottom edge */
          wf.lineStyle(1, t.wallHighlight, 0.2);
          wf.lineBetween(0, 0, S, 0);
          wf.lineStyle(1, shift(t.wall, -20), 0.3);
          wf.lineBetween(0, S - 1, S, S - 1);
          /* Random detail */
          wf.lineStyle(1, shift(t.wall, -10), 0.15);
          wf.lineBetween(8, 10, 12, 14);
          wf.lineBetween(22, 3, 25, 6);
          wf.generateTexture('wall-face', S, S);
          wf.destroy();

          /* ── Wall top ── */
          const wt = this.add.graphics();
          const topColor = shift(t.wall, -12);
          wt.fillStyle(topColor, 1);
          wt.fillRect(0, 0, S, S);
          wt.lineStyle(1, shift(topColor, -10), 0.25);
          wt.lineBetween(0, S / 2, S, S / 2);
          wt.lineBetween(S / 3, 0, S / 3, S);
          wt.lineBetween(2 * S / 3, 0, 2 * S / 3, S);
          wt.fillStyle(shift(topColor, 8), 0.12);
          wt.fillRect(4, 4, 2, 2);
          wt.fillRect(20, 18, 2, 2);
          wt.fillRect(12, 26, 2, 2);
          wt.generateTexture('wall-top', S, S);
          wt.destroy();

          /* ── Floor main ── */
          const fm = this.add.graphics();
          fm.fillStyle(t.floor, 1);
          fm.fillRect(0, 0, S, S);
          fm.lineStyle(1, shift(t.floor, -8), 0.12);
          fm.strokeRect(1, 1, S - 2, S - 2);
          fm.lineStyle(1, shift(t.floor, -5), 0.06);
          fm.lineBetween(S / 2, 2, S / 2, S - 2);
          fm.lineBetween(2, S / 2, S - 2, S / 2);
          fm.fillStyle(shift(t.floor, 6), 0.08);
          fm.fillRect(6, 8, 1, 1);
          fm.fillRect(22, 14, 1, 1);
          fm.fillRect(14, 24, 1, 1);
          fm.generateTexture('floor-main', S, S);
          fm.destroy();

          /* ── Floor alternate ── */
          const fa = this.add.graphics();
          fa.fillStyle(t.floorAlt, 1);
          fa.fillRect(0, 0, S, S);
          fa.lineStyle(1, shift(t.floorAlt, -6), 0.1);
          fa.strokeRect(1, 1, S - 2, S - 2);
          fa.lineStyle(1, shift(t.floorAlt, -8), 0.08);
          fa.lineBetween(4, 4, 10, 10);
          fa.lineBetween(20, 8, 26, 14);
          fa.generateTexture('floor-alt', S, S);
          fa.destroy();
        }

        drawMiniMap(accent: number) {
          const baseX = WIDTH - 58;
          const baseY = 14;
          const boxW = 9;
          const boxH = 7;
          const gap = 2;

          const currentIdx = ROOM_ORDER.indexOf(currentRoom.id);

          /* Background pill */
          const totalW = ROOM_ORDER.length * (boxW + gap) - gap + 8;
          this.add.rectangle(baseX + totalW / 2 - 4, baseY, totalW, boxH + 8, 0x000000, 0.4)
            .setDepth(60);

          for (let i = 0; i < ROOM_ORDER.length; i++) {
            const rx = baseX + i * (boxW + gap);
            const ry = baseY;
            const isCurrent = i === currentIdx;
            const isPast = i < currentIdx;
            const color = isCurrent ? accent : isPast ? accent : 0x3f3f46;
            const alpha = isCurrent ? 1 : isPast ? 0.5 : 0.2;
            const rect = this.add.rectangle(rx, ry, boxW, boxH, color, alpha).setDepth(61);
            if (isCurrent) {
              rect.setStrokeStyle(1, 0xffffff, 0.4);
            }
          }
        }

        update(_time: number, _delta: number) {
          if (!player) return;
          const body = player.body as Phaser.Physics.Arcade.Body;

          /* Pause when overlay open */
          if (overlayRef.current) {
            body.setVelocity(0, 0);
            return;
          }

          /* Movement */
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

          const isMoving = vx !== 0 || vy !== 0;

          /* Dust particles when moving */
          if (isMoving && dustEmitter) {
            dustEmitter.emitParticleAt(player.x, player.y + 10, 1);
          }

          /* Footstep sound */
          if (isMoving) {
            const now = _time;
            if (now - lastFootstep > 280) {
              lastFootstep = now;
              try { this.sound.play('sfx-footstep', { volume: 0.12 }); } catch { /* */ }
            }
          }

          /* Update fog vision mask */
          if (visionMask) {
            visionMask.x = player.x;
            visionMask.y = player.y;
          }

          /* NPC proximity */
          let nearestNpc = false;
          for (const n of npcs) {
            const dist = Phaser.Math.Distance.Between(player.x, player.y, n.x, n.y);
            if (dist < NPC_RANGE) {
              nearestNpc = true;
              break;
            }
          }
          nearNpcRef.current = nearestNpc;

          /* Door proximity */
          let nearDoor: typeof doorZones[0] | null = null;
          for (const dz of doorZones) {
            const dist = Phaser.Math.Distance.Between(player.x, player.y, dz.x, dz.y);
            if (dist < DOOR_RANGE) {
              nearDoor = dz;
              break;
            }
          }

          /* Prompt text */
          if (nearestNpc) {
            promptText.setText('[E] 대화하기');
            promptText.setColor('#22c55e');
            if (Phaser.Input.Keyboard.JustDown(eKey)) {
              try { this.sound.play('sfx-talk', { volume: 0.3 }); } catch { /* */ }
              callbackRef.current(currentRoom.id);
            }
          } else if (nearDoor) {
            const unlocked = checkDoorRef.current(nearDoor.door.targetRoom);
            if (unlocked) {
              promptText.setText('[E] ' + nearDoor.door.label);
              promptText.setColor('#' + currentRoom.theme.accent.toString(16).padStart(6, '0'));
              if (Phaser.Input.Keyboard.JustDown(eKey)) {
                try { this.sound.play('sfx-door', { volume: 0.4 }); } catch { /* */ }
                this.cameras.main.fadeOut(350, 0, 0, 0);
                this.cameras.main.once('camerafadeoutcomplete', () => {
                  pendingRoomRef.current = {
                    roomId: nearDoor!.door.targetRoom,
                    spawnCol: nearDoor!.door.spawnCol,
                    spawnRow: nearDoor!.door.spawnRow,
                  };
                  onRoomChange(nearDoor!.door.targetRoom);
                  setCurrentRoomId(nearDoor!.door.targetRoom);
                });
              }
            } else {
              promptText.setText('퀴즈를 먼저 클리어하세요');
              promptText.setColor('#ef4444');
              if (Phaser.Input.Keyboard.JustDown(eKey)) {
                this.cameras.main.shake(200, 0.005);
              }
            }
          } else {
            promptText.setText('');
          }
        }
      }

      const game = new Phaser.Game({
        type: Phaser.AUTO,
        width: WIDTH,
        height: HEIGHT,
        parent: containerRef.current!,
        backgroundColor: '#0C0C0E',
        physics: {
          default: 'arcade',
          arcade: { gravity: { x: 0, y: 0 }, debug: false },
        },
        scene: DungeonScene,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
        },
        input: {
          keyboard: { target: window },
        },
        pixelArt: true,
        audio: { disableWebAudio: false },
      });

      gameRef.current = game;

      /* Auto-focus canvas */
      requestAnimationFrame(() => {
        const canvas = containerRef.current?.querySelector('canvas');
        if (canvas) {
          canvas.tabIndex = 0;
          canvas.style.outline = 'none';
          canvas.focus();
        }
      });
    };

    init();

    return () => {
      cancelled = true;
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterKey, currentRoomId]);

  /* ── Touch helpers ─────────────────────────── */
  const hold = useCallback((dir: 'up' | 'down' | 'left' | 'right') => {
    inputRef.current[dir] = true;
  }, []);

  const release = useCallback((dir: 'up' | 'down' | 'left' | 'right') => {
    inputRef.current[dir] = false;
  }, []);

  const handleInteract = useCallback(() => {
    if (nearNpcRef.current && !overlayRef.current) {
      callbackRef.current(currentRoomId);
    }
  }, [currentRoomId]);

  const DPadBtn = ({
    dir,
    label,
  }: {
    dir: 'up' | 'down' | 'left' | 'right';
    label: string;
  }) => (
    <button
      className="flex h-12 w-12 items-center justify-center rounded-xl text-base select-none active:brightness-125"
      style={{
        background: 'var(--bg-elevated)',
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
      {/* HUD */}
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
          {getRoom(currentRoomId).theme.name}
        </span>
        <div className="flex items-center gap-1.5">
          <span style={{ color: '#fbbf24', fontSize: '11px' }}>&#9679;</span>
          <span className="text-xs font-medium" style={{ color: '#fbbf24' }}>
            {coinCount}
          </span>
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        onClick={focusCanvas}
        className="w-full overflow-hidden rounded-xl border border-border"
        style={{ aspectRatio: `${COLS}/${ROWS}` }}
      />

      {/* Coin fact toast */}
      {coinFact && (
        <div
          className="mt-2 rounded-lg px-3 py-2 text-center text-xs font-medium"
          style={{
            background: 'rgba(251, 191, 36, 0.1)',
            color: '#fbbf24',
            border: '1px solid rgba(251, 191, 36, 0.2)',
          }}
        >
          {coinFact}
        </div>
      )}

      {/* Virtual D-pad (mobile) */}
      <div className="mt-3 flex items-center justify-between px-2">
        <div className="grid grid-cols-3 gap-1.5">
          <div />
          <DPadBtn dir="up" label="&#9650;" />
          <div />
          <DPadBtn dir="left" label="&#9664;" />
          <DPadBtn dir="down" label="&#9660;" />
          <DPadBtn dir="right" label="&#9654;" />
        </div>
        <button
          className="flex h-14 w-14 items-center justify-center rounded-xl text-sm font-bold select-none active:brightness-125"
          style={{
            background: 'var(--bg-elevated)',
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
