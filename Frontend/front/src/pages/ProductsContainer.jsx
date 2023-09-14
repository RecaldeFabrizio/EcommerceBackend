import axios from 'axios';
import { useEffect, useState } from "react"
import ItemList from "../components/itemList/ItemList"

const ProductsContainer = () => {
    const [ products, setProdutcs ] = useState([])
    const [cartId, setCartId] = useState(null);
    

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
        </>
    )
}

export default ProductsContainer
