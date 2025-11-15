<script>
(function() {
  console.log("🚀 Script de depuração iniciado");

  const texts = {
    pt: {
      banner: "Aviso: este site contém análises importantes sobre saúde. Sempre consulte um profissional de saúde.",
      title: "Aviso Importante:",
      text: "Este texto é uma análise independente. Consulte um médico antes de usar qualquer suplemento ou tratamento."
    },
    en: {
      banner: "Notice: this site contains important health-related analysis. Always consult a health professional.",
      title: "Important Notice:",
      text: "This is an independent analysis. Consult a doctor before using any supplement or treatment."
    }
  };

  function getLang() {
    const raw = document.documentElement.lang ? document.documentElement.lang.toLowerCase().slice(0,2) : "pt";
    return texts[raw] ? raw : "pt";
  }

  function createBanner(content) {
    console.log("Tentando criar banner no topo");
    if (document.getElementById("debug-top-banner")) {
      console.log("Banner já existe, não será criado de novo");
      return;
    }
    const banner = document.createElement("div");
    banner.id = "debug-top-banner";
    banner.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background: #28a745;
      color: white;
      padding: 12px 16px;
      text-align: center;
      font-family: sans-serif;
      font-size: 16px;
      z-index: 999999;
    `;
    banner.innerText = content.banner;
    document.body.prepend(banner);
    console.log("Banner criado:", banner);
  }

  function createDisclaimer() {
    console.log("Tentando criar disclaimer");
    const h1 = document.querySelector("h1");
    console.log("h1 encontrado:", h1);
    if (!h1) {
      console.warn("h1 não encontrado: agendando nova tentativa em 500ms");
      // tenta de novo mais tarde
      setTimeout(createDisclaimer, 500);
      return;
    }

    if (document.getElementById("debug-disclaimer")) {
      console.log("Disclaimer já existe, não cria outra vez");
      return;
    }

    const lang = getLang();
    const content = texts[lang];
    console.log("Idioma detectado:", lang, content);

    const box = document.createElement("div");
    box.id = "debug-disclaimer";
    box.style.cssText = `
      padding: 16px;
      background: #f1fdf4;
      border-left: 4px solid #28a745;
      margin-top: 20px;
      font-family: sans-serif;
      color: #333;
    `;
    box.innerHTML = `<strong>${content.title}</strong><p style="margin:8px 0 0 0;">${content.text}</p>`;

    h1.insertAdjacentElement("afterend", box);
    console.log("Disclaimer criado:", box);
  }

  document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded disparado");
    createBanner(texts[getLang()]);
    createDisclaimer();
  });

})();
</script>
