import { Schema, model } from "mongoose";
import shortId from "shortid";

const shortUrlSchema = new Schema({
    full: {
        type: String,
        required: true,

    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }

})

const ShortUrls = model("ShortUrls", shortUrlSchema);

export default ShortUrls;