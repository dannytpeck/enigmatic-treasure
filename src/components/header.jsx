import React, { Component } from 'react';

class Header extends Component {
  reloadPage() {
    window.location.reload();
  }

  render() {
    return (
      <div className="header">
        <a onClick={this.reloadPage}>
          <img className="home-button" src="images/icon_home.png" />
        </a>
        <img className="logo" src="images/ADURO-Logo-Horizontal.png" />
        <h3 className="my-4">Custom Tile Request Form</h3>
      </div>
    );
  }
}

export default Header;
