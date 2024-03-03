import '../App.css';
import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import PostSignInNav from './PostSignInNav';
import PreSignInNav from './PreSignInNav';

function Pricing()
{
    const [isUserPreRegistered, setIsUserPreRegistered] = useState();
    const [isUserSignedIn, setIsUserSignedIn] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user)
                setIsUserSignedIn(true);
            else
                setIsUserSignedIn(false);

            if (isUserSignedIn)
            {
                const userDocRef = doc(firestore, 'UserData', auth.currentUser.uid);
                const userDocSnap = await getDoc(userDocRef);if (userDocSnap.exists())
                {
                    const userData = userDocSnap.data();
                    setIsUserPreRegistered(userData.HasUserPreRegistered);
                }
            }            
        })

        return unsubscribe;
    }, [isUserSignedIn])

    const handleContinueForFree = () => {
        navigate('/share', {replace: true});
    }

    return(
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
                    <h1 className = "display-2">Pricing plans</h1>
                    {
                        isUserSignedIn ? (
                            <>
                                <p className = "fs-lg mb-0">Thank you for onboarding with Taller Limited! As we are currently still early in our development phase, help us quicken the 
                                process of bringing features you want to see by pre-registering now at a discounted price!</p>
                            </>
                        ) : 
                        (
                            <>
                                <p className = "fs-lg mb-0">Pre registeration is now open! As we are currently still in the 
                                early development phase, pre register now at a discounted price to help us quicken our 
                                development process</p>
                            </>
                        )
                    }
                </div>
                <div className = "row row-cols-2 flex-nowrap pb-4 overflow-auto">
                        <div className = "col" id = "card-col">
                            <div className = "card h-100 py-lg-4" id = "price-card">
                                <div className = "card-body w-100 mx-auto text-center" id = "card-inner">
                                    <h3>Premium Monthly</h3>
                                    <div className = "display-2 text-primary"><s>$19.99</s></div>
                                    <div className = "mb-4">per month</div>
                                    <div className = "display-2 text-primary">$9.99</div>
                                    <div className = "mb-4">per month (pre-registration price)</div>
                                    <p className = "mb-4 pb-4">Pre register and get the current monthly price before we launch.
                                    This will give you full access to your personalised profile as well as any future features that we 
                                    may release.</p>
                                    <a className = "btn btn-primary w-100" type = "button" href = "https://buy.stripe.com/9AQ9Cz94d1952sM4gg">Get this plan now</a>
                                </div>
                            </div>
                        </div>
                        <div className = "col" id = "card-col">
                            <div className = "card border-primary bg-primary h-100 py-lg-4" id = "price-card">
                                <div className = "card-body w-100 mx-auto text-center" id = "card-inner">
                                    <h3 className = "text-light">Premium Anually</h3>
                                    <div className = "display-2 text-light"><s>$219.99</s></div>
                                    <div className = "text-light opacity-70 mb-4">per year</div>
                                    <div className = "display-2 text-light">$99.99</div>
                                    <div className = "text-light opacity-70 mb-4">per year (pre-registration price)</div>
                                    <p className = "text-light opacity-70 mb-4 pb-4">Pre register and get the current annual price before we launch.
                                    This will give you full access to your personalised profile as well as any future features that we 
                                    may release.</p>
                                    <button className = "btn btn-light w-100" type = "button">Get this plan now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        isUserSignedIn ? (
                            <>
                                {
                                    isUserPreRegistered ?  (
                                        <></>
                                    ) : 
                                    (
                                        <>
                                            <div className = "text-center pb-3 pt-lg-2 pt-xl-4 my-1 my-sm-3 my-lg-4">
                                                <p>No, I want to continue on my free account</p>
                                                <button className = "btn btn-primary btn-lg" onClick = {handleContinueForFree}>Continue for free</button>
                                            </div>
                                        </>
                                    )
                                }
                            </>
                        ) : (
                            <>
                                <div className = "text-center pb-3 pt-lg-2 pt-xl-4 my-1 my-sm-3 my-lg-4">
                                    <h1 className = "display-5">Alternatively</h1>
                                    <p className = "mt-2 pt-2">If you think its too much of a hassle to sign up now, you may also onboard 
                                    through our survey, and we will automatically create an account for you once we offically launch!</p>
                                </div>
                            </>
                        )
                    }
                    
                    
            </section>
        </main>
    );
}

export default Pricing;