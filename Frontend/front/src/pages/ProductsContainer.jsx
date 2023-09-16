import axios from 'axios';
import { useEffect, useState } from "react"
import ItemList from "../components/itemList/ItemList"

const ProductsContainer = () => {
    const [ products, setProdutcs ] = useState([])
    const [cartId, setCartId] = useState(null);
    const [cart, setCart] = useState(null)
    

    useEffect(()=>{
        fetch('http://localhost:8080/api/productMongo')
        .then(resp => resp.json())
        .then(resp => setProdutcs(resp.payload))
        .catch(error => console.log(error))
    }, [])


    const handleCreateCart = async () => {
        try {
            const cartResponse = await axios.post('http://localhost:8080/api/cart');
            setCartId(cartResponse.data.payload._id);
         
        } catch (error) {
            console.error('Error creating cart:', error);
        }
    };


    const getCartDetails = async () => {
        try {
          if (!cartId) {
            console.error('Cart ID is missing.');
            return;
          }
    
          const cartResponse = await axios.get(`http://localhost:8080/api/cart/${cartId}`);
          setCart(cartResponse.data.payload);
        } catch (error) {
          console.error('Error getting cart:', error);
        }
      };
      useEffect(() => {
        if (cartId) {
          getCartDetails();
        }
      }, [cartId]);
      const renderCartDetails = () => {
        if (!cart) {
          return <p>No cart found.</p>;
        }

        return (
            <div>
              <h2>Cart Details</h2>
              <p>Cart ID: {cart._id}</p>
              <h3>Products in Cart:</h3>
              <ul>
                {cart.cart.map((cartItem) => (
                    <li key={cartItem.product._id}>
                        Product: {cartItem.product.title}, Price: {cartItem.product.price}, Quantity: {cartItem.quantity}
                    </li>
                ))}
              </ul> 
            </div>
          );
    };


    const handleEmptyCart = async () => {
        try {
            const cartResponse = await axios.delete(`http://localhost:8080/api/cart/${cartId}/empty`);
            setCartId(cartResponse.data.payload._id);
        } catch (error) {
            console.error('Error creating cart:', error);
        }
    };


    const handleDeleteCart = async () => {
        try {
                const cartResponse = await axios.delete(`http://localhost:8080/api/cart/${cartId}`);
                setCartId(cartResponse.data.payload._id); 
        } catch (error) {
            console.error('Error deleting cart:', error);
        }
    };


    return (
        <>
            <button className="btn btn-primary" onClick={handleCreateCart}>Create Cart</button>
            <button className="btn btn-primary" onClick={handleEmptyCart}>Empty Cart</button>
            <button className="btn btn-danger" onClick={handleDeleteCart}>Delete Cart</button>
            <ItemList products={products} cartId={cartId}/>
            <div>
            <h1>Cart Container</h1>
            {renderCartDetails()}
           </div>
        </>
    )
}

export default ProductsContainer
