import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, selectProducts } from "../../BLL/slice/products.slice";
import Products from "./Products";

const ProductsContainer = () => {
  const dispatch = useDispatch();
  const productsState = useSelector(selectProducts);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

 
  if (!productsState) {
    console.log(productsState);
    return <div>Loading...</div>;
  }

  const { products, loading, error } = productsState;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!products || products.length === 0) {
    return <div>No products to display</div>;
  }

  return <Products products={products} />;
};

export default ProductsContainer;