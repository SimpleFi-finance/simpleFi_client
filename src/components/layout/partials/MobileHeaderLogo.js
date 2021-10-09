import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Image from '../../elements/Image';

const Logo = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'brand',
    'mobile-header-logo',
    'is-revealed',
    className
  );

  return (
    <div
      {...props}
      className={classes}
    >
      <h1 className="m-0">
        <Link to="/">
          <Image
            src={require('./../../../assets/images/logoSimplefiLongBlue.png')}
            alt="simplefi"
            width={220}
            height={64} />
        </Link>
      </h1>
    </div>
  );
}

export default Logo;