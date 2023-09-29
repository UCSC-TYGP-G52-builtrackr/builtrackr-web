import  "./payment.css";

import React from 'react';
import { Link } from 'react-router-dom';

const App = () => (
  <>
  <link href="style.css" rel="stylesheet" type="text/css" />
  <div className="background">
    <div className="container">
      <div className="panel pricing-table">
        <div className="pricing-plan">
          <img
            src="https://i.postimg.cc/mrcYNX5X/6895861.jpg"
            alt=""
            className="pricing-img"
          />
          <h2 className="pricing-header">Basic</h2>
          <ul className="pricing-features">
            <li className="pricing-features-item">Only 1 Site Mangement</li>
            <li className="pricing-features-item">Future Addons</li>
          </ul>
          <span className="pricing-price">LKR 5000 </span>
          <Link to="/paycheckout" className="pricing-button">
            Proceed
          </Link>
        </div>
        <div className="pricing-plan">
          <img
            src="https://i.postimg.cc/K8jBxpxG/4334841.jpg"
            alt=""
            className="pricing-img"
          />
          <h2 className="pricing-header">Recommended</h2>
          <ul className="pricing-features">
            <li className="pricing-features-item">5 Site Mangement</li>
            <li className="pricing-features-item">24 / 7 Support </li>
            <li className="pricing-features-item">Future Addons</li>
          </ul>
          <span className="pricing-price"> LKR 20000</span>
          <Link to="/paycheckout" className="pricing-button">
            Proceed
          </Link>
        </div>
        <div className="pricing-plan">
          <img
            src="https://i.postimg.cc/NFTQwHj7/bridge-construction-amico-copy.png"
            alt=""
            className="pricing-img"
            
            
          />
          
          <h2 className="pricing-header">Enterprise</h2>
          <ul className="pricing-features">
            <li className="pricing-features-item">Unlimited Site Management</li>
            <li className="pricing-features-item">24 / 7 Support </li>
          
          </ul>
          <span className="pricing-price">LKR 30000</span>
          <Link to="/paycheckout" className="pricing-button">
            Proceed
          </Link>
        </div>
      </div>
    </div>
  </div>
</>

);

export default App;
