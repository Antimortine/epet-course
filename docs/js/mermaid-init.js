(function () {
  function initMermaid() {
    if (!window.mermaid) return;

    window.mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme: 'base',

      // Крупный кегль + базовый шрифт
      themeVariables: {
        fontSize: '22px',
        fontFamily: 'var(--md-text-font, system-ui, "Inter", "Roboto", sans-serif)',
        textColor: '#111'
      },

      // Стили, встраиваемые ВНУТРЬ каждого SVG (побеждают тему и внешний CSS)
      themeCSS: `
        /* Узлы: тёмный текст на светлом фоне */
        g.node text, g.node tspan {
          fill:#111 !important; font-size:22px !important;
        }

        /* Подписи на рёбрах — Mermaid 11 (g.label ...) */
        g.label text,
        g.label tspan,
        g.label .text-outer-tspan,
        g.label .text-inner-tspan {
          fill:#e5e7eb !important; font-size:22px !important;
          paint-order:stroke; stroke:rgba(0,0,0,.35); stroke-width:1px;
        }
        g.label rect.background {
          fill:rgba(0,0,0,.35) !important; stroke:transparent !important; rx:4px; ry:4px;
        }

        /* Подписи на рёбрах — fallback для старой разметки (.edgeLabel) */
        g.edgeLabel text, g.edgeLabel tspan, text.edgeLabel, text.edgeLabel tspan {
          fill:#e5e7eb !important; font-size:22px !important;
          paint-order:stroke; stroke:rgba(0,0,0,.35); stroke-width:1px;
        }

        /* Заголовки сабграфов (кластеры) — светлые */
        g.cluster g.label text, g.cluster g.label tspan,
        g.cluster text, g.cluster tspan {
          fill:#e5e7eb !important; font-size:22px !important;
        }

        /* Линии — чуть светлее на тёмном контейнере */
        .edgePath path, path.flowchart-link { stroke:#c7ced6 !important; }
      `,

      flowchart: {
        htmlLabels: false,            // все лейблы как SVG-текст — красить проще
        nodeSpacing: 70,
        rankSpacing: 120,
        subGraphTitleMargin: 32,
        diagramPadding: 16,
        wrappingWidth: 260
      }
    });
  }

  function runMermaid() {
    window.mermaid.run({ querySelector: '.mermaid' });
  }

  // первый рендер
  initMermaid();
  runMermaid();

  // перерисовка при навигации в Material
  if (window.document$) {
    window.document$.subscribe(() => {
      initMermaid();
      runMermaid();
    });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      initMermaid();
      runMermaid();
    });
  }
})();
