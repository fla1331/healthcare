// ====================================================
// CORREÇÃO SEO URGENTE - SITEMAP LIMPO + CANONICAL
// ====================================================

const fs = require('fs');
const path = require('path');

// ========== CONFIGURAÇÃO ATUALIZADA ==========
const CONFIG = {
  SITE_URL: 'https://healthandlongevity.reviewnexus.blog',
  PASTA_RAIZ: './',
  
  // PASTAS QUE NÃO DEVEM ESTAR NO SITEMAP!
  PASTAS_BLOQUEAR_SITEMAP: [
    'backup', 'backup_seo', 'backup_seo_recursivo', 'backup_automatico',
    'node_modules', '__trashed', 'wp-content', 'author',
    'includes', 'teste', 'test', 'temp', 'tmp'
  ],
  
  // IDIOMAS PRINCIPAIS (prioridade no sitemap)
  IDIOMAS_PRINCIPAIS: ['en', 'pt', 'es'],
  
  // PÁGINAS EXCLUÍDAS (não indexar)
  EXCLUIR_DO_INDEX: [
    '/weight-loss-quiz/',
    '/teste',
    '/test/',
    '/backup',
    '/page/',  // Paginação
    '/search/', // Busca interna
    /\/\d+\/$/ // URLs com números no final (ex: /page/2/)
  ]
};

// ========== FUNÇÕES ==========
function log(mensagem, tipo = 'info') {
  const cores = {
    info: '\x1b[36m%s\x1b[0m',    // Cyan
    success: '\x1b[32m%s\x1b[0m', // Green
    error: '\x1b[31m%s\x1b[0m',   // Red
    warning: '\x1b[33m%s\x1b[0m', // Yellow
    sitemap: '\x1b[35m%s\x1b[0m'  // Magenta
  };
  console.log(cores[tipo] || '\x1b[36m%s\x1b[0m', `[${tipo.toUpperCase()}] ${mensagem}`);
}

// Encontrar arquivos HTML válidos
function encontrarArquivosHTML() {
  const arquivos = [];
  
  function buscar(pasta) {
    try {
      const itens = fs.readdirSync(pasta, { withFileTypes: true });
      
      for (const item of itens) {
        const caminhoCompleto = path.join(pasta, item.name);
        const relativo = path.relative(CONFIG.PASTA_RAIZ, caminhoCompleto).replace(/\\/g, '/');
        
        if (item.isDirectory()) {
          // PULAR pastas bloqueadas
          if (CONFIG.PASTAS_BLOQUEAR_SITEMAP.includes(item.name)) {
            log(`Ignorando pasta: ${relativo}`, 'warning');
            continue;
          }
          buscar(caminhoCompleto);
        } 
        // SÓ arquivos index.html
        else if (item.name === 'index.html') {
          arquivos.push({
            caminhoCompleto,
            caminhoRelativo: relativo,
            nomeArquivo: item.name,
            pasta: path.dirname(relativo)
          });
        }
      }
    } catch (erro) {
      log(`Erro em ${pasta}: ${erro.message}`, 'error');
    }
  }
  
  buscar(CONFIG.PASTA_RAIZ);
  return arquivos;
}

// Verificar se URL deve ser indexada
function deveIndexar(arquivoInfo) {
  const { caminhoRelativo } = arquivoInfo;
  
  // 1. Não indexar pastas bloqueadas
  for (const pasta of CONFIG.PASTAS_BLOQUEAR_SITEMAP) {
    if (caminhoRelativo.includes(pasta + '/')) {
      return false;
    }
  }
  
  // 2. Não indexar URLs da lista de exclusão
  for (const padrao of CONFIG.EXCLUIR_DO_INDEX) {
    if (typeof padrao === 'string' && caminhoRelativo.includes(padrao)) {
      return false;
    }
    if (padrao instanceof RegExp && padrao.test(caminhoRelativo)) {
      return false;
    }
  }
  
  // 3. Só indexar idiomas principais + raiz
  const partes = caminhoRelativo.split('/');
  if (partes.length > 1 && partes[0] !== '') {
    if (!CONFIG.IDIOMAS_PRINCIPAIS.includes(partes[0])) {
      log(`Ignorando idioma não principal: ${caminhoRelativo}`, 'warning');
      return false;
    }
  }
  
  return true;
}

// Gerar URL correta SEM .html
function gerarURL(arquivoInfo) {
  const { caminhoRelativo } = arquivoInfo;
  
  if (caminhoRelativo === 'index.html') {
    return `${CONFIG.SITE_URL}/`;
  }
  
  const pasta = path.dirname(caminhoRelativo);
  return pasta === '.' ? `${CONFIG.SITE_URL}/` : `${CONFIG.SITE_URL}/${pasta}/`;
}

// Corrigir canonical em UMA página
function corrigirCanonical(caminhoArquivo, urlCorreta) {
  try {
    const conteudo = fs.readFileSync(caminhoArquivo, 'utf8');
    
    // 1. REMOVER TODOS OS NOINDEX
    let novoConteudo = conteudo
      .replace(/content\s*=\s*["']noindex[^"']*["']/gi, 'content="index, follow"')
      .replace(/<meta[^>]*noindex[^>]*>/gi, '');
    
    // 2. CORRIGIR/ADICIONAR CANONICAL
    const canonicalCorreto = `<link rel="canonical" href="${urlCorreta}" />`;
    const regexCanonical = /<link[^>]*rel=(["'])canonical\1[^>]*>/gi;
    
    if (regexCanonical.test(novoConteudo)) {
      // Substituir canonical existente
      novoConteudo = novoConteudo.replace(regexCanonical, canonicalCorreto);
    } else {
      // Adicionar antes do </head>
      if (novoConteudo.includes('</head>')) {
        novoConteudo = novoConteudo.replace('</head>', `  ${canonicalCorreto}\n</head>`);
      }
    }
    
    // 3. GARANTIR meta robots index,follow
    const metaRobots = '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />';
    if (!novoConteudo.includes('name="robots"')) {
      novoConteudo = novoConteudo.replace('<head>', `<head>\n  ${metaRobots}`);
    } else {
      // Atualizar robots existente
      novoConteudo = novoConteudo.replace(
        /<meta[^>]*name=(["'])robots\1[^>]*>/gi,
        metaRobots
      );
    }
    
    if (novoConteudo !== conteudo) {
      fs.writeFileSync(caminhoArquivo, novoConteudo, 'utf8');
      return true;
    }
    return false;
  } catch (erro) {
    log(`Erro ao corrigir ${caminhoArquivo}: ${erro.message}`, 'error');
    return false;
  }
}

// CRIAR SITEMAP LIMPO (sem namespace, sem backups)
function criarSitemapLimpo(arquivosHTML) {
  log('Criando sitemap.xml LIMPO...', 'sitemap');
  
  const arquivosIndexar = arquivosHTML.filter(deveIndexar);
  log(`${arquivosIndexar.length} páginas para indexar (de ${arquivosHTML.length} total)`, 'info');
  
  // Ordenar: homepage primeiro, depois idiomas principais
  arquivosIndexar.sort((a, b) => {
    if (a.caminhoRelativo === 'index.html') return -1;
    if (b.caminhoRelativo === 'index.html') return 1;
    
    const aIdioma = a.caminhoRelativo.split('/')[0];
    const bIdioma = b.caminhoRelativo.split('/')[0];
    
    const aPrincipal = CONFIG.IDIOMAS_PRINCIPAIS.includes(aIdioma);
    const bPrincipal = CONFIG.IDIOMAS_PRINCIPAIS.includes(bIdioma);
    
    if (aPrincipal && !bPrincipal) return -1;
    if (!aPrincipal && bPrincipal) return 1;
    
    return a.caminhoRelativo.localeCompare(b.caminhoRelativo);
  });
  
  const hoje = new Date().toISOString().split('T')[0];
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  arquivosIndexar.forEach((arquivo, index) => {
    const url = gerarURL(arquivo);
    
    // Prioridade dinâmica
    let priority = '0.7';
    let changefreq = 'monthly';
    
    if (arquivo.caminhoRelativo === 'index.html') {
      priority = '1.0';
      changefreq = 'weekly';
    } else if (arquivo.caminhoRelativo.startsWith('en/')) {
      priority = '0.9';
      changefreq = 'weekly';
    } else if (CONFIG.IDIOMAS_PRINCIPAIS.includes(arquivo.caminhoRelativo.split('/')[0])) {
      priority = '0.8';
      changefreq = 'monthly';
    }
    
    xml += `  <url>\n`;
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${hoje}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
    
    if ((index + 1) % 10 === 0) {
      log(`${index + 1}/${arquivosIndexar.length} URLs processadas`, 'info');
    }
  });
  
  xml += '</urlset>';
  
  // Salvar sitemap LIMPO
  fs.writeFileSync('sitemap.xml', xml, 'utf8');
  log(`Sitemap criado com ${arquivosIndexar.length} URLs`, 'success');
  
  // Mostrar estatísticas
  console.log('\n📊 ESTATÍSTICAS DO SITEMAP:');
  console.log('='.repeat(50));
  CONFIG.IDIOMAS_PRINCIPAIS.forEach(idioma => {
    const count = arquivosIndexar.filter(a => a.caminhoRelativo.startsWith(idioma + '/')).length;
    console.log(`${idioma.toUpperCase()}: ${count} páginas`);
  });
  
  return arquivosIndexar.length;
}

// Criar robots.txt otimizado
function criarRobotsTxt() {
  const robots = `# robots.txt gerado automaticamente
User-agent: *
Allow: /
Disallow: /backup/
Disallow: /backup_seo/
Disallow: /backup_seo_recursivo/
Disallow: /backup_automatico/
Disallow: /teste/
Disallow: /test/
Disallow: /weight-loss-quiz/
Disallow: /search/
Disallow: /page/

Sitemap: ${CONFIG.SITE_URL}/sitemap.xml

# Google específico
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Googlebot-Image
Allow: /
Disallow: /backup/

# Bing
User-agent: Bingbot
Allow: /
Crawl-delay: 2

# Outros bots
User-agent: *
Disallow: /backup/`;
  
  fs.writeFileSync('robots.txt', robots, 'utf8');
  log('robots.txt criado/atualizado', 'success');
}

// ========== EXECUÇÃO PRINCIPAL ==========
async function main() {
  console.log('='.repeat(60));
  console.log('🚨 CORREÇÃO SEO URGENTE - 42 PÁGINAS NÃO INDEXADAS');
  console.log('='.repeat(60));
  
  // 1. ENCONTRAR ARQUIVOS
  log('Buscando arquivos index.html...', 'info');
  const arquivos = encontrarArquivosHTML();
  
  if (arquivos.length === 0) {
    log('Nenhum index.html encontrado!', 'error');
    return;
  }
  log(`Encontrados ${arquivos.length} arquivos index.html`, 'success');
  
  // 2. CRIAR BACKUP DO SITEMAP ATUAL
  if (fs.existsSync('sitemap.xml')) {
    const backupName = `sitemap_backup_${Date.now()}.xml`;
    fs.copyFileSync('sitemap.xml', backupName);
    log(`Backup do sitemap salvo como: ${backupName}`, 'warning');
  }
  
  // 3. CORRIGIR CANONICAL EM TODOS
  log('Corrigindo canonical e meta tags...', 'info');
  let corrigidos = 0;
  
  arquivos.forEach((arquivo, index) => {
    const urlCorreta = gerarURL(arquivo);
    
    if (corrigirCanonical(arquivo.caminhoCompleto, urlCorreta)) {
      corrigidos++;
      if (corrigidos <= 10) { // Mostrar apenas primeiros 10
        log(`✓ ${arquivo.caminhoRelativo}`, 'success');
      }
    }
    
    if ((index + 1) % 20 === 0) {
      console.log(`Processados ${index + 1}/${arquivos.length} arquivos...`);
    }
  });
  
  log(`Total corrigidos: ${corrigidos}/${arquivos.length}`, 'success');
  
  // 4. CRIAR SITEMAP LIMPO
  const totalSitemap = criarSitemapLimpo(arquivos);
  
  // 5. CRIAR ROBOTS.TXT
  criarRobotsTxt();
  
  // 6. VERIFICAÇÃO RÁPIDA
  console.log('\n🔍 VERIFICAÇÃO RÁPIDA:');
  console.log('='.repeat(50));
  
  const paginasTeste = [
    'index.html',
    'en/index.html',
    'en/keton-aktiv-review/index.html',
    'pt/index.html',
    'es/index.html'
  ];
  
  paginasTeste.forEach(pagina => {
    const caminho = path.join(CONFIG.PASTA_RAIZ, pagina);
    if (fs.existsSync(caminho)) {
      const conteudo = fs.readFileSync(caminho, 'utf8');
      const url = gerarURL({ caminhoRelativo: pagina });
      
      const temCanonical = conteudo.includes(`href="${url}"`);
      const temNoindex = conteudo.includes('noindex');
      
      console.log(`${pagina}:`);
      console.log(`  Canonical correto? ${temCanonical ? '✅' : '❌'}`);
      console.log(`  Sem noindex? ${!temNoindex ? '✅' : '❌'}`);
      console.log(`  URL: ${url}`);
    }
  });
  
  // RELATÓRIO FINAL
  console.log('\n' + '='.repeat(60));
  console.log('📋 RELATÓRIO FINAL');
  console.log('='.repeat(60));
  console.log(`📁 Arquivos HTML: ${arquivos.length}`);
  console.log(`🔧 Canonical corrigidos: ${corrigidos}`);
  console.log(`🗺️ URLs no sitemap: ${totalSitemap}`);
  console.log(`🤖 robots.txt: Atualizado`);
  console.log(`📦 Backup sitemap: Criado`);
  
  console.log('\n👉 PRÓXIMOS PASSOS URGENTES:');
  console.log('1. ✅ Commit e push no GitHub');
  console.log('2. 🌐 Netlify faz deploy automático');
  console.log('3. 🔍 No Google Search Console:');
  console.log('   - REMOVER sitemap antigo');
  console.log('   - ADICIONAR novo: ' + CONFIG.SITE_URL + '/sitemap.xml');
  console.log('   - INSERIR nova: ' + CONFIG.SITE_URL + '/robots.txt');
  console.log('   - USAR "Inspeção de URL" em:');
  console.log('     • ' + CONFIG.SITE_URL + '/');
  console.log('     • ' + CONFIG.SITE_URL + '/en/');
  console.log('     • ' + CONFIG.SITE_URL + '/en/keton-aktiv-review/');
  console.log('4. 📈 Aguardar 3-7 dias para reindexação');
  console.log('='.repeat(60));
}

// Executar
main().catch(erro => {
  log(`ERRO: ${erro.message}`, 'error');
  console.error(erro);
});