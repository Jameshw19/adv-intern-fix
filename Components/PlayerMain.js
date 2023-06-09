import Replay10Icon from "@mui/icons-material/Replay10";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Forward10Icon from "@mui/icons-material/Forward10";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { useCallback, useEffect, useRef, useState } from "react";

const PlayerMain = ({ bookData }) => {
  // console.log(bookData);
  //...AUDIO PLAYER STATES
  const tracks = [bookData.audioLink];

  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  //... CONTROLS STATES
  const [isPlaying, setIsPlaying] = useState(false);
  //.......
  //References
  // const audioRef = useRef();
  const audioRef = useRef(null);
  const progressBarRef = useRef();
  const playAnimationRef = useRef();

  //...PROGRESSBAR

  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return timeProgress <= 0 || timeProgress === undefined
      ? "00:00"
      : "loading...";
  };

  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  ///...AUDIOPLAYER
  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };

  ///...CONTROLS
  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  const skipForward = () => {
    audioRef.current.currentTime += 15;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 15;
  };

  return (
    <>
      <audio
        src={bookData.audioLink}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
        onChange={(e) => {
          setTimeProgress(e.target.value);
          progressBarRef.current.style.setProperty(
            "--range-progress",
            `${(e.target.value / duration) * 100}%`
          );
          audioRef.current.currentTime = e.target.value;
        }}
      />

      <div className="relative w-full overflow-y-auto h-[calc(100vh-160px)] max-md:h-[calc(100vh-260px)] ">
        <div className="p-6 max-w-[800px] text-base m-auto whitespace-pre-line">
          <div className="text-[#032b41] text-2xl border-b-[1px] mb-8 pb-4 leading-normal max-md:text-xl">
            <b>{bookData.title}</b>
          </div>
          <div className="leading-[1.4] text-[#032b41] whitespace-pre-line max-md:text-sm">
            {bookData.summary}
          </div>
        </div>
        <div
          className="w-full h-20 mt-auto flex items-center justify-between bg-[#042330] px-10 fixed bottom-0 left-0 z-[9999]
        max-md:h-[180px] max-md:py-4 max-md:px-6 max-md:flex-col
        "
        >
          <div className="w-[calc(100%/3)] flex gap-3 max-md:w-full max-md:justify-center">
            <div className="flex max-w-[48px] max-md:max-w-[80px] ">
              <div className="h-12 w-12 min-w-[48px]  ">
                <img
                  className="w-full h-full"
                  src={bookData.imageLink}
                  alt=""
                />
              </div>
            </div>
            <div className="text-white text-sm flex flex-col gap-1 justify-center">
              <div>{bookData.title}</div>
              <div className="text-[#bac8ce]">{bookData.author}</div>
            </div>
          </div>
          <div className="w-[calc(100%/3)] max-md:w-full ">
            <div className="flex items-center justify-center gap-5">
              <button
                onClick={skipBackward}
                className="rounded-[50%] cursor-pointer flex items-center justify-center active:transform active:translate-y-[1px]"
              >
                <Replay10Icon className="h-7 w-7 stroke-white border-nonev bg-transparent" />
              </button>
              {isPlaying ? (
                <button
                  onClick={togglePlayPause}
                  className="bg-white w-10 h-10 rounded-[50%] cursor-pointer active:transform active:translate-y-[1px]"
                >
                  <PauseCircleIcon className="text-[#032b41] w-10 h-10 stroke-white " />
                </button>
              ) : (
                <button
                  onClick={togglePlayPause}
                  className="bg-white w-10 h-10 rounded-[50%] cursor-pointer active:transform active:translate-y-[1px] "
                >
                  <PlayCircleIcon className="text-[#032b41] w-10 h-10 stroke-white " />
                </button>
              )}
              <button
                onClick={skipForward}
                className="rounded-[50%] cursor-pointer flex items-center justify-center active:transform active:translate-y-[1px]"
              >
                <Forward10Icon className="h-7 w-7 stroke-white border-nonev bg-transparent" />
              </button>
            </div>
          </div>
          <div className="w-[calc(100%/3)] flex items-center gap-4 max-md:w-full max-md:justify-center">
            <span className="text-white text-sm">
              {formatTime(timeProgress)}
            </span>
            <input
              type="range"
              min={0}
              max={duration}
              value={timeProgress}
              ref={progressBarRef}
              onChange={handleProgressChange}
              className="rounded-lg h-1 max-w-[300px] w-full cursor-pointer outline-none bg-gradient-to-r from-green-400 
            to-green-700  "
            ></input>
            <span className="text-white text-sm">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerMain;
