import React from "react";
import noinfor from "../images/noinfor.jpg";
import { FaTimes } from "react-icons/fa";

const ProductModal = (props) => {
  const { productModal } = props;
  return (
    <form className="userModal">
      <FaTimes
        className="close-userModal"
        onClick={() => {
          props.closeModal();
        }}
      />
      <div className="infor-user-modal">
        <div className="user-modal-avatar">
          <img
            src={
              productModal.image
                ? `https://test-backend-x0xz.onrender.com/${productModal.image}`
                : noinfor
            }
          ></img>
          {/* {console.log(`http://localhost:8000/${productModal.image}`)} */}
          <h5>{productModal ? productModal.name : "chưa có thông tin"}</h5>
        </div>
        <div className="infor-user-text">
          <h6>
            Price: {productModal ? productModal.price : "chưa có thông tin"}
          </h6>

          <h6>
            Time Create:
            {productModal ? productModal.createdAt : "chưa có thông tin"}
          </h6>
          <h6>
            Time Update:
            {productModal ? productModal.updatedAt : "chưa có thông tin"}
          </h6>
          <p>
            <h6>Description:</h6>
            {productModal.description}
          </p>
        </div>
      </div>
    </form>
  );
};

export default ProductModal;
