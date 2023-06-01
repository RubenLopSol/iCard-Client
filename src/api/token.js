import {TOKEN} from "../utils/constants"




export function setToken(token) {
    localStorage.setItem(TOKEN, token);
}


// Obtencion del token

export function getToken(){
    return localStorage.getItem(TOKEN);
}

// Eliminar el token

export function removeToken(){
    localStorage.removeItem(TOKEN);
}