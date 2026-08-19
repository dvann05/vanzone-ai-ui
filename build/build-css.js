const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

const files = [
  "variables.css",
  "reset.css",
  "core.css",
  "animations.css",
  "effects.css",
  "components.css",
  "interactive.css",
  "ai-background.css",
  "utilities.css",
  "responsive.css"
];

const cssDir = path.join(root, "css");
const distDir = path.join(root, "dist");

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, {
    recursive: true
  });
}

let output = `
/*!
 * Vanzone AI UI
 * AI News Design System
 * Version 1.0.0
 * MIT License
 */

`;

for (const file of files) {

  const filePath =
    path.join(cssDir, file);

  if (!fs.existsSync(filePath)) {
    throw new Error(
      `Missing CSS file: ${file}`
    );
  }

  output += `\n/* ===== ${file} ===== */\n`;

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
    "vanzone-ai-ui.css"
  ),
  output
);

console.log(
  "Vanzone AI UI CSS built successfully."
);
