import type { ViteUserConfig } from "astro";
import type { Config } from "./config";

export function vitePluginStarlightClientMermaidConfig(
  config: Config,
): VitePlugin {
  const moduleId = `virtual:starlight-client-mermaid`;
  const resolvedModuleId = `\0${moduleId}`;
  const moduleContent = `export default ${JSON.stringify(config)}`;

  return {
    name: `vite-plugin-client-mermaid-config`,
    load: (id) => (id === resolvedModuleId ? moduleContent : undefined),
    resolveId: (id) => (id === moduleId ? resolvedModuleId : undefined),
  };
}

type VitePlugin = NonNullable<ViteUserConfig["plugins"]>[number];
