import React from "react";

const Error = ({ error }) => {
  return (
    <div className="error-container">
      <div className="error">{error}</div>
    </div>
  );
};

export default Error;
