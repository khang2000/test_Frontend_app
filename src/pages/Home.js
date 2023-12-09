import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate, Link } from "react-router-dom";
import noinfor from "../images/noinfor.jpg";
import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import ProductModal from "../components/ProducrModal";
const Home = () => {
  const [products, setProduct] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://test-backend-2-spql.onrender.com/api/v1/product/list", {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        // Accept: "application/json",
      },
      // body: JSON.stringify(users),
    })
      .then((response) => response.json())
      .then((data) => {
        //xu ly logic neu can
        console.log(data);
        // data.data.password = undefined;
        setProduct(data.data);
      })
      .catch((error) => console.log(error.message));
  }, []);

  const [productModal, setProductModal] = useState({
    name: "",
    price: "",
    image: "",
    createdAt: "",
    updatedAt: "",
    description: "",
  });

  const [isOpenModal, setOpenModal] = useState(false);
  const handleOpenModal = (_id) => {
    fetch(`https://test-backend-2-spql.onrender.com/api/v1/product/${_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //xu ly logic neu can
        console.log(data);
        setProductModal(data.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
    setOpenModal(!isOpenModal);
  };
  const closeModal = (_id) => {
    setOpenModal(!isOpenModal);
  };
  const onDeleteTodo = (id) => {
    if (!token) {
      alert("Bạn chưa đăng nhập");
    } else {
      fetch(
        `https://test-backend-2-spql.onrender.com/api/v1/product/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "application/json",
            // Accept: "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          //xu ly logic neu can
          console.log(data);
          alert(data.message);
          window.location.reload();
        })
        .catch((error) => console.log(error.message));
    }
  };
  return (
    <div>
      <Header />
      {token ? (
        <button className="mt-100 btn-add-product">
          <Link className="nav-link active link-dark" to="/addproduct">
            Add Product
          </Link>
        </button>
      ) : null}

      <table
        className={
          isOpenModal
            ? "table table-striped class-example"
            : "table table-striped"
        }
      >
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Name</th>
            <th scope="col">Picture</th>
            <th scope="col">Price</th>
            <th scope="col">Time create</th>
            <th scope="col">Time update</th>

            <th scope="col">View</th>
            {token ? <th scope="col">Update</th> : null}
            {token ? <th scope="col">Delete</th> : null}
          </tr>
        </thead>
        {products.map((product, index) => {
          return (
            <tbody>
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{product.name}</td>
                <td>
                  <img
                    width={45}
                    src={
                      product.image
                        ? `http://localhost:8000/${product.image}`
                        : noinfor
                    }
                  />
                </td>
                <td>{token ? product.price : (product.price = "Liên hệ")}</td>
                <td>{product.createdAt}</td>
                <td>{product.updatedAt}</td>

                <td>
                  <FaEye
                    onClick={() => {
                      handleOpenModal(product._id);
                    }}
                  />
                </td>
                {token ? (
                  <td>
                    <Link
                      className=" link-dark"
                      to={`/updateProduct/${product._id}`}
                    >
                      <FaPencilAlt />
                    </Link>
                  </td>
                ) : null}

                {token ? (
                  <td>
                    <FaTrashAlt
                      onClick={(e) => {
                        onDeleteTodo(product._id);
                      }}
                    />
                  </td>
                ) : null}
              </tr>
            </tbody>
          );
        })}
      </table>
      {isOpenModal && (
        <div className="center-screen">
          <ProductModal
            handleOpenModal={handleOpenModal}
            productModal={productModal}
            closeModal={closeModal}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
