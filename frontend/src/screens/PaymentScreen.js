import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate, } from 'react-router-dom'
import { Button, Form, Container, Col} from 'react-bootstrap'

import {useDispatch, useSelector, } from 'react-redux'
import {saveShippingAddress} from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import {savePaymentMethod} from '../actions/cartActions'
 

function PaymentScreen() {
    const dispatch = useDispatch();
    const cart = useSelector(state=> state.cart)
    const {shippingAddress} = cart
    const navigate = useNavigate(); // zamiast history

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if (!shippingAddress.address){
        navigate('/shipping')
    }

    const submitHandler =(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return(
        <FormContainer>
            <CheckOutSteps a b c />
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check 
                            type='radio'
                            label='PayPal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >

                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>

            </Form>
        </FormContainer>
    )
}


export default PaymentScreen