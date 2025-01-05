interface UploadFileResponse {
  success: boolean; // Ensures consistent response structure
  message: string;
  uploadedFileName: string;
}

interface ConversionResponse {
  success: boolean; // Ensures consistent response structure
  message: string;
  downloadUrl?: string; // Optional, as conversion might fail
}

// Upload file to server with progress tracking
export const uploadFileToServer = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<UploadFileResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const xhr = new XMLHttpRequest();

  return new Promise<UploadFileResponse>((resolve, reject) => {
    xhr.open(
      'POST',
      `${
        process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'
      }/upload`,
      true
    );

    if (onProgress) {
      xhr.upload.onprogress = (event: ProgressEvent) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded * 100) / event.total);
          onProgress(progress); // Call the progress callback
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const response = JSON.parse(xhr.response) as UploadFileResponse;
        if (response.success) {
          resolve(response);
        } else {
          reject(new Error(response.message));
        }
      } else {
        reject(new Error(xhr.statusText));
      }
    };

    xhr.onerror = () => reject(new Error('Upload failed.'));
    xhr.send(formData);
  });
};

// Convert uploaded file on the server
export const convertFileOnServer = async (
  uploadedFileName: string
): Promise<ConversionResponse> => {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'
    }/convert`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName: uploadedFileName }),
    }
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Conversion failed.');
  }

  const responseData = (await response.json()) as ConversionResponse;
  if (responseData.success) {
    return responseData;
  }

  throw new Error(responseData.message || 'Conversion failed.');
};
