import { selectUser } from "@/store/selectors/userSelectors";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import Unauthorized from "@/components/Unauthorized";
import { fetchAnonymousUser } from "@/store/slice/userSlice";
import Profile from "@/components/Profile";
import { useRouter } from "next/router";


export default function UserProfile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const userDetails = useSelector(selectUser);
  const [selfProfile, setSelfProfile] = useState(false);
  const [errorPage, setErrorPage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState();
  const [notFoundUser, setNotFoundUser] = useState(false);
  
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
              <Profile selfProfile={selfProfile} userData={userData} />
          )
      }
    </div>
  );
}
