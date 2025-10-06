import React from "react";

const Toast = ({ message, type = "success" }) => (
  <div className={`alert alert-${type} position-fixed top-0 end-0 m-3`} role="alert" style={{ zIndex: 9999 }}>
    {message}
  </div>
);

export default Toast;
