import { useEffect, useState } from "react";

const useFormattedAudioLength = (audioLink) => {
  const [formattedAudioLength, setFormattedAudioLength] = useState("00:00");

  useEffect(() => {
    if (audioLink) {
      const audio = new Audio(audioLink);

      const handleLoadedMetadata = () => {
        const audioDuration = audio.duration;
        const minutes = Math.floor(audioDuration / 60);
        const seconds = Math.floor(audioDuration % 60);
        const formattedLength = `${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        setFormattedAudioLength(formattedLength);
      };

      audio.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, [audioLink]);

  return formattedAudioLength;
};

export default useFormattedAudioLength;
