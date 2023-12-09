import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
const AddProduct = () => {
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  const [description, setDecription] = useState();

  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);
  formData.append("price", price);
  formData.append("description", description);

  const Add = (e) => {
    e.preventDefault();

    fetch(`https://test-backend-2-spql.onrender.com/api/v1/product`, {
      method: "POST",
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        //xu ly logic neu can
        console.log(data);

        navigate("/");

        alert(data.message);
      })
      .catch((error) => console.log(error.message));
    // axios
    //   .put(`http://localhost:8000/api/user/${id}`, formData, {
    //     headers: {
    //       "content-type": "multipart/form-data",
    //       Accept: "application/json",
    //     },
    //   })
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  };

  return (
    <div>
      <Header />
      <form className="row g-3" onSubmit={Add}>
        <div className="col-md-6">
          <label className="form-label">Name product</label>
          <input
            className="form-control"
            placeholder="Enter name product"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Price</label>
          <input
            className="form-control"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Description</label>
          <input
            className="form-control"
            placeholder="Enter description"
            onChange={(e) => setDecription(e.target.value)}
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputAddress2" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            // onChange={handleUserUpdate}
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary ">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
