import '../App.css'
import { auth, firestore } from '../firebaseConfig'
import React, { useState, useEffect } from 'react';
import { getDoc, doc, collection } from 'firebase/firestore';
import DashboardSidebar from './DashboardSidebar'
import PostSignInNav from './PostSignInNav';

function Dashboard()
{
    const [userData, setUserData] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userBirthday, setUserBirthday] = useState("");
    const [birthdayString, setBirthdayString] = useState();

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
                }
                else
                {
                    console.error("User data does not exist");
                }

                setUserBirthday(userData.Birthday);

                if (typeof userBirthday === 'string')
                {
                    const month = userBirthday.slice(0, 2);
                    const day = userBirthday.slice(2, 4);
                    const year = userBirthday.slice(4, 8);

                    var monthString = "";
                    switch (month)
                    {
                        case '01': monthString = "January"; break;
                        case '02': monthString = "February"; break;
                        case '03': monthString = "March"; break;
                        case '04': monthString = "April"; break;
                        case '05': monthString = "May"; break;
                        case '06': monthString = "June"; break;
                        case '07': monthString = "July"; break;
                        case '08': monthString = "August"; break;
                        case '09': monthString = "September"; break;
                        case "10": monthString = "October"; break;
                        case "11": monthString = "November"; break;
                        case "12": monthString = "December"; break;
                        default: monthString = "null"
                    }

                    setBirthdayString(`${day} ${monthString} ${year}`);
                }
            }
            else
            {
                console.log("User not detected");
            }
        });

        return ()=> unsubscribe();
        // eslint-disable-next-line
    });

    return(
        <main className = "page-wrapper">
            <PostSignInNav/>
            <div className = "container py-5 mt-4 mt-lg-5 mb-lg-4 my-xl-5">
                <div className = "row pt-sm-2 pt-lg-0">
                    <DashboardSidebar/>
                    <div className = "col-lg-9 pt-4 pb-2 pb-sm-4">
                        <h1 className = "h2 mb-4">Overview</h1>
                        <section className = "card border-0 py-1 p-md-2 p-xl-3 p-xxl-4 mb-4">
                            <div className = "card-body">
                                <div className = "d-flex align-items-center mt-sm-n1 pb-4 mb-0 mb-lg-1 mb-xl-3">
                                    <i className = "bi bi-person text-primary lead pe-1 me-2"></i>
                                    <h2 className = "h4 mb-0">Basic Info</h2>
                                    <a className = "btn btn-sm btn-secondary ms-auto" href = "dashboard-settings">
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
                                <div className = "row py-4 mb-2 mb-sm-3 ">
                                    <div className = "col-md-6 mb-4 mb-md-0">
                                        <table class = "table mb-0">
                                            <tbody>
                                                <tr>
                                                    <td className = "border-0 text-body-secondary py-1 px-0">Gender</td>
                                                    <td className = "border-0 text-dark fw-medium py-1 ps-3">{userData.Gender}</td>
                                                </tr>
                                                <tr>
                                                    <td className = "border-0 text-body-secondary py-1 px-0">Ethnicity</td>
                                                    <td className = "border-0 text-dark fw-medium py-1 ps-3">{userData.Ethnicity}</td>
                                                </tr>
                                                <tr>
                                                    <td className = "border-0 text-body-secondary py-1 px-0">Height</td>
                                                    <td className = "border-0 text-dark fw-medium py-1 ps-3">{userData.Height_ft} ft {userData.Height_in} in</td>
                                                </tr>
                                                <tr>
                                                    <td className = "border-0 text-body-secondary py-1 px-0">Weight</td>
                                                    <td className = "border-0 text-dark fw-medium py-1 ps-3">{userData.Weight} lbs</td>
                                                </tr>
                                                <tr>
                                                    <td className = "border-0 text-body-secondary py-1 px-0">Birthday</td>
                                                    <td className = "border-0 text-dark fw-medium py-1 ps-3">{birthdayString}</td>
                                                </tr>
                                                <tr>
                                                    <td className = "border-0 text-body-secondary py-1 px-0">Country</td>
                                                    <td className = "border-0 text-dark fw-medium py-1 ps-3">{userData.Country}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {
                                        userData.HasUserPreRegistered ? (
                                            <></>
                                        ) : 
                                        (
                                            <div className = "col-md-6 d-md-flex justify-content-center">
                                                <div className = "w-100 border rounded-3 p-4">
                                                    <h4 className = "h5 lh-base mb-3">Preregister now to gain full access</h4>
                                                    <a className = "btn btn-primary btn-sm" href = "pricing">Preregister</a>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
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

export default Dashboard;