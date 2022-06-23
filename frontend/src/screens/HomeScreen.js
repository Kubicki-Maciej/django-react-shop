import React, {useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
// COMPONENTS 

import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'


// REDUX
import {useDispatch, useSelector } from 'react-redux'
import {listProducts} from '../actions/productActions'



function HomeScreen() {

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList

    useEffect(()=>{
        dispatch(listProducts())

    },[dispatch])



    return (
        <div>
            <h1>Latest Products</h1>
            {loading ? <Loader/>
                :error ? <Message variant='danger'>{error}</Message>
                :
                <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <h3>
                                <Product product={product} />
                            </h3>
                        </Col>
                    ))}
                </Row>
            }
        </div>
    )
}

export default HomeScreen