import React from 'react'
import {Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'


function CheckOutSteps({a, b, c, d}) {
    // console.log(`Trigered Check out step 1 ${a} 2 ${b} 3 ${c} 4 ${d}`);
    return (
        <Nav className='justify-content-center mb-4'>
            
            <Nav.Item>
                {a ? (
                    <LinkContainer to='/login'>
                    <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                ):(
                    <Nav.Link disabled>Login</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {b ? (
                    <LinkContainer to='/shipping'>
                    <Nav.Link>Shipping</Nav.Link>
                </LinkContainer>
                ):(
                    <Nav.Link disabled>Shipping</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {c ? (
                    <LinkContainer to='/payment'>
                    <Nav.Link>Payment</Nav.Link>
                </LinkContainer>
                ):(
                    <Nav.Link disabled>Payment</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {d ? (
                    <LinkContainer to='/placeorder'>
                    <Nav.Link>Place Order</Nav.Link>
                </LinkContainer>
                ):(
                    <Nav.Link disabled>Place Order</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckOutSteps