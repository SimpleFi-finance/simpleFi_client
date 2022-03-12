import React from "react";
import classNames from "classnames";

const Tag = ({ title, link, ...props }) => {
  const outerClasses = classNames("tag-outer");
  const innerClasses = classNames("tag-inner");

  return (
    <div className={outerClasses}>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <div className={innerClasses}>{title}</div>
      </a>
    </div>
  );
};

export default Tag;
