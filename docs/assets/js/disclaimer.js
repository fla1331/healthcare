// --- CONFIGURAÇÃO DE TEXTOS ---
// Use as duas primeiras letras do seu atributo <html lang="..."> como chave.
const disclaimerTexts = {
    // Português (pt, pt-PT)
    'pt': {
        title: 'Aviso de Conteúdo Informativo:',
        text: 'Este artigo é uma <strong>análise de pesquisa de mercado e feedback de consumidores</strong> sobre o produto em questão. Ele não substitui o diagnóstico ou aconselhamento de um médico ou nutricionista. **Sempre consulte um profissional de saúde qualificado antes de iniciar qualquer tratamento.**',
        banner: {
            title: '⚠️ Aviso Importante sobre Saúde',
            text: 'As informações contidas neste site têm caráter meramente informativo. Consulte sempre um profissional de saúde qualificado antes de tomar qualquer decisão sobre sua saúde.',
            button: 'Entendi'
        }
    },
    // Inglês (en, en-US)
    'en': {
        title: 'Critical Content Warning:',
        text: 'This article is a <strong>market research and consumer feedback analysis</strong> about the product in question. It does not replace the diagnosis or advice of a doctor or nutritionist. **Always consult a qualified health professional before starting any dietary supplement.**',
        banner: {
            title: '⚠️ Important Health Notice',
            text: 'The information on this website is for informational purposes only. Always consult a qualified healthcare professional before making any health-related decisions.',
            button: 'I Understand'
        }
    },
    // Espanhol (es, es-ES)
    'es': {
        title: 'Advertencia de Contenido Crítico:',
        text: 'Este artículo es un <strong>análisis de investigación de mercado y comentarios de consumidores</strong> sobre el producto en cuestión. No reemplaza el diagnóstico ni el consejo de un médico o nutricionista. **Consulte siempre a un profesional de la salud calificado antes de comenzar cualquier suplemento dietético.**',
        banner: {
            title: '⚠️ Aviso Importante de Salud',
            text: 'La información en este sitio web es solo para fines informativos. Consulte siempre a un profesional de la salud calificado antes de tomar cualquier decisión relacionada con la salud.',
            button: 'Entendido'
        }
    },
    // Francês (fr, fr-FR)
    'fr': {
        title: 'Avertissement de Contenu Critique:',
        text: 'Cet article est une <strong>analyse de recherche de marché et de commentaires de consommateurs</strong> concernant le produit en question. Il ne remplace pas le diagnostic ou les conseils d\'un médecin ou d\'un nutritionniste. **Consultez toujours un professionnel de la santé qualifié avant de commencer tout supplément alimentaire.**',
        banner: {
            title: '⚠️ Avis Important sur la Santé',
            text: 'Les informations sur ce site web sont à titre informatif uniquement. Consultez toujours un professionnel de la santé qualifié avant de prendre toute décision concernant votre santé.',
            button: 'J\'ai compris'
        }
    },
    // Alemão (de, de-DE, de-CH, de-AT)
    'de': {
        title: 'Wichtiger Hinweis zum Inhalt:',
        text: 'Dieser Artikel ist eine <strong>Marktforschungs- und Verbraucher-Feedback-Analyse</strong> über das betreffende Produkt. Er ersetzt weder die Diagnose noch den Rat eines Arztes oder Ernährungsberaters. **Konsultieren Sie immer einen qualifizierten Gesundheitsberater, bevor Sie mit Nahrungsergänzungsmitteln beginnen.**',
        banner: {
            title: '⚠️ Wichtiger Gesundheitshinweis',
            text: 'Die Informationen auf dieser Website dienen nur zu Informationszwecken. Konsultieren Sie immer einen qualifizierten Gesundheitsberater, bevor Sie gesundheitsbezogene Entscheidungen treffen.',
            button: 'Verstanden'
        }
    },
    // Italiano (it, it-IT)
    'it': {
        title: 'Avviso di Contenuto Critico:',
        text: 'Questo articolo è un\'<strong>analisi di ricerca di mercato e feedback dei consumatori</strong> sul prodotto in questione. Non sostituisce la diagnosi o il consiglio di un medico o nutrizionista. **Consultare sempre un professionista sanitario qualificato prima di iniziare qualsiasi integratore alimentare.**',
        banner: {
            title: '⚠️ Avviso Importante sulla Salute',
            text: 'Le informazioni su questo sito web sono a solo scopo informativo. Consultare sempre un professionista sanitario qualificato prima di prendere qualsiasi decisione relativa alla salute.',
            button: 'Ho capito'
        }
    },
    // Finlandês (fi)
    'fi': {
        title: 'Kriittinen sisältövaroitus:',
        text: 'Tämä artikkeli on kyseistä tuotetta koskeva <strong>markkinatutkimus ja kuluttajapalautteen analyysi</strong>. Se ei korvaa lääkärin tai ravitsemusterapeutin diagnoosia tai neuvoja. **Ota aina yhteyttä pätevään terveydenhuollon ammattilaiseen ennen kuin aloitat minkään ravintolisän käytön.**',
        banner: {
            title: '⚠️ Tärkeä terveysilmoitus',
            text: 'Tämän verkkosivuston tiedot ovat vain tiedottavia. Ota aina yhteyttä pätevään terveydenhuollon ammattilaiseen ennen terveyteen liittyviä päätöksiä.',
            button: 'Ymmärrän'
        }
    },
    // Holandês (nl, nl-NL)
    'nl': {
        title: 'Kritieke inhoudswaarschuwing:',
        text: 'Dit artikel is een <strong>marktonderzoek en consumentenfeedbackanalyse</strong> over het betreffende product. Het vervangt niet de diagnose of het advies van een arts of voedingsdeskundige. **Raadpleeg altijd een gekwalificeerde gezondheidsdeskundige voordat u met een voedingssupplement begint.**',
        banner: {
            title: '⚠️ Belangrijke gezondheidsmededeling',
            text: 'De informatie op deze website is uitsluitend voor informatieve doeleinden. Raadpleeg altijd een gekwalificeerde zorgverlener voordat u gezondheidsgerelateerde beslissingen neemt.',
            button: 'Ik begrijp het'
        }
    },
    // Sueco (sv, sv-SE)
    'sv': {
        title: 'Kritisk innehållsvarning:',
        text: 'Denna artikel är en <strong>marknadsundersökning och konsumentfeedbackanalys</strong> om den aktuella produkten. Den ersätter inte diagnosen eller råd från en läkare eller nutritionist. **Rådfråga alltid en kvalificerad hälso- och sjukvårdspersonal innan du påbörjar ett kosttillskott.**',
        banner: {
            title: '⚠️ Viktigt hälsobesked',
            text: 'Informationen på denna webbplats är endast i informationssyfte. Rådfråga alltid en kvalificerad hälso- och sjukvårdspersonal innan du tar hälsobeslut.',
            button: 'Jag förstår'
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
    banner.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: linear-gradient(135deg, #2e7d32, #4caf50);
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
        " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
        onmouseout="this.style.background='rgba(255,255,255,0.2)'">
            ${content.banner.button}
        </button>
    `;

    document.body.prepend(banner);

    // Adiciona padding ao body para compensar o banner fixo
    const bannerHeight = banner.offsetHeight;
    document.body.style.paddingTop = bannerHeight + 'px';

    // Event listener para fechar o banner
    document.getElementById('close-banner-btn').addEventListener('click', function() {
        banner.style.transform = 'translateY(-100%)';
        banner.style.transition = 'transform 0.4s ease';
        document.body.style.paddingTop = '0';
        
        setTimeout(() => {
            if (banner.parentNode) {
                banner.parentNode.removeChild(banner);
            }
        }, 400);
        
        // Salva no localStorage que o usuário fechou o banner
        localStorage.setItem('health-banner-closed', 'true');
    });
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
        background-color: #e8f5e9; 
        border-left: 4px solid #4caf50; 
        border-radius: 6px; 
        margin: 24px 0; 
        font-family: 'Inter', sans-serif; 
        max-width: 100%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    `;

    disclaimerDiv.innerHTML = `
        <div style="display: flex; align-items: flex-start;">
            <div style="flex-shrink: 0; color: #4caf50; margin-top: 2px;">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.398 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
            </div>
            <div style="margin-left: 12px; font-size: 0.95rem; color: #2e7d32; line-height: 1.5;">
                <p style="font-weight: 600; color: #1b5e20; margin-top: 0; margin-bottom: 4px;">${content.title}</p>
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

// Recalcula o padding quando a janela é redimensionada (para responsividade)
window.addEventListener('resize', function() {
    const banner = document.getElementById('health-disclaimer-banner');
    if (banner && banner.style.transform !== 'translateY(-100%)') {
        const bannerHeight = banner.offsetHeight;
        document.body.style.paddingTop = bannerHeight + 'px';
    }
});