import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

function themeFromMaterial() {
  const cs = getComputedStyle(document.documentElement);
  const fg = cs.getPropertyValue('--md-default-fg-color').trim() || '#111';
  const bg = cs.getPropertyValue('--md-default-bg-color').trim() || '#fff';
  const codeBg = cs.getPropertyValue('--md-code-bg-color').trim() || '#eef2ff';
  const line = cs.getPropertyValue('--md-default-fg-color--light').trim() || fg;

  return {
    fontSize: '22px',
    fontFamily: 'var(--md-text-font, system-ui, "Inter", "Roboto", sans-serif)',
    /* КЛЮЧЕВОЕ: делаем тёмный текст для нод по умолчанию */
    textColor: '#111',
    primaryTextColor: '#111',
    secondaryTextColor: '#111',
    /* мягкие фоны/линии */
    mainBkg: codeBg,
    primaryColor: codeBg,
    secondaryColor: bg,
    lineColor: line
  };
}

function initMermaid() {
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    theme: 'base',
    themeVariables: themeFromMaterial(),
    flowchart: { nodeSpacing: 70, rankSpacing: 110, htmlLabels: true, diagramPadding: 16 },
    wrappingWidth: 260
  });
}

initMermaid();
window.mermaid = mermaid;

document$.subscribe(() => {
  initMermaid();
  mermaid.run({ querySelector: '.mermaid' });
});
