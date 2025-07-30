const gameState = {
  coins: 0,
  fruits: {},
  seeds: {},
  landPlots: [],
};

// 自动保存
setInterval(() => {
  const saveData = {
    coins: gameState.coins,
    fruits: gameState.fruits,
    seeds: gameState.seeds,
    landPlots: gameState.landPlots,
  };
  localStorage.setItem('tarcoSave', JSON.stringify(saveData));
  console.log('✅ 自动存档完成');
}, 10000);

// 自动读档
window.addEventListener('load', () => {
  const saved = localStorage.getItem('tarcoSave');
  if (saved) {
    const data = JSON.parse(saved);
    gameState.coins = data.coins || 0;
    gameState
