import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const LayoutDefault = ({ children }) => (
  <React.Fragment>
    <Header navPosition="right" className="reveal-from-top" />
    <main className="site-content">
      {children}
    </main>
    <Footer className="reveal-from-bottom" data-reveal-offset="0" />
    <div className="illustration-section-10"></div>
  </React.Fragment>
);

export default LayoutDefault;  