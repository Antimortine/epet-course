(function () {
  function initMermaid() {
    if (!window.mermaid) return;

    window.mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme: 'base',

      // 1) Крупный кегль + базовый тёмный текст
      themeVariables: {
        fontSize: '22px',
        fontFamily: 'var(--md-text-font, system-ui, "Inter", "Roboto", sans-serif)',
        textColor: '#111',
        // подсветим заголовки сабграфов и подписи рёбер на всякий случай
        clusterTitleColor: '#e5e7eb',
        edgeLabelTextColor: '#e5e7eb'
      },

      // 2) Правила, встраиваемые ВНУТРЬ каждого SVG (перебивают всё остальное)
      themeCSS: `
        /* Узлы: тёмный текст на светлом фоне */
        g.node text, .nodeLabel, .label { fill:#111 !important; color:#111 !important; font-size:22px !important; }

        /* Подписи на рёбрах (htmlLabels:false — это SVG-текст) */
        g.edgeLabel text, g.edgeLabel tspan, g.edgeLabel textPath, text.edgeLabel, .edgeLabel { 
          fill:#e5e7eb !important; font-size:22px !important; 
          paint-order:stroke; stroke:rgba(0,0,0,.35); stroke-width:1px;
        }

        /* Заголовки сабграфов (кластеры) */
        g.cluster text, .cluster-label, text.cluster-label { 
          fill:#e5e7eb !important; font-size:22px !important; 
        }

        /* Линии — чуть светлее на тёмном контейнере */
        .edgePath path, path.flowchart-link { stroke:#c7ced6 !important; }
      `,

      flowchart: {
        htmlLabels: false,        // чтобы все лейблы были SVG-текстом (проще красить)
        nodeSpacing: 70,
        rankSpacing: 120,
        subGraphTitleMargin: 32,
        diagramPadding: 16,
        wrappingWidth: 260
      }
    });
  }

  initMermaid();

  // Перерисовка при навигации в Material
  if (window.document$) {
    window.document$.subscribe(function () {
      initMermaid();
      window.mermaid.run({ querySelector: '.mermaid' });
    });
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      initMermaid();
      window.mermaid.run({ querySelector: '.mermaid' });
    });
  }
})();
