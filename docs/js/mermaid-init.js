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
        textColor: '#111'
      },
      flowchart: {
        htmlLabels: true,
        nodeSpacing: 70,
        rankSpacing: 120,
        subGraphTitleMargin: 32,
        diagramPadding: 16,
        wrappingWidth: 260
      }
    });
  }

  initMermaid();

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
