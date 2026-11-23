/**
 * RSS Source Configuration
 * 
 * HOW TO ADD A NEW SOURCE:
 * 1. Add a new entry to the SOURCES array below
 * 2. Each source needs:
 *    - id: unique identifier (lowercase, no spaces)
 *    - name: display name shown in the UI
 *    - feedUrl: the RSS/Atom feed URL
 *    - siteUrl: the main website URL
 *    - type: 'rss' for RSS 2.0 or 'atom' for Atom feeds
 *    - enabled: set to true to include in the feed
 *    - color: hex color for UI badges (optional)
 * 
 * The feed parser will automatically handle both RSS and Atom formats.
 */

export interface Source {
  id: string;
  name: string;
  feedUrl: string;
  siteUrl: string;
  type: 'rss' | 'atom';
  enabled: boolean;
  color?: string;
}

export const SOURCES: Source[] = [
  {
    id: 'newyorker',
    name: 'The New Yorker',
    feedUrl: 'https://www.newyorker.com/feed/everything',
    siteUrl: 'https://www.newyorker.com',
    type: 'rss',
    enabled: true,
    color: '#E71D36'
  },
  {
    id: 'atlantic',
    name: 'The Atlantic',
    feedUrl: 'https://www.theatlantic.com/feed/all/',
    siteUrl: 'https://www.theatlantic.com',
    type: 'atom',
    enabled: true,
    color: '#1E3A5F'
  }
];

export function getEnabledSources(): Source[] {
  return SOURCES.filter(source => source.enabled);
}

export function getSourceById(id: string): Source | undefined {
  return SOURCES.find(source => source.id === id);
}
