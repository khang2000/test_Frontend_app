import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
const User = () => {
  const { id } = useParams();
  // const [user, setUser] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user/" + id)
      .then((result) => {
        console.log(result);
        setUserName(result.data.data.userName);
        setEmail(result.data.data.email);
      })
      .catch((error) => console.log(error));
  });

  return (
    <div>
      <Header />
      <div className="infor-user">
        <div className="infor-user-text">
          <h2>Name: {userName ? userName : "no information"}</h2>
          <h4>Email: {email ? email : "no information"}</h4>
        </div>
      </div>
    </div>
  );
};

export default User;
