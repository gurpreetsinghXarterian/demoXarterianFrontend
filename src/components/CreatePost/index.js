import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { IoArrowBackOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { UploadPostData } from '@/store/slice/postsSlice';
import Toaster from "@/components/CustomComponent/Toaster";

export default function CreatePost({ crossCreateScreen }) {
    const dispatch = useDispatch();
    const [newFile, setNewFile] = useState(null);
    const fileInputRef = useRef(null);
    const [caption, setCaption] = useState("");

    const handleCaptionChange = (event) => {
        setCaption(event.target.value);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    // Handle file selection
    const handleFileUpload = (event) => {
        setNewFile(event.target.files[0]);
    };

    // Clear file selection
    const clearFileUpload = () => {
        setNewFile(null);
    };

    // Upload file to server
    const uploadFile = async () => {
        if (!newFile) return Toaster({
            type: "error",
            text: "File is not Selected",
          });

        const formData = new FormData();
        formData.append("file", newFile);
        formData.append("caption", caption);
        formData.append("fileType", newFile.type.includes("image") ? "image" : "video"); // Assuming file type is either image or video

        try {
            const response = await dispatch(UploadPostData(formData)); //.unwrap() // for unwrap data 

            if (UploadPostData.fulfilled.match(response)) {
                Toaster({
                    type: "success",
                    text: "Post created successfully!",
                  });
                setNewFile(null);
                crossCreateScreen();
            }
            else {
                Toaster({
                    type: "error",
                    text: response.payload.message || "An error occurred. Please try again later.",
                  });
            }

        } catch (error) {
            console.error("Error creating post:", error);
            Toaster({
                type: "error",
                text: "An error occurred. Please try again later.",
              });
        }
    };


    return (
        <div>
            {newFile == null && <div onClick={(e)=>{e.stopPropagation()}} className="flex flex-col items-center min-w-[450px] h-[80vh] rounded-[10px] shadow-[0_0_10px_0_rgba(0,0,0,0.5)] bg-white">
                <button
                    onClick={crossCreateScreen}
                    className="absolute top-4 right-4 bg-black bg-opacity-50 text-white h-6 w-6 rounded-[100%]"
                >
                    X
                </button>
                <div className="w-full h-full">
                    <h2 className="text-center text-lg font-semibold mb-6 border-b border-black-200 w-full py-2 ">Create new Post</h2>

                    <div className="flex justify-center items-center h-[85%] rounded-md">
                        <div className="hidden">
                            <input
                                ref={fileInputRef}
                                type="file"
                                onChange={handleFileUpload}
                                className="border p-2 rounded"
                            />

                        </div>

                        <div className='flex flex-col gap-2 justify-center items-center'>
                            <svg aria-label="Icon to represent media such as images or videos" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><title>Icon to represent media such as images or videos</title><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                            <p className='text-xl'>Select photos and videos here</p>
                            <button class="bg-[#0095F6] rounded-[5px] px-3 py-1 text-white text-sm font-semibold" type="button" onClick={handleButtonClick}>Select from computer</button>
                        </div>
                    </div>
                </div>
            </div>}
            {newFile !== null && <div onClick={(e)=>{e.stopPropagation()}} className="flex flex-col items-center min-w-[450px] rounded-[10px] shadow-[0_0_10px_0_rgba(0,0,0,0.5)] bg-white">
                <button
                    onClick={crossCreateScreen}
                    className="absolute top-4 right-4 bg-black bg-opacity-50 text-white h-6 w-6 rounded-[100%]"
                >
                    X
                </button>
                <div className=" relative w-full h-full">
                    <div className='absolute top-3 left-4 scale-125' onClick={clearFileUpload}>
                        <IoArrowBackOutline />
                    </div>
                    <h2 className="text-center text-lg font-semibold mb-6 border-b border-black-200 w-full py-2 ">Add a Caption</h2>
                    <div className="flex justify-center items-center h-[85%] rounded-md mb-4">

                        <div className='flex flex-col gap-2 justify-center items-center'>
                            <textarea
                                className="border p-4 rounded text-lg w-full h-40 resize-none"
                                placeholder="Type your caption or story here..."
                                value={caption}
                                onChange={handleCaptionChange}
                            ></textarea>
                            <p className='text-sm'>Add a caption to share your thoughts or tell a story with your post.</p>
                            <button class="bg-[#0095F6] rounded-[5px] px-3 py-1 text-white text-sm font-semibold" type="button" onClick={uploadFile}>Upload Post</button>
                        </div>
                    </div>
                </div>
            </div>}
        </div>

    );
}

const formatFileSize = (size) => {
    if (size < 1024) return `${size} bytes`;
    else if (size < 1048576) return `${(size / 1024).toFixed(2)} KB`;
    else return `${(size / 1048576).toFixed(2)} MB`;
};
