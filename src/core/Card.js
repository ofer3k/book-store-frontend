import React, { useState } from 'react'
import {Link, Redirect} from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import {addItem,updateItem,removeItem} from './cartHelpers'
import '../aaStyle/card.css'
import '../aaStyle/aaCard.css'
// import '../mainStyles/card.css'

const Card=({product,showViewProductButton=true,showAddToCartButton=true,cartUpdate=false,showRemoveProductButton=false})=>{
    const [redirect,setRedirect]=useState(false)
    const [count,setCount]=useState(product.count)

const showViewButton=(showViewProductButton)=>{
    return(
    showViewProductButton&&(
        <Link to={`/product/${product._id}`}>
        <button style={{marginRight:'4px'}} className='reset'>View Product</button>
        </Link>
    )
    )
    }
const addToCart=()=>{
    addItem(product,()=>{
        setRedirect(true)
    })
}
const shouldRedirect=redirect=>{
    if(redirect){
        return <Redirect to='/cart'/>
    }
}

const showAddToCart=(showAddToCartButton)=>{
    return(showAddToCartButton&&(<button onClick={addToCart} className='button-group'>
    Add to cart
</button>))
}

const showRemoveButton=(showRemoveProductButton)=>{
    return(showRemoveProductButton&&(<button onClick={()=>{removeItem(product._id)}} className='button-group remove'>
    Remove
</button>))
}

const showStock=(quantity)=>{
    return quantity>0? <span className='stock-info'>{quantity} Are In Stock</span>:<span className='badge badge-primary badge-pill'>Out Of Stock</span>
}
const handleChange=(productId)=>event=>{
    setCount(event.target.value<1?1:event.target.value)
    if(event.target.value>=1){
        updateItem(productId,event.target.value)
    }
}
const showCartUpdate=(cartUpdate)=>{
    return cartUpdate && <div>
        <div className='input-group mb-3'>
            <div className='input-group-prepend'>
                <span className='input-group-text'>
                    Adjust Quantity
                </span>
                <input type='number' value={count} className='form-control' onChange={handleChange(product._id)}/>
            </div>
        </div>
    </div>
}
    return(

        <div className='card'>
            <div className='card-header name'>{product.name}</div>
            <div className='card-body'>
                {shouldRedirect(redirect)}
                <ShowImage item={product} url='product'/>
                <p className='lead mt-2'>{product.description.substring(0,100)}</p>
                <div className='card-info'>
                <p className=''>Price: ${product.price}</p>
                <p className=''>Category: {product.category&&product.category.name}</p>
                <p className=''>Added: {moment(product.createdAt).fromNow()}</p>
                </div>
                {showStock(product.quantity)}
                <br/>
                {showViewButton(showViewProductButton)}
                {showAddToCart(showAddToCartButton)}
                {showRemoveButton(showRemoveProductButton)}
                {showCartUpdate(cartUpdate)}
            </div>
        </div>

)
}

export default Card