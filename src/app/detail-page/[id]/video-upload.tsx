import React, { useState } from 'react';

export default function VideoUpload({ playerId }: { playerId: string }) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0); // Progress state

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const file = event.target.files?.[0];
    if (file) {
      formData.append('file', file);

      setLoading(true);
      setError(null);
      setUploadProgress(0); // Reset progress bar

      // Create a new XMLHttpRequest to handle the file upload
      const xhr = new XMLHttpRequest();

      xhr.open('POST', `/api/upload-video/${playerId}`, true);

      // Monitor upload progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = (event.loaded / event.total) * 100;
          setUploadProgress(Math.round(percent));
        }
      };

      // Handle when the upload is complete
      xhr.onload = async () => {
        if (xhr.status === 200) {
          const result = JSON.parse(xhr.responseText);
          console.log('Server Response:', result); // Debugging line
          setVideoUrl(result.videoUrl); // Set the video URL from the server response
        } else {
          setError('Failed to upload video');
        }
        setLoading(false);
      };

      // Handle error during upload
      xhr.onerror = () => {
        setError('An error occurred during upload');
        setLoading(false);
      };

      // Send the form data
      xhr.send(formData);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <h3>Upload Video</h3>
      <input type="file" onChange={handleFileUpload} accept="video/*" />
      
      {loading && <p>Uploading... {uploadProgress}%</p>}
      
      {uploadProgress > 0 && uploadProgress < 100 && (
        <div style={{ width: '100%', backgroundColor: '#f3f3f3', borderRadius: '5px' }}>
          <div
            style={{
              width: `${uploadProgress}%`,
              height: '10px',
              backgroundColor: '#4caf50',
              borderRadius: '5px',
            }}
          />
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {videoUrl && (
        <div>
          <video width={200} controls>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}
