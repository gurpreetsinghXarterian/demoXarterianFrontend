import React from 'react';
import { FiXCircle, FiCheckCircle } from 'react-icons/fi';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toaster = ({
    type,
    text,
    position = "top-right",
    autoClose = 3000,
    hideProgressBar = false,
    closeOnClick = true,
    pauseOnHover = true,
    draggable = true,
    progress,
    icon = type === "success" ? <FiCheckCircle color="white" size={28} /> : <FiXCircle color="white" size={28} />,
    style = type === "success" ? { backgroundColor: "#5faab1", color: "white", fontWeight: "700", border: '1px solid #c1c1c1' } : { backgroundColor: "reddish", color: "white", fontWeight: "700", border: '1px solid #c1c1c1' },
    theme = "colored",
}) => {
    const toastType = type === "error" ? toast.error : toast.success;
    toastType(text, {
        position,
        autoClose,
        hideProgressBar,
        closeOnClick,
        pauseOnHover,
        draggable,
        progress,
        icon,
        style: {
            zIndex: 99999,
            ...style, 
          },
        theme,
    });
};

export default Toaster;