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
