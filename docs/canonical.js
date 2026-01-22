// teste-canonical.js
const fs = require('fs');
const path = require('path');

console.log('🔍 Testando canonical em 5 páginas...\n');

const paginas = [
  'index.html',
  'en/index.html',
  'en/keton-aktiv-review/index.html',
  'pt/index.html',
  'es/index.html'
];

paginas.forEach(pagina => {
  const caminho = path.join('./', pagina);
  if (fs.existsSync(caminho)) {
    const conteudo = fs.readFileSync(caminho, 'utf8');
    const url = pagina === 'index.html' 
      ? 'https://healthandlongevity.reviewnexus.blog/'
      : `https://healthandlongevity.reviewnexus.blog/${path.dirname(pagina)}/`;
    
    const temCanonical = conteudo.includes(`href="${url}"`);
    const temNoindex = conteudo.includes('noindex');
    const temRobots = conteudo.includes('name="robots"');
    
    console.log(`${pagina}:`);
    console.log(`  📍 Canonical correto? ${temCanonical ? '✅' : '❌'}`);
    console.log(`  🚫 Noindex? ${temNoindex ? '❌ (PROBLEMA)' : '✅'}`);
    console.log(`  🤖 Meta robots? ${temRobots ? '✅' : '❌'}`);
    
    if (temCanonical) {
      const match = conteudo.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/);
      if (match) console.log(`     URL atual: ${match[1]}`);
    }
    console.log('');
  }
});