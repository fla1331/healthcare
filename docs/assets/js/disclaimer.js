<style>
/* AVISO FIXO NO TOPO */
#top-disclaimer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #2a7a55; /* verde do site */
    color: #fff;
    text-align: center;
    padding: 12px 20px;
    font-size: 16px;
    font-weight: 600;
    z-index: 999999;
}

/* BOTÃO FECHAR */
#top-disclaimer span {
    float: right;
    margin-left: 15px;
    cursor: pointer;
    font-weight: bold;
    font-size: 18px;
}

/* BANNER FLUTUANTE */
#float-banner {
    position: fixed;
    bottom: 15px;
    right: 15px;
    background: #2a7a55; /* verde do site */
    color: #fff;
    padding: 18px 22px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    box-shadow: 0 0 15px rgba(0,0,0,0.2);
    z-index: 999999;
    display: none;
}

#float-banner span {
    float: right;
    margin-left: 10px;
    cursor: pointer;
    font-weight: bold;
}
</style>

<script>
// cria aviso no topo SEM alterar nada do tema
document.addEventListener("DOMContentLoaded", function () {
    const disclaimer = document.createElement("div");
    disclaimer.id = "top-disclaimer";
    disclaimer.innerHTML = `
        <span id="close-disclaimer">&times;</span>
        Este site pode conter links de afiliados e material publicitário.
    `;
    document.body.appendChild(disclaimer);

    // fechar aviso
    document.getElementById("close-disclaimer").onclick = function () {
        disclaimer.style.display = "none";
    };

    // banner flutuante
    const floatBanner = document.createElement("div");
    floatBanner.id = "float-banner";
    floatBanner.innerHTML = `
        <span id="close-banner">&times;</span>
        Oferta exclusiva: veja a análise completa
    `;
    document.body.appendChild(floatBanner);

    setTimeout(() => {
        floatBanner.style.display = "block";
    }, 4000);

    document.getElementById("close-banner").onclick = function () {
        floatBanner.style.display = "none";
    };
});
</script>
