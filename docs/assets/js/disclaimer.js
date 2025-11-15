// --- CONFIGURAÇÃO DE TEXTOS ---
// Use as duas primeiras letras do seu atributo <html lang="..."> como chave.
const disclaimerTexts = {
    // Português (pt, pt-PT)
    'pt': {
        title: 'Aviso de Conteúdo Crítico:',
        text: 'Este artigo é uma <strong>análise de pesquisa de mercado e feedback de consumidores</strong> sobre o produto em questão. Ele não substitui o diagnóstico ou aconselhamento de um médico ou nutricionista. Sempre consulte um profissional de saúde qualificado antes de iniciar qualquer tratamento.'
    },
    // Inglês (en, en-US)
    'en': {
        title: 'Critical Content Warning:',
        text: 'This article is a <strong>market research and consumer feedback analysis</strong> about the product in question. It does not replace the diagnosis or advice of a doctor or nutritionist. Always consult a qualified health professional before starting any dietary supplement.'
    },
    // Espanhol (es, es-ES)
    'es': {
        title: 'Advertencia de Contenido Crítico:',
        text: 'Este artículo es un <strong>análisis de investigación de mercado y comentarios de consumidores</strong> sobre el producto en cuestión. No reemplaza el diagnóstico ni el consejo de un médico o nutricionista. Consulte siempre a un profesional de la salud calificado antes de comenzar cualquier suplemento dietético.'
    },
    // Francês (fr, fr-FR)
    'fr': {
        title: 'Avertissement de Contenu Critique:',
        text: 'Cet article est une <strong>analyse de recherche de marché et de commentaires de consommateurs</strong> concernant le produit en question. Il ne remplace pas le diagnostic ou les conseils d\'un médecin ou d\'un nutritionniste. Consultez toujours un professionnel de la santé qualifié avant de commencer tout supplément alimentaire.'
    },
    // Alemão (de, de-DE, de-CH, de-AT)
    'de': {
        title: 'Wichtiger Hinweis zum Inhalt:',
        text: 'Dieser Artikel ist eine <strong>Marktforschungs- und Verbraucher-Feedback-Analyse</strong> über das betreffende Produkt. Er ersetzt weder die Diagnose noch den Rat eines Arztes oder Ernährungsberaters. Konsultieren Sie immer einen qualifizierten Gesundheitsberater, bevor Sie mit Nahrungsergänzungsmitteln beginnen.'
    },
    // Italiano (it, it-IT)
    'it': {
        title: 'Avviso di Contenuto Critico:',
        text: 'Questo articolo è un\'<strong>analisi di ricerca di mercato e feedback dei consumatori</strong> sul prodotto in questione. Non sostituisce la diagnosi o il consiglio di un medico o nutrizionista. Consultare sempre un professionista sanitario qualificato prima di iniziare qualsiasi integratore alimentare.'
    },
    // Finlandês (fi)
    'fi': {
        title: 'Kriittinen sisältövaroitus:',
        text: 'Tämä artikkeli on kyseistä tuotetta koskeva <strong>markkinatutkimus ja kuluttajapalautteen analyysi</strong>. Se ei korvaa lääkärin tai ravitsemusterapeutin diagnoosia tai neuvoja. Ota aina yhteyttä pätevään terveydenhuollon ammattilaiseen ennen kuin aloitat minkään ravintolisän käytön.'
    },
    // Holandês (nl, nl-NL)
    'nl': {
        title: 'Kritieke inhoudswaarschuwing:',
        text: 'Dit artikel is een <strong>marktonderzoek en consumentenfeedbackanalyse</strong> over het betreffende product. Het vervangt niet de diagnose of het advies van een arts of voedingsdeskundige. Raadpleeg altijd een gekwalificeerde gezondheidsdeskundige voordat u met een voedingssupplement begint.'
    },
    // Sueco (sv, sv-SE)
    'sv': {
        title: 'Kritisk innehållsvarning:',
        text: 'Denna artikel är en <strong>marknadsundersökning och konsumentfeedbackanalys</strong> om den aktuella produkten. Den ersätter inte diagnosen eller råd från en läkare eller nutritionist. Rådfråga alltid en kvalificerad hälso- och sjukvårdspersonal innan du påbörjar ett kosttillskott.'
    }
};

/
  Injeta o disclaimer E-E-A-T específico logo após o H1.
  O disclaimer só é injetado se um <h1> for encontrado, o que
  deve restringir a exibição a artigos e páginas de conteúdo.
 /
function injectEEATDisclaimer() {
    const firstH1 = document.querySelector('h1');
    
    // 1. Detecta o idioma (ex: 'pt' de 'pt-PT')
    const htmlLang = document.documentElement.lang.toLowerCase().substring(0, 2); 
    const content = disclaimerTexts[htmlLang] || disclaimerTexts['pt']; // Fallback para Português

    if (!firstH1 || !content) {
        // Se não houver H1, é provável que seja uma página inicial ou outra página sem artigo,
        // então não injetamos nada, e não mostramos um erro a menos que seja para depuração.
        // console.error('Injetor E-E-A-T: H1 não encontrado ou idioma não mapeado. Ignorando injeção.');
        return;
    }

    // 2. CRIA O ELEMENTO DIV DO DISCLAIMER
    const disclaimerDiv = document.createElement('div');
    
    // Estilos inline para estabilidade e estética
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
                <!-- Ícone de Atenção -->
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.398 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            </div>
            <div style="margin-left: 12px; font-size: 0.95rem; color: #616161; line-height: 1.5;">
                <p style="font-weight: bold; color: #333; margin-top: 0; margin-bottom: 4px;">${content.title}</p>
                <p style="margin: 0;">${content.text}</p>
            </div>
        </div>
    `;

    // 3. INSERE O DISCLAIMER APÓS O H1
    firstH1.parentNode.insertBefore(disclaimerDiv, firstH1.nextSibling);
}

// Garante que o script rode após o carregamento do DOM (onde o H1 já existe).
// Usamos um pequeno atraso para maior compatibilidade com CMSs.
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(injectEEATDisclaimer, 50); 
});