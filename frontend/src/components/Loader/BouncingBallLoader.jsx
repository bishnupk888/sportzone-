import React from 'react';

const BouncingBallLoader = () => {
  return (
    <div className="loader-container flex top-0 bottom-0 items-center justify-center h-screen w-full z-1000 bg-opacity-50">
      <dotlottie-player
        src="https://lottie.host/ecbb939e-dc5d-4967-b070-67e39370877a/pm9FaFWo8U.json"
        background="transparent"
        speed="1"
        style={{ width: '20%', height: '20%' }}
        loop
        autoplay
      ></dotlottie-player>
    </div>
  );
};

export default BouncingBallLoader;
