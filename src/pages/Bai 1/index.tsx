import { useState } from "react";

export default function Home() {
  const [clubs, setClubs] = useState<any[]>([]);
  const [apps, setApps] = useState<any[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  const [clubName, setClubName] = useState("");
  const [leader, setLeader] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [clubId, setClubId] = useState("");

  // ===== CLB =====
  const addClub = () => {
    if (!clubName) return alert("Nhập tên CLB");
    setClubs([...clubs, { id: Date.now(), name: clubName, leader }]);
    setClubName("");
    setLeader("");
  };

  const deleteClub = (id: number) => {
    setClubs(clubs.filter((c) => c.id !== id));
  };

  // ===== ĐƠN =====
  const addApp = () => {
    if (!name || !email || !clubId) return alert("Thiếu dữ liệu");

    setApps([
      ...apps,
      {
        id: Date.now(),
        name,
        email,
        clubId,
        status: "pending",
        history: [],
      },
    ]);

    setName("");
    setEmail("");
  };

  const approve = (id: number) => {
    setApps(
      apps.map((a) =>
        a.id === id
          ? {
              ...a,
              status: "approved",
              history: [...a.history, "Approved: " + new Date().toLocaleString()],
            }
          : a
      )
    );
  };

  const reject = (id: number) => {
    const reason = prompt("Lý do từ chối?");
    if (!reason) return;

    setApps(
      apps.map((a) =>
        a.id === id
          ? {
              ...a,
              status: "rejected",
              history: [
                ...a.history,
                "Rejected: " + reason + " - " + new Date().toLocaleString(),
              ],
            }
          : a
      )
    );
  };

  // ===== SELECT MANY =====
  const toggle = (id: number) => {
    setSelected(
      selected.includes(id)
        ? selected.filter((x) => x !== id)
        : [...selected, id]
    );
  };

  const approveMany = () => {
    selected.forEach((id) => approve(id));
    setSelected([]);
  };

  // ===== HELPER =====
  const getClub = (id: any) => {
    const c = clubs.find((x) => x.id == id);
    return c ? c.name : "";
  };

  // ===== STATS =====
  const pending = apps.filter((a) => a.status === "pending").length;
  const approved = apps.filter((a) => a.status === "approved").length;
  const rejected = apps.filter((a) => a.status === "rejected").length;

  return (
    <div style={{ padding: 20, background: "#f4f6ff", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center" }}>🎓 Quản lý CLB</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        
        {/* CLB */}
        <div style={box}>
          <h2>CLB</h2>
          <input placeholder="Tên CLB" value={clubName} onChange={(e)=>setClubName(e.target.value)} />
          <input placeholder="Chủ nhiệm" value={leader} onChange={(e)=>setLeader(e.target.value)} />
          <button onClick={addClub}>Thêm</button>

          {clubs.map((c) => (
            <div key={c.id} style={card}>
              <b>{c.name}</b> - {c.leader}
              <button onClick={()=>deleteClub(c.id)}>Xóa</button>
            </div>
          ))}
        </div>

        {/* ĐƠN */}
        <div style={box}>
          <h2>Đơn đăng ký</h2>
          <input placeholder="Tên" value={name} onChange={(e)=>setName(e.target.value)} />
          <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />

          <select value={clubId} onChange={(e)=>setClubId(e.target.value)}>
            <option value="">Chọn CLB</option>
            {clubs.map((c)=>(
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <button onClick={addApp}>Gửi đơn</button>
          <button onClick={approveMany}>Duyệt nhiều</button>

          {apps.map((a) => (
            <div key={a.id} style={card}>
              <input type="checkbox" onChange={()=>toggle(a.id)} />
              <b>{a.name}</b> - {a.email} <br/>
              {getClub(a.clubId)} - 
              <span style={{color: a.status==="approved"?"green":a.status==="rejected"?"red":"orange"}}>
                {a.status}
              </span>
              <br/>
              <button onClick={()=>approve(a.id)}>✔</button>
              <button onClick={()=>reject(a.id)}>✖</button>
            </div>
          ))}
        </div>

        {/* THÀNH VIÊN */}
        <div style={box}>
          <h2>Thành viên</h2>
          {apps.filter(a=>a.status==="approved").map(m=>(
            <div key={m.id} style={card}>
              {m.name} - {m.email} ({getClub(m.clubId)})
            </div>
          ))}
        </div>

        {/* STATS */}
        <div style={box}>
          <h2>Thống kê</h2>
          <p>CLB: {clubs.length}</p>
          <p>Pending: {pending}</p>
          <p>Approved: {approved}</p>
          <p>Rejected: {rejected}</p>
        </div>

      </div>
    </div>
  );
}

// STYLE
const box = {
  background: "white",
  padding: 15,
  borderRadius: 10,
};

const card = {
  background: "#eee",
  marginTop: 10,
  padding: 10,
  borderRadius: 8,
};