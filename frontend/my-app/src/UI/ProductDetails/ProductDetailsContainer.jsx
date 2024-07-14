import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneProduct, selectProducts } from "../../BLL/slice/products.slice";
import { useParams } from "react-router-dom";
import ProductDetails from "./ProductDetails";

const ProductDetailsContainer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productsState = useSelector(selectProducts);

  useEffect(() => {
    dispatch(getOneProduct(id));
  }, [dispatch, id]);

  if (!productsState) {
    return <div>Loading...</div>;
  }

  const { product, loading, error } = productsState;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  return <ProductDetails product={product} />;
};

export default ProductDetailsContainer;