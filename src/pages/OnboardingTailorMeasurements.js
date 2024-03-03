import "../App.css"
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, firestore } from '../firebaseConfig'
import { doc, updateDoc } from 'firebase/firestore';

function OnboardingTailorMeasurements()
{
    // const [formVisible, setFormVisible] = useState(true);
    const navigate = useNavigate();

    const [neck, setNeck] = useState("Not set");
    const [chest, setChest] = useState("Not set");
    const [sleeves, setSleeves] = useState("Not set");
    const [waist, setWaist] = useState("Not set");
    const [hips, setHips] = useState("Not set");
    const [inseam, setInseam] = useState("Not set");


    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        
        const user = auth.currentUser;
        if (user)
        {
            const userDocRef = doc(firestore, "UserData", user.uid);
            await updateDoc(userDocRef, {   
                _Tailor_Measurements_Neck: neck,
                _Tailor_Measurements_Chest: chest,
                _Tailor_Measurements_Sleeves: sleeves,
                _Tailor_Measurements_Waist: waist,
                _Tailor_Measurements_Hips: hips,
                _Tailor_Measurements_Inseam: inseam
            });
        }

        navigate('/onboarding-style', {replace: true});
    }

    const handleSubmitAlt = async (e) =>
    {
        e.preventDefault();

        const user = auth.currentUser;
        if (user)
        {
            const userDocRef = doc(firestore, "UserData", user.uid);
            await updateDoc(userDocRef, {
                _Tailor_Measurements_Neck: neck,
                _Tailor_Measurements_Chest: chest,
                _Tailor_Measurements_Sleeves: sleeves,
                _Tailor_Measurements_Waist: waist,
                _Tailor_Measurements_Hips: hips,
                _Tailor_Measurements_Inseam: inseam
            })
        }

        navigate('/onboarding-sizes', {replace: true});
    }

    return(
        <main className = "page-wrapper">
            <div className = "d-lg-flex justify-content-center position-relative h-100">
                <div className = "d-flex flex-column align-items-center w-lg-60 h-100 px-3 px-lg-5 pt-4">
                    <div className = "w-100 mt-5" style = {{maxWidth: 526}}>
                        <h1 className = "display-6 text-center mb-3 mb-lg-4">Let us know your tailor sizing</h1>
                        <p className = "text-center mb-4">These are the measurements you get when you visit a tailor. This is important 
                        for us to work out and recommend the clothes that best fits you personally.</p>
                        <form className = "needs-validation" onSubmit = {handleSubmit}>
                            <div className = "row row-cols-1 row-cols-sm-3">
                                <div className = "col mb-4">
                                    <label for = "neck-measurement" className = "form-label fs-base">Neck</label>
                                    <input id = "neck-measurement" className = "form-control form-control-lg" type = "number" onChange = {(e) => setNeck(e.target.value)}></input>
                                </div>
                                <div className = "col mb-4">
                                    <label for = "chest-measurement" className = "form-label fs-base">Chest</label>
                                    <input id = "chest-measurement" className = "form-control form-control-lg" type = "number" onChange = {(e) => setChest(e.target.value)}></input>
                                </div>
                                <div className = "col mb-4">
                                    <label for = "sleeve-measurment" className = "form-label fs-base">Sleeves</label>
                                    <input id = "sleeve-measurement" className = "form-control form-control-lg" type = "number" onChange = {(e) => setSleeves(e.target.value)}></input>
                                </div>
                            </div>
                            <div className = "row row-cols-1 row-cols-sm-3">
                                <div className = "col mb-4">
                                    <label for = "waist-measurement" className = "form-label fs-base">Waist</label>
                                    <input id = "waist-measurement" className = "form-control form-control-lg" type = "number" onChange = {(e) => setWaist(e.target.value)}></input>
                                </div>
                                <div className = "col mb-4">
                                    <label for = "hips-measurement" className = "form-label fs-base">Hips</label>
                                    <input id = "hips-measurement" className = "form-control form-control-lg" type = "number" onChange = {(e) => setHips(e.target.value)}></input>
                                </div>
                                <div className = "col mb-4">
                                    <label for = "inseam-measurement" className = "form-label fs-base">In Seam</label>
                                    <input id = "inseam-measurement" className = "form-control form-control-lg" type = "number" onChange = {(e) => setInseam(e.target.value)}></input>
                                </div>
                            </div>
                            <button className = "btn btn-lg btn-primary w-100 mb-4" type = "submit">Save and continue</button>
                        </form>
                        <p className = "text-center mb-4">If you don't know your measurements though, that's okay! Just click on the button below</p>
                        <button className = "btn btn-lg btn-outline-primary w-100 mb-5" type = "submit" onClick = {handleSubmitAlt}>I don't know my measurements</button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default OnboardingTailorMeasurements;