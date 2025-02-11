import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightClientMermaid from "starlight-client-mermaid";

export default defineConfig({
  integrations: [
    starlight({
      editLink: {
        baseUrl:
          "https://github.com/bbecquet/starlight-client-mermaid/edit/main/docs/",
      },
      plugins: [starlightClientMermaid()],
      sidebar: [
        { label: "Usage", items: ["getting-started", "configuration"] },
        "demo",
      ],
      social: {
        github: "https://github.com/bbecquet/starlight-client-mermaid",
      },
      title: "Starlight client Mermaid",
    }),
  ],
});
