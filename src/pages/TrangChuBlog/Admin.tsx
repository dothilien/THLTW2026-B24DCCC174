import { useEffect, useState } from "react";

export default function Admin() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/posts")
      .then(res => res.json())
      .then(data => setPosts(data.posts));
  }, []);

  const deletePost = (id: string) => {
    if (!window.confirm("Xóa thật không?")) return;

    fetch(`http://localhost:3000/api/posts/${id}`, {
      method: "DELETE"
    }).then(() => window.location.reload());
  };

  return (
    <div>
      <h2>Quản lý bài viết</h2>

      <table>
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Trạng thái</th>
            <th>Lượt xem</th>
            <th>Ngày</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((p: any) => (
            <tr key={p._id}>
              <td>{p.title}</td>
              <td>{p.status}</td>
              <td>{p.views}</td>
              <td>{new Date(p.createdAt).toLocaleDateString()}</td>

              <td>
                <button onClick={() => deletePost(p._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}