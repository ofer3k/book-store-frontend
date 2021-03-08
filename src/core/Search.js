import React, { useState, useEffect } from "react";
import { getCategories,list } from "./apiCore";
import Card from './Card'
import '../mainStyles/search.css'

const Search=()=>{
    const [data,setData]=useState({
        categories:[],
        category:'',
        search:'',
        results:[],
        searched:false
    })
    const {categories,category,search,results,searched}=data
    const loadCategories=()=>{
        getCategories().then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setData({...data, categories:data})
            }
        })
    }

    useEffect(()=>{
    loadCategories()
    },[])

    const searchData=()=>{
        if(search){
            list({search:search||undefined,category:category})
            .then(response=>{
                if(response.error){
                    console.log(response.error)
                }else{
                    setData({...data,results:response,searched:true})
                }
            })
        }
    }
    const searchSubmit=(e)=>{
        e.preventDefault()
        searchData()
    }
    const handleChange=(name)=>(event)=>{ 
        setData({...data,[name]:event.target.value,searched:false})
    }
    const searchedMessage=(searched,results)=>{
        if(searched&&results.length>0){
            return(`found ${results.length} products`)
        }
        if(searched&&results.length<1){
            return(`No products was found`)
        }
    }

    const searchedProducts=(results=[])=>{
        return (
            <div>

                <h2 className='mt-4 mb-4'>
                    {searchedMessage(searched,results)}
                </h2>
                <div className='row'>
                {results.map((product,i)=>(
                    <Card key={i} product={product}/>
                ))}
            </div>
            </div>
        )
    }
    const searchForm=()=>(
         <form onSubmit={searchSubmit}>
            
            <span className='card card--accent'>
                 <h2><svg class="icon" aria-hidden="true">
      {/* <use xlink:href="#icon-coffee" href="#icon-coffee" /> */}
    </svg>Search Bar</h2>
                <div className='input-group input-group-default'>
                <div className='input-group-prepend'>
                    <select className='btn mr-2' onChange={handleChange('category')}>
                        <option value='All'>All</option>
                        {categories.map((c,i)=>(<option key={i} value={c._id}>{c.name}</option>))}
                    </select>
                </div>
                <input 
            type='search' 
            className='input__field' 
            onChange={handleChange('search')}
            placeholder='Search by name'/>
           
                </div>
                
                <div className='btn input-group-append' style={{border:'none'}}>
                    <button className='button-group'>Search</button>
                </div>
            </span>
         </form>
    )
return(
<div className='row'>
    <div className='container'>
        {searchForm()}
    </div>
    <div className='container-fluid'>
        {searchedProducts(results)}
    </div>
</div>
)
}

export default Search