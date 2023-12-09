import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
const UpdateProduct = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  const [description, setDecription] = useState();

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/product/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //xu ly logic neu can
        console.log(data);
        setName(data.data.name);
        setPrice(data.data.price);
        setImage(data.data.image);
        setDecription(data.data.description);
      })
      .catch((error) => console.log(error.message));
  }, []);

  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);
  formData.append("price", price);
  formData.append("description", description);

  const Add = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8000/api/v1/product/update/${id}`, {
      method: "PUT",
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
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Price</label>
          <input
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Description</label>
          <input
            className="form-control"
            placeholder="Enter description"
            value={description}
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
            // defaultValue={image}
            name="image"
            // onChange={handleUserUpdate}
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary ">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
