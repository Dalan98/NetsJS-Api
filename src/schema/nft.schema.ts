import { Schema } from "mongoose";

export const ProductSchema = new Schema({
    nftId: Number,
    Name: String,
    Description: String,
    Creator: String,
    Owner: String,
    Image: String,
    // name: String,
    // description: String,
    // imageURL: String,
    // price: Number,
    // createdAt: { type: Date, default: Date.now }
});