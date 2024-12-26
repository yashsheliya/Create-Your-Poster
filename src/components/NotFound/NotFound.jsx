import React from "react";
import notFound from "../../asset/Oops.png";
import "./styles.scss";

const NotFound = () => {
  return (
    <div className="not-found-bg">
      <img src={notFound} alt="not-found" className="not-found" />
    </div>
  );
};

export default NotFound;
