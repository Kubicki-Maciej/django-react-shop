import React, {useEffect} from 'react'
import {Link, useParams, useNavigate ,useSearchParams, useLocation, useHistory } from  'react-router-dom'

import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
// Components 
import Message from '../components/Message'
// redux
import {useDispatch, useSelector} from 'react-redux'
// actions
import {addToCart} from '../actions/cartActions'

// first method 

function CartScreen({match, location}) {
  const navigate = useNavigate (); // zamiast history
  const [searchParams, setSearchParams] = useSearchParams()
  const qty = searchParams.get('qty')
  const {id} =useParams()
  console.log('qty, id  => ', qty)

  
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart

  
  useEffect(()=>{
    if(id){
      dispatch(addToCart(id, qty))
    }
  }, [dispatch, id, qty])

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? 
        ( 
          <Message cariant='info'>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ):(
          <ListGroup variant='flush'>
            {cartItems.map(item =>(
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded/>
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    ${item.price}
                  </Col>
                  <Col md={3}>
                  <Form.Control 
                    as="select"
                    value={item.qty}
                    onChange={(e) => {
                      navigate("/cart")
                      dispatch(addToCart(item.product, e.target.value)) 
                      console.log(e.target.value, 'tutaj jest')
                     }
                    }
                    >
                      {
                          [...Array(item.countInStock).keys()].map((x) => (
                              <option key={x+1} value={x + 1}>
                                  {x + 1} 
                              </option>
                          ))
                      }

                    </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    </Row>
  )
}

export default CartScreen


// Second Method
// function CartScreen() {
//   const {id} = useParams()
//   const productId = id
   
//   const location = useLocation()
//   const qty = location.state ? Number(location.state) : 1
  
//   const dispatch = useDispatch()

//   const cart = useSelector(state => state.cart)
//   const {cartItems} = cart
  
//   useEffect(() => {
//       if (productId) {
//           dispatch(addToCart(productId, qty))
//       }
      
//   }, [dispatch, productId, qty])
//   return (
//         <div>
//             Cart
//         </div>
//   )
// }

// export default CartScreen