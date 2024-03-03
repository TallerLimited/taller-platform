import "../App.css"
import React, {useState} from 'react';
import { auth, firestore } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc, collection} from 'firebase/firestore';

function SignIn()
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [firstTimeSignIn, setFirstTimeSignIn] = useState();
    
    const navigate = useNavigate();

    const handleGoogleSignIn = async (e) =>
    {
        try
        {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);

            const userDocRef = doc(collection(firestore, 'UserData'), auth.currentUser.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (!userDocSnap.exists())
            {
                console.log("First time signing in")
                await setDoc(userDocRef, {
                    HasUserPreRegistered: false
                });
                navigate('/onboarding-general-info')
            }
            else
            {
                console.log("User doc exists")
                navigate('/dashboard');
            }
        } 
        catch (error)
        {
            alert(error.message)
            console.error(error.message);
        }
    }

    const handleSignIn = async (e) =>
    {
        e.preventDefault();

        try
        {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");       
        } 
        catch (error)
        {
            console.log("Error signing in: ", error.message)
        }

    };

    return(
        <main className = "page-wrapper">
            <div className = "d-lg-flex position-relative vh-100">
                <div className = "d-flex flex-column align-items-center w-lg-50 h-100 px-3 px-lg-5 pt-5">
                    <div className = "w-100 mt-5" style = {{maxWidth: 526}}>
                        <h1 className = "display-5">Sign in to Taller</h1>
                        <p className = "pb-3 mb-3 mb-lg-4">
                            Don't have an account yet? &nbsp;
                            <a href = "signup">Register here</a>
                        </p>
                        <form className = "needs-validation" onSubmit = {handleSignIn}>
                            <div className = "mb-3 pb-3">
                                <div className = "position-relative">
                                    <i className = "bi bi-envelope fs-lg position-absolute top-50 start-0 translate-middle-y ms-3"></i>
                                    <input className = "form-control form-control-lg ps-5" type = "email" placeholder = "Email address" required onChange = {(e) => setEmail(e.target.value)}></input>
                                </div>
                            </div>
                            <div className = "mb-4">
                                <div className = "position-relative">
                                    <i className = "bi bi-lock fs-lg position-absolute top-50 start-0 translate-middle-y ms-3"></i>
                                    <input className = "form-control form-control-lg ps-5" type = "password" placeholder = "Password" required onChange = {(e) => setPassword(e.target.value)}></input>
                                </div>
                            </div>
                            <button className = "btn btn-lg btn-primary w-100 mb-4" type = "submit">Sign in</button>
                            <h2 className = "h6 text-center pt-3 pt-lg-4 mb-4">Or sign in with google</h2>
                            <div className = "d-flex justify-content-center w-100">
                                <button className = "btn btn-icon btn-outline-secondary btn-google btn-lg w-50" onClick = {handleGoogleSignIn}>
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

export default SignIn;