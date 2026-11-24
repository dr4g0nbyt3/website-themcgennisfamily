import { execSync } from 'child_process';
import { createReadStream, existsSync, statSync } from 'fs';
import { extname, join, normalize } from 'path';
import { fileURLToPath } from 'url';

const MIME = {
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.wasm': 'application/wasm',
};

export default function pagefind() {
  let outDir;

  return {
    name: 'pagefind',
    hooks: {
      'astro:config:setup': ({ config }) => {
        outDir = config.outDir;
      },
      // The index only exists after `astro build`. In dev, serve the last build's
      // index from dist/pagefind so search works locally (run a build to refresh it).
      'astro:server:setup': ({ server }) => {
        const root = join(fileURLToPath(outDir), 'pagefind');
        server.middlewares.use('/pagefind', (req, res, next) => {
          const rel = normalize(decodeURIComponent((req.url || '/').split('?')[0])).replace(/^(\.\.[/\\])+/, '');
          const file = join(root, rel);
          if (!file.startsWith(root) || !existsSync(file) || !statSync(file).isFile()) return next();
          const type = MIME[extname(file)];
          if (type) res.setHeader('Content-Type', type);
          createReadStream(file).pipe(res);
        });
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
