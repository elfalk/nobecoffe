#!/usr/bin/env node
const { execSync } = require('child_process');

console.log('[v0] Generating Prisma Client...');

try {
  execSync('npx prisma generate', {
    stdio: 'inherit',
  });
  console.log('[v0] Prisma Client generated successfully!');
  process.exit(0);
} catch (error) {
  console.error('[v0] Error generating Prisma Client:', error.message);
  process.exit(1);
}
