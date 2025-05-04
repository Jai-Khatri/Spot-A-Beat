import React from 'react';
import { FaVolumeUp } from 'react-icons/fa';

const VolumeControl = ({ onVolumeChange }) => {
  const handleVolumeChange = (e) => {
    const volume = e.target.value / 100;
    onVolumeChange(volume);
  };

  return (
    <div className="flex items-center mt-6 space-x-3">
      <FaVolumeUp />
      <input
        type="range"
        min="0"
        max="100"
        defaultValue="50"
        className="w-32 accent-[#E74C3C] dark:accent-[#F39C12]"
        onChange={handleVolumeChange}
      />
    </div>
  );
};

export default VolumeControl;
