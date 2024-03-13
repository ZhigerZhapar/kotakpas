import React from 'react';
import cl from "./MyBigButton.module.css";
import { useNavigate } from "react-router-dom";

const MyBigButton = ({ onSelectCategory, handleFilterPageClose, categoryId, onLoadPosts, children, ...props }) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        if (categoryId) {
            if (onSelectCategory) {
                onSelectCategory({ categoryId });
            }
            handleFilterPageClose();
            navigate(`/page2/${categoryId}`);
            if (onLoadPosts) {
                onLoadPosts(categoryId);
            }

            // Reload the page by setting window.location to the same URL
            window.location.href = window.location.href;
        } else {
            console.error('Invalid categoryId');
        }
    };

    return (
        <button onClick={handleButtonClick} {...props} className={cl.myBtn}>
            {children}
        </button>
    );
};

export default MyBigButton;
