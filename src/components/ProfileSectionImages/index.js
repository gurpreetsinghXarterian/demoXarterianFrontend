import { useState } from "react";
import { saveAs } from 'file-saver';
import { useSelector } from "react-redux";
import { selectUser } from "@/store/selectors/userSelectors";
import { DeletePost } from "@/store/slice/postsSlice";
import Toaster from "@/components/CustomComponent/Toaster";
import { useDispatch } from 'react-redux';

export default function ProfileSectionImages({ images }) {
  const dispatch = useDispatch();
  const userDetails = useSelector(selectUser);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
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

const closePopup = () => setSelectedImage(null);

  return (
    <div className="px-5 920sc:px-0 mb-[50px] 920sc:mb-0">
      {images && (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative w-full aspect-square bg-gray-200 rounded-md overflow-hidden group"
              onDoubleClick={() => setSelectedImage(image.imageUrl)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <div
                className="absolute top-2 right-2 h-7 w-7 group-hover:flex hidden flex-col justify-center gap-1 items-center cursor-pointer rounded-[100%] bg-black bg-opacity-50"
                onClick={toggleMenu}
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
                  onClick={() => setIsOpen(false)}
                >
                  <ul className="flex flex-col gap-2">
                    <li
                      className={`bg-white bg-opacity-10 rounded-[3px] pl-2 hover:bg-opacity-20 cursor-pointer`}
                      onClick={() => downloadFile(image.imageUrl)}>
                      download
                    </li>
                    <li
                      className="bg-white bg-opacity-10 rounded-[3px] pl-2 hover:bg-opacity-20 cursor-pointer"
                      onClick={() => { }}>
                      share
                    </li>
                    <li
                      className={`bg-white bg-opacity-10 rounded-[3px] pl-2 hover:bg-opacity-20 cursor-pointer ${(userDetails.data._id==image.user)?"block":"hidden"}`}
                      onClick={() => { handleDeletePost(image._id)}}>
                      delete
                    </li>
                  </ul>
                </div>
              )}
              <img
                src={image.imageUrl}
                alt={image.name || "Image"}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
          onClick={closePopup}
        >
          <div
            className="bg-white rounded-md overflow-hidden w-[400px] h-[95vh] flex items-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Popup Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}
