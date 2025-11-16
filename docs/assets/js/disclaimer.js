// --- CONFIGURAÇÃO DE TEXTOS ---
// Use as duas primeiras letras do seu atributo <html lang="..."> como chave.
const disclaimerTexts = {
    // Português (pt, pt-PT)
    'pt': {
        title: 'Orientações:',
        text: 'Material informativo baseado em estudos. Para prescrições e tratamentos, busque orientação médica profissional.',
        banner: {
            title: '⚠️ Aviso de Saúde:',
            text: 'As informações aqui são educativas. Sempre consulte um profissional antes de qualquer decisão.',
            button: 'Entendi'
        }
    },
    // Inglês (en, en-US, en-GB, etc)
    'en': {
        title: 'Guidance:',
        text: 'Informational material based on studies. For prescriptions and treatments, seek professional medical guidance.',
        banner: {
            title: '⚠️ Health Notice:',
            text: 'The information here is educational. Always consult a professional before any decision.',
            button: 'I Understand'
        }
    },
    // Espanhol (es, es-ES, es-MX)
    'es': {
        title: 'Orientaciones:',
        text: 'Material informativo basado en estudios. Para prescripciones y tratamientos, busque orientación médica profesional.',
        banner: {
            title: '⚠️ Aviso de Salud:',
            text: 'La información aquí es educativa. Siempre consulte a un profesional antes de cualquier decisión.',
            button: 'Entendido'
        }
    },
    // Francês (fr, fr-FR, fr-CA)
    'fr': {
        title: 'Conseils:',
        text: 'Matériel informationnel basé sur des études. Pour les ordonnances et traitements, consultez un médecin professionnel.',
        banner: {
            title: '⚠️ Avis de Santé:',
            text: 'Les informations ici sont éducatives. Consultez toujours un professionnel avant toute décision.',
            button: 'J\'ai compris'
        }
    },
    // Alemão (de, de-DE, de-AT, de-CH)
    'de': {
        title: 'Anleitungen:',
        text: 'Informationsmaterial basierend auf Studien. Für Rezepte und Behandlungen suchen Sie professionelle medizinische Beratung.',
        banner: {
            title: '⚠️ Gesundheitshinweis:',
            text: 'Die Informationen hier sind lehrreich. Konsultieren Sie immer einen Fachmann vor einer Entscheidung.',
            button: 'Verstanden'
        }
    },
    // Italiano (it, it-IT)
    'it': {
        title: 'Linee Guida:',
        text: 'Materiale informativo basato su studi. Per prescrizioni e trattamenti, cercare una guida medica professionale.',
        banner: {
            title: '⚠️ Avviso di Salute:',
            text: 'Le informazioni qui sono educative. Consultare sempre un professionista prima di qualsiasi decisione.',
            button: 'Ho capito'
        }
    },
    // Holandês (nl, nl-NL)
    'nl': {
        title: 'Richtlijnen:',
        text: 'Informatief materiaal gebaseerd op studies. Voor recepten en behandelingen, zoek professionele medische begeleiding.',
        banner: {
            title: '⚠️ Gezondheidsadvies:',
            text: 'De informatie hier is educatief. Raadpleeg altijd een professional voor een beslissing.',
            button: 'Ik begrijp het'
        }
    },
    // Sueco (sv, sv-SE)
    'sv': {
        title: 'Riktlinjer:',
        text: 'Informationsmaterial baserat på studier. För recept och behandlingar, sök professionell medicinsk vägledning.',
        banner: {
            title: '⚠️ Hälsoinformation:',
            text: 'Informationen här är utbildande. Konsultera alltid en professionell före beslut.',
            button: 'Jag förstår'
        }
    },
    // Finlandês (fi)
    'fi': {
        title: 'Ohjeet:',
        text: 'Tutkimuksiin perustuvaa informatiivista materiaalia. Reseptejä ja hoitoja varten etsi ammattimaista lääketieteellistä ohjausta.',
        banner: {
            title: '⚠️ Terveysvaroitus:',
            text: 'Täällä olevat tiedot ovat opetuksellisia. Konsultoi aina ammattilaista ennen päätöksen tekemistä.',
            button: 'Ymmärrän'
        }
    }
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
    
    // MELHORIA: Estilo mais compacto e melhor integrado
    disclaimerDiv.style.cssText = `
        padding: 12px 16px; 
        background-color: #fef9c3;
        border-left: 4px solid #eab308; 
        border-radius: 6px; 
        margin: 20px 0; 
        font-family: 'Inter', sans-serif; 
        max-width: 100%;
        box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        font-size: 0.9rem;
    `;

    disclaimerDiv.innerHTML = `
        <div style="display: flex; align-items: flex-start;">
            <div style="flex-shrink: 0; color: #a16207; margin-top: 1px;">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.398 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
            </div>
            <div style="margin-left: 10px; font-size: 0.9rem; color: #a16207; line-height: 1.4;">
                <p style="font-weight: 600; color: #a16207; margin-top: 0; margin-bottom: 2px; font-size: 0.95rem;">${content.title}</p>
                <p style="margin: 0; font-size: 0.85rem;">${content.text}</p>
            </div>
        </div>
    `;

    // MELHORIA: Encontra o elemento correto para inserir após o H1
    const articleContent = firstH1.closest('article') || firstH1.closest('.content') || firstH1.parentElement;
    
    if (articleContent) {
        // Encontra o próximo elemento após o H1 para inserir antes dele
        const h1NextSibling = firstH1.nextElementSibling;
        if (h1NextSibling) {
            articleContent.insertBefore(disclaimerDiv, h1NextSibling);
        } else {
            // Se não há próximo elemento, adiciona no final do container do H1
            articleContent.appendChild(disclaimerDiv);
        }
    } else {
        // Fallback: insere após o H1 como antes
        firstH1.parentNode.insertBefore(disclaimerDiv, firstH1.nextSibling);
    }
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