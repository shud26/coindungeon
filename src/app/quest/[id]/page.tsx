import type { Metadata } from 'next';
import { quests, getQuestById } from '@/data/quests';
import QuestClient from './QuestClient';

const BASE_URL = 'https://coindungeon.vercel.app';

export function generateStaticParams() {
  return quests.map((quest) => ({
    id: String(quest.id),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const quest = getQuestById(parseInt(id, 10));
  if (!quest) return { title: '퀘스트를 찾을 수 없어요' };

  const title = `${quest.floor}층: ${quest.title}`;
  const description = `${quest.description} | 난이도: ${quest.difficulty} | ${quest.xp} XP | ~${quest.estimatedMinutes}분`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | 코인던전`,
      description,
      url: `${BASE_URL}/quest/${quest.id}`,
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title: `${title} | 코인던전`,
      description,
    },
    alternates: {
      canonical: `${BASE_URL}/quest/${quest.id}`,
    },
  };
}

export default async function QuestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const questId = parseInt(id, 10);
  const quest = getQuestById(questId);

  const jsonLd = quest ? {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: quest.title,
    description: quest.description,
    educationalLevel: quest.difficulty === 'easy' ? 'Beginner' : quest.difficulty === 'medium' ? 'Intermediate' : 'Advanced',
    learningResourceType: 'Quest',
    inLanguage: 'ko',
    isAccessibleForFree: true,
    timeRequired: `PT${quest.estimatedMinutes}M`,
    about: quest.category,
    isPartOf: {
      '@type': 'Course',
      name: '코인던전 - 크립토 실전 퀘스트',
      url: BASE_URL,
    },
  } : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <QuestClient questId={questId} />
    </>
  );
}
