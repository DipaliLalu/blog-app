import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import './style.css'
const TextEditor = ({ value, onChange }) => {
  
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: [] }],
      [{ background: [] }],
      [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }]
    ],
  };

  const formats = [
    "header", 
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
    "color",
    "image",
     "color", "background",
     "align",
  ];

  return (
    <ReactQuill
      value={value}
      onChange={onChange} 
      modules={modules}
      formats={formats}
      placeholder="Start typing..."
      name="textEditor"
      theme="snow"
    />
  );
};

export default TextEditor;