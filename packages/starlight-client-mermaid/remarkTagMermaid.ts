import { visit } from "unist-util-visit";
import type { RemarkPlugin } from "@astrojs/markdown-remark";

const escapeMap: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const escapeHtml = (str: string) =>
  str.replace(/[&<>"']/g, (c) => escapeMap[c] as string);

export const tagMermaid: RemarkPlugin<[]> = () => (tree) => {
  visit(tree, "code", (node) => {
    if (node.lang !== "mermaid") return;

    // @ts-ignore TS expect it remains "code" but we need to force HTML injection inside Markdown
    node.type = "html";
    node.value = `<div class="mermaid" data-content="${escapeHtml(node.value)}"><p>Loading graph...</p></div>`;
  });
};
