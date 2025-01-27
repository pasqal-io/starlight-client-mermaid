import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightClientMermaid, {
  remarkTagMermaid,
} from "starlight-client-mermaid";

export default defineConfig({
  integrations: [
    starlight({
      editLink: {
        baseUrl:
          "https://github.com/bbecquet/starlight-client-mermaid/edit/main/docs/",
      },
      plugins: [starlightClientMermaid()],
      sidebar: ["getting-started", "examples"],
      social: {
        github: "https://github.com/bbecquet/starlight-client-mermaid",
      },
      title: "starlight-client-mermaid",
    }),
  ],
  markdown: {
    remarkPlugins: [remarkTagMermaid],
  },
});
