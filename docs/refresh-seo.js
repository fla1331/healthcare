// ====================================================
// CORREÇÃO SEO URGENTE - SITEMAP LIMPO + CANONICAL
// VERSÃO QUE JÁ FUNCIONOU + CORREÇÃO SITEMAP
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
  const prefixos = { info: '📝', success: '✅', error: '❌', warning: '⚠️', sitemap: '🗺️' };
  console.log(`${prefixos[tipo] || '📝'} ${mensagem}`);
}

// ========== FUNÇÃO NOVA: FIX SITEMAP CORROMPIDO ==========
function fixSitemapCorrompido() {
  console.log('🔧 Verificando sitemap corrompido...');
  
  if (!fs.existsSync('sitemap.xml')) {
    console.log('❌ sitemap.xml não existe');
    return false;
  }
  
  try {
    const conteudo = fs.readFileSync('sitemap.xml', 'utf8');
    
    // 1. Remover TUDO depois do primeiro </urlset>
    const partes = conteudo.split('</urlset>');
    if (partes.length > 1) {
      console.log('⚠️ Encontrado sitemap duplicado! Limpando...');
    }
    
    let conteudoLimpo = partes[0] + '</urlset>';
    
    // 2. Remover namespace ns0:
    conteudoLimpo = conteudoLimpo.replace(/ns0:/g, '');
    
    // 3. Corrigir tags quebradas - método SIMPLES
    // Encontrar linhas com <loc> que não têm <url> antes
    const linhas = conteudoLimpo.split('\n');
    let resultado = [];
    
    for (let i = 0; i < linhas.length; i++) {
      const linha = linhas[i];
      
      // Se a linha tem <loc> e a linha anterior NÃO tem <url>
      if (linha.includes('<loc>') && 
          (i === 0 || !linhas[i-1].includes('<url>'))) {
        console.log(`⚠️ Corrigindo linha ${i+1}: <loc> sem <url>`);
        resultado.push('  <url>');
        resultado.push(linha);
        
        // Adicionar próximas tags (lastmod, changefreq, priority)
        for (let j = i + 1; j < Math.min(i + 4, linhas.length); j++) {
          if (linhas[j].includes('</url>') || linhas[j].includes('<loc>')) {
            break;
          }
          resultado.push(linhas[j]);
        }
        
        resultado.push('  </url>');
      } 
      else if (!linha.includes('<loc>') || 
               (i > 0 && linhas[i-1].includes('<url>'))) {
        resultado.push(linha);
      }
    }
    
    // Juntar tudo
    let xmlCorrigido = resultado.join('\n');
    
    // Remover linhas vazias duplicadas
    xmlCorrigido = xmlCorrigido.split('\n')
      .filter((line, index, arr) => {
        if (line.trim() === '' && arr[index + 1] && arr[index + 1].trim() === '') {
          return false;
        }
        return true;
      })
      .join('\n');
    
    // Salvar
    fs.writeFileSync('sitemap.xml', xmlCorrigido, 'utf8');
    
    // Contar URLs
    const count = (xmlCorrigido.match(/<loc>/g) || []).length;
    console.log(`✅ Sitemap corrigido! ${count} URLs`);
    
    return true;
    
  } catch (erro) {
    console.log(`❌ Erro ao corrigir sitemap: ${erro.message}`);
    return false;
  }
}

// ========== FUNÇÕES ORIGINAIS (QUE JÁ FUNCIONAM) ==========
function encontrarArquivosHTML() {
  const arquivos = [];
  
  function buscar(pasta) {
    try {
      const itens = fs.readdirSync(pasta, { withFileTypes: true });
      
      for (const item of itens) {
        const caminhoCompleto = path.join(pasta, item.name);
        const relativo = path.relative(CONFIG.PASTA_RAIZ, caminhoCompleto).replace(/\\/g, '/');
        
        if (item.isDirectory()) {
          if (CONFIG.PASTAS_BLOQUEAR_SITEMAP.includes(item.name)) {
            log(`Ignorando pasta: ${relativo}`, 'warning');
            continue;
          }
          buscar(caminhoCompleto);
        } 
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

function deveIndexar(arquivoInfo) {
  const { caminhoRelativo } = arquivoInfo;
  
  for (const pasta of CONFIG.PASTAS_BLOQUEAR_SITEMAP) {
    if (caminhoRelativo.includes(pasta + '/')) {
      return false;
    }
  }
  
  for (const padrao of CONFIG.EXCLUIR_DO_INDEX) {
    if (typeof padrao === 'string' && caminhoRelativo.includes(padrao)) {
      return false;
    }
    if (padrao instanceof RegExp && padrao.test(caminhoRelativo)) {
      return false;
    }
  }
  
  const partes = caminhoRelativo.split('/');
  if (partes.length > 1 && partes[0] !== '') {
    if (!CONFIG.IDIOMAS_PRINCIPAIS.includes(partes[0])) {
      return false;
    }
  }
  
  return true;
}

function gerarURL(arquivoInfo) {
  const { caminhoRelativo } = arquivoInfo;
  
  if (caminhoRelativo === 'index.html') {
    return `${CONFIG.SITE_URL}/`;
  }
  
  const pasta = path.dirname(caminhoRelativo);
  return pasta === '.' ? `${CONFIG.SITE_URL}/` : `${CONFIG.SITE_URL}/${pasta}/`;
}

function corrigirCanonical(caminhoArquivo, urlCorreta) {
  try {
    const conteudo = fs.readFileSync(caminhoArquivo, 'utf8');
    const canonicalCorreto = `<link rel="canonical" href="${urlCorreta}" />`;
    const regexCanonical = /<link[^>]*rel=(["'])canonical\1[^>]*>/gi;
    
    let novoConteudo = conteudo;
    
    // Corrigir noindex
    if (conteudo.includes('noindex')) {
      novoConteudo = novoConteudo
        .replace(/content="noindex,follow"/gi, 'content="index,follow"')
        .replace(/content="noindex"/gi, 'content="index,follow"');
    }
    
    // Corrigir/Adicionar canonical
    if (regexCanonical.test(novoConteudo)) {
      novoConteudo = novoConteudo.replace(regexCanonical, canonicalCorreto);
    } else if (novoConteudo.includes('</head>')) {
      novoConteudo = novoConteudo.replace('</head>', `\n  ${canonicalCorreto}\n</head>`);
    }
    
    // Adicionar meta robots
    if (!novoConteudo.includes('name="robots"')) {
      const metaRobots = '<meta name="robots" content="index, follow, max-image-preview:large" />';
      novoConteudo = novoConteudo.replace('<head>', `<head>\n  ${metaRobots}`);
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

function criarSitemapLimpo(arquivosHTML) {
  log('Criando sitemap.xml LIMPO...', 'sitemap');
  
  // PRIMEIRO: Corrigir sitemap existente se estiver corrompido
  fixSitemapCorrompido();
  
  const arquivosIndexar = arquivosHTML.filter(deveIndexar);
  log(`${arquivosIndexar.length} páginas para indexar (de ${arquivosHTML.length} total)`, 'info');
  
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
  });
  
  xml += '</urlset>';
  
  fs.writeFileSync('sitemap.xml', xml, 'utf8');
  log(`Sitemap criado com ${arquivosIndexar.length} URLs`, 'success');
  
  console.log('\n📊 ESTATÍSTICAS:');
  console.log('='.repeat(50));
  CONFIG.IDIOMAS_PRINCIPAIS.forEach(idioma => {
    const count = arquivosIndexar.filter(a => a.caminhoRelativo.startsWith(idioma + '/')).length;
    console.log(`${idioma.toUpperCase()}: ${count} páginas`);
  });
  
  return arquivosIndexar.length;
}

function criarRobotsTxt() {
  const robots = `User-agent: *
Allow: /
Disallow: /backup/
Disallow: /backup_seo/
Disallow: /backup_seo_recursivo/
Disallow: /teste/
Disallow: /test/
Disallow: /weight-loss-quiz/
Disallow: /page/

Sitemap: ${CONFIG.SITE_URL}/sitemap.xml`;
  
  fs.writeFileSync('robots.txt', robots, 'utf8');
  log('robots.txt criado', 'success');
}

// ========== EXECUÇÃO PRINCIPAL ==========
async function main() {
  console.log('='.repeat(60));
  console.log('🚀 CORREÇÃO SEO - SITEMAP CORROMPIDO FIX');
  console.log('='.repeat(60));
  
  // 1. Corrigir sitemap primeiro
  console.log('\n🔧 PASSO 1: Corrigindo sitemap corrompido...');
  fixSitemapCorrompido();
  
  // 2. Buscar arquivos
  log('PASSO 2: Buscando arquivos...', 'info');
  const arquivos = encontrarArquivosHTML();
  
  if (arquivos.length === 0) {
    log('Nenhum arquivo!', 'error');
    return;
  }
  log(`Encontrados ${arquivos.length} arquivos`, 'success');
  
  // 3. Backup sitemap
  if (fs.existsSync('sitemap.xml')) {
    const backupName = `sitemap_backup_${Date.now()}.xml`;
    fs.copyFileSync('sitemap.xml', backupName);
    log(`Backup: ${backupName}`, 'warning');
  }
  
  // 4. Corrigir canonical
  log('PASSO 3: Corrigindo canonical...', 'info');
  let corrigidos = 0;
  
  arquivos.forEach((arquivo, index) => {
    if (corrigirCanonical(arquivo.caminhoCompleto, gerarURL(arquivo))) {
      corrigidos++;
      if (corrigidos <= 5) {
        log(`✓ ${arquivo.caminhoRelativo}`, 'success');
      }
    }
    
    if ((index + 1) % 50 === 0) {
      console.log(`Processados ${index + 1}/${arquivos.length}...`);
    }
  });
  
  log(`Corrigidos: ${corrigidos}/${arquivos.length}`, 'success');
  
  // 5. Criar sitemap limpo
  const totalSitemap = criarSitemapLimpo(arquivos);
  
  // 6. Criar robots.txt
  criarRobotsTxt();
  
  // 7. Verificação
  console.log('\n🔍 VERIFICAÇÃO RÁPIDA:');
  console.log('='.repeat(50));
  
  ['index.html', 'en/index.html', 'pt/index.html', 'es/index.html'].forEach(pagina => {
    const caminho = path.join(CONFIG.PASTA_RAIZ, pagina);
    if (fs.existsSync(caminho)) {
      const conteudo = fs.readFileSync(caminho, 'utf8');
      const url = gerarURL({ caminhoRelativo: pagina });
      const okCanonical = conteudo.includes(`href="${url}"`);
      const okNoindex = !conteudo.includes('noindex');
      console.log(`${pagina}: Canonical ${okCanonical ? '✅' : '❌'} | Noindex ${okNoindex ? '✅' : '❌'}`);
    }
  });
  
  // RELATÓRIO
  console.log('\n' + '='.repeat(60));
  console.log('📋 RELATÓRIO FINAL');
  console.log('='.repeat(60));
  console.log(`📁 Arquivos: ${arquivos.length}`);
  console.log(`🔧 Canonical: ${corrigidos} corrigidos`);
  console.log(`🗺️ Sitemap: ${totalSitemap} URLs`);
  console.log(`🤖 robots.txt: OK`);
  console.log('\n👉 Próximos passos:');
  console.log('1. git add .');
  console.log('2. git commit -m "Fix sitemap corrompido + canonical"');
  console.log('3. git push');
  console.log('4. Google Search Console: remover/add sitemap.xml');
  console.log('='.repeat(60));
}

// EXECUTAR
main().catch(erro => {
  console.log('❌ ERRO:', erro.message);
  console.error(erro);
});