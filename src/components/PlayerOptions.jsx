import React from 'react';

const PlayerOptions = ({ isLoop, isShuffle, onToggleLoop, onToggleShuffle }) => {
  return (
    <div className="flex gap-4 mt-6 text-sm text-gray-200">
      <button
        onClick={onToggleLoop}
        className={`px-3 py-1 rounded-lg ${isLoop ? 'bg-[#E74C3C]' : 'bg-gray-600'}`}
      >
        {isLoop ? 'Loop: On' : 'Loop: Off'}
      </button>
      <button
        onClick={onToggleShuffle}
        className={`px-3 py-1 rounded-lg ${isShuffle ? 'bg-[#E74C3C]' : 'bg-gray-600'}`}
      >
        {isShuffle ? 'Shuffle: On' : 'Shuffle: Off'}
      </button>
    </div>
  );
};

export default PlayerOptions;
