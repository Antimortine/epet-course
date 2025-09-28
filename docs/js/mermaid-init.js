(function () {
  function initMermaid() {
    if (!window.mermaid) return;

    window.mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme: 'base',

      // крупный кегль + базовые переменные темы
      themeVariables: {
        fontSize: '22px',
        fontFamily: 'var(--md-text-font, system-ui, "Inter", "Roboto", sans-serif)',
        textColor: '#111',
        lineColor: '#e6edf5'   // ← светлые линии по умолчанию
      },

      // ВСТРАИВАЕМЫЕ в SVG стили: бьют тему и внешний CSS
      themeCSS: `
        /* Узлы: тёмный текст на светлом фоне */
        g.node text, g.node tspan { fill:#111 !important; font-size:22px !important; }

        /* Подписи на рёбрах — Mermaid 11 (g.label …) */
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

        /* Fallback для старой разметки .edgeLabel */
        g.edgeLabel text, g.edgeLabel tspan, text.edgeLabel, text.edgeLabel tspan {
          fill:#e5e7eb !important; font-size:22px !important;
          paint-order:stroke; stroke:rgba(0,0,0,.35); stroke-width:1px;
        }

        /* Заголовки сабграфов (кластеры) — светлые */
        g.cluster g.label text, g.cluster g.label tspan,
        g.cluster text, g.cluster tspan {
          fill:#e5e7eb !important; font-size:22px !important;
        }

        /* ===== ЛИНИИ И СТРЕЛКИ — СДЕЛАТЬ СВЕТЛЕЕ И ТОЛЩЕ ===== */
        /* Сами рёбра */
        .edgePath path, path.flowchart-link {
          stroke:#e6edf5 !important;           /* светлый серо-голубой */
          stroke-width:2px !important;         /* чуть толще, чтобы читалось */
          opacity:1 !important;
        }

        /* Головки стрелок (сидят в <defs><marker>…>) */
        marker path, marker polygon, marker rect, marker circle {
          fill:#e6edf5 !important;
          stroke:#e6edf5 !important;
          opacity:1 !important;
        }
        /* На случай кастомных классов в разных релизах */
        .arrowMarkerPath, .arrowHeadPath {
          fill:#e6edf5 !important;
          stroke:#e6edf5 !important;
        }
        /* Иногда генератор кладёт marker-элементы без классов — пробиваем через defs */
        defs marker path, defs marker polygon {
          fill:#e6edf5 !important;
          stroke:#e6edf5 !important;
        }
      `,

      flowchart: {
        htmlLabels: false,            // все лейблы как SVG-текст: красить проще и надёжнее
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
