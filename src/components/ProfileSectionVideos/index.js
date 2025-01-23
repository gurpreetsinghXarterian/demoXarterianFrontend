import { selectUser } from "@/store/selectors/userSelectors";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toaster from "@/components/CustomComponent/Toaster";
import { DeletePost } from "@/store/slice/postsSlice";
import { saveAs } from 'file-saver';

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

            <VideoCard videoUrl={video.videoUrl} handleGridVideoDoubleClick={handleGridVideoDoubleClick} index={index} post={video} />

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

function VideoCard({ videoUrl, index, handleGridVideoDoubleClick, post }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const userDetails = useSelector(selectUser);
  const dispatch = useDispatch();

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

  const pauseDoubleClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      }
      setIsPlaying(false);
    }
  }

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const downloadFile = (fileUrl) => {
    saveAs(fileUrl);
  };


  const handleDeletePost= async (postId) => {
    try {
        const response = await dispatch(DeletePost(postId)); //.unwrap() // for unwrap data 
        if (DeletePost.fulfilled.match(response) && response.payload.status == "success") {
          Toaster({
            type: "success",
            text: response.payload.message || "Post deleted Successfully",
          });
        }
        else {
            Toaster({
                type: "error",
                text: response.payload.message || "An error occurred. Please try again later.",
            });
        }
    } catch (error) {
        Toaster({
            type: "error",
            text: error || "An error occurred. Please try again later.",
        });
    }
}

  return (
    <div
      key={index}
      className="relative w-full aspect-square bg-gray-200 rounded-md overflow-hidden"
      onDoubleClick={() => { pauseDoubleClick(); handleGridVideoDoubleClick(videoUrl) }}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="relative w-full h-full group">
       
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
        <div
          className="absolute top-2 right-2 h-7 w-7 group-hover:flex hidden flex-col justify-center gap-1 items-center cursor-pointer rounded-[100%] bg-black bg-opacity-50"
          onClick={(e) => { e.stopPropagation(); toggleMenu(e);}}
        >
          <div
            className={` w-3 border-b transition-transform duration-300 ${isOpen ? 'rotate-45 absolute' : ''
              }`}
          ></div>
          <div
            className={` w-3 border-b transition-all duration-300 ${isOpen ? 'opacity-0' : ''
              }`}
          ></div>
          <div
            className={` w-3 border-b transition-transform duration-300 ${isOpen ? '-rotate-45 absolute' : ''
              }`}
          ></div>
        </div>

        {isOpen && (
          <div
            className="absolute top-2 right-2 group-hover:flex flex-col hidden w-[120px] bg-gray-800 text-white p-4 rounded-[10px]"
            onClick={(e) => {e.stopPropagation(); setIsOpen(false)}}
          >
            <ul className="flex flex-col gap-2">
              <li
                className={`bg-white bg-opacity-10 rounded-[3px] pl-2 hover:bg-opacity-20 cursor-pointer`}
                onClick={() => downloadFile(post.videoUrl)}>
                download
              </li>
              <li
                className="bg-white bg-opacity-10 rounded-[3px] pl-2 hover:bg-opacity-20 cursor-pointer"
                onClick={() => { }}>
                share
              </li>
              <li
                className={`bg-white bg-opacity-10 rounded-[3px] pl-2 hover:bg-opacity-20 cursor-pointer ${(userDetails.data._id == post.user) ? "block" : "hidden"}`}
                onClick={() => { handleDeletePost(post._id)}}>
                delete
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>

  );
}
