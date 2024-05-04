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
