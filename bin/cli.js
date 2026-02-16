#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0];

const PACKAGE_ROOT = path.resolve(__dirname, '..');
const CWD = process.cwd();

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m'
};

function log(msg, color = 'reset') {
  console.log(`${colors[color]}${msg}${colors.reset}`);
}

function showHelp() {
  console.log(`
${colors.cyan}MarCake${colors.reset} - Marketing Skills for AI Agents

${colors.yellow}Usage:${colors.reset}
  npx marcake <command>

${colors.yellow}Commands:${colors.reset}
  init          Initialize MarCake in current directory (copies to .marcake/)
  list          List all available skills
  skill <name>  Show details for a specific skill
  tools         List all tool integrations
  help          Show this help message

${colors.yellow}Examples:${colors.reset}
  npx marcake init              # Set up MarCake in your project
  npx marcake list              # See all 25 marketing skills
  npx marcake skill page-cro    # View landing page optimization skill
  npx marcake tools             # See all 29 tool integrations

${colors.yellow}After init:${colors.reset}
  Skills are available in .marcake/skills/
  Reference them in your CLAUDE.md or project instructions.
`);
}

function listSkills() {
  const skillsDir = path.join(PACKAGE_ROOT, 'skills');
  const skills = fs.readdirSync(skillsDir).filter(f =>
    fs.statSync(path.join(skillsDir, f)).isDirectory()
  );

  log('\nMarCake Skills (25 total)\n', 'cyan');

  const categories = {
    'Conversion Optimization': ['page-cro', 'signup-flow-cro', 'onboarding-cro', 'form-cro', 'popup-cro', 'paywall-upgrade-cro'],
    'Content & Copy': ['copywriting', 'copy-editing', 'email-sequence', 'social-content'],
    'SEO & Discovery': ['seo-audit', 'programmatic-seo', 'competitor-alternatives', 'schema-markup'],
    'Measurement & Testing': ['analytics-tracking', 'ab-test-setup'],
    'Growth Engineering': ['free-tool-strategy', 'referral-program'],
    'Strategy & Planning': ['marketing-ideas', 'marketing-psychology', 'launch-strategy', 'pricing-strategy', 'content-strategy'],
    'Foundational': ['product-marketing-context', 'paid-ads']
  };

  for (const [category, skillList] of Object.entries(categories)) {
    log(`${category}:`, 'yellow');
    skillList.forEach(skill => {
      const skillPath = path.join(skillsDir, skill, 'SKILL.md');
      if (fs.existsSync(skillPath)) {
        const content = fs.readFileSync(skillPath, 'utf8');
        const descMatch = content.match(/description:\s*(.+)/);
        const desc = descMatch ? descMatch[1] : '';
        log(`  ${skill}`, 'green');
        if (desc) log(`    ${desc}`, 'dim');
      }
    });
    console.log();
  }
}

function showSkill(skillName) {
  const skillPath = path.join(PACKAGE_ROOT, 'skills', skillName, 'SKILL.md');

  if (!fs.existsSync(skillPath)) {
    log(`\nSkill "${skillName}" not found.`, 'yellow');
    log('Run "npx marcake list" to see all available skills.\n', 'dim');
    return;
  }

  const content = fs.readFileSync(skillPath, 'utf8');
  console.log();
  console.log(content);
}

function listTools() {
  const toolsDir = path.join(PACKAGE_ROOT, 'tools', 'integrations');
  const tools = fs.readdirSync(toolsDir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''));

  log('\nMarCake Tool Integrations (29 total)\n', 'cyan');

  const categories = {
    'Analytics': ['ga4', 'mixpanel', 'amplitude', 'posthog', 'segment', 'adobe-analytics'],
    'SEO': ['google-search-console', 'semrush', 'ahrefs'],
    'CRM': ['hubspot', 'salesforce'],
    'Payments': ['stripe'],
    'Referral': ['rewardful', 'tolt', 'mention-me', 'dub-co'],
    'Email': ['mailchimp', 'customer-io', 'sendgrid', 'resend', 'kit'],
    'Advertising': ['google-ads', 'meta-ads', 'linkedin-ads', 'tiktok-ads'],
    'Automation': ['zapier'],
    'Commerce/CMS': ['shopify', 'wordpress', 'webflow']
  };

  for (const [category, toolList] of Object.entries(categories)) {
    log(`${category}:`, 'yellow');
    toolList.forEach(tool => {
      if (tools.includes(tool)) {
        log(`  ${tool}`, 'green');
      }
    });
    console.log();
  }

  log('View tool details: cat .marcake/tools/integrations/<tool>.md', 'dim');
  console.log();
}

function init() {
  const targetDir = path.join(CWD, '.marcake');

  if (fs.existsSync(targetDir)) {
    log('\n.marcake directory already exists.', 'yellow');
    log('Remove it first if you want to reinitialize.\n', 'dim');
    return;
  }

  log('\nInitializing MarCake...', 'cyan');

  // Create target directory
  fs.mkdirSync(targetDir, { recursive: true });

  // Copy directories
  const dirsToCopy = ['skills', 'tools', '.claude-plugin'];
  dirsToCopy.forEach(dir => {
    copyRecursive(
      path.join(PACKAGE_ROOT, dir),
      path.join(targetDir, dir)
    );
  });

  // Copy files
  const filesToCopy = ['AGENTS.md', 'CLAUDE.md', 'README.md'];
  filesToCopy.forEach(file => {
    const src = path.join(PACKAGE_ROOT, file);
    const dest = path.join(targetDir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  });

  log('\nMarCake installed to .marcake/', 'green');
  console.log(`
${colors.yellow}Next steps:${colors.reset}

1. Add to your CLAUDE.md or project instructions:
   ${colors.dim}Import marketing skills from .marcake/skills/${colors.reset}

2. Browse available skills:
   ${colors.dim}npx marcake list${colors.reset}

3. View a specific skill:
   ${colors.dim}cat .marcake/skills/page-cro/SKILL.md${colors.reset}

${colors.cyan}Happy marketing!${colors.reset}
`);
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;

  const stat = fs.statSync(src);

  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(child => {
      copyRecursive(path.join(src, child), path.join(dest, child));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Main
switch (command) {
  case 'init':
    init();
    break;
  case 'list':
    listSkills();
    break;
  case 'skill':
    if (args[1]) {
      showSkill(args[1]);
    } else {
      log('\nPlease specify a skill name.', 'yellow');
      log('Run "npx marcake list" to see all available skills.\n', 'dim');
    }
    break;
  case 'tools':
    listTools();
    break;
  case 'help':
  case '--help':
  case '-h':
  case undefined:
    showHelp();
    break;
  default:
    log(`\nUnknown command: ${command}`, 'yellow');
    showHelp();
}
