import React from "react";
import "./PageHeading.css";
import "../../Styles/DesignStyles.css";

const PageHeading = ({ title, paragraph, link }) => {
  const [firstPart, secondPart] = paragraph.split("!");

  return (
    <div className="page-heading-container">
      <h1 className="page-heading-title">{title}</h1>
      <p className="page-heading-paragraph">
        {firstPart}!
        <br />
        {secondPart}{" "}
        <a href={link} className="page-heading-link">
          here
        </a>
      </p>
      <hr className="page-heading-divider" />
    </div>
  );
};

export default PageHeading;
