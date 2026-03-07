export default function DifficultyStars({ difficulty, max = 5 }: { difficulty: number; max?: number }) {
  return (
    <span className="inline-flex gap-0.5 text-[12px]">
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < difficulty ? 'text-warning' : 'text-text-quaternary opacity-30'}>★</span>
      ))}
    </span>
  );
}
