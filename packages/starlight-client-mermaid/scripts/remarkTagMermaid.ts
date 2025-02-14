// Remark plugin to transform Mermaid codeblocks in Markdown
// into HTML divs with the raw Mermaid code in data attribute
// Adapted from https://github.com/JuanM04/portfolio/blob/983b0ed0eabdac37bf8b7912d3e8128a443192b9/src/plugins/mermaid.ts

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

export const remarkTagMermaid: RemarkPlugin<[]> =
  (opts = { className: "mermaid", loadingPlaceholder: "" }) =>
  (tree) => {
    visit(tree, "code", (node) => {
      if (node.lang !== "mermaid") return;
      // @ts-ignore TS expect it remains "code", but we need to replace the block with HTML inside Markdown
      node.type = "html";
      node.value = `<div class="${opts.className}" data-content="${escapeHtml(node.value)}" data-status="loading">${opts.loadingPlaceholder}</div>`;
    });
  };
