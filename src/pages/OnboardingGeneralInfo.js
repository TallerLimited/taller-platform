import "../App.css"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, firestore } from '../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import countries from "../Location";

function OnboardingGeneralInfo()
{
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [ethnicity, setEthnicity] = useState("Native American");
    const [gender, setGender] = useState("Male");
    const [isBirthdayValid, setIsBirthdayValid] = useState(true);
    const [birthday, setBirthday] = useState();
    const [country, setCountry] = useState("United States");
    const [city, setCity] = useState();
    const [height_ft, setHeightFt] = useState();
    const [height_in, setHeightIn] = useState();
    const [weight, setWeight] = useState();

    const navigate = useNavigate();

    const validateBirthday = (birthday) =>
    {
        const pattern = /^(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(19\d{2}|20\d{2})$/;
        return pattern.test(birthday);
    }

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

       const isValid = validateBirthday(birthday)
       setIsBirthdayValid(isValid)

        if (!isValid)
            return;

        const user = auth.currentUser;
        if (user)
        {
            const userDocRef = doc(firestore, "UserData", user.uid);
            await updateDoc (userDocRef, {
                Name_First: firstName,
                Name_Last: lastName,
                Name: `${firstName} ${lastName}`,
                Ethnicity: ethnicity,
                Birthday: birthday.toString(),
                Gender: gender,
                Country: country,
                City: city,
                Height_ft: height_ft,
                Height_in: height_in,
                Weight: weight
            });
        }


        navigate('/onboarding-tailor-measurements', {replace: true});
    }

    return(
        <main className = "page-wrapper">
            <div className = "d-lg-flex justify-content-center position-relative vh-100">
                <div className = "d-flex flex-column align-items-center w-lg-60 h-100 px-3 px-lg-5 pt-4">
                    <div className = "w-100 mt-5" style = {{maxWidth: 526}}>
                        <h1 className = "display-6 text-center mb-3 mb-lg-4">Tell us more about yourself</h1>
                        <p className = "text-center mb-4">Hello! This information will tell us a little more about you, as well as give us
                        a little insight into how we should recommend clothes for you</p>
                        <form className = "needs-validation" onSubmit = {handleSubmit}>
                            <div className = "row row-cols-1 row-cols-sm-2">
                                <div className = "col mb-4">
                                    <label for = "first-name" className = "form-label fs-base">First name</label>
                                    <input id = "first-name" className = "form-control form-control-lg" type = "text" placeholder = "First Name" required onChange = {(e) => setFirstName(e.target.value)}></input>
                                </div>
                                <div className = "col mb-4">
                                    <label for = "last-name" className = "form-label fs-base">Last name</label>
                                    <input id = "last-name" className = "form-control form-control-lg" type = "text" placeholder = "Last Name" required onChange = {(e) => setLastName(e.target.value)}></input>
                                </div>
                            </div>
                            <div className = "mb-4">
                                <label for = "ethnicity" className = "form-label fs-base">Ethnicity</label>
                                <select id = "ethnicity" className = "form-select form-select-lg" onChange = {(e) => setEthnicity(e.target.value)}>
                                    <option value = "Native American" selected>Native American</option>
                                    <option value = "Asian Descent">Asian Descent</option>
                                    <option value = "African Descent">African Descent</option>
                                    <option value = "Native Hawaiian or Other Pacific Islander">Native Hawaiian or Other Pacific Islander</option>
                                    <option value = "European Descent">European Descent</option>
                                    <option value = "Mixed Ethnicity">Mixed Ethnicity</option>
                                </select>
                            </div>
                            <div className = "mb-4">
                                <label for = "gender" className = "form-label fs-base">Gender</label>
                                <select id = "gender" className = "form-select form-select-lg" onChange = {(e) => setGender(e.target.value)}>
                                    <option value = "Male" selected>Male</option>
                                    <option value = "Female">Female</option>
                                    <option value = "Non-binary">Non-binary</option>
                                    <option value = "Others">Others</option>
                                    <option value = "Prefer not to say">Prefer not to say</option>
                                </select>
                            </div>
                            <div className = "mb-4">
                                <label for = "birthday" className = "form-label fs-base">Birthday (mmddyyyy)</label>
                                <input id = "birthday" className = {`form-control form-control-lg ${isBirthdayValid ? '' : 'is-invalid'}`} type = "number" 
                                placeholder = "mmddyyyy" pattern = "(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(19\d{2}|20\d{2})" required onChange = {(e) => setBirthday(e.target.value)}></input>
                                {
                                    !isBirthdayValid &&(
                                        <div className = "invalid-feedback">
                                            Please enter a valid birthdate in mmddyyyy format.
                                        </div>
                                    )
                                }
                            </div>
                            <div className = "row row-cols-1 row-cols-sm-2">
                                <div className = "col mb-4">
                                    <label for = "country" className = "form-label fs-base">Country</label>
                                    <select id = "country" className = "form-select form-select-lg" required onChange = {(e) => setCountry(e.target.value)}>
                                        {
                                            countries.map((_country, index) => (
                                                <option key = {index} value = {_country}>{_country}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className = "col mb-4">
                                    <label for = "city" className = "form-label fs-base">City</label>
                                    <input id = "city" className = "form-control form-control-lg" required onChange = {(e) => setCity(e.target.value)}></input>
                                </div>
                            </div>
                            <div className = "row row-cols-1 row-cols-sm-3">
                                <div className = "col mb-4">
                                    <label for = "height-ft" className = "form-label fs-base">Height (ft)</label>
                                    <input id = "height-ft" className = "form-control form-control-lg" type = "number" required onChange = {(e) => setHeightFt(e.target.value)}></input>
                                </div>
                                <div className = "col mb-4">
                                    <label for = "height-in" className = "form-label fs-base">Height (in)</label>
                                    <input id = "height-in" className = "form-control form-control-lg" type = "number" required onChange = {(e) => setHeightIn(e.target.value)}></input>
                                </div>
                                <div className = "col mb-4">
                                    <label for = "weight" className = "form-label fs-base">Weight (lbs)</label>
                                    <input id = "weight" className = "form-control form-control-lg" type = "number" required onChange = {(e) => setWeight(e.target.value)}></input>
                                </div>
                            </div>
                            <button className = "btn btn-lg btn-primary w-100 mb-4" type = "submit">Save and continue</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default OnboardingGeneralInfo;