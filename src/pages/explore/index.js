import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Toaster from "@/components/CustomComponent/Toaster";
import { fetchAllPostsVideos } from '@/store/slice/postsSlice';

export default function Explore() {
  const dispatch = useDispatch();
  const [allVideoPosts, setAllVideoPosts] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPopupPlaying, setIsPopupPlaying] = useState(true);
  const popupVideoRef = useRef(null);

  const closePopup = () => {
    if (popupVideoRef.current) popupVideoRef.current.pause();
    setSelectedVideo(null);
    setIsPopupPlaying(true);
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

  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  // Fetch all posts function
  const getAllPostsfun = async () => {
    try {
      const response = await dispatch(fetchAllPostsVideos());

      if (fetchAllPostsVideos.fulfilled.match(response) && response.payload.status === "success") {
        const formattedPosts = chunkArray(response?.payload?.data[0]?.posts, 5);
        setAllVideoPosts(formattedPosts);
      } else {
        Toaster({
          type: "error",
          text: response.payload.message || "An error occurred. Please try again later.",
        });
      }
    } catch (error) {
      console.error(error || "An error occurred. Please try again later.");
      Toaster({
        type: "error",
        text: "An error occurred. Please try again later.",
      });
    }
  };

  useEffect(() => {
    getAllPostsfun();
  }, []);

  const handleGridVideoClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  return (
    <div className="explore-container w-full h-screen p-2 overflow-y-scroll">
      {allVideoPosts && allVideoPosts.map((arr, idx) => {
        return (
          <div
            key={idx}
            className="grid grid-cols-3 gap-2 mb-2"
            style={{
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'auto',
              gridTemplateAreas: `${idx % 5 == 1 ? '"p1 p2 p3" "p1 p4 p5"' : '"p3 p2 p1" "p5 p4 p1"'}`,
            }}
          >
            {arr.map((post, index) => {
              const gridArea = `p${(index % 5) + 1}`;
              return (
                <VideoCard gridArea={gridArea} post={post} index={index} handleGridVideoClick={handleGridVideoClick}/>


              );
            })}
          </div>)
      })}
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
              autoPlay
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


function VideoCard({ gridArea, post, index, handleGridVideoClick }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);


  const pauseClick = () => {
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
      onClick={() => { pauseClick(); handleGridVideoClick(post?.videoUrl) }}
      className={`relative overflow-hidden ${(index % 5) != 0 && "aspect-square"}`}  // Aspect ratio 1:1
      style={{
        gridArea: gridArea,
      }}
    >
      <div className="relative w-full h-full">
        <video
          className="w-full h-full object-cover"
          src={post?.videoUrl}
          ref={videoRef}
          loop
        />
        <div
          className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 cursor-pointer"
          // onClick={togglePlayPause}
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
