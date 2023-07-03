import { useEffect } from "react"
import { useState } from "react"
import ItemList from "../components/itemList/ItemList"

const ItemListContainer = () => {
    const [ products, setProdutcs ] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8080/api/productMongo')
        .then(resp => resp.json())
        .then(resp => setProdutcs(resp.payload))
        .catch(error => console.log(error))
    }, [])
    console.log(products)
    return (
        <>
            <ItemList products={products} />
        </>
    )
}

export default ItemListContainer
