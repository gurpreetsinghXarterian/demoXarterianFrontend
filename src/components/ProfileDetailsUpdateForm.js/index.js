import { upgradeUserDetails } from "@/store/slice/userSlice";
import React, { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import Toaster from "@/components/CustomComponent/Toaster";

export default function ProfileDetailsUpdateForm({ profileDetails, setProfileDetails, userDetails, updateProfileDetailsPopup }) {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        fullName: userDetails?.data?.userDetailsId?.fullName || "",
        city: userDetails?.data?.userDetailsId?.city || "",
        state: userDetails?.data?.userDetailsId?.state || "",
        country: userDetails?.data?.userDetailsId?.country || "",
        postalCode: userDetails?.data?.userDetailsId?.postalCode || "",
        street: userDetails?.data?.userDetailsId?.street || "",
        dateOfBirth: userDetails?.data?.userDetailsId?.dateOfBirth || "",
        gender: userDetails?.data?.userDetailsId?.gender || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdateProfileDetails = async (e) => {
        e.preventDefault();
        try {
            if (formData.fullName && 
                formData.city &&
                formData.state &&
                formData.country &&
                formData.postalCode &&
                formData.street &&
                formData.dateOfBirth &&
                formData.gender
            ) {
                const response = await dispatch(upgradeUserDetails(formData)); //.unwrap() for unwrap data 

                if (upgradeUserDetails.fulfilled.match(response) && response.payload.status == "success") {
        //             const res= await dispatch(upgradeUserDetails(formData)); 
        // fetchUser();

                    backUpdateForm();
                }
                else {
                    Toaster({
                        type: "error",
                        text: response.payload.message || "An error occurred. Please try again later.",
                      });
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
                text: "An error occurred. Please try again later.",
              });
            console.error(
                error.message ||
                "An error occurred. Please try again later."
            );
        }
    };

    const backUpdateForm = () => {
        if (profileDetails.edit) {
            setProfileDetails({ hide: false, show: true, edit: false })
        }
        else if (profileDetails.show) {
            setProfileDetails({ hide: false, show: false, edit: false })
        }
    };

    const crossPopup = () => {
        setProfileDetails({ hide: true, show: false, edit: false })
    };


    return (
        <div onClick={crossPopup} className="absolute top-0 left-0 flex justify-center items-center h-screen w-screen bg-black bg-opacity-50">
            <div onClick={(e)=>{e.stopPropagation()}} className="h-[90vh] max-w-[500px] w-[500px] mx-4 bg-white rounded-lg p-6 overflow-y-auto">
                <div className="flex justify-between ">
                    <div className="flex items-center gap-4 mb-4">
                        <div className='scale-125' onClick={backUpdateForm}>
                            <IoArrowBackOutline />
                        </div>
                        <h2 className={`text-2xl font-bold`}>{profileDetails.edit && "Update"} Profile</h2>
                    </div>
                    {!profileDetails.edit && <button onClick={() => { updateProfileDetailsPopup("edit") }} className="bg-gray-300 px-3 h-[35px] rounded-lg hover:bg-gray-400">Edit Details</button>}
                </div>
                <form onSubmit={handleUpdateProfileDetails} className="space-y-4">
                    <div 
                    // className={profileDetails.edit ? "" : "flex items-center"}
                    >
                        <label className="block text-sm font-medium mb-1">Full Name : </label>
                        {
                        // profileDetails.edit ?
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                placeholder="Enter full name"
                                disabled={!profileDetails.edit}
                            />
                            // :
                            // <p className="translate-x-1 -translate-y-0.5">{userDetails?.data?.userDetailsId?.fullName || ""}</p>
                        }
                    </div>
                    <div 
                    // className={profileDetails.edit ? "" : "flex items-center"}
                    >
                        <label className="block text-sm font-medium mb-1">Street : </label>
                        {
                            // profileDetails.edit ?
                                <input
                                    type="text"
                                    name="street"
                                    value={formData.street}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    placeholder="Enter street"
                                disabled={!profileDetails.edit}
                                />
                                // :
                                // <p className="translate-x-1 -translate-y-0.5">{userDetails?.data?.userDetailsId?.street || ""}</p>
                        }
                    </div>
                    <div 
                    // className={profileDetails.edit ? "" : "flex items-center"}
                    >
                        <label className="block text-sm font-medium mb-1">City : </label>
                        {
                            // profileDetails.edit ?
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    placeholder="Enter city"
                                    disabled={!profileDetails.edit}
                                />
                                // :
                                // <p className="translate-x-1 -translate-y-0.5">{userDetails?.data?.userDetailsId?.city || ""}</p>
                        }
                    </div>
                    <div 
                    // className={profileDetails.edit ? "" : "flex items-center"}
                    >
                        <label className="block text-sm font-medium mb-1">State : </label>
                        {
                            // profileDetails.edit ?
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    placeholder="Enter state"
                                    disabled={!profileDetails.edit}
                                />
                                // :
                                // <p className="translate-x-1 -translate-y-0.5">{userDetails?.data?.userDetailsId?.state || ""}</p>
                        }

                    </div>
                    <div 
                    // className={profileDetails.edit ? "" : "flex items-center"}
                    >
                        <label className="block text-sm font-medium mb-1">Country : </label>
                        {
                            // profileDetails.edit ?
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    placeholder="Enter country"
                                    disabled={!profileDetails.edit}
                                />
                                // :
                                // <p className="translate-x-1 -translate-y-0.5">{userDetails?.data?.userDetailsId?.country || ""}</p>
                        }

                    </div>
                    <div 
                    // className={profileDetails.edit ? "" : "flex items-center"}
                    >
                        <label className="block text-sm font-medium mb-1">Postal Code : </label>
                        {
                            // profileDetails.edit ?
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    placeholder="Enter postal code"
                                    disabled={!profileDetails.edit}
                                />
                                // :
                                // <p className="translate-x-1 -translate-y-0.5"> {userDetails?.data?.userDetailsId?.postalCode || ""}</p>
                        }

                    </div>
                    <div 
                    // className={profileDetails.edit ? "" : "flex items-center"}
                    >
                        <label className="block text-sm font-medium mb-1">Date of Birth : </label>
                        {
                            // profileDetails.edit ?
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    disabled={!profileDetails.edit}
                                />
                                // :
                                // <p className="translate-x-1 -translate-y-0.5">{userDetails?.data?.userDetailsId?.dateOfBirth || ""}</p>
                        }

                    </div>
                    <div 
                    // className={profileDetails.edit ? "" : "flex items-center"}
                    >
                        <label className="block text-sm font-medium mb-1">Gender : </label>
                        {
                            // profileDetails.edit ?
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    disabled={!profileDetails.edit}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                // :
                                // <p className="translate-x-1 -translate-y-0.5">{userDetails?.data?.userDetailsId?.gender || ""}</p>
                        }

                    </div>

                    {profileDetails.edit && <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600"
                    >
                        Update Details
                    </button>}
                </form>
            </div>
        </div>
    );
}
