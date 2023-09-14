import React, { useEffect, useState } from 'react';
import PaymentService from '../service/paymentService';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../components/itemList/PaymentForm';
//import { REACT_APP_STRIPE_KEY } from '../service/config';
import Wrapper from '../utils/Wrapper';
import ProductCard from '../components/itemList/ProductCard';

const stripePromise = loadStripe('pk_test_51Njs9xDRXEduUqzLayeiF5lNKuXh6SDKBySBPLwJAVKN2XJCmprVtNKGj9dtryR5j6jYkzkPMZNYYII9f5lo1gDI00By2Jpz4c');

const Stripe = () => {
    const [currentProduct, setCurrentProduct] = useState(null);
    const [clientSecret,setClientSecret] = useState(null);

    const mockCart = [
        { id: 1, name: "papas", price: 1000 },
        { id: 2, name: "queso", price: 500 },
        { id: 3, name: "hamburguesa", price: 1500 },
        { id: 4, name: "soda", price: 1000 },
        { id: 5, name: "golosinas", price: 800 }
    ]

    useEffect(() => {
        const getClientSecret = async () => {
            console.log(currentProduct);
            const service = new PaymentService();
            service.createPaymentIntent({productId:currentProduct,callbackSuccess:callbackSuccessPaymentIntent,callbackError:callbackErrorPaymentIntent})
        }
        currentProduct&&getClientSecret();
    }, [currentProduct])

    const callbackSuccessPaymentIntent = (res) =>{
        setClientSecret(res.data.payload.client_secret)
    }

    const callbackErrorPaymentIntent = err => {
        console.log(err);
    }
    return (<>
        <div >
            <Wrapper hidden={currentProduct}>
                <div >
                    {mockCart.map(product => <ProductCard key={product.id} product={product} setCurrentProduct={setCurrentProduct} />)}
                </div>
            </Wrapper>
            <Wrapper hidden={!clientSecret||!stripePromise}>
                <Elements stripe={stripePromise} options={{clientSecret:clientSecret}}>
                    <PaymentForm/>
                </Elements>
            </Wrapper>
        </div>
    </>)
}

export default Stripe;
