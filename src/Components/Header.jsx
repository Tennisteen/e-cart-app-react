import React from 'react'
import { Navbar, Container, FormControl, Badge ,Dropdown, Button} from 'react-bootstrap'
import { MdShoppingCart } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { CartState } from '../context/Context';

const Header = () => {
  const {
    state : {cart},
    dispatch,
    productDispatch,
  } = CartState()
  return (
    <Navbar bg="dark" variant="da rk" style={{height:80}}>
      <Container>
         <Navbar.Brand>
            <Link to="/" className='ShopingName'> Shopping Cart</Link>
         </Navbar.Brand>
         <Navbar.Text className='search'>
           <FormControl style={{width:300}} placeholder='Search a product' className='m-auto' onChange={(e)=>
            productDispatch({
              type:"FILTER_BY_SEARCH",
              payload : e.target.value,
            })
           }>
           </FormControl>
         </Navbar.Text>

         <Dropdown  className='dropdown'>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
            <MdShoppingCart fontSize="20px"/>
            <Badge>{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu className='drop'>
               {
                cart.length > 0 ?(
                   <>
                   {
                     cart.map((prod)=>(
                      <span className='cartitem' key={prod.id}>
                         <img 
                            src={prod.image}
                            className="cartItemImg"
                            alt={prod.name}
                         />
                         <div className="cartItemDetail">
                           <span>{prod.name}</span>
                           <span>₹ {prod.price.split(".")[0]}</span>
                         </div>
                         <AiFillDelete 
                          fontSize="20px"
                          style={{cursor:"pointer"}}
                          onClick={()=> dispatch({
                            type : "REMOVE_FROM_CART",
                            payload : prod
                          })} 
                          />
                      </span>
                     ))
                   }
                   <Link to="/cart" >
                    <Button style={{width:"95%", margin:"0 10px"}}>Go to cart</Button>
                   </Link>
                   </>
                ) : (<span style={{padding:10}}>Cart is empty !</span>)
               }
                
            </Dropdown.Menu>
          </Dropdown>

      </Container>
    </Navbar>
  )
}

export default Header