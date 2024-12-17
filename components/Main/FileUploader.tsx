'use client';
import { useState } from 'react';

const FileUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [fileType, setFileType] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Handle file validation and upload
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      uploadFile(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files[0];
    if (selectedFile && validateFile(selectedFile)) {
      uploadFile(selectedFile);
    }
  };

  const validateFile = (file: File): boolean => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
    ];
    if (!allowedTypes.includes(file.type)) {
      alert('Only PDF or DOCX/DOC files are allowed.');
      return false;
    }
    return true;
  };

  const uploadFile = (file: File) => {
    setFile(file);
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setTimeout(() => detectFileType(file), 500);
        }
        return prev + 10;
      });
    }, 300);
  };

  const detectFileType = (file: File) => {
    setIsDetecting(true);
    setTimeout(() => {
      const type = file.type.includes('pdf') ? 'PDF' : 'DOCX/DOC';
      setFileType(type);
      setIsDetecting(false);
      setShowModal(true);
    }, 1000); // Simulating detection delay
  };

  const handleConvert = () => {
    alert('Conversion started!'); // Replace with actual API call
    resetUploader();
  };

  const handleCancel = () => {
    resetUploader();
  };

  const resetUploader = () => {
    setFile(null);
    setFileType(null);
    setShowModal(false);
  };

  return (
    <div
      className='w-[700px] h-[200px] mx-auto flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg'
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
    >
      {!file && (
        <label
          htmlFor='fileInput'
          className='flex flex-col items-center justify-center text-gray-500 hover:text-blue-500 cursor-pointer text-center'
        >
          <p className='text-lg font-medium'>
            Click to upload file
            <br />
            <span className='text-sm'>Or drag and drop file here</span>
          </p>
          <input
            id='fileInput'
            type='file'
            className='hidden'
            onChange={handleFileSelect}
            accept='.pdf,.doc,.docx'
          />
        </label>
      )}

      {isUploading && (
        <div className='text-center w-full'>
          <p className='text-lg font-medium mb-4'>
            {file?.name} is uploading...
          </p>
          <div className='relative w-full h-4 bg-gray-200 rounded-lg'>
            <div
              className='absolute top-0 left-0 h-4 bg-blue-500 rounded-lg'
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {isDetecting && (
        <div className='text-center'>
          <p className='text-lg font-medium'>Detecting file type...</p>
          <div className='loader mt-4'></div>
        </div>
      )}

      {showModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white text-black rounded-lg p-6 text-center'>
            <p className='text-lg font-medium mb-4'>
              {fileType} detected! Do you want to convert it to{' '}
              {fileType === 'PDF' ? 'DOCX/DOC' : 'PDF'}?
            </p>
            <div className='flex justify-center space-x-4'>
              <button
                onClick={handleConvert}
                className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
              >
                Convert
              </button>
              <button
                onClick={handleCancel}
                className='px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
