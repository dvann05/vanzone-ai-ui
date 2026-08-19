const fs = require("fs");
const path = require("path");

const root =
  path.join(__dirname, "..");

const files = [
  "vanzone-ui.js",
  "ai-background.js"
];

const jsDir =
  path.join(root, "js");

const distDir =
  path.join(root, "dist");

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, {
    recursive: true
  });
}

let output = `
/*!
 * Vanzone AI UI
 * AI News Interaction Engine
 * Version 1.0.0
 * MIT License
 */

`;

for (const file of files) {

  const filePath =
    path.join(jsDir, file);

  if (!fs.existsSync(filePath)) {
    throw new Error(
      `Missing JS file: ${file}`
    );
  }

  output +=
    `\n/* ===== ${file} ===== */\n`;

  output +=
    fs.readFileSync(
      filePath,
      "utf8"
    );

  output += "\n";
}

fs.writeFileSync(
  path.join(
    distDir,
    "vanzone-ai-ui.js"
  ),
  output
);

console.log(
  "Vanzone AI UI JavaScript built successfully."
);
