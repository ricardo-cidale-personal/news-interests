# Ricardo's Reading List

A personal news feed that curates long-form journalism from The New Yorker and The Atlantic, ranked by interests.

## Live Site

**[View the feed](https://ricardo-cidale-personal.github.io/news-interests/)**

The feed updates automatically twice daily (6 AM and 6 PM Central Time).

## Features

- Curated articles from The New Yorker and The Atlantic
- Interest-based scoring and ranking
- Filter by topic or source
- Mobile-friendly, magazine-style design
- Automatic daily builds via GitHub Actions
- No login required

## How It Works

1. **Fetches RSS feeds** from configured sources at build time
2. **Scores articles** against configured interests using keyword matching
3. **Filters out unwanted content** (puzzles, podcasts, shopping, tech gadgets, crypto)
4. **Ranks by relevance** showing the best matches first
5. **Rebuilds daily** to keep content fresh

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Configuration

### Editing Interests

Edit `src/config/interests.ts` to customize the topics:

```typescript
export const INTERESTS: Interest[] = [
  {
    id: 'culture',           // Unique identifier
    label: 'Culture',        // Display name
    keywords: ['culture', 'arts', 'literature', ...],  // Match terms
    weight: 1.2              // Scoring multiplier (higher = more important)
  },
  // ... more interests
];
```

**Current interests:**
- Culture (long-form arts, literature, film)
- Politics (government, elections, policy)
- Business & Leadership (economy, management, strategy)
- Latin America & Brazil (regional coverage)
- Italy (Italian news and culture)
- Ideas & Books (intellectual discourse, reviews)
- Character & Moral Life (ethics, values, meaning)
- Persuasion & Psychology (behavior, influence, decision-making)

**Excluded topics:**
- Puzzles, crosswords, quizzes
- Shopping and gift guides
- Podcast and subscription promos
- Tech gadgets, dev tools, crypto
- Cartoons and humor sections

### Adding a New Source

Edit `src/config/sources.ts`:

```typescript
export const SOURCES: Source[] = [
  // ... existing sources
  {
    id: 'economist',                        // Unique identifier
    name: 'The Economist',                  // Display name
    feedUrl: 'https://www.economist.com/...', // RSS/Atom feed URL
    siteUrl: 'https://www.economist.com',   // Main site URL
    type: 'rss',                            // 'rss' or 'atom'
    enabled: true,                          // Set to true to include
    color: '#E3120B'                        // Optional: badge color
  }
];
```

The feed parser handles both RSS 2.0 and Atom formats automatically.

## Deployment

The site deploys to GitHub Pages via GitHub Actions.

**Automatic triggers:**
- Every push to `main`
- Daily at 6 AM CT (12:00 UTC)
- Daily at 6 PM CT (00:00 UTC)

**Manual trigger:**
1. Go to Actions tab in GitHub
2. Select "Build and Deploy" workflow
3. Click "Run workflow"

### First-Time Setup

If deploying to a new repository:

1. Go to repository **Settings > Pages**
2. Under "Build and deployment", select **GitHub Actions**
3. Push to main to trigger the first build

## Project Structure

```
src/
├── config/
│   ├── interests.ts    # Interest definitions and scoring weights
│   └── sources.ts      # RSS feed sources
├── lib/
│   ├── feed-fetcher.ts # RSS parsing and fetching
│   └── scorer.ts       # Article scoring logic
├── components/
│   ├── ArticleCard.astro
│   └── FilterBar.astro
├── layouts/
│   └── Layout.astro
├── pages/
│   └── index.astro
└── scripts/
    └── filter.ts       # Client-side filtering
```

## Tech Stack

- [Astro](https://astro.build/) - Static site generator
- [rss-parser](https://www.npmjs.com/package/rss-parser) - RSS/Atom parsing
- Google Fonts (Playfair Display, Source Sans 3)
- GitHub Actions for CI/CD
- GitHub Pages for hosting

## License

Private use only.
