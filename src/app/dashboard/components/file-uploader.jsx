"use client";
import { Input } from "@/components/ui/input";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function FileUpload({ value, onChange }) {
  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      onChange(base64); // Send base64 to parent
    };
    reader.readAsDataURL(file);
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles[0]) {
        const file = acceptedFiles[0];
        convertToBase64(file); // Convert before passing up
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div
      {...getRootProps({
        onDrop: (e) => {
          e.preventDefault();
          e.stopPropagation();
          onDrop(e.dataTransfer.files);
        },
      })}
      className="bg-transparent border-1 rounded-lg border-gray-200 focus:border-4 focus:border-gray-300 flex flex-col justify-center items-center p-5 cursor-pointer"
    >
      <Input {...getInputProps()} id="cover" name="fileupload" />
      {value ? (
        <img
          src={value}
          alt="Preview"
          className="w-full object-contain rounded-lg"
        />
      ) : (
        <div className="w-1/2 flex flex-col justify-center items-center">
          <img src="/icon.png" alt="Upload Icon" width={"130px"} />
          <h2 className="text-center text-gray-500">
            Drag and Drop or click here to upload image
          </h2>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
