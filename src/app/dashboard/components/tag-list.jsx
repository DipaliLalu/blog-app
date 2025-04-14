import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useController } from "react-hook-form";

function TagList({ control, name }) {
  const {
    field: { value = [], onChange },
  } = useController({ name, control });

  const [currentTag, setCurrentTag] = useState("");

  const addTag = (e) => {
    if (e.key === "Enter" && currentTag.trim() !== "") {
      e.preventDefault();
      if (!value.includes(currentTag.trim())) {
        onChange([...value, currentTag.trim()]);
        setCurrentTag("");
      }
    }
  };

  const removeTag = (index) => {
    const newTags = value.filter((_, i) => i !== index);
    onChange(newTags);
  };

  return (
    <div className="bg-transparent rounded-lg flex flex-wrap items-center gap-1">
     
      <Input
        id="tag-input"
        autoComplete="off"
        type="text"
       className="focus-visible:outline-none"
        placeholder="Enter a tag..."
        value={currentTag}
        onChange={(e) => setCurrentTag(e.target.value)}
        onKeyDown={addTag}
      />
       {value.map((tag, index) => (
        <div
          key={index}
          className="bg-blue-600 text-white px-3 py-1 rounded-lg flex items-center gap-2 mt-2 flex-wrap"
        >
          {tag}
          <button
            type="button"
            className="text-red-400 font-bold"
            onClick={() => removeTag(index)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export default TagList;
