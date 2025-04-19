import {URL} from "../models/Schema.js";

export const createURL = async ({ body }) => {
    try {
        const url = await URL.create({
            shortUrl: body.shortUrl,
            redirectUrl: body.redirectUrl,
            visited: []
        });
        return url;

    }
    catch (error) {        
        throw new Error("Error Detected");
    }
}