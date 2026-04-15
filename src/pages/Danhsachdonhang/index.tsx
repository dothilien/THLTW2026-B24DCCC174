import React, { useState } from "react";

type Order = {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: string;
};

const initialOrders: Order[] = [
  { id: "DH001", customer: "Nguyễn Văn A", date: "2026-04-10", total: 500000, status: "Chờ xác nhận" },
  { id: "DH002", customer: "Trần Thị B", date: "2026-04-12", total: 300000, status: "Đang giao" },
  { id: "DH003", customer: "Lê Văn C", date: "2026-04-08", total: 700000, status: "Hoàn thành" },
  { id: "DH004", customer: "Phạm Văn D", date: "2026-04-14", total: 200000, status: "Hủy" },
  { id: "DH005", customer: "Hoàng Thị E", date: "2026-04-11", total: 900000, status: "Chờ xác nhận" }
];

export default function OrderManagement() {
  const [orders] = useState<Order[]>(initialOrders);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Chờ xác nhận": return "orange";
      case "Đang giao": return "blue";
      case "Hoàn thành": return "green";
      case "Hủy": return "red";
      default: return "gray";
    }
  };

  const processedOrders = () => {
    let result = [...orders];

    // SEARCH
    if (keyword) {
      result = result.filter(order =>
        order.id.toLowerCase().includes(keyword.toLowerCase()) ||
        order.customer.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    // FILTER
    if (status !== "All") {
      result = result.filter(order => order.status === status);
    }

    // SORT
    if (sort === "date") {
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sort === "total") {
      result.sort((a, b) => b.total - a.total);
    }

    return result;
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2 style={{ textAlign: "center" }}>QUẢN LÝ ĐƠN HÀNG</h2>

      {/* Controls */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", justifyContent: "center" }}>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ padding: "8px" }}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="All">Tất cả</option>
          <option value="Chờ xác nhận">Chờ xác nhận</option>
          <option value="Đang giao">Đang giao</option>
          <option value="Hoàn thành">Hoàn thành</option>
          <option value="Hủy">Hủy</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sắp xếp</option>
          <option value="date">Ngày đặt</option>
          <option value="total">Tổng tiền</option>
        </select>
      </div>

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#333", color: "white" }}>
            <th style={th}>Mã đơn</th>
            <th style={th}>Khách hàng</th>
            <th style={th}>Ngày</th>
            <th style={th}>Tổng tiền</th>
            <th style={th}>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {processedOrders().map(order => (
            <tr key={order.id}>
              <td style={td}>{order.id}</td>
              <td style={td}>{order.customer}</td>
              <td style={td}>{order.date}</td>
              <td style={td}>{order.total.toLocaleString()} VND</td>
              <td style={td}>
                <span
                  style={{
                    background: getStatusColor(order.status),
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    fontSize: "12px"
                  }}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th: React.CSSProperties = {
  padding: "10px",
  border: "1px solid #ddd"
};

const td: React.CSSProperties = {
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "center"
};