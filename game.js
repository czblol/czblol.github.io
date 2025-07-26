let coins = 0;
let seeds = 0;
let plots = ["", "", ""];

const coinsEl = document.getElementById("coins");
const seedsEl = document.getElementById("seeds");
const plotButtons = document.querySelectorAll(".plot");

function updateUI() {
  coinsEl.textContent = coins;
  seedsEl.textContent = seeds;
  plotButtons.forEach((btn, index) => {
    btn.textContent = plots[index] === "" ? "Empty" : plots[index];
  });
}

function buySeed() {
  if (coins >= 10) {
    seeds++;
    coins -= 10;
    updateUI();
  } else {
    alert("Not enough coins!");
  }
}

function plantSeed(index) {
  if (seeds > 0 && plots[index] === "") {
    plots[index] = "Growing...";
    seeds--;
    updateUI();

    setTimeout(() => {
      plots[index] = "Tarco 🌱";
      coins += 5;
      updateUI();
    }, 3000); // 模拟3秒后长成植物
  } else if (plots[index] !== "") {
    alert("Already planted!");
  } else {
    alert("No seeds!");
  }
}

let coins = 50;
let seeds = {
  apple: 0,
  banana: 0,
  orange: 0
};

function updateStats() {
  document.getElementById('coins').innerText = coins;
  // 如果你有显示各个种子的数量，也更新它们
}

function buyApple() {
  if (coins >= 10) {
    coins -= 10;
    seeds.apple++;
    updateStats();
  } else {
    alert("Not enough coins!");
  }
}
function buyBanana() {
  if (coins >= 15) {
    coins -= 15;
    seeds.banana++;
    updateStats();
  } else {
    alert("Not enough coins!");
  }
}
function buyOrange() {
  if (coins >= 20) {
    coins -= 20;
    seeds.orange++;
    updateStats();
  } else {
    alert("Poor Guy Not enough coins!");
  }
}

updateUI();
