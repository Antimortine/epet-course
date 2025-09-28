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
    // тёмный текст по умолчанию
    textColor: fg,
    primaryTextColor: fg,
    // мягкий фон для нод
    mainBkg: codeBg,
    primaryColor: codeBg,
    secondaryColor: bg,
    lineColor: line,
  };
}

function initMermaid() {
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    theme: 'base',
    themeVariables: themeFromMaterial(),
    // базовые «воздушные» отступы/обёртка текста
    flowchart: { nodeSpacing: 60, rankSpacing: 70, htmlLabels: true, diagramPadding: 16 },
    wrappingWidth: 240,
  });
}

initMermaid();
window.mermaid = mermaid;

// Перерисовка на каждой «страничной» навигации/переключении темы
document$.subscribe(() => {
  initMermaid();            // обновить цвета под текущую тему
  mermaid.run({ querySelector: '.mermaid' });
});
