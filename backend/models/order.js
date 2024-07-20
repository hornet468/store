import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    Name: {
       type: String,
       required: true,
    },
   PhoneNumber: {
    type: String,
    required: true,
   },
});

export default mongoose.model("Order", orderSchema);