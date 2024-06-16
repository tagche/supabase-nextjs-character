import { atom } from "recoil";

export const loadingState = atom<string>({
    key: 'loadingState', 
    default: 'start',
});

export const quizState = atom<number>({
    key: 'quizState', 
    default: 0,
});

