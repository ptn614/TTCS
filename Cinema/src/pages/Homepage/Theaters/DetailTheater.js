// ✅ DetailTheater.js
import React from "react";

export default function DetailTheater({ cumRap }) {
    if (!cumRap) return null;
    return (
        <div className="detail-theater" style={{
            background: "#ffffff",
            borderRadius: 12,
            padding: 24,
            marginBottom: 16,
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            borderLeft: '4px solid #e71a0f'
        }}>
            {cumRap.hinhAnh && (
                <img
                    src={cumRap.hinhAnh}
                    alt={cumRap.tenCumRap}
                    style={{
                        width: 60,
                        height: 60,
                        objectFit: 'cover',
                        borderRadius: 8,
                        background: '#fff',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
                    }}
                />
            )}
            <div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 'bold', color: '#333' }}>{cumRap.tenCumRap}</h3>
                <p style={{ margin: 0, fontSize: 14, color: '#555' }}>{cumRap.diaChi}</p>
            </div>
        </div>
    );
}