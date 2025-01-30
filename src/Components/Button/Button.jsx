import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";

const Button = ({ text,...props }) => {
  return (
    <Link className="primaryButton" {...props}>
      {text}
    </Link>
  );
}

export default Button;
