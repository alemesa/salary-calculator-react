import React, { Component } from 'react';
import './Prize.css';

class Prize extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <div className="Prize">
        <h3>
          You will be able to afford a <br />
          <span className="prize-item">Tesla Model S - $38000</span>
        </h3>
        <div className="image-container">
          <img
            src="https://www.tesla.com/sites/default/files/images/model-3/model-3-social.jpg"
            alt="woohoo"
          />
        </div>
      </div>
    );
  }
}

export default Prize;
