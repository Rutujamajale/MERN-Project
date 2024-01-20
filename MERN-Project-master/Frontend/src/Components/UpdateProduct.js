import React, { useEffect, useState } from "react";
import '../CSS/AppPro.css'
//import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {

    const [name,setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);
    const params = useParams();

    const getProduct = async () =>{
        console.log(params);
        // axios.get(`http://localhost:5000/product/${params.id}`)
        // .then((result)=>{
        //     console.log(result);
        //     setName(result.data.name);
        //     setPrice(result.data.price);
        //     setCategory(result.data.category);
        //     setCompany(result.data.company);

        // }).catch((error)=>{
        //     console.log(error);
        // })

        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.log(result);
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    useEffect(() => {
        console.log('ghj');
        getProduct();
    },[])
    

    const handleUpdateProduct = async ()=>{

        console.log(!name);
        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }
        // console.log(name,price,category,company);
        // const userId = JSON.parse(localStorage.getItem('user'))._id;
        // console.log(userId);

        let result = await fetch(`http://localhost:5000/product/update/${params.id}`,{
            method:'put',
            body: JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type':'application/json',
                authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.log(result);
    }


    return (
        <>
            <div>
                <h2 className="phead">Update Product</h2>
                <div className="pbox">
                    <input type="text" placeholder="Enter Product Name" className="probox" 
                    value={name} onChange={(e)=>{
                        setName(e.target.value);
                    }}
                    />
                    {error && !name && <span className="invalid-input">Invalid Name</span>}
                    <input type="text" placeholder="Enter Product Price" className="probox" 
                     value={price} onChange={(e)=>{
                        setPrice(e.target.value);
                    }}
                    />
                    {error && !price && <span className="invalid-input">Invalid Price</span>}
                    <input type="text" placeholder="Enter Product Category" className="probox" 
                     value={category} onChange={(e)=>{
                        setCategory(e.target.value);
                    }}
                    />
                    {error && !category && <span className="invalid-input">Invalid Category</span>}
                    <input type="text" placeholder="Enter Product Company" className="probox" 
                     value={company} onChange={(e)=>{
                        setCompany(e.target.value);
                    }}
                    />
                    {error && !company && <span className="invalid-input">Invalid Company</span>}
                    <button className="probox" id="addprobtn" onClick={handleUpdateProduct}>Update</button>
                </div>
            </div>
        </>
    )
}

export default UpdateProduct;