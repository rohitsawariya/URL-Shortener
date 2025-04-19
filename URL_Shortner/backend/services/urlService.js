import { nanoid } from "nanoid";
import { createURL } from "../repositories/urlrepo.js";
import { URL } from "../models/Schema.js";

export const createUrlService = async (body) => {
  const existing = await URL.findOne({ redirectUrl: body.url });

  if (existing) {
    return {
      message: "URL already shortened",
      shortUrl: existing.shortUrl,
    };
  }

  const shortId = nanoid(12);
  const shortUrl = `${shortId}`;

  const data = await createURL({
    body: {
      shortUrl,
      redirectUrl: body.url,
      visited: [],
    },
  });

  return data;
};

export const getAllUrls = async () => {
  try {
    const data = await URL.find({});
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchRedirect = async (id) => {
  try {
    const url = await URL.findOne({ shortUrl: id });
    if (!url) {
      return { error: "URL not found" };
    }
    // console.log("fetch: ", url);
    return url;
  } catch (err) {
    console.error("DB error: ", err);
    return { error: "Database error" };
  }
};
