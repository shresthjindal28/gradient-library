import React, { useEffect, useRef } from "react";
import styles from "./Loader.module.css";

interface LoaderProps {
  onEnd: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onEnd }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play();
      video.addEventListener("ended", onEnd);
      return () => {
        video.removeEventListener("ended", onEnd);
      };
    }
  }, [onEnd]);

  return (
    <div className={styles["loader-overlay"]}>
      <video
        ref={videoRef}
        src="/Loader.mp4"
        className={styles["loader-video"]}
        muted
        autoPlay
        playsInline
      />
    </div>
  );
};

export default Loader;
