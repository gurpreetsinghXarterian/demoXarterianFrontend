import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "@/helpers/helperFunctions";
import { selectAuthLoader, selectUser } from "@/store/selectors/userSelectors";
import Navigation from "@/components/Navigations/navigation";
import { selectShowNavbar } from "@/store/selectors/casualSelectors";
import { fetchUser } from "@/store/slice/userSlice";
import { CirclesWithBar } from 'react-loader-spinner';
import { selectLoader } from "@/store/selectors/postSelectors";
import Toaster from "@/components/CustomComponent/Toaster";

export default function Loader({ comp }) {
    const publicRoutes = ["/login"];
    const dispatch = useDispatch();
    const router = useRouter();
    const userDetails = useSelector(selectUser);
    const [showPage, setShowPage] = useState(false);
    const showNavbar = useSelector(selectShowNavbar);
    const authloader = useSelector(selectAuthLoader);
    const pageloader = useSelector(selectLoader);

    const secureRoutes = ["", "explore"]

    const getUserDetailsfun = async () => {
        try {

            await dispatch(fetchUser()); //.unwrap() for unwrap data 

        } catch (error) {
            console.error( error.message || "An error occurred. Please try again later." );
            Toaster({ type: "error", text: "An error occurred. Please try again later." ,   });
        }
    };

    useEffect(() => {
        const token = getCookie("token");
        if (token) {
            getUserDetailsfun(token)
        }
        if (secureRoutes.includes(router.asPath.split('/')[1]) && !token && !publicRoutes.includes(router.pathname)) {
            router.push("/login");
        }
        setShowPage(true);
    }, [router]);

    return <div className="w-screen h-screen">
        <div className="flex flex-col-reverse md:flex-row md:justify-center md:items-center w-screen h-screen gap-2">
            {userDetails && showNavbar && !publicRoutes.includes(router.pathname) && <Navigation />}
            {(authloader || pageloader) && <div className="absolute top-0 left-0 flex justify-center items-center h-screen w-screen z-10000 bg-black bg-opacity-30">
                <CirclesWithBar
                    height={100}
                    width={100}
                    color="#5faab1"
                    ariaLabel="circles-with-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div >}
            <div className="w-full h-full md:h-screen">
                {comp}
            </div>
        </div>
    </div >

}
