import "../App.css"
import React, {useState} from 'react';
import { auth, firestore } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc, collection} from 'firebase/firestore';

function SignUp()
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [firstTimeSignIn, setFirstTimeSignIn] = useState("");
    const [errorMessage, setErrorMessage] = useState();

    const handleGoogleSignUp = async (e) =>
    {
        try
        {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);

            // Check if userdata document tied with the userid exists
            console.log(auth.currentUser.uid);
            const userDocRef = doc(collection(firestore, 'UserData'), auth.currentUser.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (!userDocSnap.exists())
            {
                setFirstTimeSignIn(true);
                await setDoc(userDocRef, {
                    HasUserPreRegistered: false
                });
                navigate("/onboarding", {replace: true});
            }

            if (!firstTimeSignIn)
            {
                await setDoc(userDocRef, {
                    HasUserPreRegistered: false
                });
                navigate("/onboarding", {replace: true});
            }
        } 
        catch (error)
        {
            const errorMessage = "An account with the same email already exists."
            console.log(errorMessage);
            setErrorMessage(errorMessage);
            console.error(error.message);
        }
    }

    const handleSignUp = async (e) =>
    {
        e.preventDefault();

        try
        {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;

            const userDocRef = doc(collection(firestore, "UserData"), user.uid);
            const userDocSnap = await getDoc(userDocRef);


            if (!userDocSnap.exists()) 
            {
                setFirstTimeSignIn(true);
                await setDoc(userDocRef, {
                    HasUserPreRegistered: false
                });
                navigate('/onboarding-general-info', {replace: true});
            }
            if (!firstTimeSignIn)
            {
                await setDoc(userDocRef, {
                    HasUserPreRegistered: false
                });
                navigate('/onboarding-general-info', {replace: true});
            }
        } 
        catch (error)
        {   
            const errorMessage = "Invalid email, or account already exists"
            console.log(errorMessage);
            setErrorMessage(errorMessage);
            console.log("Error signing in: ", error.message);
        }

    };

    return(
        <main className = "page-wrapper">
            <div className = "d-lg-flex position-relative vh-100">
                <div className = "d-flex flex-column align-items-center w-lg-50 h-100 px-3 px-lg-5 pt-5">
                    <div className = "w-100 mt-5" style = {{maxWidth: 526}}>
                        <h1 className = "display-5">No account? Sign up</h1>
                        <p className = "pb-3 mb-3 mb-lg-4">
                            Already have an account? &nbsp;
                            <a href = "signin">Sign in here</a>
                        </p>
                        <form className = "needs-validation" onSubmit = {handleSignUp}>
                            <div className = "row row-cols-1">
                                {/*<div className = "col mb-4">
                                    <input className = "form-control form-control-lg" type = "text" placeholder = "Your name" required></input>
                                </div>*/}
                                {
                                    errorMessage && (
                                        <div className = "alert alert-danger" role = "alert">
                                            {errorMessage}
                                        </div>
                                    )
                                }
                                <div className = "col mb-4">
                                    <input className = "form-control form-control-lg" type = "text" placeholder = "Email address" required onChange = {(e) => setEmail(e.target.value)}></input>
                                </div>
                            </div>
                            <div className = "password-toggle mb-4">
                                <input className = "form-control form-control-lg" type = "password" placeholder = "Password" required onChange = {(e) => setPassword(e.target.value)}></input>
                            </div>
                            {/* <div className = "password-toggle mb-4">
                                <input className = "form-control form-control-lg" type = "password" placeholder = "Confirm password" required></input>
                            </div> */}
                            <button className = "btn btn-lg btn-primary w-100 mb-4" type = "submit">Sign up</button>
                            <h2 className = "h6 text-center pt-3 pt-lg-4 mb-4">Or sign in with Google</h2>
                            <div className = "d-flex justify-content-center w-100">
                                <button className = "btn btn-icon btn-outline-secondary btn-google btn-lg w-50" onClick = {handleGoogleSignUp}>
                                    <i className = "bi bi-google fs-xl me-2"></i>
                                    Google
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className = "w-50 bg-size-cover bg-repeat-0 bg-position-center" id = "form-background-image"></div>
            </div>
        </main>
    );
}

export default SignUp;