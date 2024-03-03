import '../App.css'
import { auth, firestore } from '../firebaseConfig'
import React, { useState, useEffect } from 'react';
import { getDoc, doc, collection, updateDoc } from 'firebase/firestore';
import PostSignInNav from './PostSignInNav';
import DashboardSidebar from './DashboardSidebar';

function DashboardTailorMeasurementsSettings()
{
    const [neckMeasurement, setNeckMeasurement] = useState();
    const [chestMeasurement, setChestMeasurement] = useState();
    const [sleevesMeasurement, setSleevesMeasurement] = useState();
    const [waistMeasurement, setWaistMeasurement] = useState();
    const [hipsMeasurement, setHipsMeasurement] = useState();
    const [inseamMeasurement, setInseamMeasurement] = useState();

    const [occupation, setOccupation] = useState();
    const [otherOccupation, setOtherOccupation] = useState();
    const [sports, setSports] = useState();
    const [hobbies, setHobbies] = useState();
    const [stylePreference, setStylePreference] = useState();
    const [colorPreference, setColorPreference] = useState();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user)
            {
                const userDocRef = doc(collection(firestore, 'UserData'), auth.currentUser.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists())
                {
                    const userData = userDocSnap.data();

                    setNeckMeasurement(userData._Tailor_Measurements_Neck);
                    setChestMeasurement(userData._Tailor_Measurements_Chest);
                    setSleevesMeasurement(userData._Tailor_Measurements_Sleeves);
                    setWaistMeasurement(userData._Tailor_Measurements_Waist);
                    setHipsMeasurement(userData._Tailor_Measurements_Hips);
                    setInseamMeasurement(userData._Tailor_Measurements_Inseam);

                    setOccupation(userData.Occupation);
                    setOtherOccupation(userData.Occupation_Other);
                    setSports(userData.Sports);
                    setHobbies(userData.Hobbies);
                    setStylePreference(userData.Style_Preference);
                    setColorPreference(userData.Color);
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
                _Tailor_Measurements_Neck: neckMeasurement,
                _Tailor_Measurements_Chest: chestMeasurement,
                _Tailor_Measurements_Sleeves: sleevesMeasurement,
                _Tailor_Measurements_Waist: waistMeasurement,
                _Tailor_Measurements_Hips: hipsMeasurement,
                _Tailor_Measurements_Inseam: inseamMeasurement,

                Occupation: occupation,
                Occupation_Other: otherOccupation,
                Sports: sports,
                Hobbies: hobbies,
                Style_Preference: stylePreference,
                Color: colorPreference
            });

            alert("Changes saved successfully");
        }
        catch (error)
        {
            console.log("Error updating document: ", error.message);
        }
    }

    const handleOccupationChange = (e) =>
    {
        const selectedOccupation = e.target.value;
        setOccupation(selectedOccupation);

        if (selectedOccupation !== 'Others')
            setOtherOccupation('');
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
                                    <h2 className = "h4 mb-0">Measurements</h2>
                                </div>
                                <div className = "row g-3 g-sm-4 mt-0 mt-lg-2">
                                    <div className = "col-lg-4">
                                        <label for = "neckMeasurement" className = "form-label">Neck</label>
                                        <input id = "neckMeasurement" className = "form-control" type = "text" value = {neckMeasurement} onChange = {(e) => setNeckMeasurement(e.target.value)}></input>
                                    </div>
                                    <div className = "col-lg-4">
                                        <label for = "chestMeasurement" className = "form-label">Chest</label>
                                        <input id = "chestMeasurement" className = "form-control" type = "text" value = {chestMeasurement} onChange = {(e) => setChestMeasurement(e.target.value)}></input>
                                    </div>
                                    <div className = "col-lg-4">
                                        <label for = "sleevesMeasurement" className = "form-label">Sleeves</label>
                                        <input id = "sleevesMeasurement" className = "form-control" type = "text" value = {sleevesMeasurement} onChange = {(e) => setSleevesMeasurement(e.target.value)}></input>
                                    </div>
                                    <div className = "col-lg-4">
                                        <label for = "waistMeasurement" className = "form-label">Waist</label>
                                        <input id = "waistMeasurement" className = "form-control" type = "text" value = {waistMeasurement} onChange = {(e) => setWaistMeasurement(e.target.value)}></input>
                                    </div>
                                    <div className = "col-lg-4">
                                        <label for = "hipsMeasurement" className = "form-label">Hips</label>
                                        <input id = "hipsMeasurement" className = "form-control" type = "text" value = {hipsMeasurement} onChange = {(e) => setHipsMeasurement(e.target.value)}></input>
                                    </div>
                                    <div className = "col-lg-4">
                                        <label for = "inseamMeasurement" className = "form-label">Inseam</label>
                                        <input id = "inseamMeasurement" className = "form-control" type = "text" value = {inseamMeasurement} onChange = {(e) => setInseamMeasurement(e.target.value)}></input>
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
                                    <h2 className = "h4 mb-0">Activities and Style Preferences</h2>
                                </div>
                                <div className = "row g-3 g-sm-4 mt-0 mt-lg-2">
                                    <div className = "col-lg-6">
                                        <label for = "style-preferences" className = "form-label">Style Preference</label>
                                        <select id = "style-preferences" className = "form-select form-select-lg" value = {stylePreference} required onChange = {(e) => setStylePreference(e.target.value)}>
                                            <option value = "No preference">No preference</option>
                                            <option value = "Streetwear">Streetwear</option>
                                            <option value = "Comfort">Comfort</option>
                                            <option value = "Classic casual">Classic casual</option>
                                            <option value = "Minimalist casual">Minimalist casual</option>
                                            <option value = "Retro">Retro</option>
                                            <option value = "Work wear">Work wear</option>
                                            <option value = "Formal wear">Formal wear</option>
                                            <option value = "Sporting">Sporting</option>
                                        </select>
                                    </div>
                                    <div className = "col-lg-6">
                                        <label for = "colors" className = "form-label">Color Preference</label>
                                        <select id = "colors" className = "form-select form-select-lg" value = {colorPreference} required onChange = {(e) => setColorPreference(e.target.value)}>
                                            <option value = "Cool">Cool colors</option>
                                            <option value = "Fresh">Fresh colors</option>
                                            <option value = "Sunny">Sunny colors</option>
                                            <option value = "Warm">Warm colors</option>
                                            <option value = "Earthy">Earthy colors</option>
                                            <option value = "Monochromatics">Monochromatics</option>
                                        </select>
                                    </div>
                                    <div className = "col-lg-6">
                                        <label for = "occupation" className = "form-label">Occupation</label>
                                        <select id = "occupation" className = "form-select form-select-lg" value = {occupation} required onChange = {handleOccupationChange}>
                                            <option value = "Agriculture">Agriculture</option>
                                            <option value = "Utilities">Utilities</option>
                                            <option value = "Finance">Finance</option>
                                            <option value = "Business">Business</option>
                                            <option value = "Entertainment">Entertainment</option>
                                            <option value = "Education">Education</option>
                                            <option value = "Health care">Health care</option>
                                            <option value = "Information services">Information services</option>
                                            <option value = "Data processing">Data processing</option>
                                            <option value = "Food services">Food services</option>
                                            <option value = "Hotel services">Hotel services</option>
                                            <option value = "Legal services">Legal services</option>
                                            <option value = "Publishing">Publishing</option>
                                            <option value = "Military">Military</option>
                                            <option value = "Others">Others</option>
                                            <option value = "None">Prefer not to say</option>
                                        </select>
                                    </div>
                                    {
                                        occupation === 'Others' && (
                                            <div className = "col-lg-6">
                                                <label for = "otherOccupation" className = "form-label fs-base">Other occupation</label>
                                                <input id = "otherOccupation" className = "form-control form-control-lg" type = "text" value = {otherOccupation} onChange = {(e) => setOtherOccupation(e.target.value)}></input>
                                            </div>
                                        )
                                    }
                                    <div className = "col-lg-6">
                                        <label for = "sports" className = "form-label">Sports</label>
                                        <select id = "sports" className = "form-select form-select-lg" value = {sports} required onChange = {(e) => setSports(e.target.value)}>
                                            <option value = "Basketball">Basketball</option>
                                            <option value = "Football">Football</option>
                                            <option value = "Soccer">Soccer</option>
                                            <option value = "Tennis">Tennis</option>
                                            <option value = "Badminton">Badminton</option>
                                            <option value = "Golf">Golf</option>
                                            <option value = "None">I don't play sports actively</option>
                                        </select>
                                    </div>
                                    <div className = "col-lg-6">
                                        <label for = "hobbies" className = "form-label">Hobbies</label>
                                            <select id = "hobbies" className = "form-select form-select-lg" value = {hobbies} required onChange = {(e) => setHobbies(e.target.value)}>
                                            <option value = "Biking">Biking</option>
                                            <option value = "Fashion Design">Fashion Design</option>
                                            <option value = "Crafts">Crafts</option>
                                            <option value = "Travelling">Travelling</option>
                                            <option value = "Camping">Camping</option>
                                            <option value = "Gourmet food">Gourmet food</option>
                                            <option value = "Physical fitness">Physical fitness</option>
                                            <option value = "Music">Music</option>
                                            <option value = "Sewing">Sewing</option>
                                            <option value = "Art">Art</option>
                                            <option value = "Antiques">Antiques</option>
                                            <option value = "Reading">Reading</option>
                                            <option value = "None">Prefer not to say</option>
                                        </select>
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

export default DashboardTailorMeasurementsSettings;