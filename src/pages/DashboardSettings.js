import '../App.css'
import { auth, firestore } from '../firebaseConfig'
import React, { useState, useEffect } from 'react';
import { getDoc, doc, collection, updateDoc } from 'firebase/firestore';
import PostSignInNav from './PostSignInNav';
import DashboardSidebar from './DashboardSidebar';
import countries from "../Location";

function DashboardSettings()
{
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [ethnicity, setEthnicity] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [height_ft, setHeightFt] = useState("");
    const [height_in, setHeightIn] = useState("");
    const [weight, setWeight] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user)
            {
                const userDocRef = doc(collection(firestore, 'UserData'), auth.currentUser.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists())
                {
                    const userData = userDocSnap.data();
                    setFirstName(userData.Name_First);
                    setLastName(userData.Name_Last)
                    setGender(userData.Gender);
                    setEthnicity(userData.Ethnicity);
                    setCountry(userData.Country);
                    setCity(userData.City);
                    setHeightFt(userData.Height_ft);
                    setHeightIn(userData.Height_in);
                    setWeight(userData.Weight);
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

    const handleSaveChanges = async() => {
        try
        {
            const user = auth.currentUser;
            const userDocRef = doc(firestore, 'UserData', user.uid);
            await updateDoc(userDocRef, {
                Name_First: firstName,
                Name_Last: lastName,
                Name: `${firstName} ${lastName}`,
                Gender: gender,
                Ethnicity: ethnicity,
                Height_ft: height_ft,
                Height_in: height_in,
                Weight: weight
            });

            alert("Changes saved successfully");
        }
        catch (error)
        {
            console.log("Error updating document: ", error.message);
        }
    }

    return(
        <main className = "page-wrapper">
            <PostSignInNav/>
            <div className = "container py-5 mt-4 mt-lg-5 mb-lg-4 my-xl-5">
                <div className = "row pt-sm-2 pt-lg-0">
                    <DashboardSidebar/>
                    <div className = "col-lg-9 pt-4 pb-2 pb-sm-4">
                        <h1 className = "h2 mb-4">Settings</h1>
                        <section className = "card border-0 py-1 p-md-2 p-xl-3 p-xxl-4 mb-4">
                            <div className = "card-body">
                                <div className = "d-flex align-items-center mt-sm-n1 pb-4 mb-0 mb-lg-1 mb-xl-3">
                                    <i className = "bi bi-person text-primary lead pe-1 me-2"></i>
                                    <h2 className = "h4 mb-0">Basic Info</h2>
                                </div>
                                <div className = "row g-3 g-sm-4 mt-0 mt-lg-2">
                                    <div className = "col-lg-6">
                                        <label for = "firstName" className = "form-label">First name</label>
                                        <input id = "firstName" className = "form-control" type = "text" value = {firstName} onChange = {(e) => setFirstName(e.target.value)}></input>
                                    </div>
                                    <div className = "col-lg-6">
                                        <label for = "lastName" className = "form-label">Last name</label>
                                        <input id = "lastName" className = "form-control" type = "text" value = {lastName} onChange = {(e) => setLastName(e.target.value)}></input>
                                    </div>
                                    <div className = "col-lg-6">
                                        <label for = "gender" className = "form-label">Gender</label>
                                        <select id = "gender" className = "form-select" value = {gender} onChange = {(e) => setGender(e.target.value)}>
                                            <option value = "Male">Male</option>
                                            <option value = "Female">Female</option>
                                            <option value = "Non-binary">Non-binary</option>
                                            <option value = "Others">Others</option>
                                            <option value = "Prefer not to say">Prefer not to say</option>
                                        </select>
                                    </div>
                                    <div className = "col-lg-6">
                                        <label for = "ethnicity" className = "form-label">Ethnicity</label>
                                        <select id = "ethnicity" className = "form-select" value = {ethnicity} onChange = {(e) => setEthnicity(e.target.value)}>
                                            <option value = "Native American">Native American</option>
                                            <option value = "Asian Descent">Asian Descent</option>
                                            <option value = "African Descent">African Descent</option>
                                            <option value = "Native Hawaiian or Other Pacific Islander">Native Hawaiian or Other Pacific Islander</option>
                                            <option value = "European Descent">European Descent</option>
                                            <option value = "Mixed Ethnicity">Mixed Ethnicity</option>
                                        </select>
                                    </div>
                                    <div className = "col-lg-6">
                                        <label for = "country" className = "form-label">Country</label>
                                        <select id = "country" className = "form-select" value = {country} onChange = {(e) => setCountry(e.target.value)}>
                                            {
                                                countries.map((_country, index) => (
                                                    <option key = {index} value = {_country}>{_country}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className = "col-lg-6">
                                        <label for = "city" className = "form-label">City</label>
                                        <input id = "city" className = "form-control" value = {city} onChange = {(e) => setCity(e.target.value)}></input>
                                    </div>
                                    <div className = "col-12 d-flex justify-content-end pt-3">
                                        <button className = "btn btn-primary ms-3" onClick = {handleSaveChanges}>Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className = "card border-0 py-1 p-md-2 p-xl-3 p-xxl-4 mb-4">
                            <div className = "card-body">
                                <div className = "d-flex align-items-center mt-sm-n1 pb-4 mb-0 mb-lg-1 mb-xl-3">
                                    <i className = "bi bi-person-badge text-primary lead pe-1 me-2"></i>
                                    <h2 className = "h4 mb-0">Bio Info</h2>
                                </div>
                                <div className = "row g-3 g-sm-4 mt-0 mt-lg-2">
                                    <div className = "col-lg-4">
                                        <label for = "height_ft" className = "form-label">Height (ft)</label>
                                        <input id = "height_ft" className = "form-control" type = "number" value = {height_ft} onChange = {(e) => setHeightFt(e.target.value)}></input>
                                    </div>
                                    <div className = "col-lg-4">
                                        <label for = "height_in" className = "form-label">Height (in)</label>
                                        <input id = "height_in" className = "form-control" type = "number" value = {height_in} onChange = {(e) => setHeightIn(e.target.value)}></input>
                                    </div>
                                    <div className = "col-lg-4">
                                        <label for = "weight" className = "form-label">Weight (lbs)</label>
                                        <input id = "weight" className = "form-control" type = "number" value = {weight} onChange = {(e) => setWeight(e.target.value)}></input>
                                    </div>
                                    <div className = "col-12 d-flex justify-content-end pt-3">
                                        <button className = "btn btn-primary ms-3" onClick = {handleSaveChanges}>Save changes</button>
                                    </div>
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

export default DashboardSettings;