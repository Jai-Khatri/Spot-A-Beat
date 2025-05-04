import React from 'react';

const ProgressBar = ({ currentTime, duration, onChange }) => {
  return (
    <div className="w-full mt-4">
      <input
        type="range"
        min="0"
        max={duration || 100}
        value={currentTime}
        onChange={onChange}
        className="w-full accent-[#E74C3C] dark:accent-[#F39C12]"
      />
    </div>
  );
};

export default ProgressBar;
