import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getCart,removeItem } from "./cartHelpers";
import Card from './Card'
import { Link } from "react-router-dom";
import Checkout from './Checkout'
const Cart=()=>{
    const [items,setItems]=useState([])

    useEffect(()=>{
        setItems(getCart())
    },[items])
    const showItems=(items)=>{
        return(
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr/>
                {items.map((product,i)=>( <Card key={i} showRemoveProductButton={true} cartUpdate={true} product={product} showAddToCartButton={false}/> ))}
            </div>
        )
    }
    const noItemsMessage=()=>(
        <h2>Your cart is empty. <br/><Link to='/shop'>go shopping</Link> </h2>
    )
    return (
        <Layout title="Shpping cart" description="manage your cart items" className='container-fluid'>
            <div className='row'>
                <div className='col-6'>
                {items.length>0?showItems(items):noItemsMessage()}
                </div>    
                <div className='col-6'>
                <p>
                    <h2 className='mb-4'>Your cart summary</h2>
                    <hr/>
                    <Checkout products={items}/>
                </p>
                </div>    
            </div>           
        </Layout>
    );
}
export default Cart