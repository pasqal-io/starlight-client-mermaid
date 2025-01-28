import type { StarlightPlugin } from "@astrojs/starlight/types";
import { remarkTagMermaid } from "./remarkTagMermaid.ts";

interface StarlightClientMermaidOptions {
  className?: string;
  loadingPlaceholder?: string;
}

export default function starlightClientMermaid({
  className = "mermaid",
  loadingPlaceholder = "",
}: StarlightClientMermaidOptions): StarlightPlugin {
  return {
    name: "starlight-client-mermaid",
    hooks: {
      setup({ command, astroConfig, addIntegration, logger }) {
        if (command !== "build" && command !== "dev") {
          return;
        }
        logger.info("Setting up starlight-client-mermaid");

        // We need to inject a client script and configure a Mardown remark plugin,
        // two things happening at the Astro level
        addIntegration({
          name: "astro-client-mermaid",
          hooks: {
            "astro:config:setup": ({ injectScript, updateConfig }) => {
              injectScript(
                "page",
                `
import mermaid from "mermaid";

function renderDiagrams(graphs) {
  function render() {
    const theme =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "default";

    mermaid.initialize({ startOnLoad: false, theme });

    for (const graph of graphs) {
      const content = graph.getAttribute("data-content");
      if (!content) continue;
      const id = "mermaid-" + Math.round(Math.random() * 100000);
      mermaid.render(id, content).then((result) => {
        graph.innerHTML = result.svg;
        graph.setAttribute("data-status", "rendered");
      }).catch((e) => {
        graph.innerHTML = e;
        graph.setAttribute("data-status", "error");
      })
    }
  }

  render();

  const themeObserver = new MutationObserver(render);
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
}

const mermaidGraphs = document.getElementsByClassName("${className}");
if (mermaidGraphs.length > 0) {
  renderDiagrams(mermaidGraphs);
}
                `,
              );

              updateConfig({
                markdown: {
                  ...astroConfig.markdown,
                  remarkPlugins: [
                    ...(astroConfig.markdown.remarkPlugins ?? []),
                    [remarkTagMermaid, { className, loadingPlaceholder }],
                  ],
                },
              });
            },
          },
        });
      },
    },
  };
}
