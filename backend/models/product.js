import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    Name: {
       type: String,
       required: true,
    },
    Description: {
       type: String,
       required: true,
    },
    Price: {
       type: String,
       required: true,
    },
    PhotoUrl: {
        type: String,
        required: true,
    }
});

export default mongoose.model("Product", productSchema);