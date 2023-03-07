export async function load({ fetch, params, locals }) {
    let response = "";

    try {
        response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&tag=congratulationss&rating=g`)
    } catch (err) {
        return {
            gif: ""
        };
    }

    try {
        response = await response.json()
    } catch (err) {
        return {
            gif: ""
        };
    }

    return {
        gif: response
    };
}