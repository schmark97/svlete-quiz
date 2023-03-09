import { db, auth } from "../lib/firebase.js";
import { doc, getDoc } from "firebase/firestore";

export async function load({ fetch, params, locals }) {

    const user = auth.currentUser;

    if (user) {
        const docRef = doc(db, "users", user.uid);

        try {
            const docSnap = await getDoc(docRef);

            return {
                userData: docSnap.data()
            }
        } catch (error) {
            return {
                status: 404,
                error: new Error(`Not found`)
            };
        }

    }
}