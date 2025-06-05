# Import các thư viện cần thiết từ Flask
from flask import Flask, request, jsonify

# Import hàm gợi ý phim từ file recommend.py
from recommend import recommend_movies

# Khởi tạo ứng dụng Flask
app = Flask(__name__)

# Định nghĩa route /recommend sử dụng phương thức GET
@app.route('/recommend', methods=['GET'])
def recommend():
    # Lấy tham số user_id từ URL (ví dụ: /recommend?user_id=user01)
    user_id = request.args.get('user_id')

    # Gọi hàm xử lý gợi ý phim theo user_id
    result = recommend_movies(user_id)

    # Trả kết quả dưới dạng JSON cho client (Node.js hoặc trình duyệt)
    return jsonify(result)

# Chạy server Flask tại cổng 5001
if __name__ == '__main__':
    app.run(port=5001)
