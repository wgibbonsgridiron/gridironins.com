/**
 * Script to extract state labels from map.svg and add them to us-states.svg
 * with scaled coordinates
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Paths
const mapSvgPath = join(__dirname, '../public/maps/map.svg');
const usStatesSvgPath = join(__dirname, '../public/maps/us-states.svg');
const outputPath = join(__dirname, '../public/maps/us-states-with-labels.svg');

// Scaling factors (from 2000x1200 to 959x593)
const SCALE_X = 959 / 2000;
const SCALE_Y = 593 / 1200;

console.log('Reading SVG files...');
const mapSvg = readFileSync(mapSvgPath, 'utf-8');
const usStatesSvg = readFileSync(usStatesSvgPath, 'utf-8');

// Extract labels from map.svg
console.log('Extracting labels from map.svg...');
// More flexible regex to catch all text elements with state codes
const labelRegex = /<text[^>]*?x="([\d.]+)"[^>]*?y="([\d.]+)"[^>]*?>.*?<tspan[^>]*?>([A-Z]{2})<\/tspan><\/text>/gs;
const labels = [];
let match;

while ((match = labelRegex.exec(mapSvg)) !== null) {
  const [, x, y, stateCode] = match;
  labels.push({
    stateCode: stateCode,
    x: parseFloat(x) * SCALE_X,
    y: parseFloat(y) * SCALE_Y
  });
}

// Also try matching the reverse order (y before x)
const labelRegex2 = /<text[^>]*?y="([\d.]+)"[^>]*?x="([\d.]+)"[^>]*?>.*?<tspan[^>]*?>([A-Z]{2})<\/tspan><\/text>/gs;
while ((match = labelRegex2.exec(mapSvg)) !== null) {
  const [, y, x, stateCode] = match;
  // Check if we already have this state to avoid duplicates
  if (!labels.find(l => l.stateCode === stateCode)) {
    labels.push({
      stateCode: stateCode,
      x: parseFloat(x) * SCALE_X,
      y: parseFloat(y) * SCALE_Y
    });
  }
}

console.log(`Found ${labels.length} state labels`);

// Remove embedded styles that conflict with our CSS
console.log('Removing embedded SVG styles...');
let cleanedSvg = usStatesSvg;

// Remove the entire <defs><style> block that contains the gray fill
cleanedSvg = cleanedSvg.replace(/<defs>[\s\S]*?<\/defs>/g, '');

// Remove the class="state" from the <g> wrapper as it applies gray fill
cleanedSvg = cleanedSvg.replace(/<g class="state">/g, '<g class="states">');

// Create label group with scaled coordinates
const labelGroup = `
  <!-- State Labels -->
  <g id="state-labels" class="state-labels" aria-hidden="true">
${labels.map(label => `    <text x="${label.x.toFixed(1)}" y="${label.y.toFixed(1)}" class="state-label">${label.stateCode}</text>`).join('\n')}
  </g>
`;

// Add labels to us-states.svg before the closing </svg> tag
const updatedSvg = cleanedSvg.replace('</svg>', `${labelGroup}\n</svg>`);

// Write the result
console.log(`Writing result to ${outputPath}...`);
writeFileSync(outputPath, updatedSvg, 'utf-8');

console.log('Done! Labels added successfully.');
console.log(`\nLabel positions (first 5):`);
labels.slice(0, 5).forEach(label => {
  console.log(`  ${label.stateCode}: (${label.x.toFixed(1)}, ${label.y.toFixed(1)})`);
});
