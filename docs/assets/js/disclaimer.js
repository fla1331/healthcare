<script>
// --- CONFIGURAÇÃO DE TEXTOS ---
const disclaimerTexts = {
    'pt': {
        title: 'Aviso de Conteúdo Crítico:',
        text: 'Este artigo é uma <strong>análise de pesquisa de mercado e feedback de consumidores</strong> sobre o produto em questão. Ele não substitui o diagnóstico ou aconselhamento de um médico ou nutricionista. <strong>Sempre consulte um profissional de saúde qualificado antes de iniciar qualquer tratamento.</strong>',
        banner: 'Aviso: este site apresenta análises baseadas em pesquisas e opiniões de consumidores. Consulte um profissional de saúde antes de iniciar qualquer tratamento.'
    },
    'en': {
        title: 'Critical Content Warning:',
        text: 'This article is a <strong>market research and consumer feedback analysis</strong> about the product in question. It does not replace the diagnosis or advice of a doctor or nutritionist. <strong>Always consult a qualified health professional before starting any treatment.</strong>',
        banner: 'Disclaimer: This website provides research-based analyses and consumer feedback. Always consult a health professional before starting any treatment.'
    },
    'es': {
        title: 'Advertencia de Contenido Crítico:',
        text: 'Este artículo es un <strong>análisis de investigación de mercado y comentarios de consumidores</strong> sobre el producto en cuestión. No reemplaza el diagnóstico ni el consejo de un médico o nutricionista. <strong>Consulte siempre a un profesional de la salud calificado antes de iniciar cualquier tratamiento.</strong>',
        banner: 'Aviso: Este sitio presenta análisis basados en investigaciones y opiniones de consumidores. Consulte a un profesional de la salud antes de iniciar cualquier tratamiento.'
    },
    'fr': {
        title: 'Avertissement de Contenu Critique:',
        text: 'Cet article est une <strong>analyse de recherche de marché et de commentaires de consommateurs</strong> concernant le produit en question. Il ne remplace pas le diagnostic ni les conseils d’un médecin ou nutritionniste. <strong>Consultez toujours un professionnel de la santé qualifié avant de commencer tout traitement.</strong>',
        banner: 'Avis : Ce site présente des analyses basées sur la recherche et des retours de consommateurs. Consultez un professionnel de santé avant de commencer tout traitement.'
    },
    'de': {
        title: 'Wichtiger Hinweis zum Inhalt:',
        text: 'Dieser Artikel ist eine <strong>Analyse von Marktforschung und Verbraucherfeedback</strong> über das betreffende Produkt. Er ersetzt keine Diagnose oder den Rat eines Arztes oder Ernährungsberaters. <strong>Konsultieren Sie immer einen qualifizierten Gesundheitsfachmann, bevor Sie irgendeine Behandlung beginnen.</strong>',
        banner: 'Hinweis: Diese Website bietet Analysen auf Basis von Forschung und Verbrauchermeinungen. Konsultieren Sie vor jeder Behandlung einen Gesundheitsfachmann.'
    },
    'it': {
        title: 'Avviso di Contenuto Critico:',
        text: 'Questo articolo è un\'<strong>analisi di ricerca di mercato e feedback dei consumatori</strong> sul prodotto in questione. Non sostituisce la diagnosi o il consiglio di un medico o nutrizionista. <strong>Consultare sempre un professionista sanitario qualificato prima di iniziare qualsiasi trattamento.</strong>',
        banner: 'Avviso: Questo sito presenta analisi basate su ricerche e opinioni dei consumatori. Consultare un professionista sanitario prima di iniziare qualsiasi trattamento.'
    },
    'fi': {
        title: 'Kriittinen sisältövaroitus:',
        text: 'Tämä artikkeli on <strong>markkinatutkimukseen ja kuluttajapalautteeseen perustuva analyysi</strong>. Se ei korvaa lääkärin tai ravitsemusterapeutin neuvoja. <strong>Käänny aina pätevän terveydenhuollon ammattilaisen puoleen ennen minkään hoidon aloittamista.</strong>',
        banner: 'Huomautus: Tämä sivusto tarjoaa tutkimukseen perustuvia analyyseja. Ota yhteyttä terveydenhuollon ammattilaiseen ennen hoidon aloittamista.'
    },
    'nl': {
        title: 'Kritieke inhoudswaarschuwing:',
        text: 'Dit artikel is een <strong>analyse op basis van marktonderzoek en consumentenfeedback</strong>. Het vervangt geen diagnose of advies van een arts of voedingsdeskundige. <strong>Raadpleeg altijd een gekwalificeerde zorgprofessional voordat u met een behandeling begint.</strong>',
        banner: 'Let op: Deze website biedt analyses op basis van onderzoek en consumentenvormen. Raadpleeg een zorgprofessional voordat u met een behandeling begint.'
    },
    'sv': {
        title: 'Kritisk innehållsvarning:',
        text: 'Denna artikel är en <strong>analys baserad på marknadsundersökning och konsumentfeedback</strong>. Den ersätter inte medicinsk rådgivning. <strong>Rådfråga alltid kvalificerad vårdpersonal innan du påbörjar någon behandling.</strong>',
        banner: 'Observera: Webbplatsen presenterar analyser baserade på forskning och konsumentåsikter. Kontakta vårdpersonal innan du påbörjar någon behandling.'
    }
};

// --- INJETAR BANNER FIXO NO TOPO ---
function injectTopBanner() {
    if (document.getElementById("top-banner-fixed")) return;

    const lang = (document.documentElement.lang || "pt").slice(0,2).toLowerCase();
    const t = disclaimerTexts[lang] || disclaimerTexts['pt'];

    const bar = document.createElement("div");
    bar.id = "top-banner-fixed";

    bar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 999999;
        background: #fff3cd;
        border-bottom: 1px solid #ffe08a;
        font-family: Inter, sans-serif;
        padding: 10px 16px;
        text-align: center;
        font-size: 14px;
        line-height: 1.4;
        color: #333;
    `;

    bar.innerText = t.banner;

    document.body.appendChild(bar);
}

// --- DISCLAIMER ABAIXO DO H1 ---
function injectEEATDisclaimer() {
    const firstH1 = document.querySelector('h1');
    const lang = (document.documentElement.lang || "pt").slice(0,2).toLowerCase();
    const content = disclaimerTexts[lang] || disclaimerTexts['pt'];

    if (!firstH1 || !content) return;

    const disclaimerDiv = document.createElement('div');
    disclaimerDiv.style.cssText = `
        padding: 16px; 
        background-color: #fff8e1; 
        border-left: 4px solid #ffb300; 
        border-radius: 4px; 
        margin: 24px 0; 
        font-family: 'Inter', sans-serif; 
        max-width: 100%;
    `;

    disclaimerDiv.innerHTML = `
        <div style="display: flex; align-items: flex-start;">
            <div style="flex-shrink: 0; color: #ffb300; margin-top: 2px;">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.398 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            </div>
            <div style="margin-left: 12px; font-size: 0.95rem; color: #616161; line-height: 1.5;">
                <p style="font-weight: bold; color: #333; margin: 0 0 4px 0;">${content.title}</p>
                <p style="margin: 0;">${content.text}</p>
            </div>
        </div>
    `;

    firstH1.insertAdjacentElement("afterend", disclaimerDiv);
}

document.addEventListener('DOMContentLoaded', () => {
    injectTopBanner();
    setTimeout(injectEEATDisclaimer, 50);
});
</script>
