// ===== BLOG COMPLETO (VERSÃO SIMPLIFICADA) =====
// Sistema que usa SEUS artigos do ARTICLES_DATABASE

// Configuração
const POSTS_PER_PAGE = 12;
const ARTICLE_FOLDER = 'en/';
let currentPage = 1;
let allPosts = [];

// ===== LISTA COMPLETA DE ARTIGOS (USE OS SEUS AQUI) =====
const ARTICLES_DATABASE = [
    // Artigo 1 (original, mantido como exemplo ou para ser substituído)
    {
        id: 1,
        title: "Prodentim Review - Complete Review and Honest Analysis",
        file: "prodentim-review/index.html",
        folder: "en/",
        excerpt: "Comprehensive analysis of Prodentim dental health supplement. Expert review of ingredients and effectiveness for oral microbiome support.",
        category: "Dental Health",
        author: "Dental Health Research Team",
        date: "2024-11-28",
        tags: ["oral health", "probiotics", "dental care"]
    },
    // ===== SEUS ARTIGOS REAIS COMEÇAM AQUI (a partir do ID 2) =====
    {
        id: 2,
        title: "Audifort Review: Unveiling the Truth About This Hearing Health Supplement",
        file: "audifort-review/index.html", // Use apenas UMA versão
        folder: "en/",
        excerpt: "Comprehensive review of the Audifort hearing health supplement. Analyzes its natural ingredients like Ginkgo Biloba and NAC, benefits for hearing clarity and tinnitus, and real user testimonials.",
        category: "Hearing Health",
        author: "Health Supplement Review Team",
        date: "2025-11-22", // Data extraída da URL
        tags: ["hearing supplement", "tinnitus", "auditory health", "natural ingredients", "ear care"]
    },
    {
        id: 3,
        title: "Brainson Review: Unlocking Your Brain's Full Potential",
        file: "brainson-review/index.html",
        folder: "en/",
        excerpt: "In-depth analysis of Brainson, a nootropic supplement designed to enhance memory, focus, and mental clarity. Examines key ingredients like Bacopa Monnieri and the science behind cognitive support.",
        category: "Brain Health",
        author: "Editorial Team",
        date: "2025-11-19",
        tags: ["nootropic", "brain boost", "memory", "focus", "mental clarity"]
    },
    {
        id: 4,
        title: "Mitolyn Review: Unveiling the Truth About This Breakthrough Supplement",
        file: "mitolyn-review/index.html",
        folder: "en/",
        excerpt: "Detailed review of Mitolyn, a supplement targeting cellular health and energy by supporting mitochondria. Covers ingredients like CoQ10 and PQQ, and their benefits for vitality and aging.",
        category: "Cellular Health & Longevity",
        author: "Health and Longevity Team",
        date: "2025-11-16",
        tags: ["mitochondria", "cellular energy", "anti-aging", "antioxidant", "coq10"]
    },
    {
        id: 5,
        title: "Nitric Boost Review: Complete Analysis of This Natural Nitric Oxide Supplement",
        file: "nitric-boost-review-complete-analysis/index.html",
        folder: "en/",
        excerpt: "Complete breakdown of Nitric Boost, a supplement aimed at enhancing nitric oxide production for better blood flow, athletic performance, and circulation using ingredients like L-Citrulline and Beet Root Extract.",
        category: "Fitness & Circulation",
        author: "Review Team",
        date: "2025-01-17",
        tags: ["nitric oxide", "blood flow", "workout performance", "circulation", "pre-workout"]
    },
    {
        id: 6,
        title: "Prostavive Review: Unveiling the Truth About This Prostate Health Supplement",
        file: "prostavive-review/index.html",
        folder: "en/",
        excerpt: "A thorough review of Prostavive, a natural supplement for prostate support. Evaluates ingredients like Saw Palmetto and Beta-Sitosterol for benefits on urinary flow and overall prostate wellness.",
        category: "Men's Health",
        author: "Health Review Team",
        date: "2025-11-17",
        tags: ["prostate health", "bph", "urinary flow", "saw palmetto", "men's wellness"]
    },
    {
        id: 7,
        title: "Detailed Analysis: Sleep Lean – The Secret to Losing Weight While You Sleep?",
        file: "sleep-lean-review/index.html",
        folder: "en/",
        excerpt: "Investigates Sleep Lean, a supplement that claims to promote weight loss during sleep by regulating stress hormones and metabolism with ingredients like Ashwagandha and microdosed Melatonin.",
        category: "Weight Loss & Sleep",
        author: "Analysis Team",
        date: "2025-08-23",
        tags: ["weight loss", "sleep aid", "burn fat", "cortisol", "appetite control"]
    },
    {
        id: 8,
        title: "Weight Loss Myths Truth",
        file: "weight-loss-myths-truth/index.html", // Nome do arquivo inferido
        folder: "en/",
        excerpt: "Debunks common misconceptions surrounding weight loss, separating fact from fiction to provide clearer strategies for effective and sustainable health management.",
        category: "Weight Loss",
        author: "Health Education Team",
        date: "2025-11-25", // Data assumida (ajuste conforme necessário)
        tags: ["weight loss myths", "diet truth", "fitness facts", "healthy living", "metabolism"]
    },
    {
        id: 9,
        title: "Natural Ways to Support Prostate Health and Well-Being",
        file: "natural-ways-to-support-prostate-health-and-well-being/index.html", // Nome do arquivo inferido
        folder: "en/",
        excerpt: "Explores natural methods, lifestyle changes, and supportive nutrients for maintaining prostate health and preventing common issues as men age.",
        category: "Men's Health",
        author: "Wellness Guides Team",
        date: "2025-11-24", // Data assumida
        tags: ["prostate support", "natural remedies", "men's health", "healthy aging", "nutrition"]
    },
    {
        id: 10,
        title: "Mastering Hearing Health: A Comprehensive Guide to Prevention and Care",
        file: "mastering-hearing-health-a-comprehensive-guide-to-prevention-and-care/index.html",
        folder: "en/",
        excerpt: "A complete guide to maintaining optimal hearing health, covering prevention strategies, daily care tips, and how to protect your ears from age-related decline and environmental damage.",
        category: "Hearing Health",
        author: "Auditory Health Specialists",
        date: "2025-11-26", // Data extraída da URL
        tags: ["hearing protection", "ear care", "prevention", "auditory wellness", "hearing loss"]
    }
    // O artigo duplicado "audifort-review-unleash-your-hearing-potential" e o 404 foram removidos.
    // PARA ADICIONAR MAIS ARTIGOS: copie o bloco acima e edite
];

// ===== FUNÇÕES PRINCIPAIS =====

// Inicializar blog
function initBlog() {
    console.log('🚀 Inicializando blog com', ARTICLES_DATABASE.length, 'artigos...');
    
    // Mostrar loading
    showLoading(true);
    
    // Processar artigos
    processArticles();
    
    // Ordenar por data (mais recente primeiro)
    allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Atualizar contador
    updateResultsInfo();
    
    // Renderizar posts
    renderPosts();
    
    // Renderizar paginação
    renderPagination();
    
    // Esconder loading
    showLoading(false);
    
    console.log(`✅ Blog inicializado com ${allPosts.length} artigos`);
}

// Processar artigos da database
function processArticles() {
    allPosts = ARTICLES_DATABASE.map(article => {
        // Garantir que o caminho está correto
        let filePath = article.file;
        
        // Se não começar com a pasta, adicionar
        if (!filePath.startsWith(article.folder)) {
            filePath = article.folder + filePath;
        }
        
        // Garantir que é um caminho válido
        filePath = filePath.replace(/\/\//g, '/');
        
        return {
            id: article.id,
            title: article.title,
            excerpt: article.excerpt,
            date: article.date,
            url: filePath,
            author: article.author,
            category: article.category || getCategoryFromTitle(article.title),
            tags: article.tags || [],
            target: '_self'
        };
    });
}

// Mostrar/esconder loading
function showLoading(show) {
    const loadingState = document.getElementById('loadingState');
    const postsGrid = document.getElementById('postsGrid');
    
    if (loadingState) {
        loadingState.style.display = show ? 'block' : 'none';
    }
    
    if (postsGrid) {
        postsGrid.style.display = show ? 'none' : 'grid';
    }
}

// Obter categoria do título (fallback)
function getCategoryFromTitle(title) {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('review')) return 'Product Review';
    if (titleLower.includes('supplement')) return 'Supplements';
    if (titleLower.includes('health')) return 'Health';
    if (titleLower.includes('aging') || titleLower.includes('longevity')) return 'Longevity';
    if (titleLower.includes('vitamin') || titleLower.includes('diet')) return 'Nutrition';
    if (titleLower.includes('workout') || titleLower.includes('exercise')) return 'Fitness';
    if (titleLower.includes('hearing') || titleLower.includes('auditory')) return 'Hearing Health';
    if (titleLower.includes('mental') || titleLower.includes('stress')) return 'Mental Health';
    if (titleLower.includes('sleep')) return 'Sleep Health';
    return 'Wellness';
}

// Atualizar contador
function updateResultsInfo() {
    const element = document.getElementById('resultsInfo');
    if (!element) return;
    
    const total = allPosts.length;
    const start = (currentPage - 1) * POSTS_PER_PAGE + 1;
    const end = Math.min(currentPage * POSTS_PER_PAGE, total);
    
    element.innerHTML = `
        
    `;
}

// Renderizar posts com design melhorado (SEM FEATURED)
function renderPosts() {
    const container = document.getElementById('postsGrid');
    if (!container) {
        console.error('❌ Elemento #postsGrid não encontrado!');
        return;
    }
    
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const postsToShow = allPosts.slice(startIndex, endIndex);
    
    // Se não houver posts
    if (postsToShow.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">📝</div>
                <h3>No articles published yet</h3>
                <p>Articles will appear here when added to the database.</p>
            </div>
        `;
        return;
    }
    
    // Gerar HTML dos posts
    let html = '';
    
    postsToShow.forEach((post) => {
        const dateObj = new Date(post.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        
        // Tags como string
        const tagsHtml = post.tags && post.tags.length > 0 
            ? `<div class="post-tags">${post.tags.slice(0, 3).map(tag => `<span class="tag">#${tag}</span>`).join('')}</div>`
            : '';
        
        html += `
            <div class="post-card" data-id="${post.id}">
                <div class="post-header">
                    <span class="post-category">${post.category}</span>
                </div>
                
                <div class="post-content">
                    <h3 class="post-title">
                        <a href="${post.url}" target="${post.target}">
                            ${post.title}
                        </a>
                    </h3>
                    
                    <p class="post-excerpt">${post.excerpt}</p>
                    
                    ${tagsHtml}
                    
                    <div class="post-meta">
                        <div class="post-author">
                            <span class="author-icon">👤</span>
                            <span>${post.author}</span>
                        </div>
                        <div class="post-date">
                            <span class="date-icon">📅</span>
                            <span>${formattedDate}</span>
                        </div>
                    </div>
                    
                    <div class="post-actions">
                        <a href="${post.url}" class="read-more-btn" target="${post.target}">
                            Read Full Article →
                        </a>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Compartilhar artigo (opcional)
function shareArticle(articleId) {
    const article = allPosts.find(post => post.id === articleId);
    if (!article) return;
    
    const shareData = {
        title: article.title,
        text: article.excerpt,
        url: window.location.origin + '/' + article.url
    };
    
    if (navigator.share) {
        navigator.share(shareData);
    } else {
        // Fallback: copiar link
        navigator.clipboard.writeText(shareData.url).then(() => {
            alert('Link copied to clipboard!');
        });
    }
}

// Renderizar paginação
function renderPagination() {
    const container = document.getElementById('pagination');
    if (!container) return;
    
    const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
    
    // Se só tiver 1 página
    if (totalPages <= 1) {
        container.innerHTML = `
            <div class="pagination-info">
                Page 1 of 1 • ${allPosts.length} articles
            </div>
        `;
        return;
    }
    
    let html = '<div class="pagination-container">';
    
    // Botão anterior
    if (currentPage > 1) {
        html += `
            <button class="pagination-btn prev-btn" onclick="changePage(${currentPage - 1})">
                ← Previous
            </button>
        `;
    }
    
    // Números das páginas
    html += '<div class="page-numbers">';
    
    // Primeira página
    if (currentPage > 2) {
        html += `<button class="page-number" onclick="changePage(1)">1</button>`;
        if (currentPage > 3) html += '<span class="page-dots">...</span>';
    }
    
    // Páginas ao redor
    for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
        html += `
            <button class="page-number ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">
                ${i}
            </button>
        `;
    }
    
    // Última página
    if (currentPage < totalPages - 1) {
        if (currentPage < totalPages - 2) html += '<span class="page-dots">...</span>';
        html += `<button class="page-number" onclick="changePage(${totalPages})">${totalPages}</button>`;
    }
    
    html += '</div>';
    
    // Botão próximo
    if (currentPage < totalPages) {
        html += `
            <button class="pagination-btn next-btn" onclick="changePage(${currentPage + 1})">
                Next →
            </button>
        `;
    }
    
    html += '</div>';
    container.innerHTML = html;
}

// Mudar de página
function changePage(page) {
    currentPage = page;
    renderPosts();
    renderPagination();
    updateResultsInfo();
    
    // Scroll suave
    const postsGrid = document.getElementById('postsGrid');
    if (postsGrid) {
        postsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('postsGrid')) {
        // Iniciar com pequeno delay para melhor UX
        setTimeout(() => {
            initBlog();
        }, 300);
    }
});

// Expor funções globalmente
window.changePage = changePage;
window.shareArticle = shareArticle; 