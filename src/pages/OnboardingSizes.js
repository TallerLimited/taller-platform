import "../App.css"
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from '../firebaseConfig'
import { doc, updateDoc } from 'firebase/firestore'

function OnboardingSizes()
{
    const [shirtSize, setShirtSize] = useState('M');
    const [sweaterSize, setSweaterSize] = useState('M');
    const [jeansWaist, setJeansWaist] = useState('Not set');
    const [jeansInseam, setJeansInseam] = useState('Not set');
    const [joggersSize, setJoggersSize] = useState('Not set');
    const [pantsSize, setPantsSize] = useState('Not set');
    const [shoesSize, setShoesSize] = useState('Not set');
    const [shoesFit, setShoesFit] = useState('Regular');

    const navigate = useNavigate();

    const handleSubmit = async (e) =>
    {
        e.preventDefault()

        const user = auth.currentUser;
        if (user)
        {
            const userDocRef = doc(firestore, "UserData", user.uid);
            await updateDoc(userDocRef, {
                _Clothing_Shirt_Size: shirtSize,
                _Clothing_Sweater_Size: sweaterSize,
                _Tailor_Measurements_Waist: jeansWaist,
                _Tailor_Measurements_Inseam: jeansInseam,
                _Clothing_Joggers_Size: joggersSize,
                _Clothing_Pants_Size: pantsSize,
                _Clothing_Shoes_Size: shoesSize,
                _Clothing_Shoes_Fit: shoesFit
            }); 
        }
        navigate('/onboarding-style', {replace: true})
    }

    return(
        <main className = "page-wrapper">
            <div className = "d-lg-flex justify-content-center position-relative h-100">
                <div className = "d-flex flex-column align-items-center w-lg-60 h-100 px-3 px-lg-5 pt-4 pb-4">
                    <div className = "w-100 mt-5" style = {{maxWidth: 526}}>
                        <h1 className = "display-6 text-center mb-3 mb-lg-4">Let us know your sizes</h1>
                        <p className = "text-center mb-4">Letting us know your sizes will still provide us some kind of idea of what sizes of
                            clothes to recommend you even though you don't know your exact measurements
                        </p>
                        <form className = "needs-validation" onSubmit = {handleSubmit}>
                            <h2 className = "display-6 text-center mb-4">Top Sizes</h2>
                            <div className = "row row-cols-1 row-cols-sm-2">
                                <div className = "col mb-4">
                                    <label for = "shirt-size" className = "form-label fs-base">Shirts</label>
                                    <select id = "shirt-size" className = "form-select form-select-lg" onChange = {(e) => setShirtSize(e.target.value)}>
                                        <option value = "M">M</option>
                                        <option value = "L">L</option>
                                        <option value = "XL">XL</option>
                                        <option value = "2XL">2XL</option>
                                        <option value = "3XL">3XL</option>
                                        <option value = "4XL">4XL</option>
                                        <option value = "5XL">5XL</option>
                                    </select>
                                </div>
                                <div className = "col mb-4">
                                    <label for = "sweater-size" className = "form-label fs-base">Sweaters, hoodies, and coats</label>
                                    <select id = "sweater-size" className = "form-select form-select-lg" onChange = {(e) => setSweaterSize(e.target.value)}>
                                        <option value = "M">M</option>
                                        <option value = "L">L</option>
                                        <option value = "XL">XL</option>
                                        <option value = "2XL">2XL</option>
                                        <option value = "3XL">3XL</option>
                                        <option value = "4XL">4XL</option>
                                        <option value = "5XL">5XL</option>
                                    </select>
                                </div>
                            </div>
                            <h2 className = "display-6 text-center mb-4">Bottom Sizes</h2>
                            <div className = "row row-cols-1 row-cols-sm-2">
                                <div className = "col mb-4">
                                    <label for = "jeans-waist-size" className = "form-label fs-base">Jeans (waist)</label>
                                    <input id = "jeans-waist-size" className = "form-control form-control-lg" type = "number" onChange = {(e) => setJeansWaist(e.target.value)}></input>
                                </div>
                                <div className = "col mb-4">
                                    <label for = "jeans-inseam-size" className = "form-label fs-base">Jeans (in seam)</label>
                                    <input id = "jeans-inseam-size" className = "form-control form-control-lg" type = "number" onChange = {(e) => setJeansInseam(e.target.value)}></input>
                                </div>
                            </div>
                            <div className = "row row-cols-1 row-cols-sm-2">
                                <div className = "col mb-4">
                                    <label for = "joggers-size" className = "form-label fs-base">Joggers</label>
                                    <select id = "joggers-size" className = "form-select form-select-lg" onChange = {(e) => setJoggersSize(e.target.value)}>
                                        <option value = "M">M</option>
                                        <option value = "L">L</option>
                                        <option value = "XL">XL</option>
                                        <option value = "2XL">2XL</option>
                                        <option value = "3XL">3XL</option>
                                    </select>
                                </div>
                                <div className = "col mb-4">
                                    <label for = "pants-size" className = "form-label fs-base">Pants</label>
                                    <select id = "pants-size" className = "form-select form-select-lg" onChange = {(e) => setPantsSize(e.target.value)}>
                                        <option value = "M">M</option>
                                        <option value = "L">L</option>
                                        <option value = "XL">XL</option>
                                        <option value = "2XL">2XL</option>
                                        <option value = "3XL">3XL</option>
                                    </select>
                                </div>
                            </div>
                            <h2 className = "display-6 text-center mb-4">Shoe Sizes</h2>
                            <div className = "row row-cols-1 row-cols-sm-2">
                                <div className = "col mb-4">
                                    <label for = "shoe-size" className = "form-label fs-base">Shoe size (US)</label>
                                    <input id = "shoe-size" className = "form-control form-control-lg" type = "number" onChange = {(e) => setShoesSize(e.target.value)}></input>
                                </div>
                                <div className = "col mb-4">
                                    <label for = "shoe-fit" className = "form-label fs-base">Shoe fit</label>
                                    <select id = "shoe-fit" className = "form-select form-select-lg" onChange = {(e) => setShoesFit(e.target.value)}>
                                        <option value = "Regular">Regular</option>
                                        <option value = "Wide">Wide</option>
                                    </select>
                                </div>
                            </div>
                            <p className = "text-center mt-4 mb-4">Again, its okay to leave any of the fields blank. You can
                            come back and edit this information again later in your dashboard</p>
                            <button className = "btn btn-lg btn-primary w-100 mb-5" type = "submit">Save and continue</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default OnboardingSizes;