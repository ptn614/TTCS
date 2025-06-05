import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts';
import usersApi from '../../api/usersApi';

export default function MoviesManagement() {
  const [phim, setPhim] = useState([]);
  const [revenue, setRevenue] = useState([]);

  useEffect(() => {
    usersApi.getMonth()
      .then(response => {
        setRevenue(response.data);
      })
      .catch(error => {
        console.error('Error fetching revenue:', error);
      });
  }, []);

  useEffect(() => {
    usersApi.getPhim()
      .then(response => {
        setPhim(response.data);
      })
      .catch(error => {
        console.error('Error fetching phim:', error);
      });
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%', padding: '30px 50px', background: '#f9f9f9' }}>
      <h2 style={{ marginBottom: 30, color: '#333' }}>📊 Bảng điều khiển thống kê</h2>

      <div style={{ background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: 40 }}>
        <h3 style={{ marginBottom: 16 }}>📈 Doanh thu theo từng tháng</h3>
        {revenue.length > 0 ? (
          <BarChart
            xAxis={[{
              id: 'barCategories',
              data: revenue.map(item => 'Tháng ' + item.thang),
              scaleType: 'band',
            }]}
            series={[{
              data: revenue.map(item => item.doanhSo),
            }]}
            width={1000}
            height={300}
            margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
          />
        ) : (
          <p>Đang tải dữ liệu doanh thu...</p>
        )}
      </div>

      <div style={{ background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginBottom: 16 }}>🎬 Top phim được đặt nhiều nhất</h3>
        {phim.length > 0 ? (
          <BarChart
            xAxis={[{
              id: 'barCategories',
              data: phim.map(item => item.tenPhim),
              scaleType: 'band',
            }]}
            series={[{
              data: phim.map(item => item.soLuong),
            }]}
            width={1000}
            height={300}
            margin={{ top: 20, right: 30, bottom: 90, left: 60 }}
          />
        ) : (
          <p>Đang tải dữ liệu phim...</p>
        )}
      </div>
    </div>
  );
}
