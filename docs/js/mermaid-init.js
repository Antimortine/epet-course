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
      // ВАЖНО: здесь уже переопределяем линии и стрелки
      themeCSS: `
        /* --- Жёсткий оверрайд для линий и стрелок (flowchart-v2) --- */
        .edgePath .path,
        .flowchart-link {
          stroke:#e6edf5 !important;
          stroke-width:2px !important;
          opacity:1 !important;
          fill:none !important;
        }
        .marker,
        .arrowheadPath,
        .arrowMarkerPath,
        defs marker path,
        defs marker polygon {
          fill:#e6edf5 !important;
          stroke:#e6edf5 !important;
          opacity:1 !important;
        }

        /* читабельные подписи */
        g.node text, g.node tspan { fill:#111 !important; font-size:22px !important; }
        g.label text, g.label tspan,
        g.edgeLabel text, g.edgeLabel tspan, text.edgeLabel, text.edgeLabel tspan {
          fill:#e5e7eb !important; font-size:22px !important;
          paint-order:stroke; stroke:rgba(0,0,0,.35); stroke-width:1px;
        }
        g.label rect.background { fill:rgba(0,0,0,.35) !important; stroke:transparent !important; rx:4px; ry:4px; }
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

  // Доп. гарантия: ставим инлайн-стили с !important на рёбра и маркеры после рендера
  function patchSvg(svg) {
    svg.querySelectorAll('.edgePath .path, .flowchart-link').forEach(p => {
      p.style.setProperty('stroke', '#e6edf5', 'important');
      p.style.setProperty('stroke-width', '2', 'important');
      p.style.setProperty('opacity', '1', 'important');
      p.style.setProperty('fill', 'none', 'important');
    });
    svg.querySelectorAll('marker, .marker').forEach(m => {
      m.style.setProperty('fill', '#e6edf5', 'important');
      m.style.setProperty('stroke', '#e6edf5', 'important');
      m.style.setProperty('opacity', '1', 'important');
    });
    svg.querySelectorAll('.arrowheadPath, .arrowMarkerPath, marker path, marker polygon').forEach(p => {
      p.style.setProperty('fill', '#e6edf5', 'important');
      p.style.setProperty('stroke', '#e6edf5', 'important');
      p.style.setProperty('opacity', '1', 'important');
    });
  }

  async function render() {
    await window.mermaid.run({ querySelector: '.mermaid' });
    // На следующий тик: Mermaid закончит править <style> внутри SVG
    setTimeout(() => {
      document.querySelectorAll('.mermaid svg').forEach(patchSvg);
    }, 0);
  }

  initMermaid();
  render();

  // Перерисовка при навигации (MkDocs Material)
  if (window.document$) {
    window.document$.subscribe(() => { initMermaid(); render(); });
  } else {
    document.addEventListener('DOMContentLoaded', () => { initMermaid(); render(); });
  }
})();
