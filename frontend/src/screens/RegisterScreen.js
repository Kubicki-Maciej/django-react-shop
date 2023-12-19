import React, {useState, useEffect} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { Button, Row, Col, Form, Container} from 'react-bootstrap'

import {useDispatch, useSelector, } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {register} from '../actions/userActions'
import FormContainer from '../components/FormContainer'
 

function RegisterScreen() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfrimPassword] = useState('')
    const [message, setMessage] = useState('')
 
    // Old history , location
    const location = useLocation() 
    const navigate = useNavigate()

    const dispatch = useDispatch()


    const redirect = location.search ? location.search.split('=')[1] : '/'
    // console.log(redirect);
    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo } = userRegister

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) =>{
        e.preventDefault()

        if (password !== confirmPassword){
            setMessage('Passwords do not match')
        }
        else{
            dispatch(register(name ,email, password))
        }
        
    }

    return (
        <FormContainer>
            <h1>Sign in</h1>
            {message && <Message variant='danger'> {message} </Message>}
            {error && <Message variant='danger'> {error} </Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control required type='name' placeholder='Enter Name' value={name} 
                    onChange={(e)=> setName(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control required type='email' placeholder='Enter Email' value={email} 
                    onChange={(e)=> setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type='password' placeholder='Enter Password' value={password} 
                    onChange={(e)=> setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password </Form.Label>
                    <Form.Control required type='password' placeholder='Enter Password Confirm' value={confirmPassword} 
                    onChange={(e)=> setConfrimPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type='submit' varaint='primary'> Register </Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account ? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Sign In
                    </Link>
                </Col>

            </Row>

        </FormContainer>
    )
}

export default RegisterScreen