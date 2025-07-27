<script>
let sheckles = 0;
let seeds = 0;
const plots = [null, null, null];
const inventory = [];
let selectedItem = null;

function randomWeight() {
  return +(Math.random() * 29 + 1).toFixed(1); // 1kg - 30kg
}

function updateDisplay() {
  document.getElementById('sheckles').textContent = sheckles;
  document.getElementById('seeds').textContent = inventory.filter(i => i.includes('seed')).length;
  document.querySelectorAll('.plot').forEach((btn, i) => {
    const state = plots[i];
    btn.textContent = state === null ? 'Empty' :
      state.stage === 0 ? 'Seed 🌱' :
      state.stage === 1 ? 'Growing 🌿' :
      'Harvest 🍅';
  });
  updateInventory();
}

function updateInventory() {
  for (let i = 0; i < 5; i++) {
    const slot = document.getElementById(`slot${i}`);
    const item = inventory[i];
    if (item) {
      const isSeed = item.includes('seed');
      const type = isSeed ? item : item.name;
      const imgPath = isSeed ? `images/seeds/${type}.png` : `images/fruits/${type}.png`;
      const label = isSeed ? `${type} ×1` : `${type} [${item.weight} kg]`;
      slot.innerHTML = `<img src="${imgPath}" alt="${type}" onclick="selectItem('${type}')"><div>${label}</div>`;
    } else {
      slot.innerHTML = '';
    }
  }
}

function selectItem(itemName) {
  if (itemName.includes('seed')) {
    selectedItem = itemName;
  } else {
    selectedItem = null;
  }
}

function buySeed(type, price) {
  if (sheckles >= price) {
    sheckles -= price;
    inventory.push(type);
    updateDisplay();
  } else {
    alert('Not enough sheckles!');
  }
}

function plantSeed(index) {
  if (plots[index] === null && selectedItem && selectedItem.includes('seed')) {
    const cropType = selectedItem.replace('seed', '');
    plots[index] = { stage: 0, type: cropType };
    inventory.splice(inventory.indexOf(selectedItem), 1);
    selectedItem = null;
    updateDisplay();

    setTimeout(() => {
      plots[index].stage = 1;
      updateDisplay();
      setTimeout(() => {
        plots[index].stage = 2;
        updateDisplay();
      }, 3000);
    }, 3000);

  } else if (plots[index]?.stage === 2) {
    const fruit = plots[index].type;
    const weight = randomWeight();
    inventory.push({ name: fruit, weight });
    plots[index] = null;
    updateDisplay();
  }
}

function sellInventory() {
  let total = 0;
  for (let i = inventory.length - 1; i >= 0; i--) {
    const item = inventory[i];
    if (typeof item === 'object') {
      let rate = item.name === 'sugarapple' ? 1800 : item.name === 'banana' ? 80 : 50;
      total += Math.floor(item.weight * rate);
      inventory.splice(i, 1);
    }
  }
  if (total > 0) {
    alert(`Sold fruits for ${total} sheckles!`);
    sheckles += total;
  } else {
    alert('No fruits to sell.');
  }
  updateDisplay();
}

function claimBonus() {
  sheckles += 10000;
  updateDisplay();
  const btn = document.getElementById('bonus-btn');
  btn.disabled = true;
  btn.textContent = '✅ Claimed';
}

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

function appendMessage(sender, message) {
  const msg = document.createElement('div');
  msg.classList.add('message');
  msg.textContent = `${sender}: ${message}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.onclick = () => {
  const userMessage = userInput.value.trim();
  if (userMessage !== '') {
    appendMessage('You', userMessage);
    userInput.value = '';
    const reply = getBotReply(userMessage);
    setTimeout(() => appendMessage('Bot', reply), 500);
  }
};

function getBotReply(msg) {
  switch (msg.toLowerCase()) {
    case 'price': return 'Legendary RM90 | Epic RM60';
    case 'ig': return 'IG: @ctt_gamingstudio';
    case '营业时间': return '4pm - 10pm';
    case '再见': return '再见！';
    default: return 'Command not found (try: price, ig)';
  }
}

window.onload = () => {
  appendMessage('Bot', 'Hello! Welcome to CTT Gaming Studio!');
  appendMessage('Bot', 'Command list: price, ig, 营业时间');
  updateDisplay();
};
</script>
