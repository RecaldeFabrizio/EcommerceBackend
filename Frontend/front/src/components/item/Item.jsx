import React from 'react';

const Item = ({ product, quantity, onQuantityChange, onAddCartButtonClick }) => {

  return (
    <div className="card w-25">
    <div className="card-header">
        <p>{product.title}</p>
        
    </div>
    <div className="card-body">
        <p>Descripción: {product.description}</p>
        <p>thumbnail:{product.thumbnail}</p>
        <p>Code: {product.code}</p>
        <p>Stock: {product.stock}</p>
        <p>Precio: {product.price}</p>
    </div>
    <div className="card-footer">
        <div className="d-flex align-items-center">
          <button
            className="btn btn-outline-primary"
            onClick={() => onQuantityChange(quantity - 1)}
          >
            -
          </button>
          <p className="mx-2">Quantity: {quantity}</p>
          <button
            className="btn btn-outline-primary"
            onClick={() => onQuantityChange(quantity + 1)}
          >
            +
          </button>
          <button className="btn btn-outline-primary" onClick={onAddCartButtonClick }>
            Add Cart
          </button>
        </div>
    </div>    
    </div>
  );
};

export default Item;
