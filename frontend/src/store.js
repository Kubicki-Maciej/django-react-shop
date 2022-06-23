import {legacy_createStore , combineReducers, applyMiddleware } from 'redux'
import {productListReducers, productDetailsReducers} from './reducers/productReducers'
import {cartReducers} from './reducers/cartReducers'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    cart: cartReducers
})
 
const cartItemsFromStorage = localStorage.getItem('cartItems') ?
         JSON.parse(localStorage.getItem('cartItems')) : [] 

const initialState = {
    cart : {cartItems : cartItemsFromStorage}
}

const middleware = [thunk]

const store = legacy_createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store