import type { StarlightPlugin } from "@astrojs/starlight/types";
import { remarkTagMermaid } from "./scripts/remarkTagMermaid";
import { getClientInjectionScript } from "./scripts/clientScript";

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
              injectScript("page", getClientInjectionScript(className));

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
