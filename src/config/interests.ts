/**
 * Interest Configuration for Ricardo Cidale's News Feed
 * 
 * HOW TO EDIT:
 * 1. Add or remove interests by modifying the INTERESTS array below
 * 2. Each interest has:
 *    - id: unique identifier (lowercase, no spaces)
 *    - label: display name shown in the UI
 *    - keywords: words/phrases to match in article titles, descriptions, and categories
 *    - weight: multiplier for scoring (higher = more important)
 * 
 * Keywords are case-insensitive and match partial words.
 * More specific keywords score higher than generic ones.
 */

export interface Interest {
  id: string;
  label: string;
  keywords: string[];
  weight: number;
}

export const INTERESTS: Interest[] = [
  {
    id: 'culture',
    label: 'Culture',
    keywords: [
      'culture', 'cultural', 'arts', 'art', 'museum', 'literature', 'literary',
      'fiction', 'novel', 'novelist', 'writer', 'writing', 'poetry', 'poet',
      'theatre', 'theater', 'film', 'cinema', 'music', 'essay', 'essays',
      'long-form', 'longform', 'magazine'
    ],
    weight: 1.2
  },
  {
    id: 'politics',
    label: 'Politics',
    keywords: [
      'politic', 'political', 'government', 'congress', 'senate', 'house',
      'president', 'presidential', 'democrat', 'republican', 'election',
      'vote', 'voter', 'campaign', 'policy', 'legislation', 'law', 'court',
      'supreme court', 'justice', 'administration', 'white house', 'capitol',
      'governor', 'mayor', 'foreign policy', 'diplomacy', 'diplomat'
    ],
    weight: 1.3
  },
  {
    id: 'business',
    label: 'Business & Leadership',
    keywords: [
      'business', 'economy', 'economic', 'finance', 'financial', 'market',
      'wall street', 'ceo', 'executive', 'leadership', 'leader', 'management',
      'manager', 'company', 'corporation', 'corporate', 'entrepreneur',
      'startup', 'investment', 'investor', 'wealth', 'money', 'industry',
      'trade', 'commerce', 'strategy', 'decision', 'organization'
    ],
    weight: 1.3
  },
  {
    id: 'latin-america',
    label: 'Latin America & Brazil',
    keywords: [
      'latin america', 'south america', 'brazil', 'brazilian', 'mexico',
      'mexican', 'argentina', 'argentine', 'chile', 'chilean', 'colombia',
      'colombian', 'peru', 'peruvian', 'venezuela', 'venezuelan', 'cuba',
      'cuban', 'central america', 'caribbean', 'amazon', 'rio', 'são paulo',
      'sao paulo', 'buenos aires', 'lula', 'bolsonaro', 'latin', 'hispanic',
      'latino', 'latina'
    ],
    weight: 1.5
  },
  {
    id: 'italy',
    label: 'Italy',
    keywords: [
      'italy', 'italian', 'rome', 'milan', 'florence', 'venice', 'naples',
      'sicily', 'tuscany', 'vatican', 'pope', 'mediterranean', 'meloni',
      'renaissance', 'roma'
    ],
    weight: 1.5
  },
  {
    id: 'ideas-books',
    label: 'Ideas & Books',
    keywords: [
      'book', 'books', 'author', 'idea', 'ideas', 'intellectual', 'philosophy',
      'philosopher', 'thinker', 'thought', 'review', 'reviewed', 'critic',
      'criticism', 'history', 'historian', 'historical', 'biography',
      'memoir', 'nonfiction', 'non-fiction', 'essay', 'scholarship',
      'academic', 'university', 'professor', 'theory', 'debate'
    ],
    weight: 1.2
  },
  {
    id: 'character-moral',
    label: 'Character & Moral Life',
    keywords: [
      'character', 'moral', 'morality', 'ethics', 'ethical', 'virtue',
      'values', 'integrity', 'conscience', 'soul', 'spiritual', 'meaning',
      'purpose', 'wisdom', 'humility', 'courage', 'compassion', 'empathy',
      'forgiveness', 'redemption', 'faith', 'belief', 'religion', 'religious',
      'david brooks', 'community', 'society', 'social', 'human', 'humanity',
      'life', 'death', 'love', 'family', 'marriage', 'friendship'
    ],
    weight: 1.4
  },
  {
    id: 'persuasion-psychology',
    label: 'Persuasion & Psychology',
    keywords: [
      'persuasion', 'persuade', 'influence', 'psychology', 'psychological',
      'behavior', 'behavioral', 'decision', 'cognitive', 'bias', 'thinking',
      'mind', 'brain', 'neuroscience', 'motivation', 'habit', 'emotion',
      'emotional', 'social psychology', 'cialdini', 'kahneman', 'nudge',
      'choice', 'judgment', 'perception', 'attention', 'memory', 'learning',
      'communication', 'rhetoric', 'argument', 'negotiate', 'negotiation'
    ],
    weight: 1.4
  }
];

/**
 * Categories and keywords to EXCLUDE from the feed
 * Articles matching these will be filtered out or heavily penalized
 */
export const EXCLUDED_TOPICS = {
  categories: [
    'puzzles', 'crossword', 'games', 'quiz',
    'shopping', 'gift guide', 'deals', 'sale',
    'podcast', 'newsletter', 'subscribe', 'subscription',
    'cartoon', 'daily cartoon', 'humor', 'shouts & murmurs',
    'recipe', 'cooking', 'food', 'restaurant'
  ],
  keywords: [
    'crypto', 'cryptocurrency', 'bitcoin', 'blockchain', 'nft',
    'gadget', 'tech review', 'app review', 'device',
    'dev tools', 'developer', 'programming', 'code', 'coding',
    'startup funding', 'series a', 'series b', 'vc ', 'venture capital',
    'gift guide', 'holiday shopping', 'best gifts',
    'listen now', 'subscribe now', 'sign up', 'free trial',
    'crossword', 'puzzle', 'quiz', 'trivia',
    'podcast episode', 'new episode', 'latest episode'
  ]
};

/**
 * Scoring configuration
 */
export const SCORING = {
  titleMatchMultiplier: 2.0,
  descriptionMatchMultiplier: 1.0,
  categoryMatchMultiplier: 1.5,
  keywordMatchMultiplier: 1.0,
  excludedPenalty: -100,
  minimumScoreThreshold: 0.5
};
