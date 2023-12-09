import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import User from "./pages/User";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
              // updateUser={updateUser}
              // users={users}
              // onDeleteTodo={onDeleteTodo}
              />
            }
          />

          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/user/:id" element={<User />}></Route>

          <Route path="/addproduct" element={<AddProduct />}></Route>
          <Route path="/updateProduct/:id" element={<UpdateProduct />}></Route>

          {/* <Route
            path="/add-user"
            element={<AddUser onAddNewUser={onAddNewUserToUserList} />}
          /> */}
          {/* <Route path="/user/:id" element={<User users={users} />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
