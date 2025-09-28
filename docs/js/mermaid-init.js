(function () {
  function currentScheme() {
    // Material for MkDocs хранит схему в data-атрибуте корневого html
    var root = document.documentElement;
    var scheme = root.getAttribute('data-md-color-scheme');
    if (scheme) return scheme;
    return (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches)
      ? 'slate' : 'default';
  }

  function themeFromMaterial() {
    var scheme = currentScheme();

    // Базовые CSS-переменные темы
    var cs = getComputedStyle(document.documentElement);
    var fg  = (cs.getPropertyValue('--md-default-fg-color') || '#111').trim();
    var bg  = (cs.getPropertyValue('--md-default-bg-color') || '#fff').trim();
    var lineBase = (cs.getPropertyValue('--md-default-fg-color--light') || '#6b7280').trim();

    // Контрастные палитры для нод/сабграфов
    if (scheme === 'slate') {
      // ТЁМНАЯ ТЕМА: светлые НОДЫ + тёмные САБГРАФЫ
      return {
        fontSize: '22px',
        fontFamily: 'var(--md-text-font, system-ui, "Inter", "Roboto", sans-serif)',

        // Текст в нодах — тёмный на светлом фоне
        textColor: '#111',
        primaryTextColor: '#111',
        secondaryTextColor: '#111',

        // Узлы (блоки)
        mainBkg: '#f6f8ff',       // очень светлый
        primaryColor: '#e9edff',  // слегка оттенённый
        secondaryColor: '#ffffff',
        nodeBorder: '#2d3a4a',

        // Сабграфы (контейнеры)
        clusterBkg: '#2b2f36',    // тёмный бокс, чтобы отделять группы
        clusterBorder: '#4b5563',
        titleColor: '#e5e7eb',    // заголовок сабграфа — светлый

        // Линии/стрелки
        lineColor: '#9aa4b2',
      };
    }

    // СВЕТЛАЯ ТЕМА: ноды светлые, текст тёмный (обычный случай)
    return {
      fontSize: '22px',
      fontFamily: 'var(--md-text-font, system-ui, "Inter", "Roboto", sans-serif)',
      textColor: '#111',
      primaryTextColor: '#111',
      secondaryTextColor: '#111',

      mainBkg: '#f9faff',
      primaryColor: '#eef2ff',
      secondaryColor: '#ffffff',
      nodeBorder: '#475569',

      clusterBkg: '#f3f4f6',
      clusterBorder: '#cbd5e1',
      titleColor: '#111',

      lineColor: lineBase || '#6b7280',
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
        rankSpacing: 120,
        subGraphTitleMargin: 32,   // запас под заголовком сабграфа
        diagramPadding: 16,
        wrappingWidth: 260
      }
    });
  }

  // подключаем UMD-скрипт через mkdocs.yml (см. ниже), тут только инициализация
  initMermaid();

  // перерисовка при навигации/переключении темы
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
