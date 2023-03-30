import React from 'react'
import { CartState } from '../context/Context'
import SingleComponents from './SingleComponents'
import Filters from './Filters'
import './styles.css'

const Home = () => {
  const {
    state:{products} ,
    productState :{ sort, byStock, byFastDelivery, byRating, searchQuery}
    } = CartState()

   const transformProducts =()=>{
    let sortedProduct = products;
    if(sort){
      sortedProduct = sortedProduct.sort((a,b) => 
      sort ==="lowToHigh" ? a.price-b.price : b.price-a.price
      ) 
    }
    if(!byStock){
      sortedProduct = sortedProduct.filter((prod) => prod.inStock)
    }
    if(byFastDelivery){
      sortedProduct = sortedProduct.filter((prod)=> prod.fastDelivery)
    }
    if(byRating){
      sortedProduct = sortedProduct.filter((prod)=>prod.ratings >= byRating)
    }
    if(searchQuery){
      sortedProduct = sortedProduct.filter((prod)=>
      prod.name.toLowerCase().includes(searchQuery))
    }
    return sortedProduct
   }
  return (
    <div className="home">
      <Filters/>
      <div className='productContainer'>
        {
          transformProducts().map((prod)=>{
            return <SingleComponents prod={prod} key={prod.id}/>
          })
        }
      </div>
    </div>
  )
}

export default Home;