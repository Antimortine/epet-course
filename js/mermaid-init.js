(function () {
  function themeFromMaterial() {
    var cs = getComputedStyle(document.documentElement);
    var fg = (cs.getPropertyValue('--md-default-fg-color') || '#111').trim();
    var bg = (cs.getPropertyValue('--md-default-bg-color') || '#fff').trim();
    var codeBg = (cs.getPropertyValue('--md-code-bg-color') || '#eef2ff').trim();
    var line = (cs.getPropertyValue('--md-default-fg-color--light') || fg).trim();

    return {
      fontSize: '22px',
      fontFamily: 'var(--md-text-font, system-ui, "Inter", "Roboto", sans-serif)',
      textColor: '#111',
      primaryTextColor: '#111',
      secondaryTextColor: '#111',
      mainBkg: codeBg,
      primaryColor: codeBg,
      secondaryColor: bg,
      lineColor: line
    };
  }

  function initMermaid() {
    if (!window.mermaid) return;
    window.mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme: 'base',
      themeVariables: themeFromMaterial(),
      flowchart: {
        htmlLabels: true,
        nodeSpacing: 70,
        rankSpacing: 110,
        subGraphTitleMargin: 28,
        diagramPadding: 16,
        wrappingWidth: 260
      }
    });
  }

  // первый запуск
  initMermaid();

  // перерисовывать на каждой «страничной» навигации
  if (window.document$) {
    window.document$.subscribe(function () {
      initMermaid();                       // обновим тему/размеры
      window.mermaid.run({ querySelector: '.mermaid' });
    });
  } else {
    // на всякий случай — если document$ вдруг отсутствует
    document.addEventListener('DOMContentLoaded', function () {
      initMermaid();
      window.mermaid.run({ querySelector: '.mermaid' });
    });
  }
})();
