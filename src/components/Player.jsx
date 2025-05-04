import React, { useRef, useEffect, useState } from 'react';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';
import PlayerOptions from './PlayerOptions';
import songs from '../data/songs';

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [songIndex, setSongIndex] = useState(0);
  const [isLoop, setIsLoop] = useState(true);
  const [isShuffle, setIsShuffle] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateMetadata = () => setDuration(audio.duration);
    const updateTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadedmetadata', updateMetadata);
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleSongEnd);

    return () => {
      audio.removeEventListener('loadedmetadata', updateMetadata);
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleSongEnd);
    };
  }, [songIndex, isLoop, isShuffle]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const nextSong = () => {
    setSongIndex((prevIndex) => {
      if (isShuffle) {
        let next;
        do {
          next = Math.floor(Math.random() * songs.length);
        } while (next === prevIndex);
        return next;
      } else {
        return (prevIndex + 1) % songs.length;
      }
    });
    setIsPlaying(true);
  };

  const prevSong = () => {
    setSongIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
    setIsPlaying(true);
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

  const handleSongEnd = () => {
    if (isLoop) {
      
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else if (isShuffle || songIndex < songs.length - 1) {
      nextSong();
    } else {
      setIsPlaying(false);
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

      <audio ref={audioRef} src={songs[songIndex].src} autoPlay={isPlaying} />

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

      <PlayerOptions
        isLoop={isLoop}
        isShuffle={isShuffle}
        onToggleLoop={() => setIsLoop(!isLoop)}
        onToggleShuffle={() => setIsShuffle(!isShuffle)}
      />
    </div>
  );
};

export default Player;
