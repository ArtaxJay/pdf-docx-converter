'use client';
import React from 'react';

interface ProgressBarProps {
  progress: number;
  fileName: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  fileName,
}) => {
  return (
    <div className='text-center w-full'>
      <p className='text-lg font-medium mb-4'>{fileName} is uploading...</p>
      <div className='relative w-full h-4 bg-gray-200 rounded-lg'>
        <div
          className='absolute top-0 left-0 h-4 bg-blue-500 rounded-lg'
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};
