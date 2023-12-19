import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate} from 'react-router-dom'
import { Button, Form, Container} from 'react-bootstrap'

import {useDispatch, useSelector, } from 'react-redux'
import {saveShippingAddress} from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
 

function ShippingScreen() {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const navigate = useNavigate(); // zamiast history
    const dispatch = useDispatch();

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) =>{
      e.preventDefault()
      console.log('Submited');
      dispatch(saveShippingAddress({address, city, postalCode, country}))
      navigate('/payment')
    }
    return (
      <FormContainer>
        <CheckOutSteps a b />
        <h1> shipping </h1>
        <Form onSubmit={submitHandler}>

          <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control 
              required
              type='text' 
              placeholder='Enter address' 
              value={address ? address : ''}
              onChange={(e)=> setAddress(e.target.value)}
            >
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control 
              required
              type='text' 
              placeholder='Enter city' 
              value={city ? city : ''}
              onChange={(e)=> setCity(e.target.value)}
            >
            </Form.Control>
          </Form.Group>
          
          <Form.Group controlId='postaCode'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control 
              required
              type='text' 
              placeholder='Enter postal code' 
              value={postalCode ? postalCode : ''}
              onChange={(e)=> setPostalCode(e.target.value)}
            >
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='country'>
            <Form.Label>Country</Form.Label>
            <Form.Control 
              required
              type='text' 
              placeholder='Enter country' 
              value={country ? country : ''}
              onChange={(e)=> setCountry(e.target.value)}
            >
            </Form.Control>
          </Form.Group>
          <Button type='submit' varaint='primary'>
            Continue 
          </Button>


        </Form>
      </FormContainer>
    )
}

export default ShippingScreen