import React from "react";
import { Link } from "react-router-dom";

const Products = ({ products }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-3 gap-4 mt-5 p-5">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product._id}>
              <Link to={`/product/${product._id}`}>
                <div className="flex align-center justify-center shadow-lg rounded-md">
                  <img className="h-60 object-cover mb-4" src={product.PhotoUrl} alt={product.Name} />
                </div>
                <div className="flex justify-center pt-6 align-center">
                  <h3 className="text-1xl font-medium text-center">{product.Name}</h3>
                  <p className="text-1xl font-medium pl-9 pb-9">{product.Price}</p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Products;