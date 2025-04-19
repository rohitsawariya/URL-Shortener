import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  redirectUrl: {
    type: String,
    required: true,
    // unique: true,
  },
  visited: [{timestamp: {type: Number}}],
  
},
{timestamps: true,}
);

export const URL = mongoose.model("Url", urlSchema);