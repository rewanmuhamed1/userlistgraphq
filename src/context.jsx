import {  createContext } from 'react';



export const  TokenContext = createContext(localStorage.getItem('usertoken'));