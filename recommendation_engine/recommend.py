import pymysql
import pandas as pd
from sklearn.neighbors import NearestNeighbors

# Cấu hình MySQL
conn = pymysql.connect(
    host='localhost',
    user='root',
    password='123456',
    db='nodejsapi'
)

# 🟩 1. Lấy user_genres (vector thể loại theo user)
def load_user_genres():
    query = """
    SELECT d.taiKhoanNguoiDat AS user_id, p.maTheLoaiPhim
    FROM datve d
    JOIN lichchieuinsert l ON d.maLichChieu = l.maLichChieu
    JOIN phiminsertvalichchieuinsert pl ON pl.lichchieuinsert = l.maLichChieu
    JOIN phiminsert p ON p.maPhim = pl.phiminsert
    """
    df = pd.read_sql(query, conn)

    # Map thể loại sang tên
    genre_map = {
        1: 'kinh_di',
        2: 'hoat_hinh',
        3: 'hanh_dong',
        4: 'vien_tuong',
        5: 'sieu_anh_hung',
        6: 'ngon_tinh'
    }

    df['genre_name'] = df['maTheLoaiPhim'].map(genre_map)

    pivot = pd.pivot_table(df, index='user_id', columns='genre_name', aggfunc=len, fill_value=0)
    pivot.columns.name = None
    pivot = pivot.reset_index()
    return pivot

# 🟩 2. Lấy user-movie (ai xem phim gì)
def load_user_movie():
    query = """
    SELECT d.taiKhoanNguoiDat AS user_id, p.maPhim AS movie_id
    FROM datve d
    JOIN lichchieuinsert l ON d.maLichChieu = l.maLichChieu
    JOIN phiminsertvalichchieuinsert pl ON pl.lichchieuinsert = l.maLichChieu
    JOIN phiminsert p ON p.maPhim = pl.phiminsert
    """
    return pd.read_sql(query, conn)

# 🧠 Hàm gợi ý chính
def recommend_movies(user_id):
    user_genres_df = load_user_genres()
    watch_data = load_user_movie()

    user_ids = user_genres_df['user_id'].tolist()

    if user_id not in user_ids:
        return get_default_recommendations()

    X = user_genres_df.drop(columns=['user_id']).values
    model = NearestNeighbors(n_neighbors=3, metric='cosine')
    model.fit(X)

    idx = user_ids.index(user_id)
    distances, indices = model.kneighbors([X[idx]])
    similar_users = [user_ids[i] for i in indices.flatten() if user_ids[i] != user_id]

    watched_by_target = set(watch_data[watch_data['user_id'] == user_id]['movie_id'])
    recommendations = set()

    for sim_user in similar_users:
        sim_movies = watch_data[watch_data['user_id'] == sim_user]['movie_id']
        recommendations.update(sim_movies)

    return list(recommendations - watched_by_target)[:6]

# Gợi ý mặc định
def get_default_recommendations():
    return ['phim01', 'phim02', 'phim03', 'phim04', 'phim05', 'phim06']
