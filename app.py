from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 允许跨域请求

# 假设我们将得分存储在内存中
scores = []

@app.route('/submit_score', methods=['POST'])
def submit_score():
    data = request.json
    username = data.get('username')
    score = data.get('score')

    if username and score is not None:
        scores.append({'username': username, 'score': score})
        scores.sort(key=lambda x: x['score'], reverse=True)  # 按得分降序排序
        return jsonify({'message': 'Score submitted successfully'}), 200
    else:
        return jsonify({'message': 'Invalid data'}), 400

@app.route('/get_scores', methods=['GET'])
def get_scores():
    return jsonify(scores), 200

if __name__ == '__main__':
    app.run(debug=True)
