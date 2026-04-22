import React, { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [debounce, setDebounce] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebounce(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/posts?page=${page}&search=${debounce}&tag=${tag}`)
      .then(res => res.json())
      .then(data => setPosts(data.posts));
  }, [page, debounce, tag]);

  return (
    <div>
      <input onChange={e => setSearch(e.target.value)} placeholder="Search..." />

      <div className="grid">
        {posts.map((p: any) => (
          <div key={p._id}>
            <img src={p.thumbnail} />
            <h2>{p.title}</h2>
            <p>{p.summary}</p>

            {p.tags.map((t: string) => (
              <button onClick={() => setTag(t)}>{t}</button>
            ))}

            <a href={`/detail/${p.slug}`}>Đọc tiếp</a>
          </div>
        ))}
      </div>
    </div>
  );
}