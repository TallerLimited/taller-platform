import { auth } from '../firebaseConfig'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PreSignInNav from './PreSignInNav';
import PostSignInNav from './PostSignInNav'
import logo from '../logo_design_1.png'
import thumbnail1 from '../thumbnail-1.png'
import video from '../video.mp4'  


function Home()
{
    const [userEmail, setUserEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user)
                setUserEmail(user.email);
            else
                setUserEmail(null);
        });

        return ()=> unsubscribe();
    }, []);

    const handleDashboardRouting = () =>
    {
        navigate('/dashboard');
    }

    const handleSignUpRouting = () =>
    {
        navigate('/signup');
    }

    return(
        <>
            <main className = "page-wrapper">
                {userEmail ? (<PostSignInNav/>) : (<PreSignInNav/>)}
                <section className = "overflow-hidden">
                    <div className = "container pt-2 pt-sm-4 pb-sm-2 pb-md-4 py-xl-5 mt-5">
                        <div className = "row align-items-center py-5 mt-md-2 my-lg-3 my-xl-4 my-xxl-5">
                            <div className = "col-lg-7 order-lg-2 d-flex justify-content-center justify-content-lg-end mb-4 mb-md-5 mb-lg-0 pb-3 pb-md-0">
                                <iframe
                                    width = "100%"
                                    height = "325"
                                    src = {video}
                                    title = "Your Embedded Video"
                                    frameBorder="0"
                                    allow = "autoplay; encrypted-media"
                                    allowFullScreen
                                    autoPlay
                                ></iframe>
                            </div>
                            <div className = "col-lg-5 order-lg-1">
                                <h1 className = "display-3 text-center text-lg-start pb-sm-2 pb-md-3">
                                    <span>Discover a World</span>
                                    <span className = "text-info fw-bold"> Tailored for You</span>
                                </h1>
                                <p className = "fs-lg text-center text-lg-start pb-xl-2 mx-auto mx-lg-0 mb-5">
                                    Your Height, Your Strength - Join us and shape the future
                                </p>
                                <div className = "d-flex justify-content-center mx-auto mx-lg-0" style = {{maxWidth: 420}}>
                                    {
                                        userEmail ? (
                                            <button className = "btn btn-primary" type = "button" onClick = {handleDashboardRouting}>Go to your dashboard</button>
                                        ) : (
                                            <button className = "btn btn-primary" type = "button" onClick = {handleSignUpRouting}>Create an account now</button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className = "overflow-hidden">
                    <div className = "container pt-2 pt-sm-4 pb-sm-2 pb-md-4 py-xl-5 mt-5">
                        <div className = "row align-items-center py-5 mt-md-2 my-lg-3 my-xl-4 my-xxl-5">
                            <div className = "col-lg-6 order-lg-2 d-flex justify-content-center justify-content-lg-end ms-lg-3 mb-4 mb-md-5 mb-lg-0 pb-3 pb-md-0">
                                    <img className src = {thumbnail1} alt = "thumbnail" height = "250px"></img>
                            </div>
                            <div className = "col-lg-5 order-lg-1">
                                <h1 className = "display-3 text-center lg-start pb-sm-2 pb-md-3">
                                    <span>Introducing your Taller experience</span>
                                </h1>
                                <p className = "fs-lg text-center text-lg-start pb-xl-2 mx-auto mx-lg-0 mb-5">
                                    Your go-to platform when it comes to solving your tall clothing problems.
                                </p>
                                <div className = "d-flex justify-content-center mx-auto mx-lg-0">
                                    <button className = "btn btn-primary btn-lg" type = "button">Learn more</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className = "container py-5">
                    <h2 className  = "h1 text-center">The Taller Experience</h2>
                    <p className = "text-center pb-4 mb-2 mb-lg-3 mx-auto" style = {{maxWidth: 998}}>Being tall can sometimes be frustrating when it comes to finding QoL(Quality of Life) 
                    products and services. The Taller Experience aims to bring you a platform where you can find solutions to finding products and 
                    services that is catered specifically to you, or those that includes you, starting with the way you dress. Our goal is for you to be able to show off your height 
                    with pride and create an inclusive community and society for tall individuals, regardless of who they are.
                    </p>
                    <p className = "text-center pb-4 mb-2 mb-lg-3 mx-auto fw-bold">Check out the list of features we are currently working and releasing in the near future below.</p>
                </section>
                <section className = "container py-5">
                    <h2 className = "h1 text-center">Platform features</h2>
                    <p className = "text-center pb-4 mb-2 mb-lg-3">Our platform provides a wide range of features that caters to all your tall needs</p>
                    <div className = "row row-cols-1 row-cols-sm-2 row-cols-lg-3 g4">
                        <div className = "col">
                            <a className = "card card-hover-primary border-0 h-100 text-decoration-none" href = " ">
                                <div className = "card-body pb-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className = "d-block text-primary mb-4 bi bi-feather2" viewBox="0 0 16 16">
                                        <path d="M7.5 1.063v9.556L6 8.819V3a2 2 0 0 1 1.5-1.937M8 0a3 3 0 0 0-3 3v6a.5.5 0 0 0 .116.32L7.5 12.181V15.5a.5.5 0 0 0 1 0v-3.319l2.384-2.86A.5.5 0 0 0 11 9V3a3 3 0 0 0-3-3m.5 1.063A2 2 0 0 1 10 3v.293l-1.5 1.5zM10 4.707V8.82l-1.5 1.8V6.207z"/>
                                    </svg>
                                    <h3 className = "h4 card-title mt-0">Personalized Profile</h3>
                                    <p className = "card-text">Tailored recommendations, style guides, and more, crafted to fit your unique measurements and preferences.</p>
                                </div>
                            </a>
                        </div>
                        <div className = "col">
                            <a className = "card card-hover-primary border-0 h-100 text-decoration-none" href = " ">
                                <div className = "card-body pb-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="d-block text-primary mb-4 bi bi-basket2" viewBox="0 0 16 16">
                                        <path d="M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0z"/>
                                        <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6z"/>
                                    </svg>
                                    <h3 className = "h4 card-title mt-0">Marketplace<spans className = "badge bg-primary ms-1">coming soon!</spans></h3>
                                    <p className = "card-text">Curated shopping experiences with brands that cater specifically to tall individuals, making 
                                    it easier than ever to find clothes that fit and flatter.</p>
                                </div>
                            </a>
                        </div>
                        <div className = "col">
                            <a className = "card card-hover-primary border-0 h-100 text-decoration-none" href = " ">
                                <div className = "card-body pb-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="d-block text-primary mb-4 bi bi-share" viewBox="0 0 16 16">
                                        <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"/>
                                    </svg>
                                    <h3 className = "h4 card-title mt-0">Social Media Feed <span className = "badge bg-primary ms-1">Coming soon!</span></h3>
                                    <p className = "card-text">A dedicated space to connect, share, and engage with the tall community, from local 
                                    meetups to global discussions.</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <footer className = "footer pt-lg-5 pt-4 pb-5">
                <div className = "container pt-3 mt-md-2 mt-lg-3">
                    <div className = "row gy-md-5 gy-4 mb-md-5 mb-4 pb-lg-2">
                        <div className = "col-lg-3">
                            <a className = "navbar-brand d-inline-flex align-items-center mb-lg-4 mb-3" href = " ">
                                <img src = {logo} alt = "Taller" width = "80" height = "40"></img>
                            </a> 
                            <p className = "mb-4 pb-lg-1 fs-xs text-body-secondary" style = {{maxWidth: 306}}>Your platform that solves everything tall</p>
                            <div className = "d-flex mt-n3 ms-n3">
                                <a className = "btn btn-secondary btn-icon btn-sm btn-facebook rounded-circle mt-3 ms-3" href = "https://www.facebook.com/tallerthebrand/" aria-label = "Facebook">
                                    <i className = "bi bi-facebook"></i>
                                </a>
                                <a className = "btn btn-secondary btn-icon btn-sm btn-instagram rounded-circle mt-3 ms-3" href = "https://www.instagram.com/tallerthebrand/" aria-label = "Instagram">
                                    <i className = "bi bi-instagram"></i>
                                </a>
                                <a className = "btn btn-secondary btn-icon btn-sm btn-linkedin rounded-circle mt-3 ms-3" href = "https://www.linkedin.com/company/taller-limited/" aria-label = "LinkedIn">
                                    <i className = "bi bi-linkedin"></i>
                                </a>
                            </div>
                        </div>
                        <div className = "col-xl-8 offset-xl-1 col-lg-9">
                            <div className = "row row-cols-sm-4 row-cols-1">
                                <div className = "col"></div>
                                <div className = "col"></div>
                                <div className = "col"></div>
                                <div className = "col">
                                    <ul className = "nav flex-column mb-0">
                                        <li className = "nav-item mb-2">
                                            <a className = "nav-link p-0" href = " ">+&nbsp;(844)&nbsp;983-3202</a>
                                        </li>
                                        <li className = "nav-item mb-2">
                                            <a className = "text-primary fw-semibold p-0" href = " ">info@tallerlimited.com</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
        
    );
}

export default Home;