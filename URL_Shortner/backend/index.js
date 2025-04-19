import express from "express";
import { PORT } from "./config/serverConfig.js";
import {createURL, getURLs, redirectURL } from "./controllers/urlController.js";
import dbConnect from "./config/dbConfig.js";
import cors from 'cors';

const app = express();


app.use(express.json());
app.use(cors());

app.get("/", getURLs);
app.get('/:id', redirectURL);

// ✅ POST route
app.post("/", createURL);

app.listen(PORT, () => {
    dbConnect();
    console.log(`Server is running on port ${PORT}`)
});
