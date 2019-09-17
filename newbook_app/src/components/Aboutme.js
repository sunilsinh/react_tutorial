import React, { Component } from 'react';
import './About.css';

class Aboutme extends Component {
  render() {
    return(
      <div className = "about-page">
	  <h1>About Page</h1>
	  
	  <div className = "section-text"><p>For almost five decades, The National Alliance has set the standard for quality, practical continuing education and for delivering what insurance and risk management practitioners want. Over 150,000 respected professionals, across the U.S. and worldwide, have used and continued to use our programs as the foundation upon which they build their successful careers and businesses.</p></div>
	  
	  
	   <div className = "section-text"><h1>Vision and Values</h1>
	   <p>The National Alliance will be the indispensable, transformative learning resource for risk and insurance professionals through adaptive technology and practical instruction.</p>
	   <p>Values: Integrity, Innovation, Imagination. </p>
	   <p>The educational programs and research conducted by The National Alliance were built on a foundation of integrity, innovation, and imagination. These qualities commit us to act responsibly, to be accountable for our actions, to fulfill our obligations, and to inspire others with our relentless determination to achieve a standard of excellence in every endeavor..</p></div>
	  
	  </div>
    )
  }
}

export default Aboutme;
