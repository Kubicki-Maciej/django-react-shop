import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
// Components 
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
// redux
import {useDispatch, useSelector} from 'react-redux'
import {detailProduct} from '../actions/productActions'

// import axios from 'axios'

function ProductScreen({match, history}) {
    const [qty, setQty] = useState(1)

    // Get params
    const productId = useParams()
    // const [product, setProduct] = useState([])

    // Redux
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(()=>{
        // async function fetchProduct(){
        //     const {data} = await axios.get(`/api/products/${productId.id}`)
        //     setProduct(data)
        // }
        // fetchProduct()

        // Redux
        dispatch(detailProduct(productId.id))
    },[dispatch, useEffect])

    let navigate = useNavigate();
    const addToCartHandler = () =>{
        navigate(`/cart/${productId.id}?qty=${qty}`)
    } 


    // const product_id = useParams()
    // const product = products.find((p) => p._id === product_id.id)

    return (
        <div>
            <Link to ='/' className="btn btn-outline-secondary my-3">Go Back</Link>
            {loading ? 
                <Loader/>   
                : error 
                    ? <Message variant='danger'>{error}</Message>
                :(
                    <Row>
                    <Col md={6}> 
                        <Image src={product.image } alt={product.name} fluid/>
                    </Col>
    
                    <Col md={3}> 
                        <ListGroup varinat='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
    
                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                            </ListGroup.Item>
    
                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>
    
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}> 
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Price:
                                        </Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
    
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Status:
                                        </Col>
                                        <Col>
                                            {product.count_in_stock > 0 ? 'In Stock' : 'Out of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.count_in_stock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Quantity</Col>
                                            <Col xs='auto' className='my-1'>
                                                <Form.Control 
                                                as="select"
                                                value={qty}
                                                onChange={(e) => setQty(e.target.value)}
                                                >
                                                    {
                                                        [...Array(product.count_in_stock).keys()].map((x) => (
                                                            <option key={x+1} value={x + 1}>
                                                                {x + 1} 
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
    
                                <ListGroup.Item>
                                    <Button onClick={addToCartHandler} className='btn-block' disabled={product.countInStock === 0} type='button'>Add to cart</Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
                )
            }
        </div>
    )
}

export default ProductScreen
