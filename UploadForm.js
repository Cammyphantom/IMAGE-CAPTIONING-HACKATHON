import React from 'react';

const UploadForm = ({ onUpload, onSubmit }) => {
    const handleChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        onUpload(e.target.files[0]);
      }
    };
  
    return (
      <div className="flex items-center justify-between gap-4 w-full">
        {/* File Upload (left) */}
        <div className="flex items-center">
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg shadow transition duration-200"
          >
            Choose File
          </label>
        </div>
  
        {/* Generate Caption (right) */}
        <button
          onClick={onSubmit}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition duration-200"
        >
          Generate Caption
        </button>
      </div>
    );
  };
  
  export default UploadForm;
  