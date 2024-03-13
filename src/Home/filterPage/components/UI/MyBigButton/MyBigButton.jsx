import React, { useEffect } from 'react';
import cl from "./MyBigButton.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActiveCategory } from "../../../../../actions.js";

const MyBigButton = ({ onSelectCategory, handleFilterPageClose, categoryId, onLoadPosts, children, ...props }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

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
            // Manually trigger a page reload
            window.location.reload();
        } else {
            console.error('Invalid categoryId');
        }
    };

    useEffect(() => {
        // Fetch updated data when the route changes
        const currentCategoryId = location.pathname.split('/').pop();
        if (currentCategoryId && onSelectCategory) {
            onSelectCategory({ categoryId: currentCategoryId });
        }

        // Optionally, dispatch an action to update the active category in Redux
        if (currentCategoryId && dispatch) {
            dispatch(setActiveCategory(currentCategoryId));
        }
    }, [location.pathname, onSelectCategory, dispatch]);

    return (
        <button {...props} onClick={handleButtonClick} className={cl.myBtn}>
            {children}
        </button>
    );
};

export default MyBigButton;
