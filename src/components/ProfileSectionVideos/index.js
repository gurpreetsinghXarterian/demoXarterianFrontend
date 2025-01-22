import { useState, useRef } from "react";

export default function ProfileSectionVideos({ videos }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const popupVideoRef = useRef(null);
  const [isPopupPlaying, setIsPopupPlaying] = useState(false);

  const closePopup = () => {
    setSelectedVideo(null);
    setIsPopupPlaying(false);
    if (popupVideoRef.current) popupVideoRef.current.pause();
  };

  const togglePopupPlayPause = () => {
    if (popupVideoRef.current) {
      if (isPopupPlaying) {
        popupVideoRef.current.pause();
      } else {
        popupVideoRef.current.play();
      }
      setIsPopupPlaying(!isPopupPlaying);
    }
  };

  const handleGridVideoDoubleClick = (videoUrl) => {
    // Pause any currently playing video before opening the selected one
    setSelectedVideo(videoUrl);
  };

  return (
    <div>
      {videos && (
        <div className="grid grid-cols-3 gap-4">
          {videos.map((video, index) => (

            <VideoCard videoUrl={video.videoUrl} handleGridVideoDoubleClick={handleGridVideoDoubleClick} index={index} />

          ))}
        </div>
      )}

      {selectedVideo && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
          onClick={closePopup}
        >
          <div
            className="bg-white rounded-md overflow-hidden w-[400px] h-[95vh] flex items-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={popupVideoRef}
              src={selectedVideo}
              loop
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 cursor-pointer"
              onClick={togglePopupPlayPause}
            >
              <div
                className={`w-12 h-12 bg-white rounded-full flex justify-center items-center ${isPopupPlaying ? "" : "play-triangle"
                  }`}
              >
                {isPopupPlaying ? (
                  <div className="w-4 h-4 bg-black rounded-sm"></div>
                ) : (
                  <div className="w-0 h-0 border-l-8 border-t-4 border-b-4 border-solid border-transparent border-l-black"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function VideoCard({ videoUrl, index, handleGridVideoDoubleClick }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const pauseDoubleClick=()=>{
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      }
      setIsPlaying(false);
    }
  }

  return (
    <div
      key={index}
      className="relative w-full aspect-square bg-gray-200 rounded-md overflow-hidden"
      onDoubleClick={() => {pauseDoubleClick();handleGridVideoDoubleClick(videoUrl)}}
    >
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={videoUrl}
          loop
        />
        <div
          className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 cursor-pointer"
          onClick={togglePlayPause}
        >
          <div
            className={`w-12 h-12 bg-white rounded-full flex justify-center items-center ${isPlaying ? "" : "play-triangle"
              }`}
          >
            {isPlaying ? (
              <div className="w-4 h-4 bg-black rounded-sm"></div>
            ) : (
              <div className="w-0 h-0 border-l-8 border-t-4 border-b-4 border-solid border-transparent border-l-black"></div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
}
