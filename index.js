const fs = require('fs');
const path = require('path');

const SKILLS_DIR = path.join(__dirname, 'skills');
const TOOLS_DIR = path.join(__dirname, 'tools', 'integrations');

/**
 * Get list of all available skills
 * @returns {string[]} Array of skill names
 */
function getSkills() {
  return fs.readdirSync(SKILLS_DIR).filter(f =>
    fs.statSync(path.join(SKILLS_DIR, f)).isDirectory()
  );
}

/**
 * Get skill content by name
 * @param {string} skillName - Name of the skill (e.g., 'page-cro')
 * @returns {string|null} Skill markdown content or null if not found
 */
function getSkill(skillName) {
  const skillPath = path.join(SKILLS_DIR, skillName, 'SKILL.md');
  if (fs.existsSync(skillPath)) {
    return fs.readFileSync(skillPath, 'utf8');
  }
  return null;
}

/**
 * Get list of all tool integrations
 * @returns {string[]} Array of tool names
 */
function getTools() {
  return fs.readdirSync(TOOLS_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''));
}

/**
 * Get tool integration guide by name
 * @param {string} toolName - Name of the tool (e.g., 'stripe')
 * @returns {string|null} Tool guide markdown content or null if not found
 */
function getTool(toolName) {
  const toolPath = path.join(TOOLS_DIR, `${toolName}.md`);
  if (fs.existsSync(toolPath)) {
    return fs.readFileSync(toolPath, 'utf8');
  }
  return null;
}

/**
 * Get the tools registry
 * @returns {string} Registry markdown content
 */
function getRegistry() {
  const registryPath = path.join(__dirname, 'tools', 'REGISTRY.md');
  return fs.readFileSync(registryPath, 'utf8');
}

/**
 * Get path to skills directory
 * @returns {string} Absolute path to skills directory
 */
function getSkillsPath() {
  return SKILLS_DIR;
}

/**
 * Get path to tools directory
 * @returns {string} Absolute path to tools directory
 */
function getToolsPath() {
  return TOOLS_DIR;
}

module.exports = {
  getSkills,
  getSkill,
  getTools,
  getTool,
  getRegistry,
  getSkillsPath,
  getToolsPath
};
