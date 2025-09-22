const fs = require("fs");
const path = require("path");

const rootDir = __dirname; // pasta onde está o script
const baseURL = "https://healthandlongevity.reviewnexus.blog";

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath, callback);
    } else {
      callback(fullPath);
    }
  });
}

function fixHTML(filePath) {
  if (!filePath.endsWith(".html")) return;

  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  // Corrige CSS <link>
  content = content.replace(
    /href="\/wp-content\/([^"]+)"/g,
    `href="${baseURL}/wp-content/$1"`
  );

  // Corrige JS <script>
  content = content.replace(
    /src="\/wp-content\/([^"]+)"/g,
    `src="${baseURL}/wp-content/$1"`
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log("Corrigido:", path.relative(rootDir, filePath));
  }
}

walkDir(rootDir, fixHTML);

console.log("Todos os index.html foram verificados e corrigidos!");
