import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightClientMermaid from 'starlight-client-mermaid'

export default defineConfig({
  integrations: [
    starlight({
      editLink: {
        baseUrl: 'https://github.com/bbecquet/starlight-client-mermaid/edit/main/docs/',
      },
      plugins: [starlightClientMermaid()],
      sidebar: [
        {
          label: 'Start Here',
          items: [{ slug: 'getting-started' }],
        },
      ],
      social: {
        github: 'https://github.com/bbecquet/starlight-client-mermaid',
      },
      title: 'starlight-client-mermaid',
    }),
  ],
})
