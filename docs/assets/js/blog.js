// ===== BLOG COMPLETO (VERSÃO SIMPLIFICADA) =====
// Sistema que usa SEUS artigos do ARTICLES_DATABASE

// Configuração
const POSTS_PER_PAGE = 12;
const ARTICLE_FOLDER = 'en/';
let currentPage = 1;
let allPosts = [];

// ===== LISTA COMPLETA DE ARTIGOS (USE OS SEUS AQUI) =====
const ARTICLES_DATABASE = [
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
    {
        id: 2,
        title: "Keton Aktiv Review: The Truth About Ketosis and How to Burn Fat Fast",
        file: "keton-aktiv-review/index.html",
        folder: "en/",
        excerpt: "In-depth review of Keton Aktiv weight loss supplement. Does it really help with ketosis and fat burning? Scientific analysis and user experiences.",
        category: "Weight Loss",
        author: "Nutrition & Metabolism Experts",
        date: "2024-11-27",
        tags: ["ketosis", "weight loss", "fat burning"]
    },
    {
        id: 3,
        title: "Mastering Hearing Health: A Comprehensive Guide to Prevention and Care",
        file: "mastering-hearing-health-a-comprehensive-guide-to-prevention-and-care/index.html",
        folder: "en/",
        excerpt: "Complete guide to maintaining optimal hearing health. Prevention tips, care strategies, and latest research on auditory wellness.",
        category: "Hearing Health",
        author: "Auditory Health Specialists",
        date: "2024-11-26",
        tags: ["hearing", "auditory health", "prevention"]
    },
    {
        id: 4,
        title: "Top 5 Anti-Aging Hacks to Boost Your Longevity Today",
        file: "top-5-anti-aging-hacks/index.html",
        folder: "en/",
        excerpt: "Discover scientifically proven strategies to slow down aging and boost longevity. Simple hacks you can implement immediately.",
        category: "Longevity",
        author: "Longevity Research Team",
        date: "2024-11-25",
        tags: ["anti-aging", "longevity", "wellness"]
    },
    {
        id: 5,
        title: "The Undeniable Benefits of Daily Vitamin C Intake",
        file: "benefits-of-vitamin-c/index.html",
        folder: "en/",
        excerpt: "Comprehensive guide to Vitamin C benefits for immunity, skin health, and overall wellness. Dosage recommendations and sources.",
        category: "Nutrition",
        author: "Nutrition Science Team",
        date: "2024-11-24",
        tags: ["vitamin c", "immunity", "nutrition"]
    },
    {
        id: 6,
        title: "The Best 3 Workout Routines for Seniors",
        file: "best-workout-routines-for-seniors/index.html",
        folder: "en/",
        excerpt: "Safe and effective exercise routines specifically designed for seniors. Improve mobility, strength, and overall health.",
        category: "Fitness",
        author: "Senior Fitness Experts",
        date: "2024-11-23",
        tags: ["senior fitness", "exercise", "mobility"]
    },
    {
        id: 7,
        title: "Audifort Review: Unveiling the Truth About This Hearing Health Supplement",
        file: "audifort-review-unveiling-the-truth-about-this-hearing-health-supplement/index.html",
        folder: "en/",
        excerpt: "Detailed review of Audifort hearing health supplement. Analysis of ingredients, benefits, user experiences, and scientific evidence.",
        category: "Hearing Health",
        author: "Health Supplement Review Team",
        date: "2024-11-22",
        tags: ["hearing supplement", "tinnitus", "auditory support"]
    },
    {
        id: 8,
        title: "Stress Management Techniques That Actually Work",
        file: "stress-management/index.html",
        folder: "en/",
        excerpt: "Evidence-based stress management techniques for modern life. From mindfulness to lifestyle changes that make a difference.",
        category: "Mental Health",
        author: "Mental Wellness Experts",
        date: "2024-11-21",
        tags: ["stress", "mental health", "mindfulness"]
    },
    {
        id: 9,
        title: "Vitamin D Deficiency: Symptoms and Solutions",
        file: "vitamin-d-deficiency/index.html",
        folder: "en/",
        excerpt: "Complete guide to Vitamin D deficiency: symptoms, risks, testing, and effective solutions for optimal levels.",
        category: "Nutrition",
        author: "Vitamin Research Team",
        date: "2024-11-20",
        tags: ["vitamin d", "deficiency", "sunlight"]
    },
    {
        id: 10,
        title: "How to Improve Sleep Quality Naturally",
        file: "improve-sleep-quality/index.html",
        folder: "en/",
        excerpt: "Natural methods to improve sleep quality without medication. Sleep hygiene, relaxation techniques, and lifestyle adjustments.",
        category: "Sleep Health",
        author: "Sleep Science Team",
        date: "2024-11-19",
        tags: ["sleep", "insomnia", "rest"]
    },
    {
        id: 11,
        title: "The Power of Omega-3 for Brain Health",
        file: "omega-3-brain-health/index.html",
        folder: "en/",
        excerpt: "How Omega-3 fatty acids support brain function, memory, and cognitive health throughout life.",
        category: "Brain Health",
        author: "Neuroscience Research Team",
        date: "2024-11-18",
        tags: ["omega-3", "brain health", "cognitive function"]
    },
    {
        id: 12,
        title: "Natural Ways to Lower Blood Pressure",
        file: "natural-lower-blood-pressure/index.html",
        folder: "en/",
        excerpt: "Effective natural strategies to manage and lower blood pressure without medication.",
        category: "Heart Health",
        author: "Cardiovascular Health Team",
        date: "2024-11-17",
        tags: ["blood pressure", "heart health", "hypertension"]
    },
    {
        id: 13,
        title: "Gut Health: The Foundation of Overall Wellness",
        file: "gut-health-foundation/index.html",
        folder: "en/",
        excerpt: "Why gut health is crucial for immunity, mood, and overall health. How to improve your gut microbiome.",
        category: "Digestive Health",
        author: "Gut Health Specialists",
        date: "2024-11-16",
        tags: ["gut health", "microbiome", "digestion"]
    },
    {
        id: 14,
        title: "Blue Light Exposure: Effects and Protection",
        file: "blue-light-effects-protection/index.html",
        folder: "en/",
        excerpt: "Understanding blue light effects on sleep and eyesight, and how to protect yourself effectively.",
        category: "Eye Health",
        author: "Vision Care Experts",
        date: "2024-11-15",
        tags: ["blue light", "eye health", "sleep"]
    },
    {
        id: 15,
        title: "Intermittent Fasting for Beginners",
        file: "intermittent-fasting-beginners/index.html",
        folder: "en/",
        excerpt: "Complete beginner's guide to intermittent fasting. Methods, benefits, and common mistakes to avoid.",
        category: "Nutrition",
        author: "Fasting Research Team",
        date: "2024-11-14",
        tags: ["intermittent fasting", "weight loss", "metabolism"]
    },
    {
        id: 16,
        title: "The Benefits of Strength Training After 50",
        file: "strength-training-after-50/index.html",
        folder: "en/",
        excerpt: "Why strength training is essential after 50 and how to do it safely for maximum benefits.",
        category: "Fitness",
        author: "Senior Fitness Specialists",
        date: "2024-11-13",
        tags: ["strength training", "aging", "muscle mass"]
    },
    {
        id: 17,
        title: "Natural Allergy Relief Remedies",
        file: "natural-allergy-relief/index.html",
        folder: "en/",
        excerpt: "Effective natural remedies to relieve allergy symptoms without harsh medications.",
        category: "Allergy",
        author: "Natural Health Team",
        date: "2024-11-12",
        tags: ["allergies", "natural remedies", "immune system"]
    },
    {
        id: 18,
        title: "The Science of Hydration",
        file: "science-of-hydration/index.html",
        folder: "en/",
        excerpt: "How proper hydration affects every aspect of your health and performance.",
        category: "Nutrition",
        author: "Hydration Research Team",
        date: "2024-11-11",
        tags: ["hydration", "water", "health"]
    },
    {
        id: 19,
        title: "Managing Arthritis Pain Naturally",
        file: "managing-arthritis-pain/index.html",
        folder: "en/",
        excerpt: "Natural approaches to manage arthritis pain and improve joint health.",
        category: "Joint Health",
        author: "Arthritis Care Team",
        date: "2024-11-10",
        tags: ["arthritis", "joint pain", "natural pain relief"]
    },
    {
        id: 20,
        title: "The Mediterranean Diet: Complete Guide",
        file: "mediterranean-diet-guide/index.html",
        folder: "en/",
        excerpt: "Everything you need to know about the Mediterranean diet for longevity and heart health.",
        category: "Nutrition",
        author: "Dietary Science Team",
        date: "2024-11-09",
        tags: ["mediterranean diet", "heart health", "longevity"]
    }
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