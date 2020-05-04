import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const LandingPage = () => {
  const history = useHistory();
  const onClickHandler = () => {
    axios.get(`/api/users/logout`).then((res) => {
      if (res.data.success) {
        history.push("/login");
      } else {
        alert("로그아웃 실패");
      }
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>Landing Page</h2>

      <button type="button" onClick={onClickHandler}>
        logout
      </button>
    </div>
  );
};

export default LandingPage;
