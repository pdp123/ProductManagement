import React, { useDebugValue, useEffect, useState } from "react";
import productService from "../service/product.service";
import { useNavigate, useParams } from "react-router-dom";


const EditProduct = () => {
  
    const [product, setProduct] = useState({
        productName: "",
        description: "",
        price: "",
        status: "",
      });

      const navigate= useNavigate();
    
      const [msg, setMsg] = useState("");
    
      const handleChange = (e) => {
        const value = e.target.value;
        setProduct({ ...product, [e.target.name]: value });
      };
    
      const ProductUpdate = (e) => {
        e.preventDefault();
        console.log(product);
        productService
          .editProduct(product)
          .then((res) => {
            console.log("Product Edited Successfully");
            setMsg("Product Edited Successfully");
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
            
          });
      };

      const {id}=useParams();

      useEffect(()=>{
        productService.getProductById(id).then((res)=>
        {
            setProduct(res.data)
            // console.log("Product Edited Successfully");
            // setMsg("Product Edited Successfully");
        }).catch((err)=>{
            console.log(err)
        })
      },[])
    
      return (
        <>
          <div className="container mt-3">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <div className="card">
                  <div className="card-header fs-3 text-center">Edit Product</div>
                  {
                    msg && 
                    <p className="fs-4 text-center text-success">{msg}</p> 
                  }
                  <div className="card-body">
                    <form onSubmit={ProductUpdate}>
                      <div className="mb-3">
                        <label htmlFor="productName">Enter Product Name</label>
                        <input
                          type="text"
                          name="productName"
                          className="form-control"
                          onChange={handleChange}
                          value={product.productName}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="description">Enter Description</label>
                        <input
                          type="text"
                          name="description"
                          className="form-control"
                          onChange={handleChange}
                          value={product.description}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="price">Enter Price</label>
                        <input
                          type="text"
                          name="price"
                          className="form-control"
                          onChange={handleChange}
                          value={product.price}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="status">Enter Status</label>
                        <input
                          type="text"
                          name="status"
                          className="form-control"
                          onChange={handleChange}
                          value={product.status}
                        />
                      </div>
                      <button className="btn btn-primary col-md-12">Edit</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
  )
}

export default EditProduct