import {legacy_createStore , combineReducers, applyMiddleware } from 'redux'
// REDUCERS
import {productListReducers, productDetailsReducers} from './reducers/productReducers'
import {cartReducers} from './reducers/cartReducers'
import {userLoginReducers, userRegisterReducers, userDetailsReducers, userUpdateProfileReducers} from './reducers/userReducers'
import {orderCreateReducer, orderDetailReducer} from './reducers/orderReducers'


import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    cart: cartReducers,
    userLogin: userLoginReducers,
    userRegister: userRegisterReducers,    
    userDetails : userDetailsReducers,    
    userUpdateProfile: userUpdateProfileReducers,
    orderCreate: orderCreateReducer,
    orderDetail:orderDetailReducer,
}) 
 
const cartItemsFromStorage = localStorage.getItem('cartItems') ?
         JSON.parse(localStorage.getItem('cartItems')) : [] 

const userInfoFromStorage = localStorage.getItem('userInfo') ?
         JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
         JSON.parse(localStorage.getItem('shippingAddress')) : {}
         
const initialState = {
    cart : {
        cartItems : cartItemsFromStorage, 
        shippingAddress : shippingAddressFromStorage, 
    },
    userLogin : {userInfo : userInfoFromStorage},
}

const middleware = [thunk]

const store = legacy_createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store