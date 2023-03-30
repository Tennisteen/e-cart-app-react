import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { CartState } from '../context/Context'
import Rating from './Rating'
import './styles.css'

const SingleComponents = ({prod}) => {
  const {state: {cart} , dispatch} = CartState();
  return (

    <div className='products'>
        <Card>
            <Card.Img variant='top' src={prod.image} alt ={prod.name}/>
            <Card.Body>
                <Card.Title>{prod.name}</Card.Title>
                <Card.Subtitle style={{paddingBotttom:10}}>
                <span>₹ {prod.price.split(".")[0]}</span>
                {
                    prod.fastDelivery ? 
                    (<div>Fast Delivery</div>) : 
                    (<div>{Math.round((Math.random()*8))} days delivery</div>)
                }
                <Rating rating={prod.ratings}/>
                </Card.Subtitle>
                {
                  cart.some(p=>p.id===prod.id) ?(
                    <Button  onClick={()=>{
                      dispatch({
                        type :'REMOVE_FROM_CART',
                        payload : prod,
                      })
                    }} variant='danger'>Remove form Cart</Button>
                  ):(
                    <Button onClick={()=>{
                      dispatch({
                        type :'ADD_TO_CART',
                        payload : prod,
                      })
                    }} disabled={!prod.inStock}>{!prod.inStock ?"Out of Stock":"Add to Cart"}</Button>
                  )
                }
                
            </Card.Body>
        </Card>
    </div>
  )
}

export default SingleComponents