import React from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import Image from '../elements/Image';

const propTypes = {
  ...SectionSplitProps.types
}

const defaultProps = {
  ...SectionSplitProps.defaults
}

class FeaturesSplit extends React.Component {

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
      'features-split section',
      topOuterDivider && 'has-top-divider',
      bottomOuterDivider && 'has-bottom-divider',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );

    const innerClasses = classNames(
      'features-split-inner section-inner',
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
          <div className={innerClasses}>
            <div className={splitClasses}>

              <div className="split-item reveal-from-top">
                <div className="split-item-content center-content-mobile">
                  <h3 className="mt-0 mb-16">
                    Track your ROI
                  </h3>
                  <p className="m-0">
                    Instantly see the profits (or losses) from all your DeFi investments, with a breakdown of combined returns (e.g. LP + farming)
                  </p>
                </div>
                <div className={
                  classNames(
                    'split-item-image center-content-mobile illustration-element-01',
                    imageFill && 'split-item-image-fill'
                  )}>
                  <Image
                    src={require('./../../assets/images/features-split-image.svg')}
                    alt="Features split 01"
                    width={528}
                    height={396} />
                  <div style={imgOddStyle}>
                    <Image
                      src={require('./../../assets/images/features-split-top-01.png')}
                      alt="Features split top 01"
                      width={624}
                      height={512} />
                  </div>
                </div>
              </div>

              <div className="split-item reveal-from-top">
                <div className="split-item-content center-content-mobile">
                  <h3 className="mt-0 mb-16">
                    Invest in 1 click
                  </h3>
                  <p className="m-0">
                    Easily migrate underperforming investments to higher-yielding pools and farms...in one click and from a single interface
                  </p>
                </div>
                <div className={
                  classNames(
                    'split-item-image center-content-mobile illustration-element-02',
                    imageFill && 'split-item-image-fill'
                  )}>
                  <Image
                    src={require('./../../assets/images/features-split-image.svg')}
                    alt="Features split 02"
                    width={528}
                    height={396} />
                  <div style={imgEvenStyle}>
                    <Image
                      src={require('./../../assets/images/features-split-top-02.png')}
                      alt="Features split top 02"
                      width={624}
                      height={512} />
                  </div>
                </div>
              </div>

              <div className="split-item reveal-from-top">
                <div className="split-item-content center-content-mobile">
                  <h3 className="mt-0 mb-16">
                    Optimize your portfolio
                  </h3>
                  <p className="m-0">
                    Use SimpleFi's optimization engine to increase your performance and discover new investment opportunities
                  </p>
                </div>
                <div className={
                  classNames(
                    'split-item-image center-content-mobile illustration-element-01',
                    imageFill && 'split-item-image-fill'
                  )}>
                  <Image
                    src={require('./../../assets/images/features-split-image.svg')}
                    alt="Features split 03"
                    width={528}
                    height={396} />
                  <div style={imgOddStyle}>
                    <Image
                      src={require('./../../assets/images/features-split-top-03.png')}
                      alt="Features split top 03"
                      width={624}
                      height={512} />
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

const imgOddStyle = {
  position: 'absolute',
  width: '118.18%',
  maxWidth: '118.18%',
  top: '-6.31%',
  left: '-16.48%'
}

const imgEvenStyle = {
  position: 'absolute',
  width: '118.18%',
  maxWidth: '118.18%',
  top: '-6.31%',
  left: '-1.51%'
}

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;