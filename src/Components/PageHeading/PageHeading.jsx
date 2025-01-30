import React from "react";
import "./PageHeading.css";
import "../../Styles/DesignStyles.css";
import { Link } from "react-router-dom";

const PageHeading = ({ title, paragraph, link }) => {
  const [firstPart, secondPart] = paragraph.split("!");

  return (
    <div className="page-heading-container">
      <h1 className="page-heading-title">{title}</h1>
      <p className="page-heading-paragraph">
        {firstPart}!
        <br />
        {secondPart}{" "}
        <Link to="/MyPlayLists" className="page-heading-link">
          here
        </Link>
      </p>
      <hr className="page-heading-divider" />
    </div>
  );
};

export default PageHeading;
