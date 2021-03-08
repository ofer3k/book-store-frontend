import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from './Card'
import Search from './Search'
import '../aaStyle/home.css'
import '../styles.css'

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts("sold").then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts("createdAt").then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <Layout title="Home Page" description="welcome to ofer's bookstore" className='container'>
            <Search/>
        {/* <div className='book-container'>
        <div class="book">
                <div class="back"></div>
                <div class="page6">ofer's book store</div>
                <div class="page5"></div>
                <div class="page4"></div>
                <div class="page3"></div>
                <div class="page2"></div>
                <div class="page1"></div>
                <div class="front">home page</div>
        </div>
        </div> */}
            <h2 className='mb-4'>New Arrival</h2>
            <div className='row'>
            {productsByArrival.map((product,i)=>(
            <div key={i} className='col-md-4 col-sm-6 mb-3'>
                <Card  product={product}/>
            </div>
            ))}
            </div>
            <h2 className='mb-4'>Best Sellers</h2>
            <div className='row'>
            {productsBySell.map((product,i)=>(<div key={i} className='col-md-4 col-sm-6 mb-3'>
                <Card  product={product}/>
            </div>))}
            </div>
            
        </Layout>
    );
};

export default Home;
