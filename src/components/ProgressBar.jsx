import React from 'react';

const ProgressBar = ({ currentTime, duration, onChange }) => {
  const handleClick = (e) => {
    const progressBar = e.target;
    const clickPosition = e.nativeEvent.offsetX;
    const progressBarWidth = progressBar.offsetWidth;
    const newTime = (clickPosition / progressBarWidth) * duration; 
    onChange(newTime); 
  };

  return (
    <div
      className="w-full h-2 bg-gray-400 rounded-lg cursor-pointer"
      onClick={handleClick}
      style={{ position: 'relative' }}
    >
      <div
        className="h-full bg-[#E74C3C] rounded-lg"
        style={{ width: `${(currentTime / duration) * 100}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
