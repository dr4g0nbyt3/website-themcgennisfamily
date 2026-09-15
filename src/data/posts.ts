// Build-time index of every blog post, read straight from the .astro pages so the
// homepage, blog index, and RSS feed update themselves when a post is added.
//
// A page counts as a post when it lives under src/pages/blog/<category>/ and passes
// `publishedTime` to <BaseLayout>. Title comes from the page's <h1>, the card image
// from the first photo in the page (falling back to BaseLayout's `image`).
// Draft pages prefixed with `_` are never routed or indexed.

export type CategorySlug = 'alattetodomama' | 'entrepreneur-ai' | 'from-scratch-fridays' | 'favorites' | 'family-heritage';

export interface Category {
  slug: CategorySlug;
  name: string;
  href: string;
  author: string;
  /** Full Tailwind class strings (kept literal so Tailwind's scanner picks them up) */
  chip: string;
  hoverBorder: string;
  hoverText: string;
  /** Background for cards whose post has no photo */
  cover: string;
}

export const CATEGORIES: Record<CategorySlug, Category> = {
  alattetodomama: {
    slug: 'alattetodomama',
    name: 'A Latte to Do Mama',
    href: '/blog/alattetodomama',
    author: 'Stephanie Kay McGennis',
    chip: 'bg-mcgennis-maroon/10 text-mcgennis-maroon',
    hoverBorder: 'hover:border-mcgennis-maroon',
    hoverText: 'group-hover:text-mcgennis-maroon',
    cover: 'bg-mcgennis-maroon',
  },
  'entrepreneur-ai': {
    slug: 'entrepreneur-ai',
    name: 'An Entrepreneur in a World of AI',
    href: '/blog/entrepreneur-ai',
    author: 'Caleb Michael McGennis',
    chip: 'bg-mcgennis-navy/10 text-mcgennis-navy',
    hoverBorder: 'hover:border-mcgennis-navy',
    hoverText: 'group-hover:text-mcgennis-navy',
    cover: 'bg-mcgennis-navy',
  },
  'from-scratch-fridays': {
    slug: 'from-scratch-fridays',
    name: 'From Scratch Fridays',
    href: '/blog/from-scratch-fridays',
    author: 'The McGennis Family',
    chip: 'bg-mcgennis-forest/10 text-mcgennis-forest',
    hoverBorder: 'hover:border-mcgennis-forest',
    hoverText: 'group-hover:text-mcgennis-forest',
    cover: 'bg-mcgennis-forest',
  },
  favorites: {
    slug: 'favorites',
    name: 'Favorites',
    href: '/blog/favorites',
    author: 'Caleb Michael McGennis',
    chip: 'bg-mcgennis-gold/15 text-mcgennis-gold-deep',
    hoverBorder: 'hover:border-mcgennis-gold',
    hoverText: 'group-hover:text-mcgennis-gold-deep',
    cover: 'bg-brass-button',
  },
  'family-heritage': {
    slug: 'family-heritage',
    name: 'McGennis Family Heritage',
    href: '/blog/family-heritage',
    author: 'Caleb Michael McGennis',
    chip: 'bg-mcgennis-gold/15 text-mcgennis-gold-deep',
    hoverBorder: 'hover:border-mcgennis-gold',
    hoverText: 'group-hover:text-mcgennis-gold-deep',
    cover: 'bg-brass-button',
  },
};

export interface Post {
  url: string;
  title: string;
  description: string;
  date: Date;
  author: string;
  image?: string;
  category: Category;
}

const pages = import.meta.glob(['/src/pages/blog/*/**/*.astro', '!**/_*'], {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const ENTITIES: Record<string, string> = {
  amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ',
  mdash: '—', ndash: '–', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', hellip: '…', middot: '·',
};

function clean(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&(#\d+|[a-z]+);/gi, (m, e: string) =>
      e.startsWith('#') ? String.fromCodePoint(Number(e.slice(1))) : ENTITIES[e.toLowerCase()] ?? m)
    .replace(/\s+/g, ' ')
    .trim();
}

function layoutProps(source: string): Record<string, string> {
  const block = source.match(/<BaseLayout\b([\s\S]*?)\n?>/)?.[1] ?? '';
  return Object.fromEntries([...block.matchAll(/(\w+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
}

function parse(path: string, source: string): Post | null {
  const [, slugPath] = path.match(/^\/src\/pages(\/blog\/.+)\.astro$/) ?? [];
  const categorySlug = slugPath?.split('/')[2] as CategorySlug;
  const category = CATEGORIES[categorySlug];
  const props = layoutProps(source);
  if (!category || !props.publishedTime) return null;

  const h1 = source.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1];
  // Social share cards (/images/social/) are text-heavy 1200x630 graphics that crop badly in a card
  const isPhoto = (src?: string) => Boolean(src && !src.includes('/social/'));
  const photo = [...source.matchAll(/<img\b[^>]*?\ssrc="(\/images\/[^"]+)"/g)]
    .map((m) => m[1])
    .find(isPhoto);

  return {
    url: slugPath,
    title: h1 ? clean(h1) : props.title.replace(/\s+[-|]\s+[^-|]+$/, ''),
    description: clean(props.description ?? ''),
    date: new Date(`${props.publishedTime}T12:00:00`),
    author: props.author ?? category.author,
    image: photo ?? (isPhoto(props.image) ? props.image : undefined),
    category,
  };
}

export const posts: Post[] = Object.entries(pages)
  .map(([path, source]) => parse(path, source))
  .filter((p): p is Post => p !== null)
  .sort((a, b) => b.date.getTime() - a.date.getTime());

export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
