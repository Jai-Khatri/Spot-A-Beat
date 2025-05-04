import React, { useRef, useEffect, useState } from 'react';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';
import songs from '../data/songs';

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [songIndex, setSongIndex] = useState(0);
  const audioRef = useRef(null);

  <img
  src={songs[songIndex].cover}
  alt="Album Cover"
  className={`w-48 h-48 rounded-lg shadow-lg mb-6 transition-transform duration-500 ${
    isPlaying ? 'animate-beat' : ''
  }`}
  />

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateMetadata = () => setDuration(audio.duration);
    const updateTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadedmetadata', updateMetadata);
    audio.addEventListener('timeupdate', updateTime);

    return () => {
      audio.removeEventListener('loadedmetadata', updateMetadata);
      audio.removeEventListener('timeupdate', updateTime);
    };
  }, [songIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    isPlaying ? audio.pause() : audio.play();
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const nextSong = () => {
    const nextIndex = (songIndex + 1) % songs.length;
    setSongIndex(nextIndex);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }, 0);
  };
  
  
  const prevSong = () => {
    setIsPlaying(false); 
    setSongIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; 
    }
  };

  const handleSeek = (val) => {
    audioRef.current.currentTime = val;
    setCurrentTime(val);
  };

  const handleVolume = (volume) => {
    if (audioRef.current) {
      audioRef.current.volume = volume; 
    }
  };
  

  return (
    <div className="w-full max-w-lg bg-[#2C3E50] dark:bg-[#111827] text-white dark:text-gray-200 p-8 rounded-xl shadow-2xl flex flex-col items-center">

      <div className="text-xl font-semibold mb-2 text-center">
        Now Playing:
      </div>
      <div className="text-center mb-4 text-lg font-medium">{songs[songIndex].title}</div>

      <img
        src={songs[songIndex].cover}
        alt="Album Cover"
        className={`w-52 h-52 rounded-lg shadow-lg mb-6 object-cover transition-transform duration-300 ${
          isPlaying ? 'animate-pulse scale-105' : 'scale-100'
        }`}
      />

      <audio ref={audioRef} src={songs[songIndex].src} />

      <Controls
        isPlaying={isPlaying}
        onPlayToggle={togglePlay}
        onNext={nextSong}
        onPrev={prevSong}
      />

      <ProgressBar
        currentTime={currentTime}
        duration={duration}
        onChange={handleSeek}
      />

      <div className="flex justify-between w-full text-sm text-gray-300 mt-2 px-1">
        <span>{formatTime(currentTime)}</span>
        <span>-{formatTime(duration - currentTime)}</span>
      </div>

      <VolumeControl onVolumeChange={handleVolume} />
    </div>
  );
};

export default Player;
