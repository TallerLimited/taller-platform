import '../App.css'
import { auth, firestore } from '../firebaseConfig'
import React, { useState, useEffect } from 'react';
import { getDoc, doc, collection } from 'firebase/firestore';
import PostSignInNav from './PostSignInNav';
import DashboardSidebar from './DashboardSidebar';

// Color palette imports
import cool_1 from '../clothes_color_palettes/cool-1.png'
import fresh_1 from '../clothes_color_palettes/fresh-1.png'
import sunny_1 from '../clothes_color_palettes/sunny-1.png'
import warm_1 from '../clothes_color_palettes/warm-1.png'
import earthy_1 from '../clothes_color_palettes/earthy-1.png'
import monochromatic from '../clothes_color_palettes/monochromatic.png'

function DashboardStylePreference()
{
    const [userData, setUserData] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userColorPref, setUserColorPref] = useState();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user)
            {
                setUserEmail(user.email);
                const userDocRef = doc(collection(firestore, 'UserData'), auth.currentUser.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists())
                {
                    const userData = userDocSnap.data();
                    setUserData(userData);

                    switch (userData.Color)
                    {
                        case 'Cool': setUserColorPref(cool_1); break;
                        case 'Fresh': setUserColorPref(fresh_1); break;
                        case 'Sunny': setUserColorPref(sunny_1); break;
                        case 'Warm': setUserColorPref(warm_1); break;
                        case 'Earthy': setUserColorPref(earthy_1); break;
                        case 'Monochromatics': setUserColorPref(monochromatic); break;
                        default: setUserColorPref(null);
                    }
                }
                else
                {
                    console.error("User data does not exist");
                }
            }
            else
            {
                console.log("User not detected");
            }
        });

        return ()=> unsubscribe();
        // eslint-disable-next-line
    }, []);

    return(
        <main className = "page-wrapper">
            <PostSignInNav/>
            <div className = "container py-5 mt-4 mt-lg-5 mb-lg-4 my-xl-5">
                <div className = "row pt-sm-2 pt-lg-0">
                    <DashboardSidebar/>
                    <div className = "col-lg-9 pt-4 pb-2 pb-sm-4">
                        <h1 className = "h2 mb-4">Styling Preferences</h1>
                        <section className = "card border-0 py-1 p-md-2 p-xl-3 p-xxl-4 mb-4">
                            <div className = "card-body">
                                <div className = "d-flex align-items-center mt-sm-n1 pb-4 mb-0 mb-lg-1 mb-xl-3">
                                    <i className = "bi bi-feather2 text-primary lead pe-1 me-2"></i>
                                    <h2 className = "h4 mb-0">Style</h2>
                                    <a className = "btn btn-sm btn-secondary ms-auto" href = "dashboard-tailor-measurements-settings">
                                        <i className = "bi bi-pen ms-n1 me-2"></i>
                                        Edit info
                                    </a>
                                </div>
                                <div className = "d-md-flex align-items-center">
                                    <div className = "pt-3 pt-sm-0 ps-sm-3">
                                        <h3 className = "h5 mb-2">{userData.Name}</h3>
                                        <div className = "text-body-secondary fw-medium d-flex flex-wrap flex-sm-nowrap align-items-center">
                                            <div className = "d-flex align-items-center me-3">
                                                <i className = "bi bi-envelope me-1"></i>
                                                {userEmail}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    userData.HasUserPreRegistered ? (
                                        <>
                                            <div className = "row py-4 mb-2 mb-sm-3">
                                                <div className = "col-md-6 mb-4 mb-md-0">
                                                    <h5 className = "h4">Tailor Measurements</h5>
                                                    <table class = "table mb-0">
                                                        <tbody>
                                                            <tr>
                                                                <td className = "border-0 text-body-secondary py-1 px-0">Neck</td>
                                                                <td className = "border-0 text-dark fw-medium py-1 ps-3">{userData._Tailor_Measurements_Neck}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className = "border-0 text-body-secondary py-1 px-0">Chest</td>
                                                                <td className = "border-0 text-dark fw-medium py-1 ps-3">{userData._Tailor_Measurements_Chest}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className = "border-0 text-body-secondary py-1 px-0">Sleeves</td>
                                                                <td className = "border-0 text-dark fw-medium py-1 ps-3">{userData._Tailor_Measurements_Sleeves}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className = "border-0 text-body-secondary py-1 px-0">Waist</td>
                                                                <td className = "border-0 text-dark fw-medium py-1 ps-3">{userData._Tailor_Measurements_Waist}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className = "border-0 text-body-secondary py-1 px-0">Hips</td>
                                                                <td className = "border-0 text-dark fw-medium py-1 ps-3">{userData._Tailor_Measurements_Hips}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className = "border-0 text-body-secondary py-1 px-0">Inseam</td>
                                                                <td className = "border-0 text-dark fw-medium py-1 ps-3">{userData._Tailor_Measurements_Inseam}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className = "col-md-6 mb-4 mb-md-0">
                                                    <h5 className = "h4">Style preference</h5>
                                                    <table className = "table mb-0">
                                                        <tbody>
                                                            <tr>
                                                                <td className = "border-0 text-body-secondary py-1 px-0">Style Preference</td>
                                                                <td className = "border-0 text-dark fw-medium py-1 ps-3">{userData.Style_Preference}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className = "border-0 text-body-secondary py-1 px-0">Style Recommendations</td>
                                                                <td className = "border-0 text-dark fw-medium py-1 ps-3">{userData.Style_Recommendation}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className = "border-0 text-body-secondary py-1 px-0">Color Preference</td>
                                                                <td className = "border-0 text-dark fw-medium py-1 ps-3">{userData.Color}</td>
                                                            </tr>
                                                            <tr>
                                                                <img src = {userColorPref} className = "w-100 img-fluid float-end" alt = "User color choice"></img>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className = "row py-4 mb-2 mb-sm-3">
                                                <div className = "col-md-6 mb-4 mb-md-0">
                                                    <h5 className = "h4">Activies and Hobbies</h5>
                                                    <table className = "table mb-0">
                                                        <tbody>
                                                            <tr>
                                                                <td className = "border-0 text-body-secondary py-1 px-0">Occupation</td>
                                                                <td className = "border-0 text-dark fw-medium py-1 ps-3">{userData.Occupation}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className = "border-0 text-body-secondary py-1 px-0">Sports</td>
                                                                <td className = "border-0 text-dark fw-medium py-1 ps-3">{userData.Sports}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className = "border-0 text-body-secondary py-1 px-0">Hobbies</td>
                                                                <td className = "border-0 text-dark fw-medium py-1 ps-3">{userData.Hobbies}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </>
                                    ) :
                                    (
                                        <div className = "row py-4 mb-2 mb-sm-3">
                                            <div className = "col-md-6 d-md-flex justify-content-center">
                                                <div className = "w-100 border rounded-3 p-4">
                                                    <h4 className = "h5 lh-base mb-3">Preregister now to gain full access</h4>
                                                    <a className = "btn btn-primary btn-sm" href = "pricing">Preregister</a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </section>
                        <button className = "d-lg-none btn btn-sm btn-primary w-100 rounded-0 fixed-bottom" type = "button" data-bs-toggle = "offcanvas" data-bs-target = "#sidebarAccount">
                            <i className = "bi bi-list me-2"></i>
                            Account menu
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default DashboardStylePreference;