// import { useState, useEffect, useRef } from "react";

// function PlayerProgressBar({
//   bookData,
//   audioRef,
// }) {
//   const [audio, setAudio] = useState(null);
//   const [timeProgress, setTimeProgress] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const progressBarRef = useRef(null);

//   useEffect(() => {
//     if (bookData && bookData.audioLink) {
//       const audioEl = new Audio(bookData.audioLink);
//       audioEl.addEventListener("loadedmetadata", () => {
//         setDuration(audioEl.duration);
//       });
//       setAudio(audioEl);
//       return () => {
//         audioEl.pause();
//         audioEl.currentTime = 0;
//         setAudio(null);
//       };
//     }
//   }, [bookData]);

//   const handleProgressChange = () => {
//     const progress = progressBarRef.current.value / 100;
//     audio.currentTime = duration * progress;
//     setTimeProgress(duration * progress);
//   };

//   const formatTime = (time) => {
//     // Format time in MM:SS format
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };

//   return (
//     <div className="w-[calc(100%/3)] flex items-center gap-4">
//       <div className="text-white text-sm">{formatTime(timeProgress)}</div>
//       <input
//         type="range"
//         ref={progressBarRef}
//         defaultValue={0}
//         onChange={handleProgressChange}
//         className="rounded-lg h-1 max-w-[300px] w-full cursor-pointer outline-none bg-gradient-to-r from-green-400
//           to-green-700  "
//       ></input>
//       <div className="text-white text-sm">{formatTime(duration)}</div>
//     </div>
//   );
// }
// export default PlayerProgressBar;
