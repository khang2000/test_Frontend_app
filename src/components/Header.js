import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  const history = useNavigate();
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const userLogout = () => {
    // localStorage.removeItem("user");
    // localStorage.removeItem("token");
    // localStorage.removeItem("role");
    localStorage.clear();

    history("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light nav-header">
      <div className="container-fluid">
        <Link className="nav-link active link-dark" to="/">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDarkDropdown"
          aria-controls="navbarNavDarkDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        {token ? (
          <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <Link
                  // className="nav-link dropdown-toggle"
                  className="nav-link"
                  href="#"
                  // id="navbarDarkDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaRegUserCircle size={30} />
                </Link>
                <ul className="dropdown-menu ">
                  <div className="btn-user">
                    <Link className="link-profile" to={`/user/${id}`}>
                      Profile
                    </Link>
                  </div>

                  <div className="btn-user">
                    <button onClick={userLogout}>Đăng Xuất</button>
                  </div>
                </ul>
              </li>
            </ul>
          </div>
        ) : (
          <Link className="nav-link link-dark " to="/login">
            {" "}
            Đăng nhập
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
