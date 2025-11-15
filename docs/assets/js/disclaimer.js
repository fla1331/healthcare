// --- CONFIGURAÇÃO DE TEXTOS ---
// Use as duas primeiras letras do seu atributo <html lang="..."> como chave.
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
    // Outros idiomas (mantenha conforme seu script original)
    'es': {
        title: 'Advertencia de Contenido Crítico:',
        text: 'Este artículo es un <strong>análisis de investigación de mercado y comentarios de consumidores</strong> sobre el producto en cuestión. No reemplaza el diagnóstico ni el consejo de un médico o nutricionista. <strong>Consulte siempre a un profesional de la salud calificado antes de comenzar cualquier suplemento dietético.</strong>',
        banner: {
            title: '⚠️ Aviso Importante de Salud',
            text: 'La información en este sitio web es solo para fines informativos. Consulte siempre a un profesional de la salud calificado antes de tomar cualquier decisión relacionada con la salud.',
            button: 'Entendido'
        }
    }
    // ... (mantenha os outros idiomas do seu script original)
};

/**
 * Cria e exibe o banner fixo no topo
 */
function createTopBanner(content) {
    // Verifica se já existe um banner para evitar duplicação
    if (document.getElementById('health-disclaimer-banner')) {
        return;
    }

    const banner = document.createElement('div');
    banner.id = 'health-disclaimer-banner';
    
    // Estilos corrigidos para não quebrar o layout
    banner.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #7fc940;
        color: white;
        padding: 12px 16px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
        font-size: 14px;
        line-height: 1.4;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 12px;
    `;

    banner.innerHTML = `
        <div style="flex: 1; min-width: 250px;">
            <strong style="display: block; margin-bottom: 2px; font-size: 15px;">${content.banner.title}</strong>
            <span style="opacity: 0.95; font-size: 13px;">${content.banner.text}</span>
        </div>
        <button id="close-banner-btn" style="
            background: rgba(255,255,255,0.2);
            border: 1px solid rgba(255,255,255,0.3);
            color: white;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            font-size: 13px;
            transition: all 0.3s ease;
            white-space: nowrap;
        ">
            ${content.banner.button}
        </button>
    `;

    document.body.prepend(banner);

    // CORREÇÃO: Ajusta o header existente para não ser coberto pelo banner
    adjustHeaderForBanner();

    // Event listener para fechar o banner
    document.getElementById('close-banner-btn').addEventListener('click', function() {
        closeBanner();
        
        // Efeito hover removido - não é mais necessário
        this.style.background = 'rgba(255,255,255,0.2)';
    });

    // Efeitos hover
    const closeBtn = document.getElementById('close-banner-btn');
    closeBtn.addEventListener('mouseover', function() {
        this.style.background = 'rgba(255,255,255,0.3)';
    });
    closeBtn.addEventListener('mouseout', function() {
        this.style.background = 'rgba(255,255,255,0.2)';
    });
}

/**
 * CORREÇÃO: Ajusta o header existente para acomodar o banner
 */
function adjustHeaderForBanner() {
    const banner = document.getElementById('health-disclaimer-banner');
    const header = document.querySelector('header');
    
    if (banner && header) {
        const bannerHeight = banner.offsetHeight;
        
        // Aplica padding-top ao header para empurrá-lo para baixo
        header.style.paddingTop = bannerHeight + 'px';
        header.style.transition = 'padding-top 0.3s ease';
        
        // Garante que o header fique acima de outros elementos
        header.style.position = 'relative';
        header.style.zIndex = '9999';
    }
}

/**
 * Fecha o banner e restaura o layout
 */
function closeBanner() {
    const banner = document.getElementById('health-disclaimer-banner');
    const header = document.querySelector('header');
    
    if (banner) {
        banner.style.transform = 'translateY(-100%)';
        banner.style.transition = 'transform 0.4s ease';
        
        // Remove o padding do header após a animação
        setTimeout(() => {
            if (header) {
                header.style.paddingTop = '0';
            }
        }, 400);
        
        // Remove o banner do DOM após a animação
        setTimeout(() => {
            if (banner.parentNode) {
                banner.parentNode.removeChild(banner);
            }
        }, 500);
        
        // Salva no localStorage que o usuário fechou o banner
        localStorage.setItem('health-banner-closed', 'true');
    }
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
    
    disclaimerDiv.style.cssText = `
        padding: 16px; 
        background-color: #fef9c3 ;
        border-left: 4px solid #eab308; 
        border-radius: 6px; 
        margin: 24px 0; 
        font-family: 'Inter', sans-serif; 
        max-width: 100%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    `;

    disclaimerDiv.innerHTML = `
        <div style="display: flex; align-items: flex-start;">
            <div style="flex-shrink: 0; color: #a16207 margin-top: 2px;">
                <svg width="24" height="24" fill="none" stroke="#a16207" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.398 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
            </div>
            <div style="margin-left: 12px; font-size: 0.95rem; color: #a16207; line-height: 1.5;">
                <p style="font-weight: 600; color: #a16207; margin-top: 0; margin-bottom: 4px;">${content.title}</p>
                <p style="margin: 0;">${content.text}</p>
            </div>
        </div>
    `;

    // INSERE O DISCLAIMER APÓS O H1
    firstH1.parentNode.insertBefore(disclaimerDiv, firstH1.nextSibling);
}

/**
 * Função principal que gerencia ambos os disclaimers
 */
function initializeDisclaimers() {
    const htmlLang = document.documentElement.lang.toLowerCase().substring(0, 2); 
    const content = disclaimerTexts[htmlLang] || disclaimerTexts['pt'];
    
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

// Recalcula o padding quando a janela é redimensionada
window.addEventListener('resize', function() {
    const banner = document.getElementById('health-disclaimer-banner');
    const header = document.querySelector('header');
    
    if (banner && header && banner.style.transform !== 'translateY(-100%)') {
        const bannerHeight = banner.offsetHeight;
        header.style.paddingTop = bannerHeight + 'px';
    }
});