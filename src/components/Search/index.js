import { SearchUser } from "@/store/slice/userSlice";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IoArrowBackOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { CgProfile } from "react-icons/cg";

export default function Search({ crossCreateScreen }) {
  const router = useRouter();
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState(""); // Track input value
    const [searchUsers, setSearchUsers] = useState([]); // To store the search results
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); // To store the debounced value

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 1000); 

        return () => {
            clearTimeout(handler); 
        };
    }, [searchTerm]);

    const handleSearchUsers = async () => {
        if (debouncedSearchTerm.trim() === "") {
            setSearchUsers([]);
            return;
        }

        try {
            const response = await dispatch(SearchUser(debouncedSearchTerm)) //.unwrap();

            if (SearchUser.fulfilled.match(response) && response.payload.status == "success") {
                setSearchUsers(response.payload.data); 
            } else {
                setSearchUsers([]);
            }
        } catch (error) {
            Toaster({
                type: "error",
                text: "An error occurred. Please try again later.",
              });
            console.error(error || "An error occurred. Please try again later.");
        }
    };

    useEffect(() => {
        if (debouncedSearchTerm) {
            handleSearchUsers(); 
        }
    }, [debouncedSearchTerm]);

    const handleClickNavigate = (navItem) => {
        router.push(`/${navItem}`)
        crossCreateScreen();
      };

    return (
        <div onClick={(e) => { e.stopPropagation() }} className="flex flex-col items-center min-w-[450px] h-[80vh] rounded-[10px] shadow-[0_0_10px_0_rgba(0,0,0,0.5)] bg-white">
            <button
                onClick={crossCreateScreen}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white h-6 w-6 rounded-[100%]"
            >
                X
            </button>
            <div className="w-full h-full">
                <div className="flex justify-center items-center h-[60px] border-b border-black border-opacity-10">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search"
                        className="w-[80%] h-[70%] border p-2 rounded-[3px]"
                    />
                </div>

                <div className="flex justify-center h-[85%] overflow-y-scroll p-2">
                    {searchUsers.length > 0 ? (
                        <ul className="w-full">
                            {searchUsers.map((user, index) => (
                                <li key={index} className="p-2 border-b border-black-200 flex items-center flex-nowrap gap-2 mb-1 cursor-pointer" onClick={()=>{handleClickNavigate(user.email)}}>
                                    {(user && user?.userDetailsId?.profilePicture) &&
                                        <div className="h-[30px] w-[30px] rounded-[100%]">
                                            <img alt="Profile image" src={user?.userDetailsId?.profilePicture} className="h-[30px] w-[30px] rounded-[100%]" />
                                        </div>
                                    }

                                    {(!user || !user?.userDetailsId?.profilePicture) &&
                                        <div className="h-[30px] w-[30px] rounded-[100%]">
                                            <CgProfile strokeWidth={0.1} className="w-full h-full" />
                                        </div>
                                    }
                                    <p>
                                        {user.email}
                                    </p>
                                </li>


                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-500">No results found</p>
                    )}
                </div>
            </div>
        </div>
    );
}
