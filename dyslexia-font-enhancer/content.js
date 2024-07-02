// Check storage to apply or remove custom font on load
chrome.storage.local.get(["fontEnabled"], function (result) {
  const fontEnabled =
    result.fontEnabled !== undefined ? result.fontEnabled : true;
  if (fontEnabled) {
    applyCustomFont();
  }
});

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
