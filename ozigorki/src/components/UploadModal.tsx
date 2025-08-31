'use client';

import { useState, useRef } from 'react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{name: string, url: string}>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    const uploadedFilesList: Array<{name: string, url: string}> = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Check file type
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        alert(`${file.name} is not a valid image or video file`);
        continue;
      }

      // Check file size (max 350MB)
      if (file.size > 350 * 1024 * 1024) {
        alert(`${file.name} is too large. Maximum size is 350MB`);
        continue;
      }

      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          uploadedFilesList.push({
            name: result.fileName,
            url: result.fileUrl || result.secure_url
          });
        } else {
          const errorData = await response.json();
          alert(`Failed to upload ${file.name}: ${errorData.error || 'Unknown error'}`);
        }

        // Update progress
        setUploadProgress(((i + 1) / files.length) * 100);

      } catch (error) {
        console.error('Upload error:', error);
        alert(`Error uploading ${file.name}`);
      }
    }

    setUploadedFiles(prev => [...prev, ...uploadedFilesList]);
    setIsUploading(false);
    setUploadProgress(0);
    
    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '30px',
          maxWidth: '500px',
          width: '90%',
          maxHeight: '80vh',
          overflow: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ marginBottom: '20px', textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
          Anılarını Paylaş
        </h2>

        {/* Upload Area */}
        <div 
          style={{
            border: '2px dashed #ccc',
            borderRadius: '10px',
            padding: '40px 20px',
            textAlign: 'center',
            marginBottom: '20px',
            cursor: 'pointer',
            transition: 'border-color 0.3s ease'
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.style.borderColor = '#007bff';
          }}
          onDragLeave={(e) => {
            e.currentTarget.style.borderColor = '#ccc';
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.currentTarget.style.borderColor = '#ccc';
            const files = e.dataTransfer.files;
            if (files.length > 0) {
              const input = fileInputRef.current;
              if (input) {
                input.files = files;
                handleFileSelect({ target: { files } } as React.ChangeEvent<HTMLInputElement>);
              }
            }
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>📸</div>
          <p style={{ marginBottom: '10px', fontSize: '16px', color: '#333', fontWeight: '500' }}>
            Fotoğraf veya video yüklemek için tıklayın
          </p>
          <p style={{ fontSize: '14px', color: '#555', fontWeight: '400' }}>
            veya dosyaları buraya sürükleyin
          </p>
                           <p style={{ fontSize: '12px', color: '#666', marginTop: '10px', fontWeight: '400' }}>
                   Maksimum dosya boyutu: 350MB
                 </p>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        {/* Upload Progress */}
        {isUploading && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ color: '#333', fontWeight: '500' }}>Yükleniyor...</span>
              <span style={{ color: '#333', fontWeight: '500' }}>{Math.round(uploadProgress)}%</span>
            </div>
            <div 
              style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
                overflow: 'hidden'
              }}
            >
              <div 
                style={{
                  width: `${uploadProgress}%`,
                  height: '100%',
                  backgroundColor: '#007bff',
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
          </div>
        )}

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ marginBottom: '10px', fontSize: '18px', color: '#333', fontWeight: 'bold' }}>Yüklenen Dosyalar:</h3>
            {uploadedFiles.map((file, index) => (
              <div 
                key={index}
                style={{
                  padding: '10px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '5px',
                  marginBottom: '5px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span style={{ fontSize: '14px', color: '#333', fontWeight: '500' }}>{file.name}</span>
                <a 
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#007bff',
                    textDecoration: 'none',
                    fontSize: '12px'
                  }}
                >
                  Görüntüle
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => (e.target as HTMLElement).style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => (e.target as HTMLElement).style.backgroundColor = '#007bff'}
        >
          Kapat
        </button>
      </div>
    </div>
  );
}
