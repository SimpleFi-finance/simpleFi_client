import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

const FooterNav = ({ className, ...props }) => {
  const classes = classNames("footer-nav", className);

  return (
    <nav {...props} className={classes}>
      <ul className="list-reset">
        <li>
          <Link to="/careers">Careers</Link>
        </li>
        <li>
          <a
            href="https://discord.gg/CJKE9wmGkk"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact
          </a>
        </li>
        <li>
          <a
            href="https://faq.simplefi.finance"
            target="_blank"
            rel="noopener noreferrer"
          >
            FAQ's
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default FooterNav;
