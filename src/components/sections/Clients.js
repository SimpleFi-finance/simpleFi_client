import React from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import Image from '../elements/Image';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

class Clients extends React.Component {

  render() {
    const {
      className,
      topOuterDivider,
      bottomOuterDivider,
      topDivider,
      bottomDivider,
      hasBgColor,
      invertColor,
      ...props
    } = this.props;

    const outerClasses = classNames(
      'clients section reveal-fade',
      topOuterDivider && 'has-top-divider',
      bottomOuterDivider && 'has-bottom-divider',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );

    const innerClasses = classNames(
      'clients-inner section-inner',
      topDivider && 'has-top-divider',
      bottomDivider && 'has-bottom-divider'
    );

    return (
      <section
        {...props}
        className={outerClasses}
      >
        <div className="container">
          <div
            className={innerClasses}
          >
            <p className="m-0">
              Ecosystem partners and integrations
            </p>
            <ul className="list-reset" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
              <li className="reveal-rotate-from-left">
                <a href="https://curve.fi/" target="_blank" rel="noopener noreferrer">
                  <Image
                    src={require('./../../assets/integrations/curve_logo.png')}
                    alt="Curve"
                    width={80}
                    height={30} />
                </a>
              </li>
              <li className="reveal-rotate-from-left" data-reveal-delay="150">
                <a href="https://mstable.org/" target="_blank" rel="noopener noreferrer">
                  <Image
                    src={require('./../../assets/integrations/MTA_logo.png')}
                    alt="mStable"
                    width={83}
                    height={30} />
                </a>
              </li>
              <li className="reveal-rotate-from-left" data-reveal-delay="300">
                <a href="https://sushi.com/" target="_blank" rel="noopener noreferrer">
                  <Image
                    src={require('./../../assets/integrations/SUSHI_logo.png')}
                    alt="Sushiswap"
                    width={100}
                    height={30} />
                </a>
              </li>
              <li className="reveal-rotate-from-left" data-reveal-delay="450">
                <a href="https://thegraph.com/" target="_blank" rel="noopener noreferrer">
                  <Image
                    src={require('./../../assets/partnerships/THEGRAPH_logo.png')}
                    alt="The Graph"
                    width={100}
                    height={31}
                    style={{ borderRadius: '50%' }}
                  />
                </a>
              </li>
              <li className="reveal-rotate-from-left" data-reveal-delay="600">
                <a href="https://uniswap.org/" target="_blank" rel="noopener noreferrer">
                  <Image
                    src={require('./../../assets/partnerships/uniswap_pink.png')}
                    alt="Uniswap"
                    width={100}
                    height={30} />
                </a>
              </li>
              <li className="reveal-rotate-from-left" data-reveal-delay="600">
                <a href="https://stakedao.org/" target="_blank" rel="noopener noreferrer">
                  <Image
                    src={require('./../../assets/integrations/STAKEDAO-logo.png')}
                    alt="stakedao"
                    width={100}
                    height={30} />
                </a>
              </li>
              <li className="reveal-rotate-from-left" data-reveal-delay="600">
                <a href="https://rari.capital/" target="_blank" rel="noopener noreferrer">
                  <Image
                    src={require('./../../assets/integrations/RARI_logo.png')}
                    alt="rari"
                    width={100}
                    height={30} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

Clients.propTypes = propTypes;
Clients.defaultProps = defaultProps;

export default Clients;