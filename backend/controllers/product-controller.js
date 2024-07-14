import ProductModel from "../models/product.js"

export const addProducts = async (req, res) => {
    try {
        const doc = new ProductModel({
            Name: req.body.Name,
            Description: req.body.Description,
            Price: req.body.Price,
            PhotoUrl: req.body.PhotoUrl
        });

        const products = await doc.save();
        const {...ProductsData} = products._doc;

        res.json({
            ...ProductsData
        })
    } catch (err) {
        return res.status(500).json({
            message: "Add product failed",
        })
    }

};

export const getProducts = async (req , res) => {
    try {
        const products = await ProductModel.find();
        if (!products || products.length === 0 ) {
            return res.status(404).json({
                message: "Product not found"
            });
        };
        res.json({products});
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Not success",
        })
    }
};

export const getProductById = async (req , res) => {
    try {
        const productId = req.params.id;
        const product = await ProductModel.findById(productId)
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        };
        res.json({product});
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed to get product",
        })
    }
}

export const deleteProductById = async (req , res) => {
    try {
        const productId = req.params.id;
        const product = await ProductModel.findByIdAndDelete(productId)
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        };
        res.json({
            message: "product was delete"
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed to get product",
        })
    }
}