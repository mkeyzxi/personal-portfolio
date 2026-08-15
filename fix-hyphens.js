const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  if (!content.includes('lucide:-')) return;

  console.log(`Fixing prefix in: ${filePath}`);
  
  content = content.replace(/icon="lucide:-/g, 'icon="lucide:');
  content = content.replace(/icon='lucide:-/g, "icon='lucide:");

  fs.writeFileSync(filePath, content, 'utf-8');
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  }
}

walk(path.resolve('src'));
walk(path.resolve('app'));
console.log("Done fixing hyphen prefix.");
