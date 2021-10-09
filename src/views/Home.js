import React from 'react';
import HeroSplit from '../components/sections/HeroSplit';
import Clients from '../components/sections/Clients';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import Cta from '../components/sections/Cta';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.accessRef = React.createRef();
  }
  
  render() {

    const executeScroll = () => this.accessRef.current.scrollIntoView({behavior: "smooth"});

    return (
      <React.Fragment>
        <HeroSplit invertMobile imageFill className="illustration-section-01" executeScroll={executeScroll}/>
        <Clients topDivider bottomDivider />
        <FeaturesSplit bottomDivider imageFill />
        <FeaturesTiles hasBgColor invertColor/>
        <Cta topDivider bottomDivider split className="reveal-from-top" accessRef={this.accessRef}/>
      </React.Fragment>
    );
  }
}

export default Home;