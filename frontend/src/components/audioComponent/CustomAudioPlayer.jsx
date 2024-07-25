import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const CustomAudioPlayer = ({ src }) => {
  return (
    <div className="custom-audio-player-container">
      <AudioPlayer
        src={src}
        onError={(e) => console.error('Error loading audio file:', e)}
        customAdditionalControls={[]} 
        customVolumeControls={[]} 
        showJumpControls={false} 
      />
      <style >{`
        .custom-audio-player-container {
          position: relative;
          margin-bottom: 10px;
          border-radius: 12px;
          overflow: hidden;
          background-color: #333333; /* Dark background color for the player */
          box-shadow: 0 4px 8px rgba(0,0,0,0.4); /* Darker shadow for more depth */
        }

        .custom-audio-player-container .rhap_container {
          border-radius: 12px; /* Rounded corners */
          background-color: #1e1e1e; /* Dark grey background for the controls */
          color: #ffffff; /* White text color for controls */
        }

        .custom-audio-player-container .rhap_progress-bar {
          background-color: #ff5722; /* Bright color for the progress bar */
        }

        .custom-audio-player-container .rhap_play-pause {
          color: #ff5722; /* Bright color for the play/pause button */
        }

        .custom-audio-player-container .rhap_time {
          color: #ffffff; /* White color for the time text */
        }

        .custom-audio-player-container .rhap_volume-control {
          color: #ff5722; /* Color for volume control (if visible) */
        }
      `}</style>
    </div>
  );
};

export default CustomAudioPlayer;