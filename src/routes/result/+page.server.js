
import { quizStore } from "../stores/quizstore";

export async function load({ fetch, url }) {
    let response = "";

    const gifKeywords = {
        t: "try+again",
        n: "not+bad",
        c: 'congratulations'
    }

    const keyword = url.searchParams.get('g');

    if (typeof keyword === 'undefined') {
        return {
            gif: response
        };
    }


    if (typeof gifKeywords[`${keyword}`] === 'undefined') {
        return {
            gif: response
        };
    }


    const tag = gifKeywords[`${keyword}`];

    try {
        response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&tag=${tag}&rating=g`)
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