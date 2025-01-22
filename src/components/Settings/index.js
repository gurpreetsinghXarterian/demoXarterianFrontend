import React from "react";
import { useDispatch } from 'react-redux';
import { logout } from "../../store/slice/userSlice";
import { useRouter } from "next/router";

export default function SettingPopUp({ updateSettingPopup, handleInnerClick }) {
    const dispatch = useDispatch();
    const router = useRouter();

    const logoutWeb = async () => {
        await dispatch(logout())
        router.push(`/login`)
    }

    return (
        <div onClick={updateSettingPopup} className="absolute top-0 left-0 flex justify-center items-center h-screen w-screen bg-black bg-opacity-50">
            <div onClick={handleInnerClick} className="h-[60vh] max-w-[350px] w-[350px] mx-4 bg-white rounded-lg overflow-y-auto">
                <ul>
                    <li onClick={logoutWeb} className="flex justify-center items-center border-b border-black border-opacity-10 h-[40px] hover:bg-black hover:bg-opacity-10">logout</li>
                    <li onClick={updateSettingPopup} className="flex justify-center items-center border-b border-black border-opacity-10 h-[40px] hover:bg-black hover:bg-opacity-10">cancel</li>
                </ul>
            </div>
        </div>
    );
}
