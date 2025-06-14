var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var md5 = require('md5');
var mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { application } = require('express');
var nodemailer = require('nodemailer');
let $ = require('jquery');
const request = require('request');
const moment = require('moment');

app.use(cors());
app.use(bodyParser.json({ limit: '5000mb' }));
app.use(bodyParser.urlencoded({ limit: '5000mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.options('*', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(204);
});

// Set up Global configuration access
dotenv.config();

// ✅ Kết nối database
var dbConn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'nodejsapi'
});
dbConn.connect((err) => {
  if (err) {
    console.error('❌ Kết nối DB thất bại:', err);
  } else {
    console.log('✅ Kết nối DB thành công');
  }
});

// ✅ Import route AI & truyền dbConn
const aiRoute = require('./routes/aiRoute')(dbConn);
app.use('/api/AI', aiRoute);

// ✅ Cuối cùng: chạy server
app.listen(process.env.PORT || 4000, function () {
  console.log('Node app is running on port 4000');
});

module.exports = app;

// ✅ Hàm xác thực token (nếu có dùng)
const validateToken = (req, res) => {
  const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verified = jwt.verify(token, jwtSecretKey);
    if (!verified)
      return res.status(401).send(error);
  } catch (error) {
    console.log(error);
    return res.status(401).send(error);
  }
};

// Danh sach Banner

app.get('/api/QuanLyPhim/LayDanhSachBanner', (req, res) => {
    const banners = [
        // {
        //     maBanner: 1,
        //     maPhim: 1282,
        //     hinhAnh: "https://kenh14cdn.com/203336854389633024/2025/4/27/landscapeavatarcopy90557b580-7e0d-4305-a306-5d0615d8086b-1745668232982630934548-1745768336934-1745768337934948507153.jpg"
        // },
        // {
        //     maBanner: 2,
        //     maPhim: 1283,
        //     hinhAnh: "https://media-cdn-v2.laodong.vn/storage/newsportal/2025/5/2/1500372/Hq720-2.jpg"
        // },
        // {
        //     maBanner: 3,
        //     maPhim: 1284,
        //     hinhAnh: "https://kenh14cdn.com/203336854389633024/2025/5/20/ngangcopy2742716ff-1bcf-43b3-b951-27b9e4c0eadf-1747648132674983495790-1747699738210-1747699738435998076680.jpg"
        // }
            {
            maBanner: 2,
            maPhim: 1282,
            hinhAnh: "https://media.lottecinemavn.com/Media/WebAdmin/56b4cbb3690e4009b289e62fc2949895.jpg"
        },
        {
            maBanner: 3,
            maPhim: 1283,
            hinhAnh: "https://media.lottecinemavn.com/Media/WebAdmin/a28d725b845842b8a36cfe017d13125d.png"
        }
    ];

    res.status(200).json({
        statusCode: 200,
        message: "Xử lý thành công!",
        content: banners
    })
});




// VNPay
app.get('/api/create_payment_url', function (req, res, next) {

    process.env.TZ = 'Asia/Ho_Chi_Minh';

    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');

    let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket?.remoteAddress;

    let config = require('config');
    const { amount, maLichChieu, danhSachVe, taiKhoanNguoiDung } = req.query;
    let tmnCode = config.get('vnp_TmnCode');
    let secretKey = config.get('vnp_HashSecret');
    let vnpUrl = config.get('vnp_Url');
    let returnUrl = config.get('vnp_ReturnUrl');

    // ✅ SỬA Ở ĐÂY: orderId duy nhất bằng timestamp
    let orderId = date.getTime();

    let querystring = require('qs');
    let returnUrlParams = querystring.stringify({
        danhSachVe,
        taiKhoanNguoiDung,
        maLichChieu
    }, { encode: false });

    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = 'vn';
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl + maLichChieu + '?' + returnUrlParams;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;

    console.log('Amount:', amount);
    console.log('Ma Lich Chieu:', maLichChieu);
    console.log('Tai Khoan: ', taiKhoanNguoiDung);
    console.log('Danh sach ve: ', danhSachVe);

    vnp_Params = sortObject(vnp_Params);

    let signData = Object.keys(vnp_Params)
    .sort()
    .map(key => `${key}=${vnp_Params[key]}`)
    .join('&');

    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;

    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    console.log(vnpUrl);
    res.send(vnpUrl);
});


// QuanLyRap

app.get('/api/QuanLyRap/LayThongTinHeThongRap', function (req, res) {
    dbConn.query('SELECT * FROM hethongrap', [], function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
    });
});

app.get('/api/QuanLyRap/LayThongTinCumRapTheoHeThong', async (req, res) => {
    const final = [];
    dbConn.query('SELECT * FROM cumrap JOIN hethongrapvacumrap ON cumrap.cid = hethongrapvacumrap.cumrap JOIN hethongrap ON hethongrap.hid = hethongrapvacumrap.hethongrap WHERE hethongrap.maHeThongRap = ?', [req.query.maHeThongRap], async (error, results, fields) => {
        if (error) throw error;
        for (const result of results) {
            let danhSachRap = [];
            danhSachRap = await new Promise((resolve, reject) => {
                dbConn.query('SELECT * FROM danhsachrap WHERE maCumRap = ?', [result.cid], async (error, results1, fields) => {
                    if (error) throw error;
                    for (const result1 of results1) {
                        danhSachRap.push({
                            "maRap": result1.maRap,
                            "tenRap": result1.tenRap
                        })
                    }
                    resolve(danhSachRap);
                });
            })
            final.push({
                "danhSachRap": danhSachRap,
                "maCumRap": result.maCumRap,
                "tenCumRap": result.tenCumRap,
                "diaChi": result.diaChi,
            })
        }
        return res.send(final);
    });
});

app.get('/api/QuanLyRap/LayThongTinRap', async (req, res) => {
    dbConn.query('select * from danhsachrap d join cumrap c on d.maCumRap = c.cid join hethongrapvacumrap h on h.cumrap = c.cid  join hethongrap hr on hr.hid = h.hethongrap ', async (error, results, fields) => {
        if (error) throw error;
        return res.send(results);
    });
});
// QuanLyNguoiDung

app.post('/api/QuanLyNguoiDung/DangKy', async (req, res) => {
    const final = await new Promise((resolve, reject) => {
        dbConn.query("INSERT INTO nguoidungvm SET ? ", {
            taiKhoan: req.body.taiKhoan,
            matKhau: md5(req.body.matKhau),
            email: req.body.email,
            soDt: req.body.soDt,
            maNhom: req.body.maNhom,
            maLoaiNguoiDung: req.body.maLoaiNguoiDung,
            hoTen: req.body.hoTen,
        }, function (error, results, fields) {
            if (error) throw error;
            resolve(res.send("Success"));
        });
    })
    return final;
});

app.post('/api/QuanLyNguoiDung/DangNhap', function (req, res) {
    dbConn.query('SELECT * FROM nguoidungvm WHERE taiKhoan=? AND matKhau=?', [req.body.taiKhoan, md5(req.body.matKhau)], function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            info = JSON.parse(JSON.stringify(results[0]))
            info["accessToken"] = jwt.sign(info, process.env.JWT_SECRET_KEY)
            return res.send(info);
        }
        return res.status(401).send({ error: true });
    });
});

app.get('/api/QuanLyNguoiDung/LayDanhSachNguoiDung', function (req, res) {
    dbConn.query('SELECT * FROM nguoidungvm WHERE maNhom=?', [req.query.MaNhom], function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
    });
});

app.get('/api/ThongKe/getMonth', function (req, res) {
    dbConn.query('SELECT MONTH(ngayMuaVe) AS thang, YEAR(ngayMuaVe) AS nam, SUM(amount) AS doanhSo FROM nodejsapi.thongke  GROUP BY YEAR(ngayMuaVe), MONTH(ngayMuaVe) ORDER BY nam, thang', [], function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
    });
});

app.get('/api/ThongKe/getPhim', function (req, res) {
    const query = `
        SELECT tenPhim, COUNT(*) AS soLuong 
        FROM nodejsapi.thongke 
        GROUP BY tenPhim 
        ORDER BY soLuong DESC 
        LIMIT 5
    `;
    
    dbConn.query(query, [], function (error, results, fields) {
        if (error) {
            console.error('Lỗi khi truy vấn top phim:', error);
            return res.status(500).send('Lỗi máy chủ');
        }
        return res.send(results);
    });
});


app.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan', function (req, res) {
    validateToken(req, res);
    dbConn.query('SELECT * FROM nguoidungvm WHERE taiKhoan = ?', [req.body.taiKhoan], function (error, results, fields) {
        if (error) throw error;
        return res.send(results[0]);
    });
});

app.put('/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung', function (req, res) {
    validateToken(req, res);
    if (req.body.matKhau) {
        dbConn.query('UPDATE nguoidungvm SET ? WHERE taiKhoan = ?', [{
            taiKhoan: req.body.taiKhoan,
            matKhau: md5(req.body.matKhau),
            email: req.body.email,
            soDt: req.body.soDt,
            maNhom: req.body.maNhom,
            maLoaiNguoiDung: req.body.maLoaiNguoiDung,
            hoTen: req.body.hoTen,
        }, req.body.taiKhoan], function (error, results, fields) {
            if (error) throw error;
            return res.send(results[0]);
        });
    }
    else {
        dbConn.query('UPDATE nguoidungvm SET ? WHERE taiKhoan = ?', [{
            taiKhoan: req.body.taiKhoan,
            email: req.body.email,
            soDt: req.body.soDt,
            maNhom: req.body.maNhom,
            maLoaiNguoiDung: req.body.maLoaiNguoiDung,
            hoTen: req.body.hoTen,
        }, req.body.taiKhoan], function (error, results, fields) {
            if (error) throw error;
            return res.send(results[0]);
        });
    }
});

app.delete('/api/QuanLyNguoiDung/XoaNguoiDung', function (req, res) {
    dbConn.query('DELETE FROM nguoidungvm WHERE taiKhoan=?', [req.query.TaiKhoan], function (error, results, fields) {
        if (error) throw error;
    });

    dbConn.query('DELETE FROM nodejsapi.datve WHERE taiKhoanNguoiDat = ? AND isConfirm = 0 ', [req.query.TaiKhoan], function (error, results, fields) {
        return res.send("Success");
    })
});

// QuanLyRap

app.get('/api/QuanLyRap/LayThongTinHeThongRap', function (req, res) {
    dbConn.query('SELECT * FROM hethongrap', [], function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
    });
});

app.get('/api/QuanLyRap/LayThongTinCumRap', function (req, res) {
    dbConn.query('SELECT * FROM cumrap', [], function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
    });
});

app.get('/api/QuanLyRap/LayThongTinTheLoaiPhim', function (req, res) {
    dbConn.query('SELECT * FROM nodejsapi.theloaiphim', [], function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
    });
});

app.post('/api/QuanLyRap/AddTheLoaiPhim', function (req, res) {
    dbConn.query("INSERT INTO nodejsapi.theloaiphim (tenTheLoai) VALUES(?)", [req.body.tenTheLoai], function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
    });
});

app.put('/api/QuanLyRap/UpdateTheLoaiPhim', function (req, res) {
    dbConn.query("UPDATE nodejsapi.theloaiphim SET tenTheLoai=? WHERE id=?", [req.body.tenTheLoai, req.body.id], function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
    });
});


app.post('/api/QuanLyRap/DeleteTheLoaiPhim', function (req, res) {
    dbConn.query("DELETE FROM nodejsapi.theloaiphim WHERE id=?", [req.body.id], function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
    });
});


app.get('/api/QuanLyRap/LayThongTinLichChieuHeThongRap', function (req, res) {
  const final = [];
  dbConn.query('SELECT * FROM hethongrap', [], async (error, results, fields) => {
    if (error) throw error;
    for (const result of results) {
      let lstCumRap = [];
      lstCumRap = await new Promise((resolve, reject) => {
        dbConn.query(
          'SELECT * FROM hethongrap JOIN hethongrapvacumrap ON hethongrap.hid = hethongrapvacumrap.hethongrap JOIN cumrap ON cumrap.cid = hethongrapvacumrap.cumrap WHERE hethongrap.hid = ?',
          [result.hid],
          async (error, results0, fields) => {
            if (error) throw error;
            for (const result0 of results0) {
              let danhSachPhim = [];
              danhSachPhim = await new Promise((resolve, reject) => {
                dbConn.query(
                  'SELECT * FROM phiminsert JOIN hethongrapvaphim ON phiminsert.maPhim = hethongrapvaphim.maPhim JOIN hethongrap ON hethongrap.hid = hethongrapvaphim.maHeThongRap JOIN phiminsertvalichchieuinsert ON phiminsert.maPhim = phiminsertvalichchieuinsert.phiminsert JOIN cumrapvalichchieuinsert ON phiminsertvalichchieuinsert.lichchieuinsert = cumrapvalichchieuinsert.lichchieuinsert WHERE hethongrap.hid = ? AND cumrapvalichchieuinsert.cumrap = ?',
                  [result0.hid, result0.cid],
                  async (error, results1, fields) => {
                    if (error) throw error;

                    const mapPhim = new Map();

                    for (const result1 of results1) {
                      const lstLichChieuTheoPhim = await new Promise((resolve, reject) => {
                        dbConn.query(
                          `SELECT DISTINCT lichchieuinsert.maLichChieu, lichchieuinsert.maRap, lichchieuinsert.tenRap, lichchieuinsert.ngayChieuGioChieu, lichchieuinsert.giaVe
                          FROM lichchieuinsert
                          JOIN phiminsertvalichchieuinsert ON lichchieuinsert.maLichChieu = phiminsertvalichchieuinsert.lichchieuinsert
                          JOIN cumrapvalichchieuinsert ON lichchieuinsert.maLichChieu = cumrapvalichchieuinsert.lichchieuinsert
                          WHERE phiminsertvalichchieuinsert.phiminsert = ? AND cumrapvalichchieuinsert.cumrap = ?`,
                          [result1.maPhim, result0.cid],
                          async (error, results2, fields) => {
                            if (error) throw error;

                            const uniqueMap = new Map();
                            for (const result2 of results2) {
                              if (!uniqueMap.has(result2.maLichChieu)) {
                                uniqueMap.set(result2.maLichChieu, {
                                  maLichChieu: result2.maLichChieu,
                                  maRap: result2.maRap,
                                  tenRap: result2.tenRap,
                                  ngayChieuGioChieu: result2.ngayChieuGioChieu,
                                  giaVe: result2.giaVe,
                                  thongTinRap: {
                                    maCumRap: result0.maCumRap,
                                    tenCumRap: result0.tenCumRap
                                  }
                                });
                              }
                            }

                            resolve(Array.from(uniqueMap.values()));
                          }
                        );
                      });

                      // ✅ Gộp phim trùng, không thêm nhiều lần
                      if (!mapPhim.has(result1.maPhim)) {
                        mapPhim.set(result1.maPhim, {
                          maPhim: result1.maPhim,
                          tenPhim: result1.tenPhim,
                          hinhAnh: result1.hinhAnh.toString(),
                          lstLichChieuTheoPhim
                        });
                      } else {
                        const existing = mapPhim.get(result1.maPhim);
                        const merged = [...existing.lstLichChieuTheoPhim, ...lstLichChieuTheoPhim];
                        const mergedMap = new Map(merged.map(lc => [lc.maLichChieu, lc]));
                        existing.lstLichChieuTheoPhim = Array.from(mergedMap.values());
                      }
                    }

                    resolve(Array.from(mapPhim.values()));
                  }
                );
              });

              let danhSachRap = [];
              danhSachRap = await new Promise((resolve, reject) => {
                dbConn.query(
                  'SELECT * FROM danhsachrap WHERE danhsachrap.maCumRap = ?',
                  [result0.cid],
                  async (error, results1, fields) => {
                    if (error) throw error;
                    for (const result1 of results1) {
                      const rap = {
                        maRap: result1.maRap
                      };
                      danhSachRap.push(rap);
                    }
                    resolve(danhSachRap);
                  }
                );
              });

              const cumrap = {
                danhSachPhim,
                danhSachRap,
                maCumRap: result0.maCumRap,
                tenCumRap: result0.tenCumRap,
                diaChi: result0.diaChi
              };

              lstCumRap.push(cumrap);
            }
            resolve(lstCumRap);
          }
        );
      });

      final.push({
        lstCumRap,
        maHeThongRap: result.maHeThongRap,
        tenHeThongRap: result.tenHeThongRap,
        logo: result.logo,
        mahom: 'GP09'
      });
    }

    return res.send(final);
  });
});


app.get('/api/QuanLyRap/LayThongTinLichChieuPhim', function (req, res) {
  dbConn.query(
    `SELECT * FROM phiminsert 
     JOIN hethongrapvaphim ON phiminsert.maPhim = hethongrapvaphim.maPhim 
     JOIN hethongrap ON hethongrap.hid = hethongrapvaphim.maHeThongRap 
     WHERE phiminsert.maPhim = ?`,
    [req.query.MaPhim],
    async (error, results0) => {
      if (error) throw error;

      if (!results0 || results0.length === 0) {
        return res.status(404).json({ error: "Không tìm thấy phim" });
      }

      let heThongRapChieu = [];

      for (const result0 of results0) {
        const results1 = await new Promise((resolve, reject) => {
          dbConn.query(
            `SELECT * FROM hethongrap 
             JOIN hethongrapvacumrap ON hethongrap.hid = hethongrapvacumrap.hethongrap 
             JOIN cumrap ON cumrap.cid = hethongrapvacumrap.cumrap 
             JOIN cumrapvalichchieuinsert ON cumrap.cid = cumrapvalichchieuinsert.cumrap 
             JOIN phiminsertvalichchieuinsert ON cumrapvalichchieuinsert.lichchieuinsert = phiminsertvalichchieuinsert.lichchieuinsert 
             WHERE hethongrap.hid = ? AND phiminsertvalichchieuinsert.phiminsert = ?`,
            [result0.hid, result0.maPhim],
            (err, rows) => {
              if (err) return reject(err);
              resolve(rows);
            }
          );
        });

        const cumRapMap = new Map();

        for (const result1 of results1) {
          const results2 = await new Promise((resolve, reject) => {
            dbConn.query(
              `SELECT * FROM lichchieuinsert 
               JOIN cumrapvalichchieuinsert ON lichchieuinsert.maLichChieu = cumrapvalichchieuinsert.lichchieuinsert 
               JOIN cumrap ON cumrap.cid = cumrapvalichchieuinsert.cumrap 
               JOIN phiminsertvalichchieuinsert ON cumrapvalichchieuinsert.lichchieuinsert = phiminsertvalichchieuinsert.lichchieuinsert 
               WHERE cumrap.cid = ? AND phiminsertvalichchieuinsert.phiminsert = ?`,
              [result1.cumrap, result0.maPhim],
              (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
              }
            );
          });

          const lichMap = new Map();
          for (const row of results2) {
            if (!lichMap.has(row.maLichChieu)) {
              lichMap.set(row.maLichChieu, {
                maLichChieu: row.maLichChieu,
                maRap: row.maRap,
                tenRap: row.tenRap,
                ngayChieuGioChieu: row.ngayChieuGioChieu,
                giaVe: row.giaVe,
                thoiLuong: row.thoiLuong
              });
            }
          }

          const lichChieuPhim = Array.from(lichMap.values());

          if (!cumRapMap.has(result1.maCumRap)) {
            cumRapMap.set(result1.maCumRap, {
              lichChieuPhim,
              maCumRap: result1.maCumRap,
              tenCumRap: result1.tenCumRap,
              hinhAnh: null
            });
          } else {
            const exist = cumRapMap.get(result1.maCumRap);
            const merged = [...exist.lichChieuPhim, ...lichChieuPhim];
            const unique = new Map(merged.map(l => [l.maLichChieu, l]));
            exist.lichChieuPhim = Array.from(unique.values());
          }
        }

        heThongRapChieu.push({
          cumRapChieu: Array.from(cumRapMap.values()),
          maHeThongRap: results1[0]?.maHeThongRap,
          tenHeThongRap: results1[0]?.tenHeThongRap,
          logo: results1[0]?.logo
        });
      }

      const final = {
        heThongRapChieu,
        maPhim: results0[0].maPhim,
        tenPhim: results0[0].tenPhim,
        biDanh: results0[0].biDanh,
        trailer: results0[0].trailer,
        hinhAnh: results0[0].hinhAnh.toString(),
        moTa: results0[0].moTa,
        maNhom: "GP09",
        ngayKhoiChieu: results0[0].ngayKhoiChieu,
        danhGia: results0[0].danhGia,
        nhaSanXuat: results0[0].nhaSanXuat,
        daoDien: results0[0].daoDien,
        dienVien: results0[0].dienVien,
        maTheLoaiPhim: results0[0].maTheLoaiPhim,
        dinhDang: results0[0].dinhDang,
      };

      return res.send(final);
    }
  );
});


app.post('/api/QuanLyRap/AddCumRap', function (req, res) {
    dbConn.query("INSERT INTO nodejsapi.cumrap SET ? ", {
        maCumRap: req.body.maCumRap,
        tenCumRap: req.body.tenCumRap,
        diaChi: req.body.diaChi
    }, function (error, results, fields) {
        if (error) throw error;
    });
    dbConn.query('SELECT * FROM nodejsapi.cumrap where  maCumRap = ?', [req.body.maCumRap], async (error, results0, fields) => {
        if (error) throw error;
        for (const result0 of results0) {
            dbConn.query("INSERT INTO nodejsapi.hethongrapvacumrap (hethongrap, cumrap) VALUES(?, ?)", [req.body.hid, result0.cid], async (error, results1, fields) => {
                if (error) throw error;
            });
        }
    }
    )
    return res.send("Thêm cụm rạp thành công.")
})


app.put('/api/QuanLyRap/SuaCumRap', function (req, res) {
    dbConn.query('UPDATE nodejsapi.cumrap SET maCumRap=?, tenCumRap=?, diaChi=? WHERE maCumRap = ?', [req.body.maCumRap, req.body.tenCumRap, req.body.diaChi, req.body.maCumRap], function (error, results, fields) {
        if (error) throw error;
    })
});

app.post('/api/QuanLyRap/XoaCumRap', function (req, res) {
    dbConn.query('DELETE FROM nodejsapi.cumrap WHERE maCumRap = ?', [req.body.maCumRap], function (error, results, fields) {
        if (error) throw error;
    })

    dbConn.query('SELECT * FROM nodejsapi.cumrap where  maCumRap = ?', [req.body.maCumRap], async (error, results0, fields) => {
        if (error) throw error;
        for (const result0 of results0) {
            dbConn.query("DELETE FROM nodejsapi.hethongrapvacumrap where  maCumRap = ? ", [result0.cid], async (error, results1, fields) => {
                if (error) throw error;
            });
        }
    }
    )
});

// QUAN LY DANH SACH RAP

app.put('/api/QuanLyRap/SuaRap', function (req, res) {
    dbConn.query('UPDATE nodejsapi.danhsachrap SET tenRap= ? WHERE maRap = ?', [req.body.tenRap, req.body.maRap], function (error, results, fields) {
        if (error) throw error;
    })
});

app.post('/api/QuanLyRap/XoaRap', function (req, res) {
    dbConn.query('DELETE FROM nodejsapi.danhsachrap WHERE maRap = ?', [req.body.maRap], function (error, results, fields) {
        if (error) throw error;
    })
});

app.post('/api/QuanLyRap/ThemRap', function (req, res) {
    dbConn.query('SELECT * FROM nodejsapi.cumrap where  maCumRap = ?', [req.body.maCumRap], async (error, results0, fields) => {
        if (error) throw error;
        for (const result0 of results0) {
            dbConn.query("INSERT INTO nodejsapi.danhsachrap SET ? ", {
                maRap: Math.floor(Math.random() * 1000000),
                tenRap: req.body.tenRap,
                maCumRap: result0.cid
            }, async (error, results1, fields) => {
                if (error) throw error;
            });
        }
    }
    )
    return res.send("Thêm rạp thành công.")
})

// QuanLyPhim

app.get('/api/QuanLyPhim/LayDanhSachPhim', function (req, res) {
    dbConn.query('SELECT * FROM phiminsert', [], function (error, results, fields) {
        if (error) throw error;

        for (var i = 0; i < results.length; i++) {
            results[i].hinhAnh = Buffer.from(results[i].hinhAnh).toString()
        }
        return res.send(results);
    });
});

app.get('/api/QuanLyPhim/LayThongTinPhim', function (req, res) {
    dbConn.query('SELECT * FROM phiminsert JOIN phiminsertvalichchieuinsert ON phiminsert.maPhim = phiminsertvalichchieuinsert.phiminsert JOIN lichchieuinsert ON lichchieuinsert.maLichChieu = phiminsertvalichchieuinsert.lichchieuinsert WHERE phiminsert.maPhim = ?', [req.query.MaPhim], async (error, results0, fields) => {
        if (error) throw error;
        let lichchieu = [];
        for (const result0 of results0) {
            lichchieu = await new Promise((resolve, reject) => {
                dbConn.query('SELECT * FROM lichchieuinsert JOIN cumrapvalichchieuinsert ON lichchieuinsert.maLichChieu = cumrapvalichchieuinsert.lichchieuinsert JOIN cumrap ON cumrap.cid = cumrapvalichchieuinsert.cumrap WHERE lichchieuinsert.maLichChieu = ?', [result0.maLichChieu], async (error, results1, fields) => {
                    if (error) throw error;
                    let thongtinrap = {}
                    for (const result1 of results1) {
                        thongtinrap = await new Promise((resolve, reject) => {
                            dbConn.query('SELECT * FROM danhsachrap JOIN cumrap ON danhsachrap.maCumRap = cumrap.cid JOIN hethongrapvacumrap ON cumrap.cid = hethongrapvacumrap.cumrap JOIN hethongrap ON hethongrap.hid = hethongrapvacumrap.hethongrap WHERE danhsachrap.maRap = ?', [result1.maRap], async (error, results2, fields) => {
                                if (error) throw error;
                                thongtinrap = {
                                    "maRap": parseInt(results2[0].maRap),
                                    "tenRap": results2[0].tenRap,
                                    "maCumRap": results2[0].maCumRap,
                                    "tenCumRap": results2[0].tenCumRap,
                                    "maHeThongRap": results2[0].maHeThongRap,
                                    "tenHeThongRap": results2[0].tenHeThongRap
                                }
                                resolve(thongtinrap)
                            });
                        })
                        const val = {
                            "thongTinRap": thongtinrap,
                            "maLichChieu": result1.maLichChieu,
                            "maRap": result1.maRap,
                            "maPhim": result0.maPhim,
                            "tenPhim": result0.tenPhim,
                            "ngayChieuGioChieu": result1.ngayChieuGioChieu,
                            "giaVe": result1.giaVe,
                            "thoiLuong": result1.thoiLuong
                        }
                        lichchieu.push(val)
                    }
                    resolve(lichchieu);
                });
            })
        }
        if (results0[0]) {
            const final = {
                lichchieu: lichchieu,
                "maPhim": results0[0].maPhim,
                "tenPhim": results0[0].tenPhim,
                "biDanh": results0[0].biDanh,
                "trailer": results0[0].trailer,
                "hinhAnh": Buffer.from(results0[0].hinhAnh).toString(),
                "moTa": results0[0].moTa,
                "maNhom": "GP09",
                "ngayKhoiChieu": results0[0].ngayKhoiChieu,
                "danhGia": results0[0].danhGia,
                "nhaSanXuat": results0[0].nhaSanXuat,
                "daoDien": results0[0].daoDien,
                "dienVien": results0[0].dienVien,
                "maTheLoaiPhim": results0[0].maTheLoaiPhim,
                "dinhDang": results0[0].dinhDang,
            }
            return res.send(final)
        }
    });
});



// QuanLyDatVe

app.put('/api/QuanLyDatVe/ThayDoiTrangThaiDatVe', function (req, res) {
    console.log("RUN", req.body.maGhe, req.body.taiKhoanNguoiDat);
    dbConn.query('update nodejsapi.datve set isConfirm = 1 where maGhe = ? and taiKhoanNguoiDat = ?',
        [req.body.maGhe, req.body.taiKhoanNguoiDat], function (error, results, fields) {
            if (error) throw error;
            return res.send("Success")
        })
})


app.get('/api/QuanLyDatVe/LayDanhSachVeDaMuaCuaKhachHang', function (req, res) {
    dbConn.query('SELECT * FROM lichchieuinsert JOIN phiminsertvalichchieuinsert ON lichchieuinsert.maLichChieu = phiminsertvalichchieuinsert.lichchieuinsert JOIN phiminsert ON phiminsert.maPhim = phiminsertvalichchieuinsert.phiminsert JOIN cumrapvalichchieuinsert ON lichchieuinsert.maLichChieu = cumrapvalichchieuinsert.lichchieuinsert JOIN cumrap ON cumrap.cid = cumrapvalichchieuinsert.cumrap JOIN datve ON datve.maLichChieu = lichchieuinsert.maLichChieu ORDER BY ngayChieuGioChieu DESC', async (error, results, fields) => {
        if (error) throw error;

        var danhSachVe = [];

        for (var i = 0; i < results.length; i++) {
            danhSachVe.push({
                "maLichChieu": results[i].maLichChieu,
                "tenCumRap": results[i].tenCumRap,
                "tenRap": results[i].tenRap,
                "diaChi": results[i].diaChi,
                "tenPhim": results[i].tenPhim,
                "hinhAnh": results[i].hinhAnh,
                "ngayChieu": results[i].ngayChieuGioChieu,
                "gioChieu": results[i].ngayChieuGioChieu,
                "maGhe": results[i].maGhe,
                "tenGhe": results[i].tenGhe,
                "tenDayDu": results[i].tenDayDu,
                "loaiGhe": results[i].loaiGhe,
                "giaVe": results[i].giaVe,
                "tenTaiKhoan": results[i].taiKhoanNguoiDat,
                "loaiGhe": results[i].giaVe > 75000 ? "Vip" : "Thường",
                "isConfirm": results[i].isConfirm.readInt8() === 1
            });
            console.log(danhSachVe)
        }
        return res.send(danhSachVe);
    });
});

app.get('/api/QuanLyDatVe/LayVeTheoMaGhe', function (req, res) {
    dbConn.query('SELECT * FROM lichchieuinsert JOIN phiminsertvalichchieuinsert ON lichchieuinsert.maLichChieu = phiminsertvalichchieuinsert.lichchieuinsert JOIN phiminsert ON phiminsert.maPhim = phiminsertvalichchieuinsert.phiminsert JOIN cumrapvalichchieuinsert ON lichchieuinsert.maLichChieu = cumrapvalichchieuinsert.lichchieuinsert JOIN cumrap ON cumrap.cid = cumrapvalichchieuinsert.cumrap JOIN datve ON datve.maLichChieu = lichchieuinsert.maLichChieu where datve.maGhe = ? and datve.taiKhoanNguoiDat = ?', [req.query.maGhe, req.query.taiKhoanNguoiDat], async (error, results, fields) => {
        if (error) throw error;

        var danhSachVe = [];

        for (var i = 0; i < results.length; i++) {
            danhSachVe.push({
                "maLichChieu": results[i].maLichChieu,
                "tenCumRap": results[i].tenCumRap,
                "tenRap": results[i].tenRap,
                "diaChi": results[i].diaChi,
                "tenPhim": results[i].tenPhim,
                "hinhAnh": results[i].hinhAnh,
                "ngayChieu": results[i].ngayChieuGioChieu,
                "gioChieu": results[i].ngayChieuGioChieu,
                "maGhe": results[i].maGhe,
                "tenGhe": results[i].tenGhe,
                "tenDayDu": results[i].tenDayDu,
                "loaiGhe": results[i].loaiGhe,
                "giaVe": results[i].giaVe,
                "tenTaiKhoan": results[i].taiKhoanNguoiDat,
                "loaiGhe": results[i].giaVe > 75000 ? "Vip" : "Thường",
                "isConfirm": results[i].isConfirm.readInt8() === 1
            });
            console.log(danhSachVe)
        }
        return res.send(danhSachVe);
    });
});

app.delete('/api/DeleteTicketOfUser', function (req, res) {
    const { maGhe, taiKhoanNguoiDat } = req.query;
    console.log("Xoá vé:", maGhe, taiKhoanNguoiDat);

    dbConn.query(
        'DELETE FROM nodejsapi.datve WHERE maGhe = ? AND taiKhoanNguoiDat = ?',
        [maGhe, taiKhoanNguoiDat],
        (error, results) => {
            if (error) {
                console.error("Lỗi MySQL:", error);
                return res.status(500).send("Lỗi server");
            }

            // Kiểm tra kết quả xoá
            if (results.affectedRows === 0) {
                return res.status(404).send("Không tìm thấy vé để xoá");
            }

            return res.send("Success");
        }
    );
});


app.get('/api/QuanLyDatVe/LayDanhSachVeDaMua', function (req, res) {
    dbConn.query('SELECT * FROM lichchieuinsert JOIN phiminsertvalichchieuinsert ON lichchieuinsert.maLichChieu = phiminsertvalichchieuinsert.lichchieuinsert JOIN phiminsert ON phiminsert.maPhim = phiminsertvalichchieuinsert.phiminsert JOIN cumrapvalichchieuinsert ON lichchieuinsert.maLichChieu = cumrapvalichchieuinsert.lichchieuinsert JOIN cumrap ON cumrap.cid = cumrapvalichchieuinsert.cumrap JOIN datve ON datve.maLichChieu = lichchieuinsert.maLichChieu WHERE datve.taiKhoanNguoiDat = ? ORDER BY ngayChieuGioChieu DESC', [req.query.taiKhoanNguoiDat], async (error, results, fields) => {
        if (error) throw error;

        var danhSachVe = [];
        for (var i = 0; i < results.length; i++) {
            danhSachVe.push({
                "maGhe": results[i].maGhe,
                "maLichChieu": results[i].maLichChieu,
                "tenCumRap": results[i].tenCumRap,
                "tenRap": results[i].tenRap,
                "diaChi": results[i].diaChi,
                "tenPhim": results[i].tenPhim,
                "hinhAnh": results[i].hinhAnh,
                "ngayChieu": results[i].ngayChieuGioChieu,
                "gioChieu": results[i].ngayChieuGioChieu,
                "tenGhe": results[i].tenGhe,
                "tenDayDu": results[i].tenDayDu,
                "loaiGhe": results[i].loaiGhe,
                "giaVe": results[i].giaVe,
                "status": results[i].isConfirm?.readInt8() === 1,
                "taiKhoanNguoiDat": results[i].taiKhoanNguoiDat
            });
            console.log("Status Ticket:", results[i].isConfirm.readInt8() === 1)
        }
        return res.send(danhSachVe);
    });
});

app.get('/api/QuanLyDatVe/LayDanhSachPhongVe', function (req, res) {
    dbConn.query('SELECT * FROM lichchieuinsert JOIN phiminsertvalichchieuinsert ON lichchieuinsert.maLichChieu = phiminsertvalichchieuinsert.lichchieuinsert JOIN phiminsert ON phiminsert.maPhim = phiminsertvalichchieuinsert.phiminsert JOIN cumrapvalichchieuinsert ON lichchieuinsert.maLichChieu = cumrapvalichchieuinsert.lichchieuinsert JOIN cumrap ON cumrap.cid = cumrapvalichchieuinsert.cumrap WHERE maLichChieu = ?', [req.query.MaLichChieu], async (error, results, fields) => {
        if (error) throw error;
        let danhSachGhe = Array.apply(null, Array(160)).map(function () { })
        danhSachGhe = await new Promise((resolve, reject) => {
            dbConn.query('SELECT * FROM datve WHERE maLichChieu = ?', [req.query.MaLichChieu], async (error, results1, fields) => {
                if (error) throw error;
                for (const result1 of results1) {
                    danhSachGhe[result1.tenGhe] = {
                        "maGhe": result1.maGhe,
                        "tenGhe": result1.tenGhe,
                        "maRap": result1.maRap,
                        "loaiGhe": result1.loaiGhe,
                        "stt": result1.tenGhe,
                        "giaVe": result1.giaVe,
                        "daDat": true,
                        "taiKhoanNguoiDat": result1.taiKhoanNguoiDat
                    }
                }
                resolve(danhSachGhe)
            });
        })
        for (let i = 0; i < 160; i++) {
            if (danhSachGhe[i] === undefined) {
                danhSachGhe[i] = {
                    "maGhe": i,
                    "tenGhe": i > 9 ? String(i) : "0" + String(i),
                    "maRap": results[0].maRap,
                    "loaiGhe": i > 44 && i < 90 ? "Vip" : "Thuong",
                    "stt": i > 9 ? String(i) : "0" + String(i),
                    "giaVe": i > 44 && i < 90 ? results[0].giaVe + 15000 : results[0].giaVe,
                    "daDat": false,
                    "taiKhoanNguoiDat": null
                }
            }
        }
        return res.send({
            "thongTinPhim": {
                "maLichChieu": results[0].maLichChieu,
                "tenCumRap": results[0].tenCumRap,
                "tenRap": results[0].tenRap,
                "diaChi": results[0].diaChi,
                "tenPhim": results[0].tenPhim,
                "hinhAnh": results[0].hinhAnh,
                "ngayChieu": results[0].ngayChieuGioChieu,
                "gioChieu": results[0].ngayChieuGioChieu
            },
            "danhSachGhe": danhSachGhe
        });
    });
});

app.post('/api/QuanLyDatVe/DatVe', async (req, res) => {

    var listVe = [];
    var email = "";
    var tenPhim = "";
    var tenRap = "";
    var tenCumRap = "";
    var time = "";
    for (const ve of req.body.danhSachVe) {
        listVe.push(ve);
        await new Promise((resolve, reject) => {
            dbConn.query("INSERT INTO datve SET ? ", {
                tenGhe: ve.maGhe,
                loaiGhe: ve.giaVe > 75000 ? "Vip" : "Thuong",
                giaVe: ve.giaVe,
                taiKhoanNguoiDat: req.body.taiKhoanNguoiDung,
                maLichChieu: req.body.maLichChieu,
                tenDayDu: ve.tenDayDu,
                isConfirm: 1,
            }, function (error, results, fields) {
                if (error) throw error;
                resolve();
            });
        });
    }

    dbConn.query(
        "SELECT * FROM nguoidungvm n WHERE n.taiKhoan = ?",
        [req.body.taiKhoanNguoiDung],
        function (error, results3, fields) {
            console.log("QUERY", results3);
            if (error) throw error;
            for (const result1 of results3) {
                email = result1.email;

                dbConn.query(
                    "SELECT * FROM lichchieuinsert JOIN phiminsertvalichchieuinsert ON lichchieuinsert.maLichChieu = phiminsertvalichchieuinsert.lichchieuinsert JOIN phiminsert ON phiminsert.maPhim = phiminsertvalichchieuinsert.phiminsert JOIN cumrapvalichchieuinsert ON lichchieuinsert.maLichChieu = cumrapvalichchieuinsert.lichchieuinsert JOIN cumrap ON cumrap.cid = cumrapvalichchieuinsert.cumrap JOIN datve ON datve.maLichChieu = lichchieuinsert.maLichChieu WHERE datve.taiKhoanNguoiDat = ? AND lichchieuinsert.maLichChieu = ? LIMIT 1",
                    [req.body.taiKhoanNguoiDung, req.body.maLichChieu],
                    function (error, results2, fields) {
                        console.log("QUERY", results2);
                        if (error) throw error;
                        for (const result2 of results2) {
                            tenCumRap = result2.tenCumRap;
                            tenRap = result2.tenRap;
                            tenPhim = result2.tenPhim;
                            time = result2.ngayChieuGioChieu;

                            dbConn.query("INSERT INTO nodejsapi.thongke SET ? ", {
                                tenPhim: result2.tenPhim,
                                ngayMuaVe: new Date(),
                                amount: req.body.amount / 100
                            }, function (error, results, fields) {
                                if (error) throw error;
                            })

                            console.log("LOG DAT VE", email, req.body.maLichChieu, listVe, tenRap, tenCumRap, tenPhim, time);

                            var transporter = nodemailer.createTransport({
                                service: "gmail",
                                auth: {
                                    user: "khanhhn.hoang@gmail.com",
                                    pass: "rmjgjdgtziwhvmai",
                                },
                            });

                            var mailOptions = {
                                from: "admin@gmail.com",
                                to: email,
                                subject: "Bạn đặt vé thành công",
                                text: "Các thông tin về vé đặt:\n" +
                                    "Mã Ghế: " + listVe.map(ve => ve.tenDayDu).join(", ") + "\n" +
                                    "Tên Rạp: " + tenRap + "\n" +
                                    "Tên Cụm Rạp: " + tenCumRap + "\n" +
                                    "Tên Phim: " + tenPhim + "\n" +
                                    "Thời gian chiếu: " + time,
                            };

                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log("Email sent: " + info.response);
                                }
                            });
                        }
                    }
                );
            }
        }
    );

    return res.send("Success");
});

app.get('/api/QuanLyDatVe/LayLichChieu', async (req, res) => {
    dbConn.query('select * from lichchieuinsert l where l.maLichChieu = ?', [req.query.MaLichChieu], function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
    });
})

app.put('/api/QuanLyDatVe/SuaLichChieu', async (req, res) => {
    dbConn.query('UPDATE nodejsapi.lichchieuinsert SET ngayChieuGioChieu= ?, giaVe= ? WHERE maLichChieu= ? ', [req.body.time, req.body.gia, req.query.MaLichChieu], function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
    });
})


app.post('/api/QuanLyDatVe/TaoLichChieu', async (req, res) => {
    dbConn.query("INSERT INTO lichchieuinsert SET ? ", {
        ngayChieuGioChieu: req.body.ngayChieuGioChieu,
        maRap: req.body.maRap,
        tenRap: req.body.tenRap,
        giaVe: req.body.giaVe,
        thoiLuong: 120
    }, function (error, results, fields) {
        if (error) throw error;
        dbConn.query("INSERT INTO phiminsertvalichchieuinsert SET ? ", {
            phiminsert: req.body.maPhim,
            lichchieuinsert: results.insertId,
        }, function (error, results0, fields) {
            if (error) throw error;
        });
        dbConn.query("SELECT * FROM cumrap JOIN hethongrapvacumrap ON cumrap.cid = hethongrapvacumrap.cumrap WHERE tenCumRap = ?", [req.body.cumRap], function (error, results1, fields) {
            if (error) throw error;
            dbConn.query("INSERT INTO cumrapvalichchieuinsert SET ? ", {
                cumrap: results1[0].cid,
                lichchieuinsert: results.insertId,
            }, function (error, results2, fields) {
                if (error) throw error;
                console.log(results1[0].hethongrap);
                dbConn.query("SELECT * FROM hethongrapvaphim WHERE maHeThongRap = ? AND maPhim = ?", [results1[0].hethongrap, req.body.maPhim], function (error, results3, fields) {
                    if (error) throw error;
                    if (!(results3.length > 0)) {
                        dbConn.query("INSERT INTO hethongrapvaphim SET ? ", {
                            maHeThongRap: results1[0].hethongrap,
                            maPhim: req.body.maPhim,
                        }, function (error, results0, fields) {
                            if (error) throw error;
                        });
                    }
                });
            });
        });
        return res.send("Success");
    });
});

app.delete('/api/QuanLyLichChieu/XoaLichChieu', function (req, res) {
    dbConn.query('DELETE FROM lichchieuinsert WHERE maLichChieu=?', [req.query.maLichChieu], function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
    });
});

// QuanLyPhim

app.post('/api/QuanLyPhim/ThemPhim', async (req, res) => {
    const final = await new Promise((resolve, reject) => {
        dbConn.query("INSERT INTO phiminsert SET ? ", {
            "tenPhim": req.body.tenPhim,
            "biDanh": req.body.biDanh,
            "trailer": req.body.trailer,
            "hinhAnh": req.body.hinhAnh,
            "moTa": req.body.moTa,
            "maNhom": req.body.maNhom,
            "ngayKhoiChieu": req.body.ngayKhoiChieu,
            "danhGia": req.body.danhGia,
            "nhaSanXuat": req.body.quocGiaSX,
            "daoDien": req.body.daoDien,
            "dienVien": req.body.dienVien,
            "maTheLoaiPhim": req.body.maTheLoaiPhim,
            "dinhDang": req.body.dinhDang
        }, function (error, results, fields) {
            if (error) throw error;
            resolve(res.send("Success"));
        });
    })
    return final;
});

app.post('/api/QuanLyPhim/CapNhatPhim', async (req, res) => {
    const final = await new Promise((resolve, reject) => {
        dbConn.query("UPDATE phiminsert SET ? WHERE maPhim = ?", [{
            "tenPhim": req.body.tenPhim,
            "biDanh": req.body.biDanh,
            "trailer": req.body.trailer,
            "hinhAnh": req.body.hinhAnh,
            "moTa": req.body.moTa,
            "maNhom": req.body.maNhom,
            "ngayKhoiChieu": req.body.ngayKhoiChieu,
            "danhGia": req.body.danhGia,
            "nhaSanXuat": req.body.quocGiaSX,
            "daoDien": req.body.daoDien,
            "dienVien": req.body.dienVien,
            "maTheLoaiPhim": req.body.maTheLoaiPhim,
            "dinhDang": req.body.dinhDang
        }, req.body.maPhim], function (error, results, fields) {
            if (error) throw error;
            resolve(res.send("Success"));
        });
    })
    return final;
});

app.delete('/api/QuanLyPhim/XoaPhim', function (req, res) {
    dbConn.query('DELETE FROM phiminsert WHERE maPhim=?', [req.query.MaPhim], function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
    });
});


function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}



const crypto = require('crypto');
const querystring = require('qs');

app.get('/api/vnpay_return', (req, res) => {
    const vnp_Params = req.query;
    const secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    const sortedParams = sortObject(vnp_Params);
    const signData = Object.keys(sortedParams)
        .map(key => `${key}=${sortedParams[key]}`)
        .join('&');

    const secretKey = require('config').get('vnp_HashSecret');
    const signed = crypto.createHmac("sha512", secretKey)
        .update(Buffer.from(signData, 'utf-8'))
        .digest("hex");

    console.log('✅ Đang xử lý /api/vnpay_return');
    console.log('→ secureHash:', secureHash);
    console.log('→ signed:', signed);
    console.log('→ vnp_ResponseCode:', vnp_Params['vnp_ResponseCode']);

    if (secureHash === signed && vnp_Params['vnp_ResponseCode'] === '00') {
        const rawQuery = req.originalUrl.split('?')[1];
        const parsedQuery = querystring.parse(rawQuery, { allowDots: true });

        const danhSachVe = parsedQuery.danhSachVe?.map(v => JSON.parse(v)) || [];
        const taiKhoanNguoiDung = parsedQuery.taiKhoanNguoiDung;
        const maLichChieu = parseInt(parsedQuery.maLichChieu);

        console.log('✅ Đã xác thực chữ ký thành công');
        console.log('→ taiKhoan:', taiKhoanNguoiDung);
        console.log('→ maLichChieu:', maLichChieu);
        console.log('→ danhSachVe:', danhSachVe);

        for (const ve of danhSachVe) {
            const { tenDayDu } = ve;

            console.log(`🔁 Đang cập nhật vé: ${tenDayDu}`);
            dbConn.query(
                `UPDATE datve 
                 SET isConfirm = b'1' 
                 WHERE taiKhoanNguoiDat = ? AND maLichChieu = ? AND tenDayDu = ?`,
                [taiKhoanNguoiDung, maLichChieu, tenDayDu],
                (err, result) => {
                    if (err) {
                        console.error('❌ Lỗi update datve:', err);
                    } else {
                        console.log(`✅ Vé ${tenDayDu} cập nhật thành công. Affected: ${result.affectedRows}`);
                    }
                }
            );
        }

        res.redirect('http://localhost:3000/result-booking');
    } else {
        console.warn('❌ Không xác thực được giao dịch hoặc giao dịch thất bại');
        res.redirect('http://localhost:3000/result-booking?fail=true');
    }
});
