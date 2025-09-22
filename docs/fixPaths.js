const fs = require("fs");
const path = require("path");

const ROOT_DIR = __dirname; // agora é a pasta onde você roda o script
const OLD_URL = "http://localhost";
const NEW_URL = "https://healthandlongevity.reviewnexus.blog";

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  if (content.includes(OLD_URL)) {
    const updated = content.replaceAll(OLD_URL, NEW_URL);
    fs.writeFileSync(filePath, updated, "utf8");
    console.log("Corrigido:", filePath);
  }
}

function scanDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      scanDir(filePath); // recursivo
    } else if (/\.(html|htm|xhtml)$/i.test(file)) {
      fixFile(filePath);
    }
  });
}

scanDir(ROOT_DIR);
console.log("✅ Todos os arquivos HTML foram verificados e corrigidos!");
