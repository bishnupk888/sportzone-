import React, { useRef, useEffect } from 'react';

const UploadWidget = ({ onUpload, loading, setLoading }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const uploadPreset= import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

  useEffect(() => {
    if (window.cloudinary) {
      cloudinaryRef.current = window.cloudinary;

      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName:cloudName ,
          uploadPreset: uploadPreset, 
        },
        (error, result) => {
          if (error) {
            console.error('Upload error:', error);
            setLoading(false)
            return;
          }
          if (result.event === 'success') {
            const imageUrl = result.info.secure_url;
            onUpload(imageUrl);
          }else if (result.event === 'close') {
            setLoading(false);
          }
        }
      );
    } else {
      console.error('Cloudinary script is not loaded');
      setLoading(false)
    }
  }, [onUpload]);

  return (
    <>
      <button
        onClick={() =>{
          setLoading(true)
          widgetRef.current.open()
        }}
        type="button"
        className="rounded-md bg-transparent px-2.5 py-1.5 text-sm font-semibold text-textColor shadow-sm ring-1 ring-inset ring-redBorder hover:bg-redBorder mx-2 hover:scale-110"
      >
        Upload
      </button>
    </>
  );
};

export default UploadWidget;
