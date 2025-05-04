import React from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';

const Controls = ({ isPlaying, onPlayToggle, onNext, onPrev }) => {
  return (
    <div className="flex space-x-6 my-4">
      {/* Previous Song Button */}
      <button
        className="text-3xl hover:text-[#E74C3C] dark:hover:text-[#F39C12]"
        onClick={onPrev}
      >
        <FaStepBackward />
      </button>

      {/* Play/Pause Button */}
      <button
        className="text-5xl hover:text-[#E74C3C] dark:hover:text-[#F39C12]"
        onClick={onPlayToggle}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>

      {/* Next Song Button */}
      <button
        className="text-3xl hover:text-[#E74C3C] dark:hover:text-[#F39C12]"
        onClick={onNext}
      >
        <FaStepForward />
      </button>
    </div>
  );
};

export default Controls;
