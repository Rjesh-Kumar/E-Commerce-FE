import React from "react";

const Toast = ({ message, type = "success", onClose }) => {

  const allowed = ["success", "warning", "danger", "info", "primary"];
  const cls = allowed.includes(type) ? type : "success";

  return (
    <div className={`alert alert-${cls} d-flex align-items-start`} role="alert">
      <div style={{ flex: 1 }}>{message}</div>
      <button
        type="button"
        className="btn-close ms-3"
        aria-label="Close"
        onClick={onClose}
        style={{ marginLeft: 8 }}
      />
    </div>
  );
};

export default Toast;
