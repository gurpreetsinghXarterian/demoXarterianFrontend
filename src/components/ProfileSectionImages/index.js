import { useState } from "react";

export default function ProfileSectionImages({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const closePopup = () => setSelectedImage(null); // Close the popup when clicked outside

  return (
    <div className="px-5 920sc:px-0 mb-[50px] 920sc:mb-0">
      {images && (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full aspect-square bg-gray-200 rounded-md overflow-hidden"
              onDoubleClick={() => setSelectedImage(image.imageUrl)} // Double-click to select image
            >
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
          onClick={closePopup} // Close the popup if clicked outside
        >
          <div
            className="bg-white rounded-md overflow-hidden w-[400px] h-[95vh] flex items-center relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the image
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
