// 导入 WebSocket 模块
const WebSocket = require('ws');

// 创建 WebSocket 服务器，监听在指定端口上
const wss = new WebSocket.Server({ port: 8080 });

// 用于存储连接的客户端
const clients = new Set();

// 监听连接事件
wss.on('connection', function connection(ws) {
  // 将新连接的客户端加入到 clients 集合中
  clients.add(ws);

  // 监听客户端发送的消息事件
  ws.on('message', function incoming(message) {
    // 广播收到的消息给所有客户端
    for (const client of clients) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  });

  // 监听连接断开事件
  ws.on('close', function close() {
    // 将断开连接的客户端从 clients 集合中移除
    clients.delete(ws);
  });
});

// 创建 WebSocket 连接
const ws = new WebSocket('ws://localhost:8080');

// 监听连接成功事件
ws.addEventListener('open', function (event) {
    console.log('Connected to WebSocket server');
});

// 监听收到消息事件
ws.addEventListener('message', function (event) {
    console.log('Received message:', event.data);
    // 在此处处理接收到的消息，比如将消息显示在页面上
});

// 监听连接关闭事件
ws.addEventListener('close', function (event) {
    console.log('Connection closed');
});

// 监听发生错误事件
ws.addEventListener('error', function (event) {
    console.error('WebSocket error:', event);
});

// 发送消息
function sendMessage(message) {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
    } else {
        console.error('WebSocket connection is not open');
    }
}

// 示例：发送消息
sendMessage('Hello, WebSocket server!');


// 监听连接成功事件
ws.addEventListener('open', function (event) {
    console.log('Connected to WebSocket server');
});

// 监听收到消息事件
ws.addEventListener('message', function (event) {
    console.log('Received message:', event.data);
    // 在此处处理接收到的消息，比如将消息显示在页面上
});

// 监听连接关闭事件
ws.addEventListener('close', function (event) {
    console.log('Connection closed');
});

// 监听发生错误事件
ws.addEventListener('error', function (event) {
    console.error('WebSocket error:', event);
});

// 发送消息
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;
    if (message.trim() !== '') {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(message);
            messageInput.value = '';
        } else {
            console.error('WebSocket connection is not open');
        }
    }
}
