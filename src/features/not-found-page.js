import React from "react";
import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h4>404 Page Not Found</h4>
      <NavLink to="/"> Go back to homepage </NavLink>
    </div>
  );
};

export default NotFoundPage;
