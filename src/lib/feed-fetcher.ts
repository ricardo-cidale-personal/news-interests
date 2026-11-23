import Parser from 'rss-parser';
import type { Source } from '../config/sources';

export interface RawArticle {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  author: string;
  categories: string[];
  sourceId: string;
  sourceName: string;
  thumbnail?: string;
}

type CustomFeed = {
  title: string;
  items: CustomItem[];
};

type CustomItem = {
  title?: string;
  link?: string;
  content?: string;
  contentSnippet?: string;
  description?: string;
  pubDate?: string;
  isoDate?: string;
  creator?: string;
  author?: string;
  categories?: string[];
  'media:thumbnail'?: { $: { url: string } };
  'media:content'?: { $: { url: string } };
  enclosure?: { url: string };
};

const parser: Parser<CustomFeed, CustomItem> = new Parser({
  customFields: {
    item: [
      ['media:thumbnail', 'media:thumbnail'],
      ['media:content', 'media:content'],
      ['dc:creator', 'creator'],
    ],
  },
});

function extractDescription(item: CustomItem): string {
  let desc = item.contentSnippet || item.description || item.content || '';
  
  desc = desc.replace(/<[^>]*>/g, '');
  desc = desc.replace(/\s+/g, ' ').trim();
  
  if (desc.length > 300) {
    desc = desc.substring(0, 297) + '...';
  }
  
  return desc;
}

function extractThumbnail(item: CustomItem): string | undefined {
  if (item['media:thumbnail']?.$?.url) {
    return item['media:thumbnail'].$.url;
  }
  if (item['media:content']?.$?.url) {
    return item['media:content'].$.url;
  }
  if (item.enclosure?.url) {
    return item.enclosure.url;
  }
  return undefined;
}

function extractAuthor(item: CustomItem): string {
  if (item.creator) return item.creator;
  if (item.author) {
    if (typeof item.author === 'string') return item.author;
    if (typeof item.author === 'object' && 'name' in item.author) {
      return (item.author as { name: string }).name;
    }
  }
  return '';
}

export async function fetchFeed(source: Source): Promise<RawArticle[]> {
  try {
    const feed = await parser.parseURL(source.feedUrl);
    
    return feed.items.map((item): RawArticle => ({
      title: item.title || 'Untitled',
      link: item.link || '',
      description: extractDescription(item),
      pubDate: item.isoDate || item.pubDate || new Date().toISOString(),
      author: extractAuthor(item),
      categories: item.categories || [],
      sourceId: source.id,
      sourceName: source.name,
      thumbnail: extractThumbnail(item),
    }));
  } catch (error) {
    console.error(`Error fetching feed from ${source.name}:`, error);
    return [];
  }
}

export async function fetchAllFeeds(sources: Source[]): Promise<RawArticle[]> {
  const allArticles: RawArticle[] = [];
  
  for (const source of sources) {
    if (source.enabled) {
      const articles = await fetchFeed(source);
      allArticles.push(...articles);
    }
  }
  
  return allArticles;
}
