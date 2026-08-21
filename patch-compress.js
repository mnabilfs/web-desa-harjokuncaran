const fs = require('fs');
const path = require('path');

const filesToPatch = [
  'src/app/admin/pemerintahan/perangkat-desa/page.tsx',
  'src/app/admin/pemerintahan/lembaga-desa/page.tsx',
  'src/app/admin/pemerintahan/struktur-organisasi/page.tsx'
];

for (const relPath of filesToPatch) {
  const filePath = path.join(process.cwd(), relPath);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Inject import if not exists
    if (!content.includes('import { compressImage } from "@/utils/imageCompressor"')) {
      content = content.replace(
        'import { createClient }',
        'import { compressImage } from "@/utils/imageCompressor";\nimport { createClient }'
      );
    }
    
    // Replace upload block (variable naming varies by file)
    // Variables we expect: fotoFile, logoFile, strukturFile, file, etc.
    const re = /if \(([a-zA-Z]+)\) \{\s*const fileExt = \1\.name\.split/g;
    
    content = content.replace(re, (match, vName) => {
      return `if (${vName}) {\n      const compressedFile = await compressImage(${vName});\n      const fileExt = compressedFile.name.split`;
    });
    
    const reUpload = /\.upload\(([^,]+),\s*([a-zA-Z]+File|file)\)/g;
    content = content.replace(reUpload, '.upload($1, compressedFile)');

    fs.writeFileSync(filePath, content);
    console.log("Patched:", relPath);
  } else {
    console.log("Not found:", relPath);
  }
}
