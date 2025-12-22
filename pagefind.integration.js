import { execSync } from 'child_process';

export default function pagefind() {
  let outDir;

  return {
    name: 'pagefind',
    hooks: {
      'astro:config:setup': ({ config }) => {
        outDir = config.outDir;
      },
      'astro:build:done': () => {
        console.log('Running Pagefind indexing...');
        try {
          execSync(`npx pagefind --site ${outDir.pathname}`, { stdio: 'inherit' });
          console.log('Pagefind indexing complete!');
        } catch (error) {
          console.error('Pagefind indexing failed:', error);
        }
      },
    },
  };
}
