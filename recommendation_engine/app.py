from flask import Flask, request, jsonify
from recommend import recommend_movies

app = Flask(__name__)

@app.route('/recommend', methods=['GET'])
def recommend():
    user_id = request.args.get('user_id')
    result = recommend_movies(user_id)
    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5001)
