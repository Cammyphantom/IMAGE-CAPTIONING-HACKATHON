import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import CaptionEditor from './components/CaptionEditor';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false); // 👈 for copy feedback


  const handleImageUpload = (image) => {
    setSelectedImage(image);
    setCaption('');
  };

  const generateCaption = async () => {
    if (!selectedImage) return;
    setIsLoading(true);

    // 🔁 Mock caption instead of calling the backend
    setTimeout(() => {
      setCaption("A person standing in front of a sunset with a mountain in the background.");
      setIsLoading(false);
    }, 1000);
  };

  const resetAll = () => {
    setSelectedImage(null);
    setCaption('');
    setIsLoading(false);
  };

  const copyCaption = () => {
    if (!caption) return;
    navigator.clipboard.writeText(caption)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Hide after 2s
      })
      .catch(err => console.error("Failed to copy caption: ", err));
  };
  
  

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">

          {/* 🌗 Dark Mode Toggle */}
          <div className="flex justify-end">
  <button
    onClick={() => setDarkMode(!darkMode)}
    className={`w-16 h-8 flex items-center px-1 rounded-full transition-colors duration-300
      ${darkMode ? 'bg-yellow-200' : 'bg-gray-300'}`}
  >
    <div
      className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300
        ${darkMode ? 'translate-x-8' : 'translate-x-0'} ring-2 ring-offset-1`}
    >
      <span className="flex justify-center items-center h-full text-xs">
        {darkMode ? '☀️' : '🌙'}
      </span>
    </div>
  </button>
</div>


          {/* Title */}
          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
             Image Caption Tool 🛠️✨
          </h1>

          {/* Upload Form */}
          <UploadForm onUpload={handleImageUpload} onSubmit={generateCaption} />

          {/* Loader */}
          {isLoading && (
            <div className="flex justify-center">
              <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
          )}

          {/* Image Preview */}
          {selectedImage && (
            <div className="text-center space-y-2">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                className="max-w-xs mx-auto rounded-lg border border-gray-300 shadow"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>File:</strong> {selectedImage.name} &nbsp;|&nbsp;
                <strong>Size:</strong> {(selectedImage.size / 1024).toFixed(1)} KB
              </p>
            </div>
          )}

          {/* Caption Editor */}
          {caption && <CaptionEditor caption={caption} setCaption={setCaption} />}

          {caption && (
  <div className="flex justify-end">
    <button
      onClick={copyCaption}
      className="mt-2 px-4 py-2 bg-yellow-500 hover:bg-green-600 text-white rounded-lg shadow transition duration-200"
    >
      📋 Copy Caption
    </button>
    {copySuccess && (
  <p className="text-green-600 dark:text-green-400 text-sm mt-1 text-right animate-fade">
    ✅ Copied to clipboard!
  </p>
)}
  </div>
)}


        

          {/* Reset Button */}
          {(selectedImage || caption) && (
            <div className="flex justify-center">
              <button
                onClick={resetAll}
                className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
