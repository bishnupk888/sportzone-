import React, { useRef, useEffect } from 'react';

const UploadWidget = ({ onUpload }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    console.log('Setting up Cloudinary widget');
    if (window.cloudinary) {
      cloudinaryRef.current = window.cloudinary;

      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: 'sportzone-sportsapp',
          uploadPreset: 'es4pdmbw',
        },
        (error, result) => {
          if (error) {
            console.error('Upload error:', error);
            return;
          }
          if (result.event === 'success') {
            const imageUrl = result.info.secure_url;
            onUpload(imageUrl);
            console.log('Uploaded image URL:', imageUrl);
          }
        }
      );
    } else {
      console.error('Cloudinary script is not loaded');
    }
  }, [onUpload]);

  return (
    <>
      <button
        onClick={() => widgetRef.current.open()}
        type="button"
        className="rounded-md bg-transparent px-2.5 py-1.5 text-sm font-semibold text-textColor shadow-sm ring-1 ring-inset ring-redBorder hover:bg-redBorder mx-2 hover:scale-110"
      >
        Change
      </button>
    </>
  );
};

export default UploadWidget;
