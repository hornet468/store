import orderModel from "../models/order.js"

export const order = async (req, res) => {
    try {
        const doc = new orderModel({
            Name: req.body.Name,
            PhoneNumber: req.body.PhoneNumber,
        });

        const orders = await doc.save();
        const {...orderData} = orders._doc;

        res.json({
            ...orderData
        })
    } catch (err) {
        return res.status(500).json({
            message: "Send order failed",
        });
    };
};