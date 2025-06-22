const dice = document.getElementById('dice');
const rollBtn = document.getElementById('rollBtn');
const resultText = document.getElementById('result');
const historyList = document.getElementById('historyList');

let history = [];
let rolling = false;

// 各面のラベル順（CSSのface1～6に対応）
// 偶数面はマニア、奇数面はシニアと仮定
const faceLabels = ['シニア', 'マニア', 'シニア', 'マニア', 'シニア', 'マニア'];

// 回転角度候補（X軸、Y軸）を6面それぞれに対応させる
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

  // ランダムな面を選ぶ（0〜5）
  const faceIndex = Math.floor(Math.random() * 6);
  const rotation = rotations[faceIndex];

  // 2秒の回転アニメーションを設定
  // 2回転以上させて派手に見せる
  const extraTurns = 2;
  const xDeg = 360 * extraTurns + rotation.x;
  const yDeg = 360 * extraTurns + rotation.y;

  dice.style.transition = 'transform 2s cubic-bezier(0.23, 1, 0.32, 1)';
  dice.style.transform = `rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;

  // アニメーション終了後に結果表示・履歴追加
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

rollBtn.addEventListener('click', rollDice);
