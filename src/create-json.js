const fs = require('fs');
const path = require('path');

const workspace = process.env.GITHUB_WORKSPACE;
console.log(workspace);
const readmePath = path.join(workspace, 'readme.txt');
const distFolder = path.join(workspace, 'wp-dist');
fs.mkdirSync(distFolder, { recursive: true });
const jsonOutputPath = path.join(distFolder, 'data.json');

const extractSection = (content, section) => {
  const regex = new RegExp(`== ${section} ==([\\s\\S]*?)(?=={2,}|$)`, 'i');
  const match = content.match(regex);
  return match ? match[1].trim() : "";
};

const extractKeyValue = (content, key) => {
  const regex = new RegExp(`^${key}:\\s*(.+)$`, 'mi');
  const match = content.match(regex);
  return match ? match[1].trim() : "";
};

const parseChangelog = (content) => {
  const regex = /= ([\d.]+) =([\s\S]*?)(?=\n=|$)/g;
  const changelog = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    changelog.push({
      version: match[1].trim(),
      changes: match[2].trim().split('\n').map((line) => line.replace(/^\*\s*/, '').trim()),
    });
  }

  return changelog;
};

const parseReadme = (content) => {
  return {
    name: extractKeyValue(content, 'Plugin Name') || 'Order on WhatsApp for WooCommerce',
    slug: extractKeyValue(content, 'Stable tag') || 'order-on-whatsapp-for-woocommerce',
    author: extractKeyValue(content, 'Contributors'),
    author_profile: extractKeyValue(content, 'Donate link'),
    version: extractKeyValue(content, 'Stable tag'),
    download_url: 'https://github.com/<username>/<repo>/releases/latest/download/plugin.zip',
    requires: extractKeyValue(content, 'Requires at least'),
    tested: extractKeyValue(content, 'Tested up to'),
    requires_php: extractKeyValue(content, 'Requires PHP'),
    last_updated: new Date().toISOString(),
    sections: {
      description: extractSection(content, 'Description'),
      installation: extractSection(content, 'Installation'),
      changelog: parseChangelog(extractSection(content, 'Changelog')),
    },
  };
};

const readmeContent = fs.readFileSync(readmePath, 'utf-8');
const jsonData = parseReadme(readmeContent);

fs.writeFileSync(jsonOutputPath, JSON.stringify(jsonData, null, 2));
console.log('Success: JSON created at', jsonOutputPath);
