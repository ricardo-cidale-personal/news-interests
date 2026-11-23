import type { RawArticle } from './feed-fetcher';
import { INTERESTS, EXCLUDED_TOPICS, SCORING, type Interest } from '../config/interests';

export interface ScoredArticle extends RawArticle {
  score: number;
  matchedInterests: string[];
}

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^\w\s]/g, ' ');
}

function countKeywordMatches(text: string, keywords: string[]): number {
  const normalizedText = normalizeText(text);
  let matches = 0;
  
  for (const keyword of keywords) {
    const normalizedKeyword = normalizeText(keyword);
    if (normalizedText.includes(normalizedKeyword)) {
      matches++;
    }
  }
  
  return matches;
}

function isExcluded(article: RawArticle): boolean {
  const titleLower = article.title.toLowerCase();
  const descLower = article.description.toLowerCase();
  const categoriesLower = article.categories.map(c => c.toLowerCase());
  
  for (const category of EXCLUDED_TOPICS.categories) {
    const categoryLower = category.toLowerCase();
    if (categoriesLower.some(c => c.includes(categoryLower))) {
      return true;
    }
  }
  
  for (const keyword of EXCLUDED_TOPICS.keywords) {
    const keywordLower = keyword.toLowerCase();
    if (titleLower.includes(keywordLower) || descLower.includes(keywordLower)) {
      return true;
    }
  }
  
  return false;
}

function scoreArticleForInterest(article: RawArticle, interest: Interest): number {
  let score = 0;
  
  const titleMatches = countKeywordMatches(article.title, interest.keywords);
  score += titleMatches * SCORING.titleMatchMultiplier;
  
  const descMatches = countKeywordMatches(article.description, interest.keywords);
  score += descMatches * SCORING.descriptionMatchMultiplier;
  
  const categoriesText = article.categories.join(' ');
  const categoryMatches = countKeywordMatches(categoriesText, interest.keywords);
  score += categoryMatches * SCORING.categoryMatchMultiplier;
  
  return score * interest.weight;
}

export function scoreArticle(article: RawArticle): ScoredArticle {
  if (isExcluded(article)) {
    return {
      ...article,
      score: SCORING.excludedPenalty,
      matchedInterests: [],
    };
  }
  
  let totalScore = 0;
  const matchedInterests: string[] = [];
  
  for (const interest of INTERESTS) {
    const interestScore = scoreArticleForInterest(article, interest);
    if (interestScore > 0) {
      totalScore += interestScore;
      matchedInterests.push(interest.id);
    }
  }
  
  return {
    ...article,
    score: totalScore,
    matchedInterests,
  };
}

export function scoreAndRankArticles(articles: RawArticle[]): ScoredArticle[] {
  const scored = articles.map(scoreArticle);
  
  const filtered = scored.filter(
    article => article.score >= SCORING.minimumScoreThreshold
  );
  
  filtered.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
  });
  
  return filtered;
}

export function filterByInterest(
  articles: ScoredArticle[],
  interestId: string
): ScoredArticle[] {
  return articles.filter(article => 
    article.matchedInterests.includes(interestId)
  );
}

export function filterBySource(
  articles: ScoredArticle[],
  sourceId: string
): ScoredArticle[] {
  return articles.filter(article => article.sourceId === sourceId);
}

export function getInterestLabel(interestId: string): string {
  const interest = INTERESTS.find(i => i.id === interestId);
  return interest?.label || interestId;
}
