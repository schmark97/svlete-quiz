
import { redirect } from '@sveltejs/kit';

export async function load({ fetch, params, locals }) {

    let response = "";//await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&tag=congratulationss&rating=g`)

    try {
        response = await response.json()
    } catch (err) {
        response = "";
    }
    return {
        gif: response
    };
}