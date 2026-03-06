import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

try {
  console.log('Generating Prisma Client...');
  execSync('npx prisma generate', {
    cwd: projectRoot,
    stdio: 'inherit'
  });
  console.log('Prisma Client generated successfully!');
} catch (error) {
  console.error('Error generating Prisma Client:', error.message);
  process.exit(1);
}
