// --- CONFIGURAÇÃO DE TEXTOS ---
const disclaimerTexts = {
    // Português (pt, pt-PT)
    'pt': {
        title: 'Aviso de Conteúdo Informativo:',
        text: 'Este artigo é uma <strong>análise de pesquisa de mercado e feedback de consumidores</strong> sobre o produto em questão. Ele não substitui o diagnóstico ou aconselhamento de um médico ou nutricionista. <strong>Sempre consulte um profissional de saúde qualificado antes de iniciar qualquer tratamento.</strong>',
        banner: {
            title: '⚠️ Aviso Importante sobre Saúde',
            text: 'As informações contidas neste site têm caráter meramente informativo. Consulte sempre um profissional de saúde qualificado antes de tomar qualquer decisão sobre sua saúde.',
            button: 'Entendi'
        }
    },
    // Inglês (en, en-US)
    'en': {
        title: 'Critical Content Warning:',
        text: 'This article is a <strong>market research and consumer feedback analysis</strong> about the product in question. It does not replace the diagnosis or advice of a doctor or nutritionist. <strong>Always consult a qualified health professional before starting any dietary supplement.</strong>',
        banner: {
            title: '⚠️ Important Health Notice',
            text: 'The information on this website is for informational purposes only. Always consult a qualified healthcare professional before making any health-related decisions.',
            button: 'I Understand'
        }
    },
    // Espanhol (es, es-ES)
    'es': {
        title: 'Advertencia de Contenido Crítico:',
        text: 'Este artículo es un <strong>análisis de investigación de mercado y comentarios de consumidores</strong> sobre el producto en cuestión. No reemplaza el diagnóstico ni el consejo de un médico o nutricionista. <strong>Consulte siempre a un profesional de la salud calificado antes de comenzar cualquier suplemento dietético.</strong>',
        banner: {
            title: '⚠️ Aviso Importante de Salud',
            text: 'La información en este sitio web es solo para fines informativos. Consulte siempre a un profesional de la salud calificado antes de tomar cualquier decisión relacionada con la salud.',
            button: 'Entendido'
        }
    }
    // ... outros idiomas
};

/**
 * Adiciona os estilos CSS para o disclaimer amarelo
 */
function addDisclaimerStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .eeat-disclaimer {
            padding: 16px; 
            background-color: #fffde7; /* Amarelo bem claro */
            border-left: 4px solid #ffd600; /* Amarelo mais forte */
            border-radius: 6px; 
            margin: 24px 0; 
            font-family: 'Inter', sans-serif; 
            max-width: 100%;
            box-shadow: 0 2px 8px rgba(255, 193, 7, 0.1);
        }
        
        .disclaimer-content {
            display: flex;
            align-items: flex-start;
        }
        
        .disclaimer-icon {
            flex-shrink: 0;
            color: #ff8f00; /* Amarelo laranjado */
            margin-top: 2px;
        }
        
        .disclaimer-text {
            margin-left: 12px;
            font-size: 0.95rem;
            color: #5d4037; /* Marrom escuro para contraste */
            line-height: 1.5;
        }
        
        .disclaimer-title {
            font-weight: 600;
            color: #e65100; /* Laranja escuro */
            margin-top: 0;
            margin-bottom: 4px;
        }
        
        .eeat-disclaimer strong {
            color: #ff6f00; /* Amarelo alaranjado para destaque */
        }
    `;
    document.head.appendChild(style);
}

/**
 * Injeta o disclaimer E-E-A-T específico logo após o H1
 */
function injectEEATDisclaimer() {
    const firstH1 = document.querySelector('h1');
    
    // Detecta o idioma
    const htmlLang = document.documentElement.lang.toLowerCase().substring(0, 2); 
    const content = disclaimerTexts[htmlLang] || disclaimerTexts['pt'];

    if (!firstH1 || !content) {
        return;
    }

    // CRIA O ELEMENTO DIV DO DISCLAIMER
    const disclaimerDiv = document.createElement('div');
    disclaimerDiv.className = 'eeat-disclaimer';

    disclaimerDiv.innerHTML = `
        <div class="disclaimer-content">
            <div class="disclaimer-icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.398 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
            </div>
            <div class="disclaimer-text">
                <p class="disclaimer-title">${content.title}</p>
                <p>${content.text}</p>
            </div>
        </div>
    `;

    // INSERE O DISCLAIMER APÓS O H1
    firstH1.parentNode.insertBefore(disclaimerDiv, firstH1.nextSibling);
}

// ... (o resto do código do banner fixo permanece igual)

/**
 * Função principal que gerencia ambos os disclaimers
 */
function initializeDisclaimers() {
    const htmlLang = document.documentElement.lang.toLowerCase().substring(0, 2); 
    const content = disclaimerTexts[htmlLang] || disclaimerTexts['pt'];
    
    // Adiciona os estilos primeiro
    addDisclaimerStyles();
    
    // Verifica se é uma página de artigo (tem H1) e se o usuário não fechou o banner anteriormente
    const isArticlePage = document.querySelector('h1');
    const bannerClosed = localStorage.getItem('health-banner-closed');
    
    if (isArticlePage && !bannerClosed) {
        createTopBanner(content);
    }
    
    // Sempre injeta o disclaimer após o H1 em páginas de artigo
    if (isArticlePage) {
        injectEEATDisclaimer();
    }
}

// Executa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeDisclaimers, 50);
});

// ... (restante do código do banner fixo)