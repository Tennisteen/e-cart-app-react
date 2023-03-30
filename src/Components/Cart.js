import React, { useEffect, useState } from 'react'
import { Button, Col, ListGroup, Row, Form, Image } from 'react-bootstrap'
import { AiFillDelete } from 'react-icons/ai'
import { CartState } from '../context/Context'
import Rating from './Rating'

const Cart = () => {
  const {state : {cart}, dispatch}= CartState()

  const [total, setTotal] = useState()

  useEffect(()=>{
      setTotal(cart.reduce((acc,curr) => acc + Number(curr.price)*curr.qty ,0))
  },[cart])

  return (
    <div className="home">
      <div className='productContainer'>
          <ListGroup className='listmobile'>
            {
              cart.map((prod)=>(
                <ListGroup.Item key={prod.id}>
                <Row >
                  <Col >
                    <Image src={prod.image} alt={prod.name} fluid rounded></Image>
                  </Col>
                  <Col md={2}>
                    <span>{prod.name}</span>
                  </Col>
                  <Col>
                  ₹ {prod.price}
                  </Col>
                  <Col>
                   <Rating rating={prod.ratings}/>
                  </Col>
                  <Col>
                  <Form.Control as ="select" className='formqty' value={prod.qty}
                    onChange={(e)=> 
                      dispatch ({
                        type:'CHANGE_CART_QTY',
                        payload :{
                          id:prod.id,
                          qty : e.target.value
                        },
                      })
                      } 
                  >
                      {
                           [...Array(prod.inStock).keys()].map((x)=>(
                             <option key={x+1}>{x+1}</option>
                           ))
                      }

                    </Form.Control>
                  </Col>
                  <Col>
                  <AiFillDelete 
                          fontSize="20px"
                          style={{cursor:"pointer"}}
                          onClick={()=> dispatch({
                            type : "REMOVE_FROM_CART",
                            payload : prod
                          })} 
                          />
                  </Col>
                </Row>
                </ListGroup.Item>
              ))
            }
          </ListGroup>
      </div>
      <div className="filters summary">
        <span className='title'> 
              Subtotal ({cart.length}) item(s)
        </span>
        <span style={{fontWeight:700, fontSize:20}}> Total :<br></br>
         ₹ {total}</span>
        <Button>Proceed </Button>
      </div>
    </div>
  )
}

export default Cart