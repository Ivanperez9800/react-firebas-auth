import { createContext, useContext, useEffect, useState } from "react";

import {createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged,signOut} from 'firebase/auth';

import {auth} from '../Firebase/Firebase.config'
 
export const authcontext = createContext();

    /*HOOK PERSONALIZADO */
export const useAuth = () => {
    const context = useContext(authcontext)

    if(!context) throw new Error("No auth provider")

    return context;
}


function AuthProvider({ children }) {

    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    const signUp = async (email,password) => {
        // console.log("signUp", email, password);
        await createUserWithEmailAndPassword(auth,email,password)
    }

    const login = async (email, password) => {
       await signInWithEmailAndPassword(auth,email,password);

    }

    const logOut= async() =>{
        signOut(auth);
    }

    useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth,currentUser =>{
            setUser(currentUser);
            setLoading(false)
        })



        return () => unsubscribe();
    }, [])
    

    return (
        <authcontext.Provider value={{signUp,login,user,logOut,loading}} >
            {children}
        </authcontext.Provider>
    )
}

export default AuthProvider;
