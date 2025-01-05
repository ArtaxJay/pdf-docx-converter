import React, { useRef } from 'react';

interface FileDropAreaProps {
  onFileSelect: (file: File) => void;
}

export const FileDropArea: React.FC<FileDropAreaProps> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onFileSelect(event.target.files[0]); // Pass the selected file to the parent
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Trigger the file input dialog
  };

  return (
    <div
      className='w-full h-full flex flex-col items-center justify-center'
      onDragOver={e => e.preventDefault()}
      onDrop={e => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          onFileSelect(e.dataTransfer.files[0]); // Handle drag-and-drop
        }
      }}
    >
      <button
        onClick={handleButtonClick}
        className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
      >
        Click to Upload
      </button>
      <p className='text-sm text-gray-600 mt-2'>or drag and drop a file here</p>
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }} // Hide the file input
      />
    </div>
  );
};
