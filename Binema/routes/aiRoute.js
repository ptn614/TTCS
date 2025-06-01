const express = require('express');
const axios = require('axios');

module.exports = function (dbConn) {
  const router = express.Router();

  // API gợi ý phim bằng AI Flask
  router.get('/GoiyPhim', async (req, res) => {
    const { taiKhoan } = req.query;

    if (!taiKhoan) {
      return res.status(400).json({ error: 'Thiếu tài khoản' });
    }

    try {
      // Gọi Flask AI server
      const response = await axios.get('http://localhost:5001/recommend', {
        params: { user_id: taiKhoan }
      });

      const movieIds = response.data;

      if (!Array.isArray(movieIds) || movieIds.length === 0) {
        return res.json([]);
      }

      // Truy vấn phim từ DB theo danh sách AI trả về
      dbConn.query(
        'SELECT * FROM phiminsert WHERE maPhim IN (?)',
        [movieIds],
        (err, results) => {
          if (err) {
            console.error('❌ Lỗi DB:', err);
            return res.status(500).json({ error: 'Lỗi DB' });
          }

          // Chuyển ảnh BLOB sang base64
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
