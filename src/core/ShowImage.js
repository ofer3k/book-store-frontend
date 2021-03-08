import React from 'react'
import {API} from '../config'
import '../aaStyle/card.css'

const ShowImage=({item,url})=>(
    <div className='product-img'>
        <img src={`${API}/${url}/photo/${item._id}`} 
        alt={item.name} 
        className='mb-3' 
        style={{maxHeight:'300px',maxWidth:'100%'}}></img>
    </div>
)

export default ShowImage