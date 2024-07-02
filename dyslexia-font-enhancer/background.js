chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "toggleFont",
    title: "Toggle Custom Font",
    contexts: ["all"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "toggleFont") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: toggleFont,
    });
  }
});

function toggleFont() {
  chrome.storage.local.get(["fontEnabled"], function (result) {
    const fontEnabled =
      result.fontEnabled !== undefined ? result.fontEnabled : true;
    if (fontEnabled) {
      removeCustomFont();
    } else {
      applyCustomFont();
    }
    chrome.storage.local.set({ fontEnabled: !fontEnabled });
  });
}

function applyCustomFont() {
  const style = document.createElement("style");
  style.id = "customFontStyle";
  style.innerHTML = `
      * {
        font-family: 'OpenDyslexic', sans-serif !important;
      }
    `;
  document.head.appendChild(style);
}

function removeCustomFont() {
  const style = document.getElementById("customFontStyle");
  if (style) {
    style.remove();
  }
}
