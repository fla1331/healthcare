<script>
(function() {

  /* ==============================
     TEXTOS
  ============================== */

  const texts = {
    pt: {
      banner: "Aviso: este site apresenta análises baseadas em pesquisa e opinião de consumidores. Consulte um profissional de saúde antes de utilizar suplementos.",
      title: "Aviso de Conteúdo Crítico:",
      text: "Este artigo é uma <strong>análise de pesquisa de mercado e feedback de consumidores</strong> sobre o produto em questão. Ele não substitui o diagnóstico ou aconselhamento de um médico ou nutricionista. Sempre consulte um profissional de saúde qualificado antes de iniciar qualquer tratamento."
    },
    en: {
      banner: "Disclaimer: this site provides research-based analysis and consumer opinions. Always consult a health professional before using supplements.",
      title: "Critical Content Warning:",
      text: "This article is a <strong>market research and consumer feedback analysis</strong>. It is not medical advice. Always consult a qualified health professional before using supplements."
    },
    es: {
      banner: "Aviso: este sitio ofrece análisis basados en investigación y opiniones de consumidores. Consulte a un profesional de la salud antes de usar suplementos.",
      title: "Advertencia de Contenido Crítico:",
      text: "Este artículo es un <strong>análisis de investigación de mercado y comentarios de consumidores</strong>. No reemplaza consejo médico."
    }
  };

  /* ==============================
     GET LANG
  ============================== */

  const raw = (document.documentElement.lang || "pt").toLowerCase().slice(0,2);
  const lang = texts[raw] ? raw : "pt";
  const t = texts[lang];

  /* ==============================
     BANNER SEGURO (STICKY)
  ============================== */

  function injectTopBanner() {
    if (document.getElementById("rn-banner")) return;

    const b = document.createElement("div");
    b.id = "rn-banner";

    b.style.cssText = `
      position: sticky;
      top: 0;
      z-index: 9999;
      background: #fff3cd;
      border-bottom: 1px solid #ffe08a;
      padding: 10px 12px;
      font-size: 14px;
      font-family: Inter, Arial, sans-serif;
      color: #333;
      text-align: center;
    `;

    b.textContent = t.banner;

    document.body.prepend(b);
  }

  /* ==============================
     DISCLAIMER APÓS O H1
  ============================== */

  function injectDisclaimerBelowH1() {
    const h1 = document.querySelector("h1");
    if (!h1) return;

    if (document.getElementById("rn-disclaimer")) return;

    const box = document.createElement("div");
    box.id = "rn-disclaimer";

    box.style.cssText = `
      padding: 16px;
      margin: 24px 0;
      background: #fff8e1;
      border-left: 4px solid #ffb300;
      border-radius: 4px;
      font-family: Inter, Arial, sans-serif;
      line-height: 1.45;
      color: #444;
    `;

    box.innerHTML = `
      <p style="margin:0 0 6px 0; font-weight:700; color:#222;">
        ${t.title}
      </p>
      <p style="margin:0;">${t.text}</p>
    `;

    h1.insertAdjacentElement("afterend", box);
  }

  /* ==============================
     EXECUÇÃO
  ============================== */

  document.addEventListener("DOMContentLoaded", function() {
    injectTopBanner();
    injectDisclaimerBelowH1();
  });

})();
</script>
