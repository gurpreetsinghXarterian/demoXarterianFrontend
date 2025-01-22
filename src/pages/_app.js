
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Loader from "./loader";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

export default function App({ Component, pageProps }) {


  return <>
    <Provider store={store}>
      <Loader comp={<Component {...pageProps} />}/>
    </Provider>
    <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        closeOnClick
        pauseOnHover
        draggable 
        theme="colored"
      />
  </>

}
