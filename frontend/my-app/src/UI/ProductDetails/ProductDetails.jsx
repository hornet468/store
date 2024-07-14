import React from "react";
import { useDispatch } from "react-redux";
import { addProductToBasket } from "../../BLL/slice/basket.slice";

const ProductDetails = (props) => {
  const dispatch = useDispatch();

  if (!props.product) {
    return <div>Loading...</div>;
  }

  const handleAddToBasket = () => {
    dispatch(addProductToBasket(props.product));
  };

  return (
    <div className="container mx-auto p-4 flex items-start shadow-lg rounded-md">
      <img className="w-96 mr-4 p-3" src={props.product.PhotoUrl} alt={props.product.Name} />
      <div className="flex-1 p-7"> 
        <h2 className="text-4xl font-bold">{props.product.Name}</h2>
        <p className="text-xl">{props.product.Price}</p> 
        <p className="text-lg p-3">{props.product.Description}</p> 
        <button
          className="bg-black text-cyan-50 mt-4 px-4 py-2 rounded-md"
          onClick={handleAddToBasket}
        >
          Add to basket
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;