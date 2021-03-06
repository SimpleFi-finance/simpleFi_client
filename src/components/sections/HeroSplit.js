import React from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import Button from '../elements/Button';
import Image from '../elements/Image';

const propTypes = {
  ...SectionSplitProps.types
}

const defaultProps = {
  ...SectionSplitProps.defaults
}

class HeroSplit extends React.Component {

  componentDidMount() {
    // this is only to handle inline style on window resize
    window.onresize = function () {
      this.forceUpdate();
    }.bind(this);
  }

  render() {

    const {
      className,
      topOuterDivider,
      bottomOuterDivider,      
      topDivider,
      bottomDivider,
      hasBgColor,
      invertColor,
      invertMobile,
      invertDesktop,
      alignTop,
      imageFill,
      ...props
    } = this.props;

    const outerClasses = classNames(
      'hero section',
      topOuterDivider && 'has-top-divider',
      bottomOuterDivider && 'has-bottom-divider',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );

    const innerClasses = classNames(
      'hero-inner section-inner is-revealed',
      topDivider && 'has-top-divider',
      bottomDivider && 'has-bottom-divider'
    );

    const splitClasses = classNames(
      'split-wrap',
      invertMobile && 'invert-mobile',
      invertDesktop && 'invert-desktop',
      alignTop && 'align-top'
    );

    return (
      <section
        {...props}
        className={outerClasses}
      >
        <div className="container">
          <div className="mobile-splash-image"></div>
            <div className={innerClasses}>
              <div className={splitClasses}>
                <div className="split-item" style={inlineStyle()}>
                  <div className="hero-content split-item-content center-content-mobile is-revealed">
                    <h1 className="mt-0 mb-16 reveal-from-top is-revealed" data-reveal-delay="150">
                      DeFi made simple
                    </h1>
                    <p className="mt-32 mb-32 reveal-from-top is-revealed" data-reveal-delay="300">
                      Everything you need to make better investments in decentralized finance
                    </p>
                    <div className="mt-16 reveal-from-top is-revealed" data-reveal-delay="450">
                      <Button tag="a" color="primary" wideMobile onClick={() => window.open("https://app.simplefi.finance/", "_blank", "noopener")}>
                        Launch app
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>
    );
  }
}

// inline style
const inlineCss = {
  alignItems: 'flex-start',
  minHeight: '450px'
}

const inlineStyle = function () {
  if (window.innerWidth > 641) {
    return inlineCss;
  }
};

HeroSplit.propTypes = propTypes;
HeroSplit.defaultProps = defaultProps;

export default HeroSplit;