function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

document.addEventListener('keydown', (event) => {
  if (event.shiftKey && event.key.toLowerCase() === 'w') {
    window._pressedW = true;
  }
  if (event.shiftKey && event.key.toLowerCase() === 'm' && window._pressedW) {
    const secretLink = document.getElementById('secret-link');
    secretLink.style.display = 'block';
    showToast('隠しリンクが現れた！');
    window._pressedW = false;
  }
});

window.addEventListener('beforeunload', () => {
  window._pressedW = false;
});
