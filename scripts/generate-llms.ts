import fs from "node:fs";
import path from "node:path";

interface DocFile {
  filepath: string;
  id: string;
  title: string;
  description: string;
  order: number;
  content: string;
}

const docsDir = path.join(process.cwd(), "src/content/docs");
const publicDir = path.join(process.cwd(), "public");

function parseFrontmatter(rawContent: string) {
  const frontmatterRegex = /^---\s*[\r\n]([\s\S]*?)[\r\n]---\s*[\r\n]/;
  const match = rawContent.match(frontmatterRegex);

  let title = "Document";
  let description = "";
  let order = 999;
  let body = rawContent;

  if (match) {
    const yaml = match[1];
    body = rawContent.slice(match[0].length);

    const titleMatch = yaml.match(/^title:\s*(.+)$/m);
    if (titleMatch) title = titleMatch[1].replace(/^["']|["']$/g, "").trim();

    const descMatch = yaml.match(/^description:\s*(.+)$/m);
    if (descMatch) description = descMatch[1].replace(/^["']|["']$/g, "").trim();

    const orderMatch = yaml.match(/order:\s*(\d+)/m);
    if (orderMatch) order = parseInt(orderMatch[1], 10);
  }

  // Clean pure visual JSX components from LLM text representation
  body = body
    .replace(/<WorkflowExplorer[^>]*\/>/g, "")
    .replace(/<IdentityRules[^>]*\/>/g, "")
    .replace(/<Steps>/g, "")
    .replace(/<\/Steps>/g, "")
    .replace(/<Step title="([^"]+)">/g, "#### Step: $1")
    .replace(/<\/Step>/g, "")
    .replace(/<Tabs>/g, "")
    .replace(/<\/Tabs>/g, "")
    .replace(/<Tab label="([^"]+)">/g, "#### $1")
    .replace(/<\/Tab>/g, "")
    .replace(/<Callout type="([^"]+)">/g, "> **Note ($1)**: ")
    .replace(/<\/Callout>/g, "");

  return { title, description, order, body: body.trim() };
}

function getAllFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath));
    } else if (file.endsWith(".md") || file.endsWith(".mdx")) {
      results.push(fullPath);
    }
  });
  return results;
}

function generate() {
  console.log("Generating llms-full.txt & llms.txt...");
  const files = getAllFiles(docsDir);

  const docFiles: DocFile[] = files.map((filepath) => {
    const relativePath = path.relative(docsDir, filepath);
    const id = relativePath.replace(/\.(md|mdx)$/, "");
    const raw = fs.readFileSync(filepath, "utf-8");
    const { title, description, order, body } = parseFrontmatter(raw);
    return { filepath, id, title, description, order, content: body };
  });

  // Sort deterministically by path and sidebar order
  docFiles.sort((a, b) => {
    if (a.id === "index") return -1;
    if (b.id === "index") return 1;
    const sectionA = a.id.split("/")[0];
    const sectionB = b.id.split("/")[0];
    if (sectionA !== sectionB) return sectionA.localeCompare(sectionB);
    return a.order - b.order;
  });

  const header = `# Caatinga — LLM Full Documentation & Reference
> Deployment orchestration and versioned artifacts for Soroban smart contracts.
> Generated automatically from source MDX documentation.

`;

  let fullOutput = header;
  let summaryOutput = `# Caatinga Documentation Index for LLMs\n\n`;

  docFiles.forEach((doc) => {
    fullOutput += `\n---\n\n## Section: ${doc.title}\n\nPath: /docs/${doc.id}\nDescription: ${doc.description}\n\n${doc.content}\n\n`;
    summaryOutput += `- [${doc.title}](/docs/${doc.id}): ${doc.description}\n`;
  });

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, "llms-full.txt"), fullOutput, "utf-8");
  fs.writeFileSync(path.join(publicDir, "llms.txt"), summaryOutput, "utf-8");

  console.log(`✓ Generated ${path.join(publicDir, "llms-full.txt")} (${fullOutput.length} bytes)`);
  console.log(`✓ Generated ${path.join(publicDir, "llms.txt")} (${summaryOutput.length} bytes)`);
}

generate();
