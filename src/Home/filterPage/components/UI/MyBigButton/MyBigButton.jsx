import React, {useEffect, useState} from 'react';
import cl from "./MyBigButton.module.css"
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setActiveCategory} from "../../../../../actions.js";

const MyBigButton = ({ onSelectCategory, handleFilterPageClose, categoryId, onLoadPosts, children, ...props }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleButtonClick = () => {
        if (categoryId) {
            console.log('Navigating to:',` /page2/${categoryId}`);

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
        console.log('Current pathname:', location.pathname);

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
        <Link to={`/page2/${categoryId}`} onClick={(event) => handleButtonClick(event)} className={cl.ntclown}>

        <button {...props} onClick={handleButtonClick} className={cl.myBtn}>
            {children}
        </button>
        </Link>
    );
};

export default MyBigButton;