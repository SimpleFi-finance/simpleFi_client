import React from 'react';
import classNames from 'classnames';
import {GithubLogo, DiscordLogo, TwitterLogo} from '../../../assets/socials';

const FooterSocial = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'footer-social',
    className
  );

  return (
    <div
      {...props}
      className={classes}
    >
      <ul className="list-reset">
        <li>
          <a href="https://discord.gg/CJKE9wmGkk">
            <DiscordLogo style={{width: 32, height: 32}}/>
          </a>
        </li>
        <li>
          <a href="https://twitter.com/simplefi_">
            <TwitterLogo style={{width: 32, height: 32}}/>
          </a>
        </li>
        <li>
          <a href="https://github.com/SimpleFi-finance/">
            <GithubLogo style={{width: 32, height: 32 }} />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default FooterSocial;