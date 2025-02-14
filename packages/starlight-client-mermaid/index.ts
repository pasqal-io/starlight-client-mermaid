import type {
  StarlightPlugin,
  StarlightUserConfig,
} from "@astrojs/starlight/types";
import type { AstroIntegrationLogger } from "astro";
import { remarkTagMermaid } from "./scripts/remarkTagMermaid";
import { vitePluginStarlightClientMermaidConfig } from "./libs/vite";

const PLUGIN_NAME = "@pasqal-io/starlight-client-mermaid";
const OVERRIDES_PATH = `${PLUGIN_NAME}/components/overrides`;

interface StarlightClientMermaidOptions {
  className?: string;
  loadingPlaceholder?: string;
}

export default function starlightClientMermaid(
  userOptions?: StarlightClientMermaidOptions,
): StarlightPlugin {
  const options = {
    className: "mermaid",
    loadingPlaceholder: "",
    ...userOptions,
  };
  const { className, loadingPlaceholder } = options;

  return {
    name: PLUGIN_NAME,
    hooks: {
      setup({
        command,
        astroConfig,
        addIntegration,
        logger,
        config: starlightConfig,
        updateConfig: updateStarlightConfig,
      }) {
        if (command !== "build" && command !== "dev") {
          return;
        }
        logger.info(`Setting up ${PLUGIN_NAME}`);

        updateStarlightConfig({
          components: {
            ...starlightConfig.components,
            ...overrideStarlightComponent(
              starlightConfig.components,
              logger,
              "MarkdownContent",
            ),
          },
        });

        // We need to configure a Mardown remark plugin, which happens at the Astro level
        addIntegration({
          name: `astro_${PLUGIN_NAME}`,
          hooks: {
            "astro:config:setup": ({ updateConfig }) => {
              updateConfig({
                markdown: {
                  ...astroConfig.markdown,
                  remarkPlugins: [
                    ...(astroConfig.markdown.remarkPlugins ?? []),
                    [remarkTagMermaid, { className, loadingPlaceholder }],
                  ],
                },
                vite: {
                  plugins: [vitePluginStarlightClientMermaidConfig(options)],
                },
              });
            },
          },
        });
      },
    },
  };
}

function overrideStarlightComponent(
  components: StarlightUserConfig["components"],
  logger: AstroIntegrationLogger,
  component: keyof NonNullable<StarlightUserConfig["components"]>,
) {
  if (components?.[component]) {
    logger.warn(
      `It looks like you already have a \`${component}\` component override in your Starlight configuration.`,
    );
    logger.warn(
      `To use \`${PLUGIN_NAME}\`, either remove your override or update it to render the content from \`${OVERRIDES_PATH}/${component}.astro\`.`,
    );

    return {};
  }

  return {
    [component]: `${OVERRIDES_PATH}/${component}.astro`,
  };
}
