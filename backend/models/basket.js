import mongoose from "mongoose";

const basketSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    IdProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    Price: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model("Basket", basketSchema);