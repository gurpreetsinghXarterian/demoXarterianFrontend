import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CgProfile } from "react-icons/cg";

export default function FollowPopupScreen({ setShowFollowPopup, data, showpopupfield }) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState(""); // Track input value
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); // To store the debounced value
    const [filteredData, setFilteredData] = useState([]); // To store the filtered data

    // Log the data to see structure (if needed)
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 100);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        if (debouncedSearchTerm !== "") {
            handleSearchUsers();
        } else {
            setFilteredData(data);
        }
    }, [debouncedSearchTerm, data]);

    const handleSearchUsers = () => {
        if (debouncedSearchTerm.trim() === "") {
            setFilteredData(data); 
            return;
        }

        const filteredResults = data.filter(profile => {
            return (
                profile.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                profile.phone.includes(debouncedSearchTerm)
            );
        });

        setFilteredData(filteredResults);
    };

    const crossPopup = () => {
        setShowFollowPopup(false);
    };

    const handleClickNavigate = (navItem) => {
        router.push(`/${navItem}`);
        crossPopup();
    };

    return (
        <div onClick={crossPopup} className="absolute top-0 left-0 flex justify-center items-center h-screen w-screen bg-black bg-opacity-50">
            <div onClick={(e) => { e.stopPropagation() }} className="h-[70vh] max-w-[500px] w-[400px] mx-4 bg-white rounded-lg">
                <button
                    onClick={crossPopup}
                    className="absolute top-4 right-4 bg-black bg-opacity-50 text-white h-6 w-6 rounded-[100%]"
                >
                    X
                </button>
                <div className="w-full h-full">
                    <div className="flex justify-center items-center h-[50px] border-b border-black border-opacity-30">
                        <p className="font-bold">{showpopupfield}</p>
                    </div>
                    <div className="flex justify-center items-center h-[50px] border-opacity-10 shadow">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search"
                            className="w-[90%] h-[70%] border p-2 rounded-[3px] bg-[#eeeded]"
                        />
                    </div>

                    <div className="flex justify-center h-[85%] overflow-y-scroll p-2">
                        {filteredData && filteredData.length > 0 ? (
                            <ul className="w-full">
                                {filteredData.map((profile, index) => (
                                    <li key={index} className="p-2 border-b border-black-200 flex items-center flex-nowrap gap-2 mb-1 cursor-pointer" onClick={() => { handleClickNavigate(profile.email) }} >
                                        {(profile && profile?.userDetailsId?.profilePicture) &&
                                            <div className="h-[30px] w-[30px] rounded-[100%]">
                                                <img alt="Profile image" src={profile?.userDetailsId?.profilePicture} className="h-[30px] w-[30px] rounded-[100%]" />
                                            </div>
                                        }

                                        {(!profile || !profile?.userDetailsId?.profilePicture) &&
                                            <div className="h-[30px] w-[30px] rounded-[100%]">
                                                <CgProfile strokeWidth={0.1} className="w-full h-full" />
                                            </div>
                                        }
                                        <p>
                                            {profile.email}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No {showpopupfield} data available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
