const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (file === 'route.ts') {
      processFile(fullPath);
    }
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Ganti import firebase-admin
  const importRegex = /import\s+\{\s*([^}]+)\s*\}\s+from\s+['"]@\/lib\/firebase-admin['"];?/g;
  content = content.replace(importRegex, (match, importsStr) => {
    changed = true;
    const imports = importsStr.split(',').map(i => i.trim());
    let newImports = [];
    if (imports.includes('getAdminDb')) {
      newImports.push(`import { getAdminDb } from '@/lib/firebase-admin-db';`);
    }
    if (imports.includes('getAdminAuth')) {
      newImports.push(`import { getAdminAuth } from '@/lib/firebase-admin-auth';`);
    }
    return newImports.join('\n');
  });

  // 2. Pastikan ada export const runtime = 'nodejs'
  if (!content.includes("export const runtime = 'nodejs'") && !content.includes('export const runtime = "nodejs"')) {
    changed = true;
    // Cari baris kosong atau tempat ideal setelah import
    const lines = content.split('\n');
    let lastImportIndex = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('import ')) {
        lastImportIndex = i;
      }
    }
    
    const runtimeExport = `export const runtime = 'nodejs';`;
    
    // Pastikan tidak menduplikasi, walaupun kita sudah ngecek includes
    if (lastImportIndex !== -1) {
      lines.splice(lastImportIndex + 1, 0, '\n' + runtimeExport);
    } else {
      lines.unshift(runtimeExport + '\n');
    }
    content = lines.join('\n');
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

processDir(path.join(__dirname, '../app/api'));
console.log('Selesai refactor api routes');
