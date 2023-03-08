import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { writable } from "svelte/store";
import { auth } from "../lib/firebase";


export const authStore = writable({
    isLoading: true,
    currentUser: null
})

export const authHandlers = {
    login: async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            throw new Error(err)
        }
    },
    signup: async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (err) {
            throw new Error(err)
        }
    },

    logout: async () => {
        try {
            await signOut(auth)
        } catch (err) {
            throw new Error(err)
        }
    }
}