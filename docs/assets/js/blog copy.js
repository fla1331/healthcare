// ===== BLOG COMPLETO  =====
// Sistema inteligente com lista de artigos embutida

// Configuração
const POSTS_PER_PAGE = 12;
const ARTICLE_FOLDER = 'en/';
let currentPage = 1;
let allPosts = [];
let isLocalFile = window.location.protocol === 'file:';

// ===== LISTA COMPLETA DE ARTIGOS =====
const ARTICLES_DATABASE = [
    {
        id: 1,
        title: "Prodentim Review - Complete Review and Honest Analysis 2026",
        file: "prodentim-review.html",
        folder: "en/",
        excerpt: "Comprehensive analysis of Prodentim dental health supplement. Expert review of ingredients and effectiveness for oral microbiome support.",
        category: "Dental Health",
        author: "Dental Health Research Team",
        date: "2025-11-28",
        read_time: "8 min read",
        featured: true,
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
        date: "2025-11-27",
        read_time: "10 min read",
        featured: true,
        tags: ["ketosis", "weight loss", "fat burning"]
    },
    {
        id: 3,
        title: "Mastering Hearing Health: A Comprehensive Guide to Prevention and Care",
        file: "mastering-hearing-health-a-comprehensive-guide-to-prevention-and-care.html",
        folder: "en/",
        excerpt: "Complete guide to maintaining optimal hearing health. Prevention tips, care strategies, and latest research on auditory wellness.",
        category: "Hearing Health",
        author: "Auditory Health Specialists",
        date: "2025-11-26",
        read_time: "12 min read",
        featured: true,
        tags: ["hearing", "auditory health", "prevention"]
    },
    {
        id: 4,
        title: "Top 5 Anti-Aging Hacks to Boost Your Longevity Today",
        file: "top-5-anti-aging-hacks.html",
        folder: "en/",
        excerpt: "Discover scientifically proven strategies to slow down aging and boost longevity. Simple hacks you can implement immediately.",
        category: "Longevity",
        author: "Longevity Research Team",
        date: "2025-11-25",
        read_time: "7 min read",
        featured: false,
        tags: ["anti-aging", "longevity", "wellness"]
    },
    {
        id: 5,
        title: "The Undeniable Benefits of Daily Vitamin C Intake",
        file: "benefits-of-vitamin-c.html",
        folder: "en/",
        excerpt: "Comprehensive guide to Vitamin C benefits for immunity, skin health, and overall wellness. Dosage recommendations and sources.",
        category: "Nutrition",
        author: "Nutrition Science Team",
        date: "2025-11-24",
        read_time: "6 min read",
        featured: false,
        tags: ["vitamin c", "immunity", "nutrition"]
    },
    {
        id: 6,
        title: "The Best 3 Workout Routines for Seniors",
        file: "best-workout-routines-for-seniors.html",
        folder: "en/",
        excerpt: "Safe and effective exercise routines specifically designed for seniors. Improve mobility, strength, and overall health.",
        category: "Fitness",
        author: "Senior Fitness Experts",
        date: "2025-11-23",
        read_time: "9 min read",
        featured: false,
        tags: ["senior fitness", "exercise", "mobility"]
    },
    {
        id: 7,
        title: "Audifort Review: Unveiling the Truth About This Hearing Health Supplement",
        file: "audifort-review-unveiling-the-truth-about-this-hearing-health-supplement/",
        folder: "en/",
        excerpt: "Detailed review of Audifort hearing health supplement. Analysis of ingredients, benefits, user experiences, and scientific evidence.",
        category: "Hearing Health",
        author: "Health Supplement Review Team",
        date: "2025-11-22",
        read_time: "11 min read",
        featured: true,
        tags: ["hearing supplement", "tinnitus", "auditory support"]
    },
    {
        id: 8,
        title: "Stress Management Techniques That Actually Work",
        file: "stress-management.html",
        folder: "en/",
        excerpt: "Evidence-based stress management techniques for modern life. From mindfulness to lifestyle changes that make a difference.",
        category: "Mental Health",
        author: "Mental Wellness Experts",
        date: "2025-11-21",
        read_time: "8 min read",
        featured: false,
        tags: ["stress", "mental health", "mindfulness"]
    },
    {
        id: 9,
        title: "Vitamin D Deficiency: Symptoms and Solutions",
        file: "vitamin-d-deficiency.html",
        folder: "en/",
        excerpt: "Complete guide to Vitamin D deficiency: symptoms, risks, testing, and effective solutions for optimal levels.",
        category: "Nutrition",
        author: "Vitamin Research Team",
        date: "2025-11-20",
        read_time: "7 min read",
        featured: false,
        tags: ["vitamin d", "deficiency", "sunlight"]
    },
    {
        id: 10,
        title: "How to Improve Sleep Quality Naturally",
        file: "improve-sleep-quality.html",
        folder: "en/",
        excerpt: "Natural methods to improve sleep quality without medication. Sleep hygiene, relaxation techniques, and lifestyle adjustments.",
        category: "Sleep Health",
        author: "Sleep Science Team",
        date: "2025-11-19",
        read_time: "6 min read",
        featured: false,
        tags: ["sleep", "insomnia", "rest"]
    },
    // Adicione MAIS ARTIGOS AQUI seguindo o mesmo formato
    // Basta copiar e colar um bloco abaixo e modificar
    {
        id: 11,
        title: "The Power of Omega-3 for Brain Health",
        file: "omega-3-brain-health.html",
        folder: "en/",
        excerpt: "How Omega-3 fatty acids support brain function, memory, and cognitive health throughout life.",
        category: "Brain Health",
        author: "Neuroscience Research Team",
        date: "2025-11-18",
        read_time: "5 min read",
        featured: false,
        tags: ["omega-3", "brain health", "cognitive function"]
    },
    {
        id: 12,
        title: "Natural Ways to Lower Blood Pressure",
        file: "natural-lower-blood-pressure.html",
        folder: "en/",
        excerpt: "Effective natural strategies to manage and lower blood pressure without medication.",
        category: "Heart Health",
        author: "Cardiovascular Health Team",
        date: "2025-11-17",
        read_time: "8 min read",
        featured: false,
        tags: ["blood pressure", "heart health", "hypertension"]
    },
    {
        id: 13,
        title: "Gut Health: The Foundation of Overall Wellness",
        file: "gut-health-foundation.html",
        folder: "en/",
        excerpt: "Why gut health is crucial for immunity, mood, and overall health. How to improve your gut microbiome.",
        category: "Digestive Health",
        author: "Gut Health Specialists",
        date: "2025-11-16",
        read_time: "9 min read",
        featured: false,
        tags: ["gut health", "microbiome", "digestion"]
    },
    {
        id: 14,
        title: "Blue Light Exposure: Effects and Protection",
        file: "blue-light-effects-protection.html",
        folder: "en/",
        excerpt: "Understanding blue light effects on sleep and eyesight, and how to protect yourself effectively.",
        category: "Eye Health",
        author: "Vision Care Experts",
        date: "2025-11-15",
        read_time: "7 min read",
        featured: false,
        tags: ["blue light", "eye health", "sleep"]
    },
    {
        id: 15,
        title: "Intermittent Fasting for Beginners",
        file: "intermittent-fasting-beginners.html",
        folder: "en/",
        excerpt: "Complete beginner's guide to intermittent fasting. Methods, benefits, and common mistakes to avoid.",
        category: "Nutrition",
        author: "Fasting Research Team",
        date: "2025-11-14",
        read_time: "10 min read",
        featured: false,
        tags: ["intermittent fasting", "weight loss", "metabolism"]
    },
    {
        id: 16,
        title: "The Benefits of Strength Training After 50",
        file: "strength-training-after-50.html",
        folder: "en/",
        excerpt: "Why strength training is essential after 50 and how to do it safely for maximum benefits.",
        category: "Fitness",
        author: "Senior Fitness Specialists",
        date: "2025-11-13",
        read_time: "8 min read",
        featured: false,
        tags: ["strength training", "aging", "muscle mass"]
    },
    {
        id: 17,
        title: "Natural Allergy Relief Remedies",
        file: "natural-allergy-relief.html",
        folder: "en/",
        excerpt: "Effective natural remedies to relieve allergy symptoms without harsh medications.",
        category: "Allergy",
        author: "Natural Health Team",
        date: "2025-11-12",
        read_time: "6 min read",
        featured: false,
        tags: ["allergies", "natural remedies", "immune system"]
    },
    {
        id: 18,
        title: "The Science of Hydration",
        file: "science-of-hydration.html",
        folder: "en/",
        excerpt: "How proper hydration affects every aspect of your health and performance.",
        category: "Nutrition",
        author: "Hydration Research Team",
        date: "2025-11-11",
        read_time: "5 min read",
        featured: false,
        tags: ["hydration", "water", "health"]
    },
    {
        id: 19,
        title: "Managing Arthritis Pain Naturally",
        file: "managing-arthritis-pain.html",
        folder: "en/",
        excerpt: "Natural approaches to manage arthritis pain and improve joint health.",
        category: "Joint Health",
        author: "Arthritis Care Team",
        date: "2025-11-10",
        read_time: "7 min read",
        featured: false,
        tags: ["arthritis", "joint pain", "natural pain relief"]
    },
    {
        id: 20,
        title: "The Mediterranean Diet: Complete Guide",
        file: "mediterranean-diet-guide.html",
        folder: "en/",
        excerpt: "Everything you need to know about the Mediterranean diet for longevity and heart health.",
        category: "Nutrition",
        author: "Dietary Science Team",
        date: "2025-11-09",
        read_time: "12 min read",
        featured: true,
        tags: ["mediterranean diet", "heart health", "longevity"]
    }
    // Para adicionar mais artigos, cole aqui seguindo o formato acima
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
    
    // Renderizar artigos em destaque
    renderFeaturedPosts();
    
    // Esconder loading
    showLoading(false);
    
    // Adicionar botão de adicionar artigo (apenas em desenvolvimento)
    if (isLocalFile) {
        addDevTools();
    }
    
    console.log(`✅ Blog inicializado com ${allPosts.length} artigos`);
}

// Processar artigos da database
function processArticles() {
    allPosts = ARTICLES_DATABASE.map(article => {
        // Corrigir caminho para local ou servidor
        let filePath = article.file;
        
        // Se for subpasta, garantir caminho correto
        if (filePath.includes('/') && !filePath.startsWith(article.folder)) {
            filePath = article.folder + filePath;
        } else if (!filePath.startsWith(article.folder)) {
            filePath = article.folder + filePath;
        }
        
        // Remover barras duplas
        filePath = filePath.replace(/\/\//g, '/');
        
        // Corrigir URL para modo local
        if (isLocalFile) {
            // Se estiver em subdiretório, ajustar caminho
            const currentPath = window.location.pathname;
            if (currentPath.includes('/en/')) {
                // Se já estiver dentro de /en/, usar caminho relativo
                if (filePath.startsWith('en/')) {
                    filePath = filePath.replace('en/', '');
                }
            }
        }
        
        return {
            id: article.id,
            title: article.title,
            excerpt: article.excerpt,
            date: article.date,
            url: filePath,
            read_time: article.read_time || estimateReadTime(article.title),
            author: article.author,
            featured: article.featured || false,
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

// Estimar tempo de leitura
function estimateReadTime(title) {
    const wordCount = title.split(' ').length;
    if (wordCount > 20) return '10 min read';
    if (wordCount > 15) return '8 min read';
    if (wordCount > 10) return '6 min read';
    return '4 min read';
}

// Obter categoria do título
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
        <span class="result-count">📚 ${total} English Articles</span>
        <span class="result-range">Showing ${start}-${end} of ${total}</span>
        <span class="result-updated">Updated: ${new Date().toLocaleDateString()}</span>
    `;
}

// Renderizar posts com design melhorado
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
                <div style="margin-top: 20px;">
                    <button onclick="showAddArticleForm()" class="btn-primary">
                        + Add New Article
                    </button>
                </div>
            </div>
        `;
        return;
    }
    
    // Gerar HTML dos posts
    let html = '';
    
    postsToShow.forEach((post, index) => {
        const isFeatured = post.featured;
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
            <div class="post-card ${isFeatured ? 'featured-post' : ''}" data-id="${post.id}">
                ${isFeatured ? '<div class="featured-badge">⭐ Featured</div>' : ''}
                
                <div class="post-header">
                    <span class="post-category">${post.category}</span>
                    <span class="post-readtime">${post.read_time}</span>
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
                        <button class="share-btn" onclick="shareArticle(${post.id})" title="Share this article">
                            📤 Share
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Renderizar artigos em destaque
function renderFeaturedPosts() {
    const container = document.getElementById('featuredGrid');
    if (!container) return;
    
    const featuredPosts = allPosts.filter(post => post.featured).slice(0, 4);
    
    if (featuredPosts.length === 0) return;
    
    let html = '';
    
    featuredPosts.forEach(post => {
        html += `
            <div class="post-card featured-post">
                <div class="featured-badge">⭐ Featured</div>
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
                    <div class="post-footer">
                        <a href="${post.url}" class="read-more-btn" target="${post.target}">
                            Read Now →
                        </a>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Compartilhar artigo
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

// Adicionar ferramentas de desenvolvimento
function addDevTools() {
    const devTools = document.createElement('div');
    devTools.className = 'dev-tools';
    devTools.innerHTML = `
        <div class="dev-tools-header">
            <span>🛠️ Developer Tools</span>
            <button onclick="this.parentElement.parentElement.style.display='none'">×</button>
        </div>
        <div class="dev-tools-body">
            <button onclick="showAddArticleForm()">+ Add New Article</button>
            <button onclick="exportArticles()">📥 Export Articles</button>
            <button onclick="importArticles()">📤 Import Articles</button>
            <button onclick="generateDemoArticles()">🎲 Generate Demo</button>
            <div class="dev-stats">
                Articles: ${allPosts.length}<br>
                Featured: ${allPosts.filter(p => p.featured).length}<br>
                Categories: ${[...new Set(allPosts.map(p => p.category))].length}
            </div>
        </div>
    `;
    document.body.appendChild(devTools);
}

// Mostrar formulário para adicionar artigo
function showAddArticleForm() {
    const formHtml = `
        <div id="addArticleModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>➕ Add New Article</h3>
                    <button onclick="closeModal()">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Title:</label>
                        <input type="text" id="articleTitle" placeholder="Article Title">
                    </div>
                    <div class="form-group">
                        <label>File Name:</label>
                        <input type="text" id="articleFile" placeholder="folder/filename.html">
                    </div>
                    <div class="form-group">
                        <label>Excerpt:</label>
                        <textarea id="articleExcerpt" placeholder="Brief description..."></textarea>
                    </div>
                    <div class="form-group">
                        <label>Category:</label>
                        <input type="text" id="articleCategory" placeholder="Health, Nutrition, etc.">
                    </div>
                    <div class="form-group">
                        <label>Author:</label>
                        <input type="text" id="articleAuthor" value="Health Research Team">
                    </div>
                    <div class="form-group">
                        <label>Featured:</label>
                        <input type="checkbox" id="articleFeatured">
                    </div>
                </div>
                <div class="modal-footer">
                    <button onclick="addNewArticle()" class="btn-primary">Add Article</button>
                    <button onclick="closeModal()" class="btn-secondary">Cancel</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', formHtml);
}

// Adicionar novo artigo
function addNewArticle() {
    const title = document.getElementById('articleTitle').value;
    const file = document.getElementById('articleFile').value;
    const excerpt = document.getElementById('articleExcerpt').value;
    const category = document.getElementById('articleCategory').value;
    const author = document.getElementById('articleAuthor').value;
    const featured = document.getElementById('articleFeatured').checked;
    
    if (!title || !file) {
        alert('Please fill in title and file name');
        return;
    }
    
    const newArticle = {
        id: ARTICLES_DATABASE.length + 1,
        title: title,
        file: file,
        folder: "en/",
        excerpt: excerpt || `Read our comprehensive guide: ${title}`,
        category: category || getCategoryFromTitle(title),
        author: author,
        date: new Date().toISOString().split('T')[0],
        read_time: estimateReadTime(title),
        featured: featured,
        tags: []
    };
    
    // Adicionar ao database
    ARTICLES_DATABASE.push(newArticle);
    
    // Atualizar blog
    processArticles();
    allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    renderPosts();
    renderPagination();
    updateResultsInfo();
    renderFeaturedPosts();
    
    // Fechar modal
    closeModal();
    
    alert('Article added successfully!');
}

// Fechar modal
function closeModal() {
    const modal = document.getElementById('addArticleModal');
    if (modal) modal.remove();
}

// Exportar artigos
function exportArticles() {
    const dataStr = JSON.stringify(ARTICLES_DATABASE, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'articles-export.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Importar artigos (placeholder)
function importArticles() {
    alert('Import feature would go here. For now, edit ARTICLES_DATABASE in blog.js');
}

// Gerar artigos de demonstração
function generateDemoArticles() {
    const demoCount = 5;
    const categories = ['Nutrition', 'Fitness', 'Mental Health', 'Sleep', 'Wellness'];
    const authors = ['Health Team', 'Research Staff', 'Expert Panel', 'Medical Board'];
    
    for (let i = 1; i <= demoCount; i++) {
        const newId = ARTICLES_DATABASE.length + 1;
        const category = categories[Math.floor(Math.random() * categories.length)];
        
        ARTICLES_DATABASE.push({
            id: newId,
            title: `Demo Article ${i}: ${category} Insights`,
            file: `demo-article-${i}.html`,
            folder: "en/",
            excerpt: `This is a demo article about ${category.toLowerCase()}. Generated for testing purposes.`,
            category: category,
            author: authors[Math.floor(Math.random() * authors.length)],
            date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
            read_time: '5 min read',
            featured: i === 1,
            tags: ['demo', 'test', category.toLowerCase()]
        });
    }
    
    // Atualizar blog
    processArticles();
    allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    renderPosts();
    renderPagination();
    updateResultsInfo();
    renderFeaturedPosts();
    
    alert(`${demoCount} demo articles added!`);
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
window.showAddArticleForm = showAddArticleForm;
window.addNewArticle = addNewArticle;
window.closeModal = closeModal;
window.exportArticles = exportArticles;
window.importArticles = importArticles;
window.generateDemoArticles = generateDemoArticles;