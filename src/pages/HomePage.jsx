// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Gaya default untuk editor

const HomePage = () => {
  const [richText, setRichText] = useState('');
  const [plainText, setPlainText] = useState('');

  const handleChange = (value) => {
    setRichText(value);
    setPlainText(value.replace(/<[^>]*>/g, ''));

    console.log(richText);
  };

  return (
    <div className='container--wrap'>
      <ReactQuill
        value={richText}
        onChange={handleChange}
        placeholder="Mulai menulis di sini..."
      />
      <div>
        <strong>Rich Text:</strong>
        <div dangerouslySetInnerHTML={{ __html: richText }} />
      </div>
      <div>
        <strong>Plain Text:</strong> {plainText}
      </div>
    </div>
  );
};

export default HomePage;
