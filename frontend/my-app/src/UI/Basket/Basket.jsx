import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProductFromBasket } from '../../BLL/slice/basket.slice';
import { Link } from 'react-router-dom';

const Basket = ({ basket }) => {
  const dispatch = useDispatch();

  const deleteProduct = (productId) => {
    dispatch(deleteProductFromBasket(productId))
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mt-5 p-5">
        {basket.length > 0 ? (
          basket.map(product => (
            <div key={product._id}>
            
              <div className="flex align-center justify-center shadow-lg rounded-md">
                <p className="h-60 object-cover mb-4" src={product.PhotoUrl} alt={product.Name} />
                <h2>{product.Name}</h2>
                <div>
                <p className="pl-3">{product.Price}</p>
                </div>
              </div>
              <div >
              <div className="pr-2">
                <button
                  className="bg-black text-cyan-50 mt-4 px-4 py-2 rounded-md"
                  onClick={() => deleteProduct(product._id)} 
                >
                  Delete product
                </button>
                </div>
                <Link to={"/order"}>
                <button className="bg-black text-cyan-50  mt-4 px-4 py-2 rounded-md">Buy product</button>
                </Link>
              </div>
              <div className="flex justify-center pt-6 align-center"></div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Basket;