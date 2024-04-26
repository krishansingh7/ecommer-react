import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import {addUser, removeUser} from '../utils/productSlice'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignInWithGoogle = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        dispatch(addUser({
          _id: user.uid,
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        }))
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleSingOut = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(removeUser())
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center w-full h-[30vmax] bg-slate-700">
      <button
        onClick={handleSignInWithGoogle}
        className="px-4 py-2 rounded-md bg-white hover:bg-slate-200"
      >
        Continue with google
      </button>
      <button onClick={handleSingOut} className="px-4 py-2 mx-2 rounded-md bg-white hover:bg-slate-200">
        Sign out
      </button>
    </div>
  );
};

export default Login;
