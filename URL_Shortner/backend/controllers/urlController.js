import { createUrlService, getAllUrls, fetchRedirect } from "../services/urlService.js";

export const createURL = async (req, res) => {
  try {
    const data = await createUrlService(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};


export const getURLs = async (req, res) => {
  try {
    const data = await getAllUrls();
    res.status(200).json(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const redirectURL = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Missing id parameter" });
    }

    const url = await fetchRedirect(id);  // Should return a Mongoose document
    if (!url) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // Ensure URL has a protocol
    let finalUrl = url.redirectUrl;
    if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
      finalUrl = "https://" + finalUrl;
    }

    // Log visit timestamp
    url.visited.push({ timestamp: Date.now() });
    await url.save();

    return res.redirect(finalUrl);

  } catch (err) {
    console.error("redirect error: ", err);
    res.status(500).json({ error: "controller: Something went wrong" });
  }
};
