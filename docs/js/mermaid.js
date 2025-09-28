// Ждем, пока загрузится вся страница
window.addEventListener("load", () => {
  // Инициализируем Mermaid с базовыми настройками, чтобы она просто работала
  mermaid.initialize({ startOnLoad: true, theme: "base" });

  // Функция, которая будет насильно менять размер шрифта
  const fixMermaidFonts = (container) => {
    const svg = container.querySelector("svg");
    if (svg) {
      const textElements = svg.querySelectorAll("text");
      textElements.forEach(textEl => {
        // Принудительно устанавливаем стиль!
        textEl.style.fontSize = "22px"; 
      });
    }
  };

  // Находим ВСЕ контейнеры для диаграмм на странице
  const mermaidContainers = document.querySelectorAll(".mermaid");

  // Если диаграммы уже отрендерились к моменту запуска скрипта,
  // исправляем их немедленно.
  mermaidContainers.forEach(container => {
    fixMermaidFonts(container);
  });

  // Создаем "наблюдателя", который будет следить за изменениями.
  // Это нужно на случай, если Mermaid рендерит диаграммы с задержкой.
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      // Если в контейнер .mermaid было что-то добавлено (наша SVG-диаграмма)...
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // ...то мы немедленно исправляем в ней шрифты.
        fixMermaidFonts(mutation.target);
      }
    }
  });

  // "Натравливаем" наблюдателя на каждый контейнер .mermaid
  mermaidContainers.forEach(container => {
    observer.observe(container, { childList: true, subtree: true });
  });
});