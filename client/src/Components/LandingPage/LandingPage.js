import React from 'react';

import Splash from './Splash';
import LogInBay from './LogInBay';
import Footer from '../Footer/Footer';

import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="Landing-Page">
      <Splash />
      <LogInBay />
      <Footer />
    </div>
  );
};

export default LandingPage;
