import React, {useState, useEffect, createContext} from "react";
import {setToken} from "../api/token"
import { useUser } from "../hooks"



export const AuthContext = createContext({
    auth: undefined,
    login: () => null,
    logout: () => null
});


export function AuthProvider(props) {
    const { children } = props;
    const {getMe} = useUser();

    const login = async (token) =>{
        setToken(token)
        const me = await getMe(token)
        console.log(me);
        
    };

    const valueContext = {
        auth:null,
        login,
        logout: () => console.log('Cerrando sessión')
    };

    return (
        <AuthContext.Provider value={valueContext} >

            { children }

        </AuthContext.Provider>
    )
}