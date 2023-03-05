import { writable } from "svelte/store";



export const quizStore = writable({
    score: 0,
    max: 0,
    started: false,
})

