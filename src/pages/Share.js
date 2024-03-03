import '../App.css'
import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom';
import PostSignInNav from './PostSignInNav';
import PreSignInNav from './PreSignInNav';


function Share()
{
    const [isUserSignedIn, setIsUserSignedIn] = useState();
    const navigate = useNavigate();
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user)
                setIsUserSignedIn(true);
            else
                setIsUserSignedIn(false);
        });

        return unsubscribe;
    });

    const handleContinue = () => {
        navigate('/dashboard', {replace: true});
    }

    return (
        <main className = "page-wrapper">
            {
                isUserSignedIn ? (
                    <PostSignInNav/>
                ) : 
                (
                    <PreSignInNav/>
                )
            }
            <section className = "container py-5 mt-5 mb-lg-3 mb-xl-4 mb-xxl-5">
                <div className = "text-center pb-3 pt-lg-2 pt-xl-4 my-1 my-sm-3 my-lg-4">
                    <h1 className = "display-2">Thank you for reviewing our pricing plans</h1>
                    <p className = "mt-4 pt-4">As we are currently in early development, we would very much appreciate it if you could help share this platform around!</p>
                </div>
                <div className = "text-center d-flex justify-content-center  pb-2 pt-lg-2 pt-xl-4 my-1 my-sm-2 my-lg-3">
                    <a className = "btn btn-primary btn-lg px-5" href = "https://docs.google.com/forms/d/e/1FAIpQLScpDkOtd8aPT1G6XdVLjK6marfMQpGy8K6jcCZOf5NvcEOzdg/viewform?usp=sf_link" target = "_blank" rel = "noreferrer">Take part in our survey</a>
                </div>
                <div className = "text-center d-flex justify-content-center  pb-3 pt-lg-1 pt-xl-4 my-1 my-sm-3 my-lg-4">
                    <button className = "btn btn-outline-primary btn-lg px-4" onClick = {handleContinue}>Continue to my Dashboard</button>
                </div>
            </section>
        </main>
    )
}

export default Share;