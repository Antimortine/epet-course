(function () {
  function initMermaid() {
    if (!window.mermaid) return;

    window.mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme: 'base',

      themeVariables: {
        fontSize: '22px',
        fontFamily: 'var(--md-text-font, system-ui, "Inter", "Roboto", sans-serif)',
        textColor: '#111',
        lineColor: '#e6edf5'
      },

      themeCSS: `
        g.node text, g.node tspan { fill:#111 !important; font-size:22px !important; }

        /* подписи на рёбрах */
        g.label text, g.label tspan,
        g.edgeLabel text, g.edgeLabel tspan, text.edgeLabel, text.edgeLabel tspan {
          fill:#e5e7eb !important; font-size:22px !important;
          paint-order:stroke; stroke:rgba(0,0,0,.35); stroke-width:1px;
        }
        g.label rect.background { fill:rgba(0,0,0,.35) !important; stroke:transparent !important; rx:4px; ry:4px; }

        /* заголовки сабграфов */
        g.cluster g.label text, g.cluster g.label tspan,
        g.cluster text, g.cluster tspan { fill:#e5e7eb !important; font-size:22px !important; }
      `,

      flowchart: {
        htmlLabels: false,
        nodeSpacing: 70,
        rankSpacing: 120,
        subGraphTitleMargin: 32,
        diagramPadding: 16,
        wrappingWidth: 260
      }
    });
  }

  function forceContrast(svg) {
    const id = svg.getAttribute('id');
    if (!id) return;

    const css = `
#${id} .flowchart-link, 
#${id} .edgePath .path { 
  stroke:#e6edf5 !important; 
  stroke-width:2px !important; 
  opacity:1 !important;
}
#${id} .marker, 
#${id} .arrowheadPath, 
#${id} defs marker path, 
#${id} defs marker polygon { 
  fill:#e6edf5 !important; 
  stroke:#e6edf5 !important; 
  opacity:1 !important;
}
`;

    let styleEl = svg.querySelector('style');
    if (!styleEl) {
      styleEl = document.createElementNS('http://www.w3.org/2000/svg', 'style');
      svg.prepend(styleEl);
    }
    styleEl.appendChild(document.createTextNode(css));
  }

  function runAndPatch() {
    return window.mermaid.run({ querySelector: '.mermaid' })
      .then(() => document.querySelectorAll('.mermaid svg').forEach(forceContrast));
  }

  initMermaid();
  runAndPatch();

  if (window.document$) {
    window.document$.subscribe(() => { initMermaid(); runAndPatch(); });
  } else {
    document.addEventListener('DOMContentLoaded', () => { initMermaid(); runAndPatch(); });
  }
})();
