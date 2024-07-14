import BasketModel from "../models/basket.js";

export const addProductToBasket = async (req, res) => {
    try {
        const userId = req.userId;
        const { IdProduct, Name, Price } = req.body;

        if (!IdProduct || !Name ||  !Price) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        let basketItem = await BasketModel.findOne({ userId, IdProduct });

        if (basketItem) {
            return res.status(400).json({ message: "Product already in basket" });
        } else {
            basketItem = new BasketModel({
                userId,
                IdProduct,
                Name,
                Price
            });

            await basketItem.save();
        }

        res.status(200).json({
            message: "Product added to basket successfully",
            data: basketItem
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const deleteProductWithBasket = async (req, res) => {
    try {
        const { id} = req.params;
        const product = await BasketModel.findOneAndDelete( {id} );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product was deleted"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getBasket = async (req, res) => {
    try {
        const userId = req.userId;
        const basket = await BasketModel.find({ userId });

        if (!basket || basket.length === 0) {
            return res.status(404).json({ message: "Basket is empty" });
        }

        res.json({ basket });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};