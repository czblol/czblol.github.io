from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json['message']  # 获取用户发送的消息
    # 调用 ChatGPT 模型生成回复
    bot_reply = generate_reply(user_message)
    return jsonify({'reply': bot_reply})  # 将回复返回给前端

def generate_reply(user_message):
    # 在这里调用 ChatGPT 模型生成回复
    # 示例中的逻辑仅为演示，实际情况下需要替换为调用 ChatGPT 模型的代码
    if user_message.lower() == 'hello':
        return 'Hello! How can I help you?'
    elif user_message.lower() == 'bye':
        return 'Goodbye!'
    else:
        return 'Sorry, I don\'t understand.'

if __name__ == '__main__':
    app.run(debug=True)
