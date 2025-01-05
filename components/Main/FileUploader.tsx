'use client';
import { useState } from 'react';
import { FileDropArea } from './FileDropArea'; // Handles file selection and drag/drop
import { ProgressBar } from './ProgressBar'; // Displays upload progress
import { Modal } from './Modal'; // Confirmation modal for conversion
import { uploadFileToServer, convertFileOnServer } from '@/utils/api'; // API call helpers

const FileUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [fileType, setFileType] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [convertedFileUrl, setConvertedFileUrl] = useState<string | null>(null);

  const handleFileUpload = async (selectedFile: File) => {
    setFile(selectedFile);
    setIsUploading(true);

    try {
      const response = await uploadFileToServer(
        selectedFile,
        setUploadProgress
      );
      if (response.success) {
        const type = selectedFile.type.includes('pdf') ? 'PDF' : 'DOCX/DOC';
        setFileType(type);
        setShowModal(true);
      } else {
        alert(`Upload failed: ${response.message}`);
      }
    } catch (error) {
      alert(`Error during upload: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    try {
      const response = await convertFileOnServer(file);
      if (response.success && response.downloadUrl) {
        setConvertedFileUrl(response.downloadUrl);
        setShowModal(false);
      } else {
        alert(`Conversion failed: ${response.message}`);
      }
    } catch (error) {
      alert(`Error during conversion: ${error.message}`);
    }
  };

  const handleCancel = () => {
    alert('Conversion cancelled successfully.');
    resetUploader();
  };

  const resetUploader = () => {
    setFile(null);
    setFileType(null);
    setShowModal(false);
    setConvertedFileUrl(null);
  };

  return (
    <div className='w-[700px] h-[200px] mx-auto flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg'>
      {!file && <FileDropArea onFileSelect={handleFileUpload} />}

      {isUploading && (
        <ProgressBar
          progress={uploadProgress}
          fileName={file?.name || ''}
        />
      )}

      {showModal && (
        <Modal
          fileType={fileType}
          handleConvert={handleConvert}
          handleCancel={handleCancel}
        />
      )}

      {convertedFileUrl && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white text-black rounded-lg p-6 text-center'>
            <p className='text-lg font-medium mb-4'>
              File converted successfully! Click below to download.
            </p>
            <a
              href={convertedFileUrl}
              download
              className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600'
            >
              Download File
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
