import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Toaster from "@/components/CustomComponent/Toaster";
import { fetchAllPostsVideos } from '@/store/slice/postsSlice';

export default function Explore() {
  const dispatch = useDispatch();
  const [allVideoPosts, setAllVideoPosts] = useState([]);
  const [gridExplore,setGridExplore]=useState(true);
  // Fetch all posts function
  const getAllPostsfun = async () => {
    try {
      const response = await dispatch(fetchAllPostsVideos());

      if (fetchAllPostsVideos.fulfilled.match(response) && response.payload.status === "success") {
        setAllVideoPosts(response?.payload?.data[0]?.posts);
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

  return (
    <div className="explore-container w-full h-screen p-4 overflow-y-scroll">
      <div
        className="grid grid-cols-3 gap-2"
        style={{
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'auto',
          gridTemplateAreas: `${gridExplore ?'"p1 p2 p3" "p1 p4 p5"':'"p2 p3 p1" "p4 p5 p1"'}`,
        }}
      >
        {allVideoPosts && allVideoPosts.map((post, index) => {
          const gridArea = `p${(index % 5) + 1}`;
          return (
            <div
              key={index}
              className={`relative overflow-hidden ${(index%5)!=0 && "aspect-square"}`}  // Aspect ratio 1:1
              style={{
                gridArea: gridArea,
              }}
            >
              <video
                className="w-full h-full object-cover"
                src={post?.videoUrl}
                controls
                loop
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
