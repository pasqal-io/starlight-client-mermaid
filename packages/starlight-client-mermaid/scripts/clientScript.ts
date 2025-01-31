export const getClientInjectionScript = (className: string) => {
  return `
import mermaid from "mermaid";

function renderDiagrams(graphs) {
  function render() {
    const theme = document.documentElement.getAttribute("data-theme") === "dark"
      ? "dark" : "default";

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
`;
};
