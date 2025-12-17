#!/usr/bin/env node
// post-process-html.js
const fs = require('fs');
const path = require('path');

const basePath = '/aman_portfolio';
const outDir = './out';

function processHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace root-relative paths that don't already have the basePath
  // Only replace paths that start with `/` but don't already start with our basePath
  content = content.replace(
    /(href|src|action|formaction)="\/(?!\/)(?!(?:aman_portfolio\/|aman_portfolio$))/g,
    `$1="${basePath}/`
  );

  // Same for single quotes
  content = content.replace(
    /(href|src|action|formaction)='\/(?!\/)(?!(?:aman_portfolio\/|aman_portfolio$))/g,
    `$1='${basePath}/`
  );

  fs.writeFileSync(filePath, content);
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (path.extname(file) === '.html') {
      processHtmlFile(filePath);
    }
  }
}

// Run the processing
processDirectory(outDir);

console.log('Post-processing completed successfully!');