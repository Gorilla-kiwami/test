
const diceEl = document.getElementById('dice');
const rollBtn = document.getElementById('rollBtn');
const historyList = document.getElementById('historyList');

let history = [];

function rollDice() {
  // アニメーション開始
  diceEl.classList.add('rolling');
  rollBtn.disabled = true;

  setTimeout(() => {
    diceEl.classList.remove('rolling');

    // 1〜6のランダム数値生成
    const num = Math.floor(Math.random() * 6) + 1;

    // 1〜3ならシニア、4〜6ならマニア
    const result = num <= 3 ? 'シニア' : 'マニア';

    // 結果表示
    diceEl.textContent = result;

    // 履歴追加
    addHistory(result);

    rollBtn.disabled = false;
  }, 700);
}

function addHistory(result) {
  history.unshift(result);
  if (history.length > 10) {
    history.pop();
  }
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = '';
  history.forEach((res, i) => {
    const li = document.createElement('li');
    li.textContent = `${i + 1}回目: ${res}`;
    historyList.appendChild(li);
  });
}

rollBtn.addEventListener('click', rollDice);

// 初期表示は「振る」表示
diceEl.textContent = '振る';
