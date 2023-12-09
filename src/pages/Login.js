import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const getData = (e) => {
    const { value, name } = e.target;
    setData(() => {
      return {
        ...data,
        [name]: value,
      };
    });
  };
  const addData = (e) => {
    e.preventDefault();
    fetch("https://test-backend-x0xz.onrender.com/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert(data.message);
        if (data.message !== "Đăng nhập thành công") {
          alert(data.message);
        } else {
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("id", data.user._id);

          navigate("/");
        }
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <div className="container mt-3">
      <section className="d-flex justify-content-between">
        <div className="left-data mt-3" style={{ width: "100%" }}>
          <h3 className="text-center col-lg-6">Đăng nhập</h3>
          <form>
            <div className="mb-3 col-lg-6">
              <input
                type="email"
                placeholder="enter your email?"
                className="form-control"
                id="exampleInputEmail1"
                onChange={getData}
                name="email"
              />
            </div>
            <div className="mb-3 col-lg-6">
              <input
                type="password"
                className="form-control"
                placeholder="password"
                onChange={getData}
                name="password"
              />
            </div>
            <button
              type="submit"
              onClick={addData}
              className="btn btn-primary col-lg-6"
            >
              Submit
            </button>
          </form>
          <p className="mt-3">
            Already Have an Account{" "}
            <span>
              <Link to="/register">Đăng ký</Link>
            </span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Login;
