import React, { useState } from 'react';
import axios from 'axios';
import Item from '../item/Item'; 

const ItemList = ({ products, cartId }) => {
  const [quantities, setQuantities] = useState({});

  const handleAddCartButtonClick = async (productId) => {
    try {
      if (!cartId) {
        console.error('No se ha creado un carrito aún.');
        return;
      }

      await axios.post(`http://localhost:8080/api/cart/${cartId}/product/${productId}`, {
        quantity: quantities[productId] || 1,
      });
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };

  return (
    <>
    <div style={{
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap"
    }}>
      {products.map((product) => (
        <Item
          key={product._id}
          product={product}
          quantity={quantities[product._id] || 1} 
          onQuantityChange={(newQuantity) =>
            handleQuantityChange(product._id, newQuantity)
          }
          onAddCartButtonClick={() => handleAddCartButtonClick(product._id)}
        />
      ))}
    </div>
    </>
  );
};

export default ItemList;
