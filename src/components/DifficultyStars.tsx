export default function DifficultyStars({ difficulty, max = 5 }: { difficulty: number; max?: number }) {
  return (
    <span className="inline-flex gap-0.5 text-[13px]">
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < difficulty ? 'text-amber-400' : 'text-gray-200'}>★</span>
      ))}
    </span>
  );
}
