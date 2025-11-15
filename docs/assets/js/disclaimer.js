<script>
// --- CONFIGURAÇÃO DE TEXTOS ---
const disclaimerTexts = {
    'pt': {
        title: 'Aviso Importante:',
        text: 'Este artigo é uma <strong>análise independente baseada em pesquisa de mercado e relatos de consumidores</strong>. Não substitui avaliação médica. Antes de iniciar qualquer tratamento, consulte um profissional de saúde qualificado.'
    },
    'en': {
        title: 'Important Notice:',
        text: 'This article is an <strong>independent analysis based on market research and consumer reports</strong>. It does not replace a medical evaluation. Always consult a qualified health professional before starting any treatment.'
    },
    'es': {
        title: 'Aviso Importante:',
        text: 'Este artículo es un <strong>análisis independiente basado en investigación de mercado y comentarios de consumidores</strong>. No reemplaza una evaluación médica. Antes de iniciar cualquier tratamiento, consulte a un profesional de la salud calificado.'
    },
    'fr': {
        title: 'Avis Important :',
        text: 'Cet article est une <strong>analyse indépendante basée sur des recherches de marché et des avis de consommateurs</strong>. Il ne remplace pas une évaluation médicale. Consultez un professionnel de santé qualifié avant de commencer tout traitement.'
    },
    'de': {
        title: 'Wichtiger Hinweis:',
        text: 'Dieser Artikel ist eine <strong>unabhängige Analyse basierend auf Marktforschung und Verbraucherfeedback</strong>. Er ersetzt keine medizinische Bewertung. Konsultieren Sie vor Beginn einer Behandlung einen qualifizierten Gesundheitsfachmann.'
    },
    'it': {
        title: 'Avviso Importante:',
        text: 'Questo articolo è un <strong>analisi indipendente basata su ricerche di mercato e opinioni dei consumatori</strong>. Non sostituisce una valutazione medica. Consultare sempre un professionista sanitario qualificato prima di iniziare qualsiasi trattamento.'
    }
};

// --- BANNER FIXO SUPERIOR (verde do site) ---
function injectTopBanner() {
    if (localStorage.getItem('topBannerClosed')) return;

    const banner = document.createElement('div');
    banner.id = 'topBannerFixed';
    banner.style.cssText = `
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: #28a745;
        color: #fff;
        padding: 12px 18px;
        text-align: center;
        font-family: 'Inter', sans-serif;
        font-size: 16px;
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    `;

    banner.innerHTML = `
        <span style="margin-right: 12px; font-weight: 600;">
            Informações importantes sobre saúde e bem-estar.
        </span>
        <button id="closeBannerBtn" style="
            background: rgba(255,255,255,0.2);
            border: none;
            color: #fff;
            padding: 6px 10px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        ">
            Fechar
        </button>
    `;

    document.body.prepend(banner);

    // offset no topo para evitar "pulo" no layout
    document.body.style.paddingTop = '60px';

    document.getElementById('closeBannerBtn').addEventListener('click', () => {
        banner.remove();
        document.body.style.paddingTop = '0px';
        localStorage.setItem('topBannerClosed', '1');
    });
}

// --- DISCLAIMER ABAIXO DO H1 ---
function injectDisclaimer() {
    const h1 = document.querySelector('h1');

    if (!h1) return;

    const lang = document.documentElement.lang.toLowerCase().substring(0, 2);
    const content = disclaimerTexts[lang] || disclaimerTexts['pt'];

    const box = document.createElement('div');
    box.style.cssText = `
        padding: 18px;
        background: #f1fdf4;
        border-left: 4px solid #28a745;
        border-radius: 4px;
        margin-top: 22px;
        font-family: 'Inter', sans-serif;
        color: #2d2d2d;
        line-height: 1.5;
    `;

    box.innerHTML = `
        <strong style="color:#1e7e34;">${content.title}</strong>
        <p style="margin: 6px 0 0 0;">${content.text}</p>
    `;

    h1.parentNode.insertBefore(box, h1.nextSibling);
}

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    injectTopBanner();
    injectDisclaimer();
});
</script>
