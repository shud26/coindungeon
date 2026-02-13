# 캐릭터 스프라이트 + 선택 화면 구현 결과

## 변경된 파일

| 파일 | 변경 내용 |
|------|-----------|
| `src/app/game/page.tsx` | `select` ↔ `playing` 페이즈 전환, `characterKey` state 추가 |
| `src/components/game/PhaserGame.tsx` | `characterKey` prop 추가, `preload()` 스프라이트 로드, `useFallback` 분기, 걷기 애니메이션 |

## 새로 추가한 파일

| 파일 | 역할 |
|------|------|
| `src/lib/game/characters.ts` | 캐릭터 메타데이터 (4종), localStorage 저장/로드 헬퍼 |
| `src/components/game/CharacterSelect.tsx` | 캐릭터 선택 UI (2x2 카드 그리드, 시작 버튼) |
| `public/assets/sprites/characters/` | 스프라이트 PNG 저장 디렉토리 (현재 비어있음 → 폴백 동작) |
| `ai/outbox/result.md` | 이 파일 |

## 캐릭터 PNG 규격 안내

### 파일 위치
```
public/assets/sprites/characters/
├── adventurer.png
├── hacker.png
├── knight.png
└── mage.png
```

### 스프라이트시트 규격
- **프레임 크기**: 32x32 px
- **이미지 총 크기**: 96x128 px (3열 x 4행)
- **배경**: 투명 (PNG alpha)
- **총 프레임 수**: 12프레임

### 프레임 배치 (3열 x 4행)
```
┌──────┬──────┬──────┐
│ 0    │ 1    │ 2    │  ← Row 0: walk-down  (아래 걷기)
├──────┼──────┼──────┤
│ 3    │ 4    │ 5    │  ← Row 1: walk-left  (왼쪽 걷기)
├──────┼──────┼──────┤
│ 6    │ 7    │ 8    │  ← Row 2: walk-right (오른쪽 걷기)
├──────┼──────┼──────┤
│ 9    │ 10   │ 11   │  ← Row 3: walk-up    (위쪽 걷기)
└──────┴──────┴──────┘
```

### 각 프레임 설명
- **프레임 0**: 아래 보기 정면 (idle 기본 포즈)
- **프레임 1**: 아래 걷기 중간
- **프레임 2**: 아래 걷기 반대발
- **프레임 3-5**: 왼쪽 걷기 (같은 패턴)
- **프레임 6-8**: 오른쪽 걷기
- **프레임 9-11**: 위쪽 걷기

### 제작 팁
- 도트 스타일 권장 (pixel art)
- 캐릭터 크기는 프레임 내 20x24px 정도가 적당 (여백 포함 32x32)
- Aseprite, Piskel, LibreSprite 등의 도트 에디터 추천
- AI 생성 시 "pixel art character spritesheet, 32x32, 4-directional walk cycle, transparent background" 프롬프트 사용

### 폴백 동작
PNG가 없으면 자동으로 **캐릭터 색상의 단색 사각형**으로 표시됨:
- adventurer: 인디고 (#6366F1)
- hacker: 초록 (#22C55E)
- knight: 앰버 (#F59E0B)
- mage: 보라 (#A855F7)

## 로컬 실행 방법

```bash
cd /Users/hun/coindungeon
npm run dev
# http://localhost:3000/game 접속
```

### 확인 체크리스트
1. `/game` 접속 → 캐릭터 선택 화면 나오는지
2. 4개 캐릭터 카드 클릭 → 선택 상태 변경되는지
3. "시작하기" 클릭 → 던전 게임 시작되는지
4. 캐릭터별 색상이 다른지 (폴백 모드)
5. 재방문 시 이전 선택이 기본값으로 표시되는지
6. WASD/방향키 이동 + NPC 대화 + 퀴즈 정상 동작

## 다음 TODO

### 우선순위 높음
- [ ] 4종 캐릭터 스프라이트 PNG 제작 (96x128, 투명 배경)
- [ ] PNG 교체 후 걷기 애니메이션 확인 및 frameRate 튜닝 (현재 8fps)
- [ ] idle 포즈 정교화 (현재는 마지막 방향의 첫 프레임)

### 우선순위 중간
- [ ] NPC도 스프라이트로 교체
- [ ] 캐릭터별 이동 속도/특수 능력 차별화
- [ ] 선택 화면에서 스프라이트 미리보기 애니메이션
- [ ] PLAYER_SCALE = 2 옵션으로 확대 모드 지원

### 우선순위 낮음
- [ ] 사운드 이펙트 (이동, 대화, 정답/오답)
- [ ] 다중 맵/방 전환
- [ ] 아이템/인벤토리 시스템
- [ ] 미니맵 UI
