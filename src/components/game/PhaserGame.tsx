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
const PLAYER_SCALE = 0.75;

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
      let roomTitle: any;
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

      let useFallback = false;
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

      class DungeonScene extends Phaser.Scene {
        constructor() {
          super({ key: 'Dungeon' });
        }

        preload() {
          this.load.spritesheet(charMeta.key, charMeta.spritePath, {
            frameWidth: charMeta.frameWidth,
            frameHeight: charMeta.frameHeight,
          });
          this.load.on('loaderror', () => {
            useFallback = true;
          });
          /* Load sounds */
          this.load.audio('sfx-footstep', '/assets/sfx/footstep.wav');
          this.load.audio('sfx-talk', '/assets/sfx/talk.wav');
          this.load.audio('sfx-correct', '/assets/sfx/correct.wav');
          this.load.audio('sfx-coin', '/assets/sfx/coin.wav');
          this.load.audio('sfx-door', '/assets/sfx/door.wav');
        }

        create() {
          const theme = currentRoom.theme;

          /* ── Floor background ──────────── */
          this.add.rectangle(WIDTH / 2, HEIGHT / 2, WIDTH, HEIGHT, theme.floor);

          /* ── Tiles (brick walls + varied floors) */
          walls = this.physics.add.staticGroup();
          const map = currentRoom.map;

          for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
              const x = c * TILE + TILE / 2;
              const y = r * TILE + TILE / 2;

              if (map[r][c] === 1) {
                /* ▸ Brick-pattern wall */
                const gfx = this.add.graphics();
                gfx.fillStyle(theme.wall, 1);
                gfx.fillRect(c * TILE, r * TILE, TILE, TILE);
                /* brick lines */
                gfx.lineStyle(1, theme.wallHighlight, 0.3);
                gfx.strokeRect(c * TILE + 1, r * TILE + 1, TILE - 2, TILE / 2 - 1);
                gfx.strokeRect(c * TILE + TILE / 2, r * TILE + TILE / 2, TILE / 2 - 1, TILE / 2 - 1);
                gfx.strokeRect(c * TILE + 1, r * TILE + TILE / 2, TILE / 2 - 1, TILE / 2 - 1);
                /* top edge highlight */
                gfx.lineStyle(1, theme.wallHighlight, 0.15);
                gfx.lineBetween(c * TILE, r * TILE, c * TILE + TILE, r * TILE);

                const wallRect = this.add.zone(x, y, TILE, TILE);
                walls.add(wallRect);
                (wallRect.body as Phaser.Physics.Arcade.StaticBody).setSize(TILE, TILE);
              } else {
                /* ▸ Floor tile with subtle variation */
                const floorColor = ((c + r) % 3 === 0) ? theme.floorAlt : theme.floor;
                const tile = this.add.rectangle(x, y, TILE - 1, TILE - 1, floorColor);
                /* subtle grid line */
                tile.setStrokeStyle(0.5, theme.wallHighlight, 0.06);
              }
            }
          }

          /* ── Torches with particles ────── */
          /* Create fire pixel texture */
          const fireGfx = this.add.graphics();
          fireGfx.setVisible(false);
          fireGfx.fillStyle(0xffffff, 1);
          fireGfx.fillRect(0, 0, 3, 3);
          fireGfx.generateTexture('fire-px', 3, 3);
          fireGfx.destroy();

          for (const [tc, tr] of currentRoom.torches) {
            const tx = tc * TILE + TILE / 2;
            const ty = tr * TILE + TILE / 2;

            /* Outer glow */
            const outerGlow = this.add.circle(tx, ty, 40, theme.torchColor, 0.04);
            this.tweens.add({
              targets: outerGlow,
              alpha: { from: 0.02, to: 0.07 },
              scaleX: { from: 0.9, to: 1.1 },
              scaleY: { from: 0.9, to: 1.1 },
              duration: 1500,
              yoyo: true,
              repeat: -1,
            });

            /* Inner glow */
            const innerGlow = this.add.circle(tx, ty, 18, theme.torchColor, 0.15);
            this.tweens.add({
              targets: innerGlow,
              alpha: { from: 0.1, to: 0.22 },
              duration: 700 + Math.random() * 400,
              yoyo: true,
              repeat: -1,
            });

            /* Torch base */
            this.add.rectangle(tx, ty, 4, 6, theme.torchColor);

            /* Fire particles */
            this.add.particles(tx, ty - 4, 'fire-px', {
              speed: { min: 5, max: 20 },
              angle: { min: 250, max: 290 },
              scale: { start: 1, end: 0 },
              alpha: { start: 0.8, end: 0 },
              lifespan: 500,
              frequency: 120,
              quantity: 1,
              tint: [theme.torchColor, 0xffffff],
              blendMode: 'ADD',
            });
          }

          /* ── Doors ────────────────────── */
          doorZones = [];
          for (const door of currentRoom.doors) {
            const dx = door.col * TILE + TILE / 2;
            const dy = door.row * TILE + TILE / 2;

            /* Door visual */
            const doorGlow = this.add.rectangle(dx, dy, TILE, TILE, theme.accent, 0.3);
            this.tweens.add({
              targets: doorGlow,
              alpha: { from: 0.15, to: 0.4 },
              duration: 1000,
              yoyo: true,
              repeat: -1,
            });
            /* Door label */
            this.add.text(dx, dy - 20, door.label, {
              fontSize: '7px',
              color: '#' + theme.accent.toString(16).padStart(6, '0'),
              fontFamily: 'monospace',
            }).setOrigin(0.5).setAlpha(0.8);

            /* Portal particles */
            this.add.particles(dx, dy, 'fire-px', {
              speed: { min: 10, max: 30 },
              angle: { min: 0, max: 360 },
              scale: { start: 0.8, end: 0 },
              alpha: { start: 0.6, end: 0 },
              lifespan: 800,
              frequency: 200,
              quantity: 1,
              tint: [theme.accent],
              blendMode: 'ADD',
              emitZone: {
                type: 'edge',
                source: new Phaser.Geom.Circle(0, 0, 12),
                quantity: 8,
              },
            });

            doorZones.push({ x: dx, y: dy, door });
          }

          /* ── Coins ────────────────────── */
          coinGroup = this.physics.add.group();
          for (const coin of currentRoom.coins) {
            const cx = coin.col * TILE + TILE / 2;
            const cy = coin.row * TILE + TILE / 2;
            const coinSprite = this.add.circle(cx, cy, 5, 0xfbbf24);
            this.physics.add.existing(coinSprite, true);
            (coinSprite as unknown as { coinData: typeof coin }).coinData = coin;
            coinGroup.add(coinSprite);
            /* Sparkle */
            this.tweens.add({
              targets: coinSprite,
              alpha: { from: 0.5, to: 1 },
              scaleX: { from: 0.8, to: 1.2 },
              scaleY: { from: 0.8, to: 1.2 },
              duration: 600 + Math.random() * 400,
              yoyo: true,
              repeat: -1,
            });
          }

          /* ── NPCs ─────────────────────── */
          npcs = [];
          for (const npcData of currentRoom.npcs) {
            const nx = npcData.col * TILE + TILE / 2;
            const ny = npcData.row * TILE + TILE / 2;

            const npcBody = this.add.rectangle(0, 0, 24, 24, npcData.color);
            const npcLabel = this.add.text(0, -18, npcData.label, {
              fontSize: '8px',
              color: '#' + npcData.color.toString(16).padStart(6, '0'),
              fontFamily: 'monospace',
            }).setOrigin(0.5);

            const npcContainer = this.add.container(nx, ny, [npcBody, npcLabel]);
            this.physics.add.existing(npcContainer, true);
            (npcContainer.body as Phaser.Physics.Arcade.StaticBody).setSize(24, 24);

            /* Bob animation */
            this.tweens.add({
              targets: npcContainer,
              y: ny - 3,
              duration: 1000,
              yoyo: true,
              repeat: -1,
              ease: 'Sine.easeInOut',
            });

            /* NPC sparkle particles */
            this.add.particles(nx, ny, 'fire-px', {
              speed: { min: 3, max: 15 },
              angle: { min: 0, max: 360 },
              scale: { start: 0.8, end: 0 },
              alpha: { start: 0.5, end: 0 },
              lifespan: 800,
              frequency: 400,
              quantity: 1,
              tint: [npcData.color],
              blendMode: 'ADD',
            });

            npcs.push(npcContainer);
          }

          /* ── Player ───────────────────── */
          const px = spawnCol * TILE + TILE / 2;
          const py = spawnRow * TILE + TILE / 2;

          if (useFallback) {
            player = this.add.rectangle(px, py, 20, 20, charMeta.color);
            this.physics.add.existing(player);
            const body = player.body as Phaser.Physics.Arcade.Body;
            body.setSize(20, 20);
            body.setCollideWorldBounds(true);
          } else {
            player = this.physics.add.sprite(px, py, charMeta.key, 0);
            player.setScale(PLAYER_SCALE);
            const body = player.body as Phaser.Physics.Arcade.Body;
            body.setSize(20 / PLAYER_SCALE, 20 / PLAYER_SCALE);
            body.setOffset(
              (charMeta.frameWidth - 20 / PLAYER_SCALE) / 2,
              (charMeta.frameHeight - 20 / PLAYER_SCALE) / 2,
            );
            body.setCollideWorldBounds(true);

            const key = charMeta.key;
            if (!this.anims.exists('walk-down')) {
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
          }

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
            burst.explode(8);
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
            alpha: { start: 0.3, end: 0 },
            lifespan: 350,
            gravityY: -10,
            tint: theme.wallHighlight,
            emitting: false,
          });
          dustEmitter.setDepth(4);

          /* ── Fog of War ─────────────── */
          const visionGfx = this.add.graphics();
          visionGfx.setVisible(false);
          /* Sharp radial gradient: bright center, dark edges */
          for (let i = 100; i > 0; i--) {
            const t = i / 100;
            const alpha = t * t; /* quadratic falloff = sharper edge */
            visionGfx.fillStyle(0xffffff, alpha);
            visionGfx.fillCircle(100, 100, i);
          }
          visionGfx.generateTexture('vision-circle', 200, 200);
          visionGfx.destroy();

          fogRT = this.add.renderTexture(0, 0, WIDTH, HEIGHT);
          fogRT.fill(0x000000, 0.88);
          fogRT.setDepth(50);

          /* Create mask image without adding to display list */
          visionMask = new Phaser.GameObjects.Image(this, px, py, 'vision-circle');
          visionMask.setScale(1.6);

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
          promptText = this.add.text(WIDTH / 2, HEIGHT - 10, '', {
            fontSize: '10px',
            color: '#71717a',
            fontFamily: 'monospace',
          }).setOrigin(0.5).setDepth(60);

          /* ── Room title (fade in) ───── */
          roomTitle = this.add.text(WIDTH / 2, 20, currentRoom.theme.name, {
            fontSize: '12px',
            fontFamily: 'monospace',
            color: '#' + theme.accent.toString(16).padStart(6, '0'),
          }).setOrigin(0.5).setDepth(60).setAlpha(0);

          this.tweens.add({
            targets: roomTitle,
            alpha: { from: 0, to: 0.9 },
            duration: 500,
            yoyo: true,
            hold: 1500,
            onComplete: () => roomTitle?.setAlpha(0),
          });

          /* Mini-map indicator */
          this.drawMiniMap(theme.accent);

          this.physics.world.setBounds(0, 0, WIDTH, HEIGHT);

          /* Camera fade in */
          this.cameras.main.fadeIn(400, 0, 0, 0);
        }

        drawMiniMap(accent: number) {
          const baseX = WIDTH - 52;
          const baseY = 12;
          const boxW = 8;
          const boxH = 6;
          const gap = 2;

          const currentIdx = ROOM_ORDER.indexOf(currentRoom.id);

          for (let i = 0; i < ROOM_ORDER.length; i++) {
            const rx = baseX + i * (boxW + gap);
            const ry = baseY;
            const isCurrent = i === currentIdx;
            const color = isCurrent ? accent : 0x3f3f46;
            const alpha = isCurrent ? 0.9 : 0.3;
            this.add.rectangle(rx, ry, boxW, boxH, color, alpha).setDepth(60);
          }
        }

        update(_time: number, _delta: number) {
          if (!player) return;
          const body = player.body as Phaser.Physics.Arcade.Body;

          /* Pause when overlay open */
          if (overlayRef.current) {
            body.setVelocity(0, 0);
            if (!useFallback) player.anims?.stop();
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

          /* Walk animation */
          if (!useFallback) {
            if (vx < 0) player.anims.play('walk-left', true);
            else if (vx > 0) player.anims.play('walk-right', true);
            else if (vy < 0) player.anims.play('walk-up', true);
            else if (vy > 0) player.anims.play('walk-down', true);
            else player.anims.stop();
          }

          /* Dust particles when moving */
          if (isMoving && dustEmitter) {
            dustEmitter.emitParticleAt(player.x, player.y + 10, 1);
          }

          /* Footstep sound (throttled) */
          if (isMoving) {
            const now = _time;
            if (now - lastFootstep > 280) {
              lastFootstep = now;
              try { this.sound.play('sfx-footstep', { volume: 0.15 }); } catch { /* */ }
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
              promptText.setText('🔒 퀴즈를 먼저 클리어하세요!');
              promptText.setColor('#ef4444');
              if (Phaser.Input.Keyboard.JustDown(eKey)) {
                try { this.sound.play('sfx-wrong', { volume: 0.3 }); } catch { /* */ }
                this.cameras.main.shake(200, 0.005);
              }
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
        audio: { disableWebAudio: false },
      });

      gameRef.current = game;
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
      {/* HUD */}
      <div className="mb-2 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            {getRoom(currentRoomId).theme.name}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span style={{ color: '#fbbf24', fontSize: '12px' }}>●</span>
          <span className="text-xs font-mono" style={{ color: '#fbbf24' }}>
            {coinCount}
          </span>
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        className="w-full overflow-hidden rounded-xl border border-border"
        style={{ aspectRatio: `${COLS}/${ROWS}` }}
      />

      {/* Coin fact toast */}
      {coinFact && (
        <div
          className="mt-2 rounded-lg px-3 py-1.5 text-center text-xs font-medium"
          style={{
            background: 'rgba(251, 191, 36, 0.15)',
            color: '#fbbf24',
            border: '1px solid rgba(251, 191, 36, 0.3)',
          }}
        >
          {coinFact}
        </div>
      )}

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
