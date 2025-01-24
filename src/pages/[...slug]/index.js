import { selectUser } from "@/store/selectors/userSelectors";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import Unauthorized from "@/components/Unauthorized";
import { fetchAnonymousUser } from "@/store/slice/userSlice";
import Profile from "@/components/Profile";
import { useRouter } from "next/router";
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';

export default function UserProfile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const userDetails = useSelector(selectUser);
  const [selfProfile, setSelfProfile] = useState(false);
  const [errorPage, setErrorPage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState();
  const [notFoundUser, setNotFoundUser] = useState(false);
  const [sharePopupOpen, setSharePopupOpen] = useState(false);
  const [sharePost, setSharePost] = useState({postlink:"",postcaption:""});

  useEffect(() => {
    const path = window.location.pathname;
    const pathSegments = path.split('/');
    let paramsUserMail;
    if (pathSegments.length > 2) {
      setErrorPage(true);
    } else {
      paramsUserMail = pathSegments[1];
    }


    if (paramsUserMail && userDetails && paramsUserMail == userDetails?.data?.email) {
        setSelfProfile(true);
        setNotFoundUser(false);
    }
    else {
      setSelfProfile(false);
      handleFetchUserProfile(paramsUserMail);
    }
  }, [router.asPath.split('/')[1], userDetails]);

  const handleFetchUserProfile = async (email) => {
    try {
      const response = await dispatch(fetchAnonymousUser(email)); //.unwrap() // for unwrap data 
      if (fetchAnonymousUser.fulfilled.match(response) && response.payload.status == "success") {
        setUserData(response.payload);
      }
      else {
        setNotFoundUser(true)
        setErrorMessage(response.payload.message || "An error occurred. Please try again later.")
      }
    } catch (error) {
      setNotFoundUser(true)
      setErrorMessage("An error occurred. Please try again later.")
    }
  };

  const handleShare = (shareMedium) => {
    let postUrl= sharePost.postlink
    const caption = sharePost.postcaption || "Check out this awesome post!";
    postUrl = postUrl.replace(/ /g, '%20');
    console.log(postUrl);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}&url=${encodeURIComponent(postUrl)}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(caption)} ${encodeURIComponent(postUrl)}`;

    if(postUrl!=""){
      setSharePopupOpen(false);
      if (shareMedium === "twitter") {
        window.open(twitterUrl, '_blank');
      } else if (shareMedium === "facebook") {
        window.open(facebookUrl, '_blank');
      } else if (shareMedium === "whatsapp") {
        window.open(whatsappUrl, '_blank');
      } 
    }
    else{
      Toaster({
        type: "error",
        text: "An error occurred. Please try again later.",
      });
    }
  
  };

  return (
    <div>
      {
        errorPage ?
          <Unauthorized />
          :
          (
            notFoundUser ?
              <div className="h-screen flex justify-center items-center">
                <p>{errorMessage}</p>
              </div>
              :
              <Profile selfProfile={selfProfile} userData={userData} setSharePopupOpen={setSharePopupOpen} setSharePost={setSharePost} />
          )
      }
       <div className={`absolute transition-all duration-500 ease-in-out ${sharePopupOpen?"bottom-[0%]":"-bottom-[100%]"} left-0 w-full h-full flex justify-center items-center z-50`}>
              <div className="bg-white p-4 rounded-[10px] text-center shadow-[0_0_10px_0_rgba(0,0,0,0.5)]">
                <h2 className="mb-4 text-xl">Where would you like to share?</h2>
                <div className="flex justify-between gap-4">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex justify-center items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    <FaTwitter />
                    Twitter
                  </button>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="flex justify-center items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    <FaFacebook />
                    Facebook
                  </button>
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="flex justify-center items-center gap-2 bg-green-500 text-white px-4 py-2 rounded"
                  >
                    <FaWhatsapp />
                    WhatsApp
                  </button>
                </div>
                <button
                  onClick={() => setSharePopupOpen(false)} // Close the popup
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
    </div>
  );
}
