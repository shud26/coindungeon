#!/usr/bin/env python3
"""Generate 8-bit style sound effects as WAV files for CoinDungeon."""
import wave, struct, math, os, random

OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'assets', 'sfx')
RATE = 22050

def write_wav(name, samples, rate=RATE):
    path = os.path.join(OUT, f'{name}.wav')
    with wave.open(path, 'w') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(rate)
        for s in samples:
            w.writeframes(struct.pack('<h', max(-32767, min(32767, int(s)))))
    print(f'  ✓ {name}.wav ({len(samples)} samples, {len(samples)/rate:.2f}s)')

def square(freq, t):
    return 1.0 if math.sin(2 * math.pi * freq * t) >= 0 else -1.0

def noise():
    return random.uniform(-1, 1)

def envelope(t, attack, decay, total):
    if t < attack:
        return t / attack
    elif t < attack + decay:
        return 1.0 - 0.5 * ((t - attack) / decay)
    elif t > total - 0.02:
        return max(0, (total - t) / 0.02) * 0.5
    return 0.5

# 1. Footstep - short percussive tap
def gen_footstep():
    dur = 0.08
    samples = []
    for i in range(int(RATE * dur)):
        t = i / RATE
        env = max(0, 1.0 - t / dur) ** 3
        val = noise() * env * 0.4
        val += square(120 - 80 * t / dur, t) * env * 0.3
        samples.append(val * 18000)
    return samples

# 2. NPC talk - chirpy blip
def gen_talk():
    dur = 0.12
    samples = []
    for i in range(int(RATE * dur)):
        t = i / RATE
        env = max(0, 1.0 - t / dur) ** 2
        freq = 400 + 200 * math.sin(t * 30)
        val = square(freq, t) * env * 0.5
        samples.append(val * 16000)
    return samples

# 3. Correct - ascending happy chime
def gen_correct():
    dur = 0.5
    samples = []
    notes = [523, 659, 784, 1047]  # C5, E5, G5, C6
    note_dur = dur / len(notes)
    for i in range(int(RATE * dur)):
        t = i / RATE
        note_idx = min(int(t / note_dur), len(notes) - 1)
        freq = notes[note_idx]
        local_t = t - note_idx * note_dur
        env = max(0, 1.0 - local_t / note_dur) ** 1.5
        val = math.sin(2 * math.pi * freq * t) * 0.6
        val += math.sin(2 * math.pi * freq * 2 * t) * 0.2
        val *= env
        # fade out last bit
        if t > dur - 0.05:
            val *= (dur - t) / 0.05
        samples.append(val * 20000)
    return samples

# 4. Wrong - descending buzz
def gen_wrong():
    dur = 0.4
    samples = []
    for i in range(int(RATE * dur)):
        t = i / RATE
        env = max(0, 1.0 - t / dur) ** 2
        freq = 300 - 150 * (t / dur)
        val = square(freq, t) * 0.4 + noise() * 0.15
        val *= env
        samples.append(val * 18000)
    return samples

# 5. Coin - bright ding
def gen_coin():
    dur = 0.3
    samples = []
    for i in range(int(RATE * dur)):
        t = i / RATE
        env = max(0, 1.0 - t / dur) ** 2.5
        val = math.sin(2 * math.pi * 1200 * t) * 0.5
        val += math.sin(2 * math.pi * 1800 * t) * 0.3
        val += math.sin(2 * math.pi * 2400 * t) * 0.15
        val *= env
        samples.append(val * 22000)
    return samples

# 6. Door - whoosh/portal
def gen_door():
    dur = 0.5
    samples = []
    for i in range(int(RATE * dur)):
        t = i / RATE
        env = math.sin(math.pi * t / dur) ** 0.8
        freq = 100 + 400 * (t / dur)
        val = noise() * 0.3 * env
        val += math.sin(2 * math.pi * freq * t) * 0.4 * env
        val += math.sin(2 * math.pi * freq * 0.5 * t) * 0.2 * env
        samples.append(val * 16000)
    return samples

print('Generating 8-bit SFX for CoinDungeon...')
os.makedirs(OUT, exist_ok=True)
write_wav('footstep', gen_footstep())
write_wav('talk', gen_talk())
write_wav('correct', gen_correct())
write_wav('wrong', gen_wrong())
write_wav('coin', gen_coin())
write_wav('door', gen_door())
print('Done! All files in', OUT)
