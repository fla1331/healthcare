document.addEventListener("DOMContentLoaded", function() {
  // 1️⃣ Corrige o clique do logo
  const logoLink = document.querySelector(".has-logo-image");
  if (logoLink) {
    logoLink.setAttribute("href", "https://healthandlongevity.reviewnexus.blog/");
  }

  // 2️⃣ Remove links em volta de imagens (lightbox)
  const imgLinks = document.querySelectorAll('a[href] > img');
  imgLinks.forEach(img => {
    const parent = img.parentElement;
    if (parent.tagName.toLowerCase() === "a") {
      parent.replaceWith(img); // mantém a imagem, remove o link
    }
  });
});
