# Import thư viện kết nối MySQL và xử lý dữ liệu
import pymysql
import pandas as pd
from sklearn.neighbors import NearestNeighbors

# ⚙️ Kết nối tới cơ sở dữ liệu MySQL
conn = pymysql.connect(
    host='localhost',
    user='root',
    password='123456',
    db='nodejsapi'
)

# 🟩 1. Lấy dữ liệu thể loại phim mà mỗi người dùng đã từng xem (biến thành vector đặc trưng)
def load_user_genres():
    # Câu SQL lấy mã người dùng và thể loại phim đã đặt vé
    query = """
    SELECT d.taiKhoanNguoiDat AS user_id, p.maTheLoaiPhim
    FROM datve d
    JOIN lichchieuinsert l ON d.maLichChieu = l.maLichChieu
    JOIN phiminsertvalichchieuinsert pl ON pl.lichchieuinsert = l.maLichChieu
    JOIN phiminsert p ON p.maPhim = pl.phiminsert
    """
    df = pd.read_sql(query, conn)

    # Ánh xạ mã thể loại thành tên thể loại dễ đọc
    genre_map = {
        1: 'kinh_di',
        2: 'hoat_hinh',
        3: 'hanh_dong',
        4: 'vien_tuong',
        5: 'sieu_anh_hung',
        6: 'ngon_tinh'
    }

    df['genre_name'] = df['maTheLoaiPhim'].map(genre_map)

    # Tạo bảng pivot: mỗi dòng là 1 user, mỗi cột là số lần xem từng thể loại
    pivot = pd.pivot_table(df, index='user_id', columns='genre_name', aggfunc=len, fill_value=0)
    pivot.columns.name = None
    pivot = pivot.reset_index()

    return pivot

# 🟩 2. Lấy dữ liệu user đã xem phim nào
def load_user_movie():
    query = """
    SELECT d.taiKhoanNguoiDat AS user_id, p.maPhim AS movie_id
    FROM datve d
    JOIN lichchieuinsert l ON d.maLichChieu = l.maLichChieu
    JOIN phiminsertvalichchieuinsert pl ON pl.lichchieuinsert = l.maLichChieu
    JOIN phiminsert p ON p.maPhim = pl.phiminsert
    """
    return pd.read_sql(query, conn)

# 🧠 Hàm chính: Gợi ý phim dựa trên KNN
def recommend_movies(user_id):
    # Lấy dữ liệu vector thể loại và lịch sử xem phim
    user_genres_df = load_user_genres()
    watch_data = load_user_movie()

    user_ids = user_genres_df['user_id'].tolist()

    # Nếu user chưa có dữ liệu xem phim → trả danh sách gợi ý mặc định
    if user_id not in user_ids:
        return get_default_recommendations()

    # Loại bỏ cột user_id để chỉ giữ vector đặc trưng
    X = user_genres_df.drop(columns=['user_id']).values

    # Tạo mô hình KNN với độ đo khoảng cách cosine
    model = NearestNeighbors(n_neighbors=3, metric='cosine')
    model.fit(X)

    # Tìm các user gần nhất với user hiện tại
    idx = user_ids.index(user_id)
    distances, indices = model.kneighbors([X[idx]])
    similar_users = [user_ids[i] for i in indices.flatten() if user_ids[i] != user_id]

    # Tập hợp các phim mà user hiện tại đã xem
    watched_by_target = set(watch_data[watch_data['user_id'] == user_id]['movie_id'])

    recommendations = set()

    # Duyệt qua user tương đồng và lấy các phim họ đã xem
    for sim_user in similar_users:
        sim_movies = watch_data[watch_data['user_id'] == sim_user]['movie_id']
        recommendations.update(sim_movies)

    # Loại bỏ những phim user hiện tại đã xem, giữ tối đa 6 phim
    return sorted(list(recommendations - watched_by_target))[:6]

# 🟡 Hàm gợi ý mặc định nếu user chưa có dữ liệu
def get_default_recommendations():
    query = """
    SELECT maPhim FROM phiminsert ORDER BY ngayKhoiChieu DESC LIMIT 6
    """
    df = pd.read_sql(query, conn)
    return df['maPhim'].tolist()

