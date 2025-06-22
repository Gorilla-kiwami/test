const dice = document.getElementById('dice');
const rollBtn = document.getElementById('rollBtn');
const resultText = document.getElementById('result');
const historyList = document.getElementById('historyList');

let history = [];
let rolling = false;

// 各面のラベル順（CSSのface1～6に対応）
// 1,3,5: シニア  2,4,6: マニア
const faceLabels = ['シニア', 'マニア', 'シニア', 'マニア', 'シニア', 'マニア'];

// 各面に対応する回転角度（X軸、Y軸）
const rotations = [
  { x: 0,   y: 0   },   // face1 - シニア (正面)
  { x: 0,   y: -90 },   // face2 - マニア
  { x: 0,   y: 180 },   // face3 - シニア
  { x: 0,   y: 90  },   // face4 - マニア
  { x: 90,  y: 0   },   // face5 - シニア (上)
  { x: -90, y: 0   }    // face6 - マニア (下)
];

function rollDice() {
  if (rolling) return; // 回転中は無効化
  rolling = true;
  resultText.textContent = '';

  // ランダムに出す面を決める
  const faceIndex = Math.floor(Math.random() * 6);
  const rotation = rotations[faceIndex];

  // 2回転（720度）させてから目的の角度へ回転
  const extraTurns = 2;
  const xDeg = 360 * extraTurns + rotation.x;
  const yDeg = 360 * extraTurns + rotation.y;

  // CSSトランスフォームで回転開始
  dice.style.transition = 'transform 2s cubic-bezier(0.23, 1, 0.32, 1)';
  dice.style.transform = `rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;

  // 2秒後に結果表示・履歴追加
  setTimeout(() => {
    const label = faceLabels[faceIndex];
    resultText.textContent = `結果: ${label}`;
    addHistory(label);
    rolling = false;
  }, 2000);
}

function addHistory(result) {
  history.unshift(result);
  if (history.length > 10) history.pop();
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

// ボタンクリックで振る
rollBtn.addEventListener('click', rollDice);

// 初期表示の結果テキストは空
resultText.textContent = '';
