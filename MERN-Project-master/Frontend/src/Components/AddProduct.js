import React, { useState } from "react";
import '../CSS/AppPro.css'
import axios from "axios";

const AddProduct = () => {

    const[name,SetName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);

    const handleAddProduct = async ()=>{

        console.log(!name);
        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }

        console.warn(name,price,category,company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
         console.log(userId);
        // const result = await fetch('http://localhost:5000/add-product',{
        //     method:'post',
        //     body:JSON.stringify(name, price, category, userId, company),
        //     headers:{
        //         'Content-Type':'application/json',
        //         authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        //     }
        // });
        // result = await result.json();
        // console.log(result);
        axios.post('http://localhost:5000/add-product',{
            name, price, category, userId, company,
                //'authorization': JSON.parse(localStorage.getItem('token'))
                //headers: { Authorization: "Bearer " + localStorage.getItem('token') }
        }).then((response) => {
            console.log(response);
            
        }).catch((error) => {
            console.log(error);
        })
    }


    return (
        <>
            <div>
                <h2 className="phead">Add New Products</h2>
                <div className="pbox">
                    <input type="text" placeholder="Enter Product Name" className="probox" 
                    value={name} onChange={(e)=>{
                        SetName(e.target.value);
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
                    <button className="probox" id="addprobtn" onClick={handleAddProduct}>Add</button>
                </div>
            </div>
        </>
    )
}

export default AddProduct;