import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

mermaid.initialize({
  startOnLoad: false,
  securityLevel: 'loose',
  theme: 'base',
  // Глобальные настройки шрифтов/цветов для всех диаграмм
  themeVariables: {
    fontSize: '22px',
    fontFamily: 'var(--md-text-font, "Roboto", "Inter", system-ui, sans-serif)'
  }
});

// Сделать экземпляр видимым для темы Material
window.mermaid = mermaid;

// Перерисовывать диаграммы при каждом «переходе страницы»/смене темы
document$.subscribe(() => {
  mermaid.run({ querySelector: '.mermaid' });
});
