document.addEventListener('keydown', (event) => {
  // 押されているキーを記録
  if (event.shiftKey && event.key.toLowerCase() === 'w') {
    window._pressedW = true;
  }
  if (event.shiftKey && event.key.toLowerCase() === 'm' && window._pressedW) {
    // ショートカット成功 → 隠しリンクを表示
    const secretLink = document.getElementById('secret-link');
    secretLink.style.display = 'block';
    alert('隠しリンクが現れた！');
    // 実績連動も可能
    window._pressedW = false; // リセット
  }
});

// ページ離脱時にリセット（安全対策）
window.addEventListener('beforeunload', () => {
  window._pressedW = false;
});

