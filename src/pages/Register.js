import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const getData = (e) => {
    const { value, name } = e.target;
    setUser(() => {
      return {
        ...user,
        [name]: value,
      };
    });
  };

  // const [userName, setUserName] = useState();
  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();
  // const [confirmPassword, setConfirmPassword] = useState();

  const addData = (e) => {
    e.preventDefault();
    // const user = { userName, email, password, confirmPassword };

    fetch("https://test-backend-2-spql.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        //xu ly logic neu can
        console.log(data);
        alert(data.message);
        // setUserName(data.user.userName);
        // setEmail(data.user.email);
        // setPassword(data.user.password);
        // setConfirmPassword(data.user.confirmPassword);
        if (data.message !== "Đăng ký thành công!") {
          alert(data.message);
        } else {
          console.log(data);
          alert(data.message);
          setUser(data.user);
          navigate("/login");
        }
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="register-form">
      <h3 className="text-center ">Đăng ký</h3>
      <form>
        <div className="mb-3">
          <input
            type="text"
            placeholder="enter your name?"
            className="form-control"
            onChange={getData}
            // onChange={(e) => setUserName(e.target.value)}
            name="userName"
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="enter your email?"
            onChange={getData}
            // onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="password"
            onChange={getData}
            // onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="confirmPassword"
            onChange={getData}
            // onChange={(e) => setConfirmPassword(e.target.value)}
            name="confirmPassword"
          />
        </div>

        <button
          type="submit"
          onClick={addData}
          className="btn btn-primary center"
        >
          Submit
        </button>
      </form>
      <p className="mt-3">
        Already Have an Account{" "}
        <span>
          <Link to="/login">Đăng nhập</Link>
        </span>
      </p>
    </div>
  );
};

export default Register;
