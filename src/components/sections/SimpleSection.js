import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";

const propTypes = {
  children: PropTypes.node,
  ...SectionProps.types,
};

const defaultProps = {
  children: null,
  ...SectionProps.defaults,
};

class SimpleSection extends React.Component {
  render() {
    const { className, children, header, content, ...props } = this.props;

    const outerClasses = classNames("section", className);

    return (
      <section {...props} className={outerClasses}>
        <div className="container">
          {header && <h3>{header}</h3>}
          {content && <p>{content}</p>}
          {children}
        </div>
      </section>
    );
  }
}

SimpleSection.propTypes = propTypes;
SimpleSection.defaultProps = defaultProps;

export default SimpleSection;
