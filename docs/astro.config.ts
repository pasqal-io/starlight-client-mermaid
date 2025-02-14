import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightClientMermaid from "@pasqal-io/starlight-client-mermaid";

export default defineConfig({
  site: "https://pasqal-io.github.io",
  base: "starlight-client-mermaid",
  integrations: [
    starlight({
      editLink: {
        baseUrl:
          "https://github.com/pasqal-io/starlight-client-mermaid/edit/main/docs/",
      },
      plugins: [starlightClientMermaid()],
      sidebar: [
        {
          label: "Usage",
          items: ["getting-started", "configuration"],
        },
        "demo",
      ],
      social: {
        github: "https://github.com/pasqal-io/starlight-client-mermaid",
      },
      title: "Starlight client Mermaid",
    }),
  ],
});
