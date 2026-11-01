#!/usr/bin/env node
/** npm run test:e2e: build against the Supabase stand-in, start it, run the browser smoke test. */
import { spawn, spawnSync } from 'node:child_process';

const env = { ...process.env, VITE_SUPABASE_URL: 'http://localhost:54321', VITE_SUPABASE_ANON_KEY: 'e2e-mock-anon-key' };
const run = (cmd, args) => {
  const result = spawnSync(cmd, args, { stdio: 'inherit', env });
  if (result.status !== 0) process.exit(result.status ?? 1);
};
run('npx', ['vite', 'build', '--logLevel', 'warn']);
run('node', ['scripts/postbuild.mjs']);
const server = spawn('node', ['tests/e2e/mock-supabase.mjs'], { stdio: 'inherit', env });
await new Promise((resolve) => setTimeout(resolve, 1500));
const smoke = spawnSync('node', ['tests/e2e/admin-smoke.mjs'], { stdio: 'inherit', env });
server.kill();
console.log('\nNote: dist/ now contains a test build. Run `npm run build` before deploying anything by hand.');
process.exit(smoke.status ?? 1);
