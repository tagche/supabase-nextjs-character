import { atom } from "recoil";

export const loadingState = atom({
    key: 'loadingState', 
    default: 'start',
});

export const quizState = atom({
    key: 'quizState', 
    default: '0',
});