import { selectUser } from "@/store/selectors/userSelectors";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { CgProfile } from "react-icons/cg";
import { profileSectionPostsSvg, profileSectionReelsSvg, settingSvg } from "@/components/staticData";
import { useEffect, useState, useRef } from "react";
import ProfileDetailsUpdateForm from "@/components/ProfileDetailsUpdateForm.js";
import { allAnonymousUserPosts, allUserPosts } from "../../store/slice/postsSlice";
import { selectAllUserPosts } from "../../store/selectors/postSelectors";
import ProfileSectionImages from "../../components/ProfileSectionImages";
import ProfileSectionVideos from "../../components/ProfileSectionVideos";
import SettingPopUp from "../../components/Settings";
import { fetchAnonymousUser, followUser, upgradeUserDetails } from "../../store/slice/userSlice";
import { FaPencilAlt } from "react-icons/fa";
import FollowPopupScreen from "../FollowPopup";
import Toaster from "@/components/CustomComponent/Toaster";

let callOncehandleFetchUserPosts = true;

export default function Profile({ selfProfile, userData }) {
    const dispatch = useDispatch();
    let userDetails = useSelector(selectUser);
    const allUserPostsData = useSelector(selectAllUserPosts);
    const [updatedAllUserAnonymousPostsData, setUpdatedAllUserAnonymousPostsData] = useState();
    const [section, setSection] = useState({ images: true, videos: false });
    const [profileDetails, setProfileDetails] = useState({ hide: true, show: false, edit: false })
    const [settingPopup, setSettingPopup] = useState(false)
    const fileInputRef = useRef(null);
    const [updatedUserDetails, setUpdatedUserDetails] = useState();
    const [showPage, setShowPage] = useState(false);
    const [followUnfollow, setFollowUnfollow] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [showFollowPopup, setShowFollowPopup] = useState(false);
    const [followData, setFollowData] = useState([]);
    const [showpopupfield, setShowpopupfield] = useState("");
    const checkFollowerUser = (Id) => {
        return userDetails?.data?.following?.some((followingUser) => followingUser._id === Id);
    };

    useEffect(() => {
        if (selfProfile) {
            setUpdatedUserDetails(userDetails);
            setFollowersCount(userDetails?.data?.followers?.length)
            setFollowingCount(userDetails?.data?.following?.length)
            setUpdatedAllUserAnonymousPostsData(allUserPostsData)
            if (callOncehandleFetchUserPosts) {
                handleFetchUserPosts();
                callOncehandleFetchUserPosts = false;
            }
        }
        else {
            // userDetails = userData;
            setUpdatedUserDetails(userData)
            const followState = checkFollowerUser(userData?.data?._id);
            setFollowUnfollow(followState)
            setFollowersCount(userData?.data?.followers?.length)
            setFollowingCount(userData?.data?.following?.length)

            if (userData) {
                handleFetchAnonymousUserPosts(userData?.data?.email);
            }
        }
        if (selfProfile || userData) {
            setShowPage(true);
        }
    }, [userDetails, userData, allUserPostsData])




    const updateSection = (option) => {
        if (option == "images")
            setSection({ images: true, videos: false })
        else
            setSection({ images: false, videos: true })
    }

    const updateProfileDetailsPopup = (option) => {
        if (option == "show") {
            setProfileDetails({ hide: false, show: true, edit: false })
        }
        else if (option == "edit") {
            setProfileDetails({ hide: false, show: false, edit: true })
        }
    }

    const updateSettingPopup = (e) => {
        setSettingPopup(!settingPopup)
    }
    const handleInnerClick = (e) => {
        e.stopPropagation();
    };

    const handleFetchUserPosts = async () => {
        try {
            await dispatch(allUserPosts()); //.unwrap() // for unwrap data 
        } catch (error) {
            Toaster({
                type: "error",
                text: response.payload.message || "An error occurred. Please try again later.",
            });
        }
    }
    const handleFetchAnonymousUserPosts = async (email) => {
        try {
            const response = await dispatch(allAnonymousUserPosts(email)); //.unwrap() // for unwrap data 
            if (allAnonymousUserPosts.fulfilled.match(response) && response.payload.status == "success") {
                setUpdatedAllUserAnonymousPostsData(response.payload)
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

    const handlefollow = async (uId, email) => {
        try {
            const response = await dispatch(followUser(uId)); //.unwrap() // for unwrap data 
            if (followUser.fulfilled.match(response) && response.payload.status == "success") {
                setFollowUnfollow(!followUnfollow)
                if (response.payload.message == "Followed successfully") {
                    setFollowersCount((prev) => (prev + 1))
                }
                else if (response.payload.message == "Unfollowed successfully") {
                    setFollowersCount((prev) => (prev - 1))
                }
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

    const uploadFile = async (file) => {

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await dispatch(upgradeUserDetails(formData)); //.unwrap() // for unwrap data 

            if (upgradeUserDetails.fulfilled.match(response)) {
                Toaster({
                    type: "success",
                    text: "Profile Picture Updated successfully!",
                  });
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
                text: "Something went wrong. Please try again later.",
              });
        }
    };

    // Handle file selection
    const handleFileUpload = (event) => {
        uploadFile(event.target.files[0])
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleShowFollowPopup = (showpop) => {
        setShowFollowPopup(true);
        if (showpop == "follower") {
            setShowpopupfield("followers")
            setFollowData(updatedUserDetails?.data?.followers)
        }
        else if (showpop == "following") {
            setShowpopupfield("following")
            setFollowData(updatedUserDetails?.data?.following)
        }
    };

    return (
        showPage && updatedUserDetails &&
        <div className="mt-11 920sc:mt-0 920sc:p-8 h-screen overflow-y-scroll">

            <div className="flex p-8">
                <div className="hidden">
                    <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileUpload}
                        className="border p-2 rounded"
                    />
                </div>

                {(updatedUserDetails && updatedUserDetails?.data?.userDetailsId?.profilePicture) &&
                    <div className="relative p-8 group rounded-[100%]" onClick={() => { selfProfile && handleButtonClick() }}>
                        {selfProfile && <div className="absolute w-[150px] h-[150px] hidden group-hover:block rounded-[100%]">
                            <div className="w-full h-full flex justify-center items-center bg-black bg-opacity-50 rounded-[100%]">
                                <FaPencilAlt className="text-white text-3xl" />
                            </div>
                        </div>}
                        <img alt="Profile image" src={updatedUserDetails?.data?.userDetailsId?.profilePicture} className="rounded-[100%] min-w-[150px] w-[150px] h-[150px] min-h-[150px]" />
                    </div>
                }

                {(!updatedUserDetails || !updatedUserDetails?.data?.userDetailsId?.profilePicture) &&
                    <div className="relative mr-3 text-[150px] p-8 font-light group rounded-[100%]" onClick={() => { selfProfile && handleButtonClick() }}>
                        {selfProfile && <div className="absolute w-[150px] h-[150px] hidden group-hover:block rounded-[100%]">
                            <div className="w-full h-full flex justify-center items-center bg-black bg-opacity-50 rounded-[100%]">
                                <FaPencilAlt className="text-white text-3xl" />
                            </div>
                        </div>}
                        <CgProfile strokeWidth={0.1} />
                    </div>
                }

                <div className="flex flex-col p-8 gap-11">
                    <div class="flex gap-8">
                        <div class=" text-lg font-bold ">{updatedUserDetails?.data?.userDetailsId?.fullName || updatedUserDetails?.data?.email}</div>
                        {selfProfile && <div class="hidden 920sc:block">
                            <button onClick={() => { updateProfileDetailsPopup("show") }} className="bg-gray-300 px-3 py-1 rounded-lg whitespace-nowrap">Edit Profile</button>
                        </div>}
                        {!selfProfile &&
                            (followUnfollow ?
                                <div class="hidden 920sc:block">
                                    <button onClick={() => { handlefollow(updatedUserDetails?.data?._id) }} className="bg-gray-300 px-3 py-1 rounded-lg whitespace-nowrap">Unfollow</button>
                                </div>
                                :
                                <div class="hidden 920sc:block">
                                    <button onClick={() => { handlefollow(updatedUserDetails?.data?._id) }} className="bg-gray-300 px-3 py-1 rounded-lg whitespace-nowrap">follow</button>
                                </div>
                            )
                        }
                        {selfProfile && <div onClick={updateSettingPopup} class="">{settingSvg}</div>}
                    </div>
                    {selfProfile && <div className="920sc:hidden block">
                        <button onClick={() => { updateProfileDetailsPopup("show") }} className="bg-gray-300 px-3 py-1 rounded-lg whitespace-nowrap">Edit Profile</button>
                    </div>}
                    {!selfProfile &&
                        (followUnfollow ?
                            <div class="920sc:hidden block">
                                <button onClick={() => { handlefollow(updatedUserDetails?.data?._id) }} className="bg-gray-300 px-3 py-1 rounded-lg whitespace-nowrap">Unfollow</button>
                            </div>
                            :
                            <div class="920sc:hidden block">
                                <button onClick={() => { handlefollow(updatedUserDetails?.data?._id) }} className="bg-gray-300 px-3 py-1 rounded-lg whitespace-nowrap">follow</button>
                            </div>
                        )
                    }
                    <div className="920sc:flex gap-10 hidden">
                        <div className="font-bold whitespace-nowrap">{`${(updatedAllUserAnonymousPostsData?.data?.images.length + updatedAllUserAnonymousPostsData?.data?.videos.length) || "0"} posts`}</div>
                        <div className="font-bold whitespace-nowrap cursor-pointer" onClick={() => { handleShowFollowPopup("follower") }}>{`${followersCount} followers`}</div>
                        <div className="font-bold whitespace-nowrap cursor-pointer" onClick={() => { handleShowFollowPopup("following") }}>{`${followingCount} following`}</div>
                    </div>
                </div>
            </div>
            <div className="border-b border-black border-opacity-20 w-full"></div>
            <div className="flex justify-evenly gap-10 920sc:hidden py-2 border-b border-black border-opacity-20">
                <div className="flex flex-col justify-center items-center">
                    <p className="font-bold">{(updatedAllUserAnonymousPostsData?.data?.images.length + updatedAllUserAnonymousPostsData?.data?.videos.length) || "0"}</p>
                    <p className="text-black text-opacity-50">posts</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <p className="font-bold">{followersCount}</p>
                    <p className="text-black text-opacity-50">followers</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <p className="font-bold">{followingCount}</p>
                    <p className="text-black text-opacity-50">following</p>
                </div>
            </div>
            <div className="w-full flex justify-center items-center mb-8">
                <div className="flex gap-10">
                    <p onClick={() => { updateSection("images") }} className={`cursor-pointer text-sm px-3 py-4 flex items-center gap-2 ${section.images && "font-bold border-t border-black"}`}>{profileSectionPostsSvg}POSTS</p>
                    <p onClick={() => { updateSection("videos") }} className={`cursor-pointer text-sm px-3 py-4 flex items-center gap-2 ${section.videos && "font-bold border-t border-black"}`}>{profileSectionReelsSvg}REELS</p>
                </div>
            </div>

            {section.images && <ProfileSectionImages images={updatedAllUserAnonymousPostsData?.data?.images || []} />}
            {section.videos && <ProfileSectionVideos videos={updatedAllUserAnonymousPostsData?.data?.videos || []} />}

            {(profileDetails.show || profileDetails.edit) &&
                <ProfileDetailsUpdateForm profileDetails={profileDetails} setProfileDetails={setProfileDetails} userDetails={updatedUserDetails} updateProfileDetailsPopup={updateProfileDetailsPopup} />
            }

            {showFollowPopup &&
                <FollowPopupScreen setShowFollowPopup={setShowFollowPopup} data={followData} showpopupfield={showpopupfield} />
            }

            {settingPopup &&
                <SettingPopUp updateSettingPopup={updateSettingPopup} handleInnerClick={handleInnerClick} />
            }

        </div>
    );
}
