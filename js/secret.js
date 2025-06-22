const flipper = document.getElementById('flipper');
const toggleBtn = document.getElementById('toggleBtn');
const resultDiv = document.getElementById('result');

let intervalId;
let showingMania = true;
let running = true;

function startFlipping() {
  intervalId = setInterval(() => {
    flipper.textContent = showingMania ? 'シニア' : 'マニア';
    showingMania = !showingMania;
  }, 100);
}

function stopFlipping() {
  clearInterval(intervalId);
  running = false;
  toggleBtn.textContent = 'リセット';

  if(flipper.textContent === 'マニア') {
    resultDiv.textContent = 'あなたは「マニア」タイプ！鋭い感性の持ち主です。';
  } else {
    resultDiv.textContent = 'あなたは「シニア」タイプ！落ち着いた知識人ですね。';
  }
}

function resetFlipping() {
  resultDiv.textContent = '';
  toggleBtn.textContent = 'ストップ';
  running = true;
  showingMania = true;
  flipper.textContent = 'マニア';
  startFlipping();
}

toggleBtn.addEventListener('click', () => {
  if(running) {
    stopFlipping();
  } else {
    resetFlipping();
  }
});

// ページロード時に開始
startFlipping();
