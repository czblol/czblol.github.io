import asyncio
import websockets

async def handle_client(websocket, path):
    try:
        async for message in websocket:
            # 在这里处理收到的消息，你可以将收到的消息保存到数据库中或者进行其他处理
            print("Received message:", message)
            
            # 假设你的服务器端要给客户端发送消息，可以在这里发送
            response = "Hello, client!"
            await websocket.send(response)
    except websockets.exceptions.ConnectionClosedError:
        print("Connection closed by client")

async def main():
    server = await websockets.serve(handle_client, "localhost", 8765)

    # 服务器启动后，保持运行状态
    await server.wait_closed()

# 运行服务器
asyncio.run(main())

import random

# 聊天机器人的回复
responses = {
    "你好": ["你好！", "嗨，你好啊！", "你好，有什么可以帮助你的吗？"],
    "你叫什么名字": ["我是聊天机器人！", "我的名字是 ChatBot。"],
    "你多大了": ["我是一个聊天机器人，没有年龄。"],
    "再见": ["再见！", "下次再聊！", "祝你有美好的一天！"]
}

def chatbot_response(message):
    """
    根据用户消息返回聊天机器人的回复
    """
    if message in responses:
        return random.choice(responses[message])
    else:
        return "抱歉，我不明白你在说什么。"

# 示例对话
conversation = [
    "你好",
    "你叫什么名字",
    "你多大了",
    "再见"
]

# 对话
for message in conversation:
    print("User:", message)
    print("ChatBot:", chatbot_response(message))

