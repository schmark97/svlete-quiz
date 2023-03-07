import { db } from "../lib/firebase.js";
import { collection, getDocs } from "firebase/firestore";

export async function load({ fetch, params, locals }) {
    let quiz = [];
    const querySnapshot = await getDocs(collection(db, "quiz"));

    querySnapshot.forEach((doc) => {
        quiz = [doc.data(), ...quiz];
    });

    return {
        quiz
    };
}