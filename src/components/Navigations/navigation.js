import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { IoSearch } from "react-icons/io5";
import { GoHomeFill } from "react-icons/go";
import { FaRegCompass } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import CreatePost from "../CreatePost";
import Search from "../Search";
import { selectUser } from "@/store/selectors/userSelectors";

const Navigation = () => {
  const router = useRouter();
  const userDetails = useSelector(selectUser);
  const [selectedNav, setSelectedNav] = useState("");
  const [prevSelectedNav, setPrevSelectedNav] = useState("");

  const handleClickSelectedNav = (navItem) => {
    setPrevSelectedNav(selectedNav);
    setSelectedNav(navItem);
  };
  const handleClickNavigate = (navItem) => {
    router.push(`/${navItem}`)
  };

  const crossCreateScreen = () => {
    setSelectedNav(prevSelectedNav);

  }

  useEffect(()=>{
    const pathParts = router.asPath.split('/');
    if (pathParts[1] === '') {
      setSelectedNav("")
    } else if (pathParts[1] === 'explore') {
      setSelectedNav("explore")
    } else if (pathParts[1].endsWith('.com')) {
      if(pathParts[1]==userDetails?.data?.email){
      setSelectedNav("profile")
      }
      else{
      setSelectedNav("Otherprofile")
      }
    }
  },[router])

  return (
    <div className="w-screen h-[50px] rounded-tl-[10px] rounded-tr-[10px] md:w-[100px]  920sc:w-[400px] md:h-screen md:rounded-tr-[10px] md:rounded-br-[10px] bg-gray-200 md:bg-gray-50 shadow-md z-50">
      <Image
        src="/assets/logo/x_arterian_logo.jpg"
        alt="Arterain Logo"
        width={50}
        height={50}
        className="rounded-[10px] mx-10 mt-3 mb-6 animate-shiny-border hidden md:block"
      />
      <nav>
        <ul className="px-8 flex md:flex-col flex-row justify-between md:justify-center">
          <li onClick={() => { handleClickSelectedNav(""); handleClickNavigate("") }} className="flex items-center pl-2 h-[50px] text-[20px] cursor-pointer 920sc:hover:bg-gray-200 rounded-[5px]">
            <span className="mr-3 text-2xl">
              <GoHomeFill />
            </span>
            <p className={`hidden 920sc:block ${(selectedNav === "" || (selectedNav === "create" && prevSelectedNav === "") || (selectedNav === "search" && prevSelectedNav === "")) ? "font-bold" : ""}`}>Home</p>
          </li>
          <li onClick={() => { handleClickSelectedNav("search") }} className="flex items-center pl-2 h-[50px] text-[20px] cursor-pointer 920sc:hover:bg-gray-200 rounded-[5px]">
            <span className="mr-3 text-2xl">
              <IoSearch />
            </span>
            <p className={`hidden 920sc:block `}>Search</p>
          </li>
          <li onClick={() => { handleClickSelectedNav("explore"); handleClickNavigate("explore") }} className="flex items-center pl-2 h-[50px] text-[20px] cursor-pointer 920sc:hover:bg-gray-200 rounded-[5px]">
            <span className="mr-3 text-2xl">
              <FaRegCompass />
            </span>
            <p className={`hidden 920sc:block ${(selectedNav === "explore" || (selectedNav === "create" && prevSelectedNav === "explore") || (selectedNav === "search" && prevSelectedNav === "explore")) ? "font-bold" : ""}`}>Explore</p>
          </li>
          <li onClick={() => { handleClickSelectedNav("create"); }} className="flex items-center pl-2 h-[50px] text-[20px] cursor-pointer 920sc:hover:bg-gray-200 rounded-[5px]">
            <span className="mr-3 text-2xl">
              <FaRegPlusSquare />
            </span>
            <p className={`hidden 920sc:block `}>Create</p>
          </li>
          <li onClick={() => { handleClickSelectedNav("profile"); handleClickNavigate(userDetails.data.email) }} className="flex items-center pl-2 h-[50px] text-[20px] cursor-pointer 920sc:hover:bg-gray-200 rounded-[5px]">
            <span className="mr-3 text-2xl">
              <CgProfile />
            </span>
            <p className={`hidden 920sc:block ${(selectedNav === "profile" || (selectedNav === "create" && prevSelectedNav === "profile") || (selectedNav === "search" && prevSelectedNav === "profile")) ? "font-bold" : ""}`}>Profile</p>
          </li>
        </ul>
      </nav>
      {selectedNav === "create" &&
        <div onClick={crossCreateScreen} className="absolute top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center bg-black bg-opacity-10 z-50">
          <CreatePost crossCreateScreen={crossCreateScreen} />
        </div>
      }
      {selectedNav === "search" &&
        <div onClick={crossCreateScreen} className="absolute top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center bg-black bg-opacity-10 z-50">
          <Search crossCreateScreen={crossCreateScreen} />
        </div>
      }
    </div>
  );
};

export default Navigation;
