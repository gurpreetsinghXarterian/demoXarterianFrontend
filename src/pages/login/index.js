import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { forgotPassword, loginUser, registerUser, sendOtpUserMail, VerifyOtp } from "@/store/slice/userSlice";
import Toaster from "@/components/CustomComponent/Toaster";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter(); 

  const [isLogin, setIsLogin] = useState(true);
  const [forgotPass, setForgotPass] = useState({ otpVerifyScreen: false, newPasswordScreen: false })
  const [formData, setFormData] = useState({ phone: "", email: "", password: "", otp: "", newPassword: "" });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ phone: "", email: "", password: "", otp: "", newPassword: "" });
  };
  const toggleLoginToForgot = () => {
    if (formData.email === "") {
      Toaster({
        type: "error",
        text: "Mail Id is  required",
      });
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(formData.email)) {
      otpSendfun();
    }
    else{
      Toaster({
        type: "error",
        text: "Mail Id is Wrong",
      });
    }
  }

    const otpSendfun = async () => {
      try {
        const response = await dispatch(sendOtpUserMail(formData.email)); //.unwrap() // for unwrap data 

        if (sendOtpUserMail.fulfilled.match(response) && response.payload.status == "success") {
          Toaster({
            type: "success",
            text: response.payload.message,
          });
          setForgotPass({ otpVerifyScreen: true, newPasswordScreen: false });
        }
        else {
          Toaster({
            type: "error",
            text: response.payload.message || "An error occurred. Please try again later.",
          });
        }
      } catch (error) {
        console.error( error || "An error occurred. Please try again later." );
        Toaster({
          type: "error",
          text: "An error occurred. Please try again later.",
        });
      }
    }
    const otpVerificationfun = async () => {
      try {
        const response = await dispatch(VerifyOtp({email:formData.email,otp:formData.otp})); //.unwrap() // for unwrap data 

        if (VerifyOtp.fulfilled.match(response) && response.payload.status == "success") {
          Toaster({
            type: "success",
            text: response.payload.message,
          });
          setForgotPass({ otpVerifyScreen: false, newPasswordScreen: true })
          setFormData((prev)=>({...prev,otp:""}));
        }
        else {
          Toaster({
            type: "error",
            text: response.payload.message || "An error occurred. Please try again later.",
          });
        }
      } catch (error) {
        console.error( error || "An error occurred. Please try again later." );
        Toaster({
          type: "error",
          text: "An error occurred. Please try again later.",
        });
      }
    }
    const changePassword = async () => {
      try {
        const response = await dispatch(forgotPassword({email:formData.email,newPassword:formData.newPassword})); //.unwrap() // for unwrap data 

        if (forgotPassword.fulfilled.match(response) && response.payload.status == "success") {
          Toaster({
            type: "success",
            text: response.payload.message,
          });
          setForgotPass({ otpVerifyScreen: false, newPasswordScreen: false })
          setFormData((prev)=>({...prev,newPassword:""}));
        }
        else {
          Toaster({
            type: "error",
            text: response.payload.message || "An error occurred. Please try again later.",
          });
        }
      } catch (error) {
        console.error( error || "An error occurred. Please try again later." );
        Toaster({
          type: "error",
          text: "An error occurred. Please try again later.",
        });
      }
    }
    const registerUserfun = async () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        Toaster({
            type: "error",
            text: "Please enter a valid email address",
          });
        return;
      }

      try {
        const response = await dispatch(registerUser({ email: formData.email, password: formData.password, phone: formData.phone })); //.unwrap() // for unwrap data 

        if (registerUser.fulfilled.match(response) && response.payload.status == "success") {
          Toaster({
            type: "success",
            text: response.payload.message,
          });
          setIsLogin(true);
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

    const loginUserfun = async () => {
      try {
        if(formData.email && formData.password){
        const response = await dispatch(loginUser({ email: formData.email, password: formData.password })); //.unwrap() for unwrap data 

        if (loginUser.fulfilled.match(response) && response.payload.status == "success") {
          router.push('/');
          setTimeout(() => {
            Toaster({
              type: "success",
              text: response.payload.message || "Login successful",
            });
          }, 500);
        }
        else {
          Toaster({
            type: "error",
            text: response.payload.message || "An error occurred. Please try again later.",
          });
        }
      }
      else{
        Toaster({
          type: "error",
          text: "Pls Fill the Credentails First",
        });
      }
      } catch (error) {
        console.error( error || "An error occurred. Please try again later." );
        Toaster({
          type: "error",
          text: error.message || "An error occurred. Please try again later.",
        });
      }
    };

    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-100 to-white">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 overflow-x-hidden">
          <div className={`transform transition-transform `}>
            {(forgotPass.otpVerifyScreen || forgotPass.newPasswordScreen) ?
              (
                forgotPass.otpVerifyScreen ?
                  (
                    <>
                      <h1 className="text-xl font-bold text-teal-600 mb-4">OTP Verification</h1>
                      <form onSubmit={(e) => { e.preventDefault(); otpVerificationfun() }}>
                        <div className="mb-4">
                          <label className="block text-sm mb-2" htmlFor="email">Enter Six Digit OTP</label>
                          <input
                            type="text"
                            id="otp"
                            name="otp"
                            value={formData.otp}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                          />
                        </div>
                        <p className="block text-sm mb-2" htmlFor="email">Get OTP From Your Mail ID: {formData.email}</p>
                        <button className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700">Submit OTP</button>
                      </form>
                    </>
                  )
                  :
                  (
                    <>
                      <h1 className="text-xl font-bold text-teal-600 mb-4">New Credentails</h1>
                      <form onSubmit={(e) => { e.preventDefault(); changePassword() }}>
                        <div className="mb-4">
                          <label className="block text-sm mb-2" htmlFor="email">Enter New Password</label>
                          <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                          />
                        </div>

                        <button className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700">Change Password</button>
                      </form>
                    </>
                  )
              )
              :
              (
                isLogin ? (
                  <>
                    <h1 className="text-xl font-bold text-teal-600 mb-4">Login</h1>
                    <form onSubmit={(e) => { e.preventDefault(); loginUserfun(); }}>
                      <div className="mb-4">
                        <label className="block text-sm mb-2" htmlFor="email">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm mb-2" htmlFor="password">Password</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                        />
                      </div>
                      <p className="my-2 mr-2 float-right hover:text-green-700 cursor-pointer" onClick={() => { toggleLoginToForgot() }}>
                        forgot password
                      </p>
                      <button className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700">Login</button>
                    </form>
                  </>
                ) : (
                  <>
                    <h1 className="text-xl font-bold text-teal-600 mb-4">Register</h1>
                    <form onSubmit={(e) => { e.preventDefault(); registerUserfun(); }}>
                      <div className="mb-4">
                        <label className="block text-sm mb-2" htmlFor="phone">Phone</label>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm mb-2" htmlFor="email">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm mb-2" htmlFor="password">Password</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                        />
                      </div>
                      <button className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700">Register</button>
                    </form>
                  </>
                ))}
          </div>
          <div className="text-center mt-4">
            <p>
              {(isLogin && !forgotPass.otpVerifyScreen && !forgotPass.newPasswordScreen )
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={toggleForm}
                className="text-teal-600 font-bold hover:underline"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>

          </div>
        </div>
      </div>
    );
  }
