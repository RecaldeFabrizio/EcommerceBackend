import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button, Form } from 'react-bootstrap';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required'
        })
        if (!error) {
            console.log(error)
        } else {
            console.log(error);
           
        }
    }
    return <>
        <Form>
            <PaymentElement />
            <div>
                <Button variant="primary" size="lg" onClick={handleSubmit}>Pagar</Button>
            </div>
        </Form>
    </>
}
export default PaymentForm;