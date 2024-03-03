import '../App.css'
import { auth, firestore } from '../firebaseConfig'
import React, { useState, useEffect } from 'react';
import { getDoc, doc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function DashboardSidebar()
{
    const [userData, setUserData] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user)
            {
                setUserEmail(user.email);
                const userDocRef = doc(collection(firestore, 'UserData'), auth.currentUser.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists())
                    setUserData(userDocSnap.data());
            }
        });
        return unsubscribe;
    }, [])

    const handleSignOut = async () =>
    {
        try
        {
            await auth.signOut();
            navigate('/', {replace: true});
        }
        catch (error)
        {
            console.log("Error signing user out: ", error.message);
        }
    }

    return(
        <aside className = "col-lg-3 pe-lg-4 pe-xl-5 mt-n3">
            <div className = "position-lg-sticky top-0">
                <div className = "d-none d-lg-block" style = {{paddingTop: 105}}></div>
                <div className = "offcanvas-lg offcanvas-start" id = "sidebarAccount">
                    <button className = "btn-close position-absolute top-0 end-0 mt-3 me-3 d-lg-none" type = "button" 
                    data-bs-dismiss = "offcanvas" data-bs-target = "#sidebarAccount" aria-label = "close"></button>
                    <div className = "offcanvas-body">
                        <div className = "pb-2 pb-lg-0 mb-4 mb-lg-5">
                            <h3 className = "h5 mb-1">{userData.Name}</h3>
                            <p className = "fs-sm text-body-secondary mb-0">{userEmail}</p>
                        </div>
                        <nav className = "nav flex-column pb-2 pb-lg-4 mb-3">
                            <h4 className = "fs-xs fw-medium text-body-secondary text-uppercase pb-1 mb-2">Account</h4>
                            <a className = "nav-link fw-semibold py-2 px-0 active" href = "dashboard">
                                <i className = "bi bi-person-check fs-5 opacity-60 me-2"></i>
                                Overview
                            </a>
                            <a className = "nav-link fw-semibold py-2 px-0" href = "dashboard-settings">
                                <i className = "bi bi-gear fs-5 opacity-60 me-2"></i>
                                Settings
                            </a>
                        </nav>
                        <nav className = "nav flex-column pb-2 pb-lg-4 mb-3">
                            <h4 className = "fs-xs fw-medium text-body-secondary text-uppercase pb-1 mb-2">Style</h4>
                            <a className = "nav-link fw-semibold py-2 px-0" href = "dashboard-style-preference">
                                <i className = "bi bi-feather2 fs-5 opacity-60 me-2"></i>
                                Style
                            </a>
                            <a className = "nav-link fw-semibold py-2 px-0" href = " ">
                                <i className = "bi bi-hand-thumbs-up fs-5 opacity-60 me-2"></i>
                                Recommendations
                                <span className = "badge bg-primary ms-1">coming soon!</span>
                            </a>
                            <a className = "nav-link fw-semibold py-2 px-0" href = " ">
                                <i className = "bi bi-basket2 fs-5 opacity-60 me-2"></i>
                                Marketplace
                                <span className = "badge bg-primary ms-1">coming soon!</span>
                            </a>
                            <a className = "nav-link fw-semibold py-2 px-0" href = " ">
                                <i className = "bi bi-heart fs-5 opacity-60 me-2"></i>
                                Favorites
                                <span className = "badge bg-primary ms-1">coming soon!</span>
                            </a>
                        </nav>
                        <nav className = "nav flex-column">
                            <a className = "nav-link fw-semibold py-2 px-0" href = "/" onClick = {handleSignOut}>
                                <i className = "bi bi-arrow-bar-right opacity-60 me-2"></i>
                                Sign out
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default DashboardSidebar;