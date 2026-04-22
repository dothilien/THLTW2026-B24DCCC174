import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Detail() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>();

  useEffect(() => {
    fetch(`http://localhost:3000/api/posts/${slug}`)
      .then(res => res.json())
      .then(setPost);
  }, []);

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.views} views</p>

      <div dangerouslySetInnerHTML={{ __html: post.htmlContent }} />

      <a href="/">← Quay lại</a>
    </div>
  );
}