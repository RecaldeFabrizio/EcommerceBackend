import { useEffect, useState } from "react"
import Detail from "../components/item/detail";

const ItemDetailContainer = () => {
    const [product, setProduct] = useState({})
    useEffect(()=>{
        fetch(`http://localhost:8080/api/productMongo/6496319fbcd8f784007eaa66`) 
        .then(resp => resp.json())
        .then(resp => {
            setProduct(resp.payload[0]);
            console.log(resp.payload[0]);
        })
        
}, []);
    
    return (
        <>
        <Detail product={product}/>
        </>
    )
}

export default ItemDetailContainer
