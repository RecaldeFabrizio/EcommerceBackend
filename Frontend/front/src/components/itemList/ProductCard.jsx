import { Card } from "react-bootstrap";

const ProductCard = ({ product, setCurrentProduct}) => {
    return (<>
        <Card style={{width: '18rem'}} onClick={()=>setCurrentProduct(product.id)}>
            <p>{product.name}</p>
            <p>{product.price}</p>
        </Card>
    </>)
}

export default ProductCard;