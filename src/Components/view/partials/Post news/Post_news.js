import React, { useState } from 'react';
import './Post_new.css';

export default function PostNews() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic gửi dữ liệu ở đây
    console.log('Title:', title);
    console.log('Content:', content);
    console.log('Image:', image);
  };

  return (
    <div className="container">
      <h1>Đăng Tin</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tiêu đề:</label>
          <input type="text" value={title} onChange={handleTitleChange} required />
        </div>
        <div>
          <label>Nội dung:</label>
          <textarea value={content} onChange={handleContentChange} required />
        </div>
        <div>
          <label>Hình ảnh:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} required />
        </div>
        <button type="submit">Đăng tin</button>
      </form>
    </div>
  );
}
