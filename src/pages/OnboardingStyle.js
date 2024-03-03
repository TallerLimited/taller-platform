import "../App.css"
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from '../firebaseConfig'
import { doc, updateDoc } from 'firebase/firestore'

// color palette image imports
import cool_1 from '../clothes_color_palettes/cool-1.png'
import cool_2 from '../clothes_color_palettes/cool-2.png'
import fresh_1 from '../clothes_color_palettes/fresh-1.png'
import fresh_2 from '../clothes_color_palettes/fresh-2.png'
import sunny_1 from '../clothes_color_palettes/sunny-1.png'
import sunny_2 from '../clothes_color_palettes/sunny-2.png'
import warm_1 from '../clothes_color_palettes/warm-1.png'
import warm_2 from '../clothes_color_palettes/warm-2.png'
import earthy_1 from '../clothes_color_palettes/earthy-1.png'
import earthy_2 from '../clothes_color_palettes/earthy-2.png'
import monochromatic from '../clothes_color_palettes/monochromatic.png'

function OnboardingStyle()
{
    const [stylePreference, setStylePreference] = useState('No preference');
    // const [styleRecommendation, setStyleRecommendation] = useState('Yes');
    const [color, setColor] = useState('Cool');
    const [otherOccupation, setOtherOccupation] = useState('');
    const [occupation, setOccupation] = useState('Agriculture');
    const [sports, setSports] = useState('Basketball');
    const [hobbies, setHobbies] = useState('Biking');

    const navigate = useNavigate();

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        const user = auth.currentUser;
        if (user)
        {
            const userDocRef = doc(firestore, "UserData", user.uid);
            await updateDoc(userDocRef, {
                Style_Preference: stylePreference,
                // Style_Recommendation: styleRecommendation,
                Color: color,
                Occupation: occupation,
                Occupation_Other: otherOccupation,
                Sports: sports,
                Hobbies: hobbies
            });
        }
        navigate('/pricing', {replace: true})
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
            <div className = "d-lg-flex justify-content-center position-relative h-100">
                <div className = "d-flex flex-column align-items-center w-lg-60 h-100 px-3 px-lg-5 pt-4 pb-4">
                    <div className = "w-100 mt-5" style = {{maxWidth: 526}}>
                        <h1 className = "display-6 text-center mb-3 mb-lg-4">Let us know your style preferences</h1>
                        <p className = "text-center mb-4">Let us know your preferences regarding material and colour to help
                        us better find specific clothing that fits your style</p>
                        <form className = "needs-validation" onSubmit = {handleSubmit}>

                            <h2 className = "display-6 text-center mb-4">Style Preferences</h2>
                            <div className = "row row-cols-1">
                                <div className = "col mb-4">
                                    <label for = "style-preferences" className = "form-label fs-base">What is the style of clothing that you wear the most?</label>
                                    <select id = "style-preferences" className = "form-select form-select-lg" required onChange = {(e) => setStylePreference(e.target.value)}>
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
                                {/* <div className = "col mb-4">
                                    <label for = "style-recommendations" className = "form-label fs-base">Would you like us to recommend outfits or clothing pieces from different styles?</label>
                                    <select if = "style-recommendations" className = "form-select form-select-lg" required onChange = {(e) => setStyleRecommendation(e.target.value)}>
                                        <option value = "Yes">Heck yeah!</option>
                                        <option value = "Sometimes">Sometimes</option>
                                        <option value = "No">No</option>
                                    </select>
                                </div> */}
                            </div>

                            <h2 className = "display-6 text-center mb-4">Colors</h2>
                            <p className = "mb-3 text-center">We'll show you a few color palette, and we'd like you to tell us which of the color palettes you associate with the most</p>
                            <h5 className = "mb-3 fw-normal text-center">Cool colors</h5>
                            <div className = "row row-cols-1 row-cols-sm-2">
                                <div className = "col mb-4">
                                    <img src = {cool_1} className = "img-fluid" alt = "cool 1"></img>
                                </div>
                                <div className = "col mb-4">
                                    <img src = {cool_2} className = "img-fluid" alt = "cool 2"></img>
                                </div>
                            </div>
                            <h5 className = "mb-3 fw-normal text-center">Fresh colors</h5>
                            <div className = "row row-cols-1 row-cols-sm-2">
                                <div className = "col mb-4">
                                    <img src = {fresh_1} className = "img-fluid" alt = "fresh 1"></img>
                                </div>
                                <div className = "col mb-4">
                                    <img src = {fresh_2} className = "img-fluid" alt = "fresh 2"></img>
                                </div>
                            </div>
                            <h5 className = "mb-3 fw-normal text-center">Sunny colors</h5>
                            <div className = "row row-cols-1 row-cols-sm-2">
                                <div className = "col mb-4">
                                    <img src = {sunny_1} className = "img-fluid" alt = "sunny 1"></img>
                                </div>
                                <div className = "col mb-4">
                                    <img src = {sunny_2} className = "img-fluid" alt = "sunny 2"></img>
                                </div>
                            </div>
                            <h5 className = "mb-3 fw-normal text-center">Warm colors</h5>
                            <div className = "row row-cols-1 row-cols-sm-2">
                                <div className = "col mb-4">
                                    <img src = {warm_1} className = "img-fluid" alt = "warm 1"></img>
                                </div>
                                <div className = "col mb-4">
                                    <img src = {warm_2} className = "img-fluid" alt = "warm 2"></img>
                                </div>
                            </div>
                            <h5 className = "mb-3 fw-normal text-center">Earthy colors</h5>
                            <div className = "row row-cols-1 row-cols-sm-2">
                                <div className = "col mb-4">
                                    <img src = {earthy_1} className = "img-fluid" alt = "earthy 1"></img>
                                </div>
                                <div className = "col mb-4">
                                    <img src = {earthy_2} className = "img-fluid" alt = "earthy 2"></img>
                                </div>
                            </div>
                            <h5 className = "mb-3 fw-normal text-center">Monochromatics</h5>
                            <div className = "row row-cols-1 row-cols-sm-3">
                                <div className = "col-sm-3 mb-4"></div>
                                <div className = "col col-sm-6 mb-4">
                                    <img src = {monochromatic} className = "img-fluid" alt = "monochromatic"></img>
                                </div>
                                <div className = "col col-sm-3 mb-4"></div>
                            </div>
                            <div className = "row row-cols-1">
                                <div className = "col mb-4">
                                    <label for = "colors" className = "form-label fs-base">Based on the above colors palettes, which do you most associate yourself with?</label>
                                    <select id = "colors" className = "form-select form-select-lg" required onChange = {(e) => setColor(e.target.value)}>
                                        <option value = "Cool">Cool colors</option>
                                        <option value = "Fresh">Fresh colors</option>
                                        <option value = "Sunny">Sunny colors</option>
                                        <option value = "Warm">Warm colors</option>
                                        <option value = "Earthy">Earthy colors</option>
                                        <option value = "Monochromatics">Monochromatics</option>
                                    </select>
                                </div>
                            </div>

                            <h2 className = "display-6 text-center mb-4">Hobbies and Activities</h2>
                            <p className = "mb-3 text-center">What you do on a daily basis determines what outfits and styles fits you the best. Give us an insight into your routines to 
                            allows us to recommend outfits and style choice more accurately</p>
                            <div className = "row row-cols-1">
                                <div className = "col mb-4">
                                    <label for = "occupation" className = "form-label fs-base">Occupation</label>
                                    <select id = "occupation" className = "form-select form-select-lg" required onChange = {handleOccupationChange}>
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
                                        <div className = "col mb-4">
                                            <label for = "otherOccupation" className = "form-label fs-base">Occupation</label>
                                            <input id = "otherOccupation" className = "form-control form-control-lg" type = "text" onChange = {(e) => setOtherOccupation(e.target.value)}></input>
                                        </div>
                                    )
                                }
                            </div>
                            <div className = "row row-cols-1">
                                <div className = "col mb-4">
                                    <label for = "sports" className = "form-label fs-base">Sports</label>
                                    <select id = "sports" className = "form-select form-select-lg" required onChange = {(e) => setSports(e.target.value)}>
                                        <option value = "Basketball">Basketball</option>
                                        <option value = "Football">Football</option>
                                        <option value = "Soccer">Soccer</option>
                                        <option value = "Tennis">Tennis</option>
                                        <option value = "Badminton">Badminton</option>
                                        <option value = "Golf">Golf</option>
                                        <option value = "None">I don't play sports actively</option>
                                    </select>
                                </div>
                            </div>
                            <div className = "row row-cols-1">
                                <div className = "col mb-4">
                                    <label for = "hobbies" className = "form-label fs-base">Hobbies</label>
                                    <select id = "hobbies" className = "form-select form-select-lg" required onChange = {(e) => setHobbies(e.target.value)}>
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
                            </div>
                            <button className = "btn btn-lg btn-primary w-100 mb-5" type = "submit">Save and continue</button>
                        </form> 
                    </div>
                </div>
            </div>
        </main>
    );
}

export default OnboardingStyle;