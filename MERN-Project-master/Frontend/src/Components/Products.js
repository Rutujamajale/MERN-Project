import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../CSS/Prod.css'

const Products = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products',{
            headers:{
                authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    }
    console.log(products);

    const handleDelete= async(id)=>{
        console.log(id);
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method:'delete',
            headers:{
                authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if(result){
            alert("Product is deleted!!");
            getProducts();
        }
    }

    const handleSearch= async(e)=>{
        //console.log(e.target.value);
        let key = e.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if(result){
                setProducts(result);
            }    
        }else{
            getProducts();
        }
    }

    return (
        <>
            <div className="product-list">
                <h3>Products</h3>
                <input type="text" placeholder="Search Product" className="searchBox"  onChange={handleSearch}/>
                <ul>
                    <li>Sr.No.</li>
                    <li>Name</li>
                    <li>Price</li>
                    <li>Category</li>
                    <li>Company</li>
                    <li>Operation</li>
                </ul>
                {
                    products.length>0 ? products.map((item,index) =>
                        <ul key={item._id}>
                            <li>{index+1}</li>
                            <li>{item.name}</li>
                            <li>Rs. {item.price}</li>
                            <li>{item.category}</li>
                            <li>{item.company}</li>
                            <li><button onClick={()=>handleDelete(item._id)}>Delete</button>
                                <Link to={'/update/'+ item._id}>Edit</Link>
                            </li>
                        </ul>
                    )
                    : <h1>No products found! </h1>
                }
            </div>
        </>
    )
}

export default Products;