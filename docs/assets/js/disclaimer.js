<script>
(function () {
  // --- TEXTOS DE DISCLAIMER E BANNER ---
  const disclaimerTexts = {
    'pt': {
      title: 'Aviso de Conteúdo Crítico:',
      text: 'Este artigo é uma <strong>análise de pesquisa de mercado e feedback de consumidores</strong> sobre o produto em questão. Ele não substitui o diagnóstico ou aconselhamento de um médico ou nutricionista. Sempre consulte um profissional de saúde qualificado antes de iniciar qualquer tratamento.',
      topBanner: 'Aviso: este site contém análises baseadas em pesquisas e opinião de consumidores. Consulte sempre um profissional de saúde antes de usar suplementos.'
    },
    'en': {
      title: 'Critical Content Warning:',
      text: 'This article is a <strong>market research and consumer feedback analysis</strong> about the product in question. It does not replace a diagnosis or advice from a doctor or nutritionist. Always consult a qualified health professional before starting any supplement.',
      topBanner: 'Disclaimer: this site provides analysis based on research and consumer feedback. Always consult a qualified health professional before using any supplement.'
    },
    'es': {
      title: 'Advertencia de Contenido Crítico:',
      text: 'Este artículo es un <strong>análisis de investigación de mercado y comentarios de consumidores</strong> sobre el producto. No reemplaza el diagnóstico ni el consejo médico. Consulte siempre a un profesional de la salud antes de usar suplementos.',
      topBanner: 'Aviso: este sitio ofrece análisis basados en investigación y opiniones de consumidores. Consulte a un profesional sanitario antes de usar suplementos.'
    },
    'fr': {
      title: 'Avertissement de Contenu Critique:',
      text: 'Cet article est une <strong>analyse de recherche de marché et des retours consommateurs</strong> concernant le produit. Il ne remplace pas un diagnostic médical. Consultez toujours un professionnel de santé avant d’utiliser des compléments.',
      topBanner: 'Avertissement: ce site présente des analyses basées sur des recherches et des commentaires de consommateurs. Consultez un professionnel de santé avant d’utiliser des compléments.'
    },
    'de': {
      title: 'Wichtiger Hinweis zum Inhalt:',
      text: 'Dieser Artikel ist eine <strong>Analyse von Marktforschung und Verbraucherfeedback</strong> über das Produkt. Er ersetzt keine ärztliche Diagnose oder Beratung. Konsultieren Sie immer einen qualifizierten Gesundheitsfachmann, bevor Sie Nahrungsergänzungsmittel einnehmen.',
      topBanner: 'Hinweis: Diese Website bietet Analysen basierend auf Forschung und Verbrauchermeinungen. Konsultieren Sie vor der Einnahme von Nahrungsergänzungsmitteln einen Fachmann im Gesundheitswesen.'
    },
    'it': {
      title: 'Avviso di Contenuto Critico:',
      text: 'Questo articolo è un’<strong>analisi di ricerca di mercato e feedback dei consumatori</strong> sul prodotto in questione. Non sostituisce il parere di un medico o nutrizionista. Consultare sempre un professionista sanitario qualificato prima di assumere qualsiasi integratore.',
      topBanner: 'Avviso: questo sito presenta analisi basate su ricerche e opinioni dei consumatori. Rivolgersi sempre a un professionista della salute prima di assumere integratori.'
    },
    'fi': {
      title: 'Kriittinen sisältövaroitus:',
      text: 'Tämä artikkeli on <strong>markkinatutkimuksen ja kuluttajapalautteen analyysi</strong> kyseisestä tuotteesta. Se ei korvaa lääkärin tai ravitsemusterapeutin diagnoosia. Ota aina yhteyttä terveydenhuollon ammattilaiseen ennen ravintolisien käyttöä.',
      topBanner: 'Varoitus: tällä sivustolla on analyyseja, jotka perustuvat tutkimukseen ja kuluttajapalautteeseen. Keskustele terveydenhuollon ammattilaisen kanssa ennen ravintolisien käytön aloittamista.'
    },
    'nl': {
      title: 'Kritieke Inhoudswaarschuwing:',
      text: 'Dit artikel is een <strong>analyse van marktonderzoek en feedback van consumenten</strong> over het product in kwestie. Het vervangt geen diagnose of advies van een arts of voedingsdeskundige. Raadpleeg altijd een gekwalificeerde gezondheidsprofessional voordat u supplementen gebruikt.',
      topBanner: 'Waarschuwing: deze site bevat analyses op basis van onderzoek en consumentenfeedback. Raadpleeg altijd een gezondheidsprofessional voor het gebruik van supplementen.'
    },
    'sv': {
      title: 'Kritisk Innehållsvarning:',
      text: 'Den här artikeln är en <strong>analys av marknadsundersökningar och konsumentfeedback</strong> angående produkten. Den ersätter inte ett medicinskt utlåtande. Konsultera alltid en kvalificerad hälsoexpert innan du använder kosttillskott.',
      topBanner: 'Varning: den här webbplatsen ger analyser baserade på forskning och konsumentåterkoppling. Rådfråga vårdpersonal innan du använder kosttillskott.'
    }
  };

  // --- HELPERS ---
  function safeQuery(...selectors) {
    for (let s of selectors) {
      const el = document.querySelector(s);
      if (el) return el;
    }
    return null;
  }

  // --- INJETAR BANNER FIXO ---
  function injectTopBanner(langContent) {
    // evita duplicação
    if (document.getElementById('rn-top-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'rn-top-banner';
    banner.setAttribute('aria-hidden', 'false');
    banner.style.cssText = [
      'position: fixed',
      'top: 0',
      'left: 0',
      'width: 100%',
      'z-index: 2147483647', // máximo prático
      'background-color: #fff3cd',
      'border-bottom: 1px solid #ffe08a',
      'padding: 10px 14px',
      'font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
      'font-size: 14px',
      'text-align: center',
      'color: #222',
      'box-shadow: 0 2px 6px rgba(0,0,0,0.08)',
      'line-height:1.25'
    ].join(';');

    // texto seguro (escape básico)
    banner.innerHTML = langContent.topBanner;

    // insere como primeiro filho do body (não altera header existente)
    const body = document.body || document.getElementsByTagName('body')[0];
    if (body) {
      body.insertBefore(banner, body.firstChild);
    } else {
      document.documentElement.appendChild(banner);
    }

    // espera pintura para obter altura correta
    requestAnimationFrame(() => {
      const bannerHeight = Math.ceil(banner.getBoundingClientRect().height) + 2; // folga

      // tenta localizar o container principal do conteúdo da review
      const mainEl = safeQuery('main', 'article', '#content', '.post', '.entry-content', '.site-content');

      if (mainEl) {
        // preserva margin-top existente e adiciona deslocamento só se necessário
        const style = window.getComputedStyle(mainEl);
        const currentMarginTop = parseFloat(style.marginTop) || 0;
        // se o elemento está posicionado relativo/absolute/fixed e tem top, não mexemos
        if (!['fixed','absolute'].includes(style.position)) {
          // adiciona margin-top se não houver espaço suficiente
          if (currentMarginTop < bannerHeight) {
            mainEl.style.marginTop = (currentMarginTop + bannerHeight) + 'px';
          }
        } else {
          // fallback: aplica padding-top ao body apenas se for seguro
          const bodyStyle = window.getComputedStyle(body);
          const bodyPaddingTop = parseFloat(bodyStyle.paddingTop) || 0;
          if (bodyPaddingTop < bannerHeight) body.style.paddingTop = (bodyPaddingTop + bannerHeight) + 'px';
        }
      } else {
        // fallback seguro: ajusta padding-top do body apenas se menor
        const bodyStyle = window.getComputedStyle(body);
        const bodyPaddingTop = parseFloat(bodyStyle.paddingTop) || 0;
        if (bodyPaddingTop < bannerHeight) body.style.paddingTop = (bodyPaddingTop + bannerHeight) + 'px';
      }
    });
  }

  // --- INJETAR DISCLAIMER APÓS O H1 ---
  function injectEEATDisclaimer(langContent) {
    // procura h1 preferencialmente dentro do main/article, para não afetar headers de layout
    const mainEl = safeQuery('main', 'article', '#content', '.post', '.entry-content', '.site-content');
    const h1 = mainEl ? mainEl.querySelector('h1') : document.querySelector('h1');

    if (!h1) return; // se não encontrar H1, não cria nada

    // verifica se disclaimer já existe próximo ao H1 (evitar duplicatas)
    if (h1.nextElementSibling && h1.nextElementSibling.id === 'rn-eeat-disclaimer') return;

    const disclaimerDiv = document.createElement('div');
    disclaimerDiv.id = 'rn-eeat-disclaimer';
    disclaimerDiv.style.cssText = [
      'padding: 16px',
      'background-color: #fff8e1',
      'border-left: 4px solid #ffb300',
      'border-radius: 4px',
      'margin: 24px 0',
      'font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
      'color: #444',
      'line-height:1.45'
    ].join(';');

    disclaimerDiv.innerHTML = `
      <div style="display:flex;align-items:flex-start;">
        <div style="flex-shrink:0;color:#ffb300;margin-right:12px;margin-top:2px;">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.398 16c-.77 1.333.192 3 1.732 3z">
            </path>
          </svg>
        </div>
        <div>
          <p style="font-weight:700;margin:0 0 8px 0;color:#222;">${langContent.title}</p>
          <p style="margin:0;">${langContent.text}</p>
        </div>
      </div>
    `;

    // insere sem remover nada
    h1.insertAdjacentElement('afterend', disclaimerDiv);
  }

  // --- EXECUÇÃO ---
  function run() {
    const rawLang = (document.documentElement && document.documentElement.lang) ? document.documentElement.lang : 'pt';
    const lang = rawLang.toLowerCase().substring(0,2);
    const content = disclaimerTexts[lang] || disclaimerTexts['pt'];

    // proteger execução apenas após DOM pronto; se já estiver carregado, executa imediatamente
    injectTopBanner(content);
    // pequeno atraso para garantir que H1 renderize em CMS que carregam conteúdo dinamicamente
    setTimeout(() => injectEEATDisclaimer(content), 120);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

})();
</script>
