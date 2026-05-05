#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
/**
 * Standardized Feature Scaffolding Script for 2026 Expo Template.
 * Usage: node scripts/generate-feature.js <feature-name>
 */

const fs = require("fs");
const path = require("path");

const featureName = process.argv[2];

if (!featureName) {
  console.error(
    "❌ Please provide a feature name (e.g., node scripts/generate-feature.js dashboard)"
  );
  process.exit(1);
}

const baseDir = path.join(__dirname, "..", "src", "features", featureName);
const subDirs = ["components", "hooks", "api", "types", "services"];

if (fs.existsSync(baseDir)) {
  console.error(`❌ Feature "${featureName}" already exists at ${baseDir}`);
  process.exit(1);
}

console.log(`🚀 Scaffolding feature: ${featureName}...`);

// Create base directory
fs.mkdirSync(baseDir, { recursive: true });

// Create subdirectories and their index.ts files
subDirs.forEach((dir) => {
  const dirPath = path.join(baseDir, dir);
  fs.mkdirSync(dirPath);
  fs.writeFileSync(path.join(dirPath, "index.ts"), "// Export feature-specific logic here\n");
  console.log(`✅ Created src/features/${featureName}/${dir}`);
});

// Create a README.md for the feature
const readmeContent = `# ${featureName.charAt(0).toUpperCase() + featureName.slice(1)} Feature

## Overview
Describe the purpose of this feature here.

## Structure
- \`components/\`: UI elements specific to this feature.
- \`hooks/\`: Custom React hooks for business logic.
- \`api/\`: Data fetching and API integration (Orval/Query).
- \`types/\`: TypeScript interfaces and types.
- \`services/\`: Helper logic or external integrations.
`;

fs.writeFileSync(path.join(baseDir, "README.md"), readmeContent);

console.log(`\n✨ Feature "${featureName}" scaffolded successfully!`);
console.log(`📍 Location: ${baseDir}\n`);
