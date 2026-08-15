const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = path.resolve('app');

function camelToKebab(str) {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  if (!content.includes('lucide-react')) return;

  console.log(`Processing: ${filePath}`);
  
  const importRegex = /import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"]/g;
  let icons = [];
  
  content = content.replace(importRegex, (match, p1) => {
    icons = p1.split(',').map(s => s.trim()).filter(Boolean);
    
    if (content.includes("from '@iconify/react'") || content.includes('from "@iconify/react"')) {
      return '';
    }
    return `import { Icon } from '@iconify/react'`;
  });

  icons.forEach(iconName => {
    const kebabName = camelToKebab(iconName);
    
    const tagRegex = new RegExp(`<${iconName}(\\s|>)`, 'g');
    content = content.replace(tagRegex, `<Icon icon="lucide:${kebabName}"$1`);
    
    const closeTagRegex = new RegExp(`<\/${iconName}>`, 'g');
    content = content.replace(closeTagRegex, `</Icon>`);
  });

  const wildcardRegex = /import\s+\*\s+as\s+LucideIcons\s+from\s+['"]lucide-react['"];?/g;
  if (wildcardRegex.test(content)) {
    if (!content.includes("from '@iconify/react'") && !content.includes('from "@iconify/react"')) {
      content = content.replace(wildcardRegex, "import { Icon } from '@iconify/react';");
    } else {
      content = content.replace(wildcardRegex, "");
    }
    
    const componentRegex = /<LucideIcons\.([A-Za-z0-9]+)(\s|>)/g;
    content = content.replace(componentRegex, (match, p1, p2) => {
      const kebabName = camelToKebab(p1);
      return `<Icon icon="lucide:${kebabName}"${p2}`;
    });
    
    const closeComponentRegex = /<\/LucideIcons\.([A-Za-z0-9]+)>/g;
    content = content.replace(closeComponentRegex, `</Icon>`);
  }

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

walk(targetDir);
console.log("Done refactoring lucide-react.");
