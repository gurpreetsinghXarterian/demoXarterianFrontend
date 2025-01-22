import { useDispatch } from 'react-redux';
import { fetchAllPosts } from "@/store/actions/postActions";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { CgProfile } from "react-icons/cg";
import Toaster from "@/components/CustomComponent/Toaster";

// Home Component
export default function Home() {
  const dispatch = useDispatch();
  const [allPosts, setAllPosts] = useState([]);
  const postRefs = useRef([]);
  const [playingVideoIndex, setPlayingVideoIndex] = useState(null);
  const [isPlayingArray, setIsPlayingArray] = useState([]);
  const [pausedManually, setPausedManually] = useState([]); // Track manually paused videos

  const getAllPostsfun = async () => {
    try {
      const response = await dispatch(fetchAllPosts());

      if (fetchAllPosts.fulfilled.match(response) && response.payload.status == "success") {
        setAllPosts(response.payload.posts);
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

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = entry.target.dataset.index;
        const isCurrentlyPlaying = isPlayingArray[index];
        const isManuallyPaused = pausedManually[index];

        // If the video is visible and not manually paused, play it
        if (entry.isIntersecting && !isManuallyPaused && !isCurrentlyPlaying) {
          setIsPlayingArray((prevState) => {
            const updatedState = [...prevState];
            updatedState[index] = true;

            // Pause the previous video
            if (playingVideoIndex !== null && playingVideoIndex !== index) {
              updatedState[playingVideoIndex] = false;
            }

            return updatedState;
          });

          setPlayingVideoIndex(index);
        } else if (!entry.isIntersecting && isCurrentlyPlaying) {
          setIsPlayingArray((prevState) => {
            const updatedState = [...prevState];
            updatedState[index] = false;
            return updatedState;
          });
        }
      });
    }, observerOptions);

    allPosts.forEach((_, index) => {
      const videoElement = postRefs.current[index];
      if (videoElement) {
        observer.observe(videoElement);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [allPosts, isPlayingArray, playingVideoIndex, pausedManually]);

  const togglePlayPause = (index) => {
    setIsPlayingArray((prevState) => {
      const updatedState = [...prevState];
      const currentIsPlaying = updatedState[index];
      updatedState[index] = !currentIsPlaying;

      if (playingVideoIndex !== null && playingVideoIndex !== index) {
        updatedState[playingVideoIndex] = false;
      }

      return updatedState;
    });

    // Toggle the pausedManually flag
    setPausedManually((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = !updatedState[index];
      return updatedState;
    });

    setPlayingVideoIndex((prevIndex) => (prevIndex === index ? null : index)); // Toggle the playing video index
  };

  return (
    <div className="flex flex-col items-center overflow-y-scroll h-screen pt-11 md:pt-0 ">
      {allPosts.map((post, index) => (
        <div
          className="relative flex items-center justify-center xs:w-[450px] w-[350px] md:h-[90vh] xs:h-[80vh] h-[70vh] my-10 rounded-[8px]"
          key={index}
        >
          {post.videoUrl ? (
            <VideoCard
              videoUrl={post.videoUrl}
              caption={post.caption}
              index={index}
              post={post}
              postRefs={postRefs}
              isPlaying={isPlayingArray[index] || false} // Get the play state for the specific video
              togglePlayPause={togglePlayPause} // Pass toggle function for manual control
            />
          ) : (
            <ImageCard post={post} index={index} />
          )}
        </div>
      ))}
    </div>
  );
}

// VideoCard Component
function VideoCard({ videoUrl, post, caption, index, postRefs, isPlaying, togglePlayPause }) {
  const router = useRouter();
  const videoRef = postRefs.current[index];
  const [popupCaptionOpen, setPopupCaptionOpen] = useState(false)

  const togglePopUp = () => {
    setPopupCaptionOpen(!popupCaptionOpen)
  }

  useEffect(() => {
    if (videoRef) {
      if (isPlaying) {
        videoRef.play(); // Play the video
      } else {
        videoRef.pause(); // Pause the video
      }
    }
  }, [isPlaying, videoRef]);

  const handleClickNavigate = (navItem) => {
    router.push(`/${navItem}`)
  };

  return (
    <div className="relative w-full h-full">
      <video
        ref={(el) => (postRefs.current[index] = el)} // Storing video reference in postRefs
        data-index={index} // Attach index for IntersectionObserver
        className="object-cover w-full md:h-[90vh] xs:h-[80vh] h-[70vh] rounded-[7px] "
        src={videoUrl}
        loop
      />
      <div
        className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 cursor-pointer rounded-[8px]"
        onClick={() => togglePlayPause(index)} // Toggle play/pause on click
      >
        <div
          className={`w-12 h-12 bg-white rounded-full flex justify-center items-center ${isPlaying ? "" : "play-triangle"}`}
        >
          {isPlaying ? (
            <div className="w-4 h-4 bg-black rounded-sm"></div>
          ) : (
            <div className="w-0 h-0 border-l-8 border-t-4 border-b-4 border-solid border-transparent border-l-black"></div>
          )}
        </div>
      </div>
      <div className='absolute bottom-4 left-4 text-white w-full'>
      <div className="p-2 flex items-center flex-nowrap gap-2 mb-1 cursor-pointer" onClick={() => { handleClickNavigate(post?.user?.email) }}>
          {(post && post?.user?.userDetailsId?.profilePicture) &&
            <div className="h-[30px] w-[30px] rounded-[100%]">
              <img alt="Profile image" src={post?.user?.userDetailsId?.profilePicture} className="h-[30px] w-[30px] rounded-[100%]" />
            </div>
          }

          {(!post || !post?.user?.userDetailsId?.profilePicture) &&
            <div className="h-[30px] w-[30px] rounded-[100%]">
              <CgProfile strokeWidth={0.1} className="w-full h-full" />
            </div>
          }
          <p>
            {post?.user?.userDetailsId?.fullName || post?.user?.email}
          </p>
        </div>
        <div className={`transition-all duration-500 ease-in-out text-sm md:text-base font-semibold w-11/12 overflow-y-scroll scrollbar-none ${popupCaptionOpen ? "h-[300px] bg-black bg-opacity-20" : "h-[50px] bg-black bg-opacity-10"} rounded-[10px] px-3 py-2`}>
          <div className={`relative h-full w-full cursor-pointer transition-opacity duration-300 ${popupCaptionOpen ? "opacity-100" : "opacity-50"}`} onClick={togglePopUp}>
            {caption}
          </div>
        </div>
      </div>
    </div>
  );
}

function ImageCard({ post, index }) {
  const router = useRouter();

  const [popupCaptionOpen, setPopupCaptionOpen] = useState(false)

  const togglePopUp = () => {
    setPopupCaptionOpen(!popupCaptionOpen)
  }

  const handleClickNavigate = (navItem) => {
    router.push(`/${navItem}`)
  };

  return (
    <div className="relative w-full h-full">
      <img
        className="object-cover w-full md:h-[90vh] xs:h-[80vh] h-[70vh] rounded-[7px]"
        src={post.imageUrl}
        alt={post.caption}
      />
      <div className='absolute bottom-4 left-4 text-white w-full'>
        <div className="p-2 flex items-center flex-nowrap gap-2 mb-1 cursor-pointer" onClick={() => { handleClickNavigate(post?.user?.email) }}>
          {(post && post?.user?.userDetailsId?.profilePicture) &&
            <div className="h-[30px] w-[30px] rounded-[100%]">
              <img alt="Profile image" src={post?.user?.userDetailsId?.profilePicture} className="h-[30px] w-[30px] rounded-[100%]" />
            </div>
          }

          {(!post || !post?.user?.userDetailsId?.profilePicture) &&
            <div className="h-[30px] w-[30px] rounded-[100%]">
              <CgProfile strokeWidth={0.1} className="w-full h-full" />
            </div>
          }
          <p>
            {post?.user?.userDetailsId?.fullName || post?.user?.email}
          </p>
        </div>
        <div className={`transition-all duration-500 ease-in-out text-sm md:text-base font-semibold w-11/12 overflow-y-scroll scrollbar-none ${popupCaptionOpen ? "h-[300px] bg-black bg-opacity-20" : "h-[50px] bg-black bg-opacity-10"} rounded-[10px] px-3 py-2`}>
          <div className={`relative h-full w-full cursor-pointer transition-opacity duration-300 ${popupCaptionOpen ? "opacity-100" : "opacity-50"}`} onClick={togglePopUp}>
            {post.caption}
          </div>
        </div>
      </div>

    </div>
  );
}
