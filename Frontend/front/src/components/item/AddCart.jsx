import React from 'react';
import axios from 'axios';

function AddCard({ product }) {
  const handleAddToCart = async () => {
    const cartId = 'YOUR_CART_ID'; // Replace with the actual cart ID
    const productId = product._id; // Assuming your product has an "_id" field
    const quantity = 1; // You can adjust the quantity as needed

    try {
      await axios.post(`/api/carts/${cartId}/product/${productId}`, { quantity });
      console.log('Product added to cart');
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div className="card w-25">
      {/* Product card content */}
      <div className="card-footer">
        <button className="btn btn-outline-primary w-100" onClick={handleAddToCart}>
          Add Cart
        </button>
      </div>
    </div>
  );
}

export default AddCard;
