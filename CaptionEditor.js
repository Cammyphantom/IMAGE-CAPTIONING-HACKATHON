import React from 'react';

const CaptionEditor = ({ caption, setCaption }) => {
  return (
    <div style={{ marginTop: '1.5rem' }}>
      <h3>Edit Caption:</h3>
      <textarea
        rows="4"
        cols="60"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
    </div>
  );
};

export default CaptionEditor;
