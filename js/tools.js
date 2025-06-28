const textInput = document.getElementById('textInput');
const charCount = document.getElementById('charCount');

textInput.addEventListener('input', () => {
  const text = textInput.value;
  charCount.textContent = text.length;
});
