// script.js

function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    if (message !== '') {
        appendMessage('sent', message);
        // 在这里向服务器发送用户消息，并等待响应
        // 一旦收到响应，将其附加到聊天框中，并以“received”类样式化
        userInput.value = '';
    }
}

function appendMessage(type, message) {
    const chatBox = document.getElementById('chatBox');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', type);
    messageDiv.innerText = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
