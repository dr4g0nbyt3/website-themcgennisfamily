import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { posts } from '../data/posts';

export function GET(context: APIContext) {
  return rss({
    title: 'The McGennis Family Blog',
    description: 'Stories on faith, family, entrepreneurship, and from-scratch cooking from the McGennis family in Jefferson City, Missouri.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      pubDate: post.date,
      link: post.url,
      author: post.author,
      categories: [post.category.name],
    })),
    customData: '<language>en-us</language>',
  });
}
