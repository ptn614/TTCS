const express = require('express');
const axios = require('axios');

module.exports = function (dbConn) {
  const router = express.Router();

  // API gọi gợi ý phim từ Flask
  router.get('/GoiyPhim', async (req, res) => {
    const { taiKhoan } = req.query;

    // Kiểm tra nếu không có tài khoản
    if (!taiKhoan) {
      return res.status(400).json({ error: 'Thiếu tài khoản' });
    }

    try {
      // Gửi yêu cầu GET tới Flask server chạy ở cổng 5001
      const response = await axios.get('http://localhost:5001/recommend', {
        params: { user_id: taiKhoan }
      });

      const movieIds = response.data;

      // Nếu không có kết quả gợi ý, trả mảng rỗng
      if (!Array.isArray(movieIds) || movieIds.length === 0) {
        return res.json([]);
      }

      // Truy vấn phim trong CSDL tương ứng với danh sách được AI gợi ý
      dbConn.query(
        'SELECT * FROM phiminsert WHERE maPhim IN (?)',
        [movieIds],
        (err, results) => {
          if (err) {
            console.error('❌ Lỗi DB:', err);
            return res.status(500).json({ error: 'Lỗi DB' });
          }

          // Chuyển ảnh từ BLOB sang base64 để frontend hiển thị được
          const converted = results.map((row) => {
            let imageBase64 = null;
            if (row.hinhAnh) {
              imageBase64 = `data:image/jpeg;base64,${Buffer.from(row.hinhAnh).toString('base64')}`;
            }

            return {
              ...row,
              hinhAnh: imageBase64
            };
          });

          // Trả về danh sách phim chi tiết cho frontend
          res.json(converted);
        }
      );

    } catch (error) {
      console.error('❌ Lỗi gọi AI Flask:', error.message);
      res.status(500).json({ error: 'Không kết nối được AI server' });
    }
  });

  return router;
};
