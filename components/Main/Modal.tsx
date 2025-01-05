'use client';
import React from 'react';

interface ModalProps {
  fileType: string | null;
  handleConvert: () => void;
  handleCancel: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  fileType,
  handleConvert,
  handleCancel,
}) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white text-black rounded-lg p-6 text-center'>
        <p className='text-lg font-medium mb-4'>
          {`The uploaded file is of type: ${fileType}.`}
          <br />
          Do you want to proceed with the conversion?
        </p>
        <div className='flex justify-center space-x-4'>
          <button
            className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600'
            onClick={handleConvert}
          >
            Convert
          </button>
          <button
            className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600'
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
