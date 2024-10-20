import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor = () => {
  const [content, setContent] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
       { 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }, { 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={[
          'header', 'font', 'size',
          'bold', 'italic', 'underline', 'strike',
          'color', 'background',
          'script',
          'blockquote', 'code-block',
          'list', 'bullet', 'indent',
          'direction', 'align',
          'link', 'image', 'video'
        ]}
        value={content}
        onChange={setContent}
        placeholder="Write something amazing..."
        className="bg-white rounded-lg shadow-md editor-container"
      />
      <style>{`
        .editor-container .ql-toolbar {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          border-color: #e5e7eb;
          background-color: #f3f4f6;
          font-family: 'Poppins', sans-serif;
          font-weight: 300;
          font-size: 16px;
          padding: 12px;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          flex-wrap: wrap;
        }
        .editor-container .ql-toolbar .ql-formats {
          display: flex;
          align-items: center;
          margin-right: 15px;
          margin-bottom: 5px;
        }
        .editor-container .ql-toolbar .ql-picker {
          font-weight: 350;
          font-size: 16px;
        }
        .editor-container .ql-toolbar .ql-picker-label {
          padding: 0 0 12px 0;
          margin: 0 0 0 10px;
        }
        .editor-container .ql-toolbar button {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 2px;
        }
        .editor-container .ql-toolbar button svg {
          width: 20px;
          height: 20px;
        }
        .editor-container .ql-toolbar .ql-stroke {
          stroke-width: 1.5px;
        }
        .editor-container .ql-container {
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          border-color: #e5e7eb;
          min-height: 10rem;
          font-family: 'Poppins', sans-serif;
          font-weight: 300;
          padding: 1rem;
        }
        .editor-container .ql-editor {
          font-size: 1rem;
          line-height: 1.5rem;
        }
      `}</style>
    </div>
  );
};

export default Editor;