import React from 'react'
import Item from '../item/item'

const ItemList = ({products}) => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap"
    }}>
      {products.map(product => <Item key={product._id} product={product}/>)}
    </div>
  )
}

export default ItemList