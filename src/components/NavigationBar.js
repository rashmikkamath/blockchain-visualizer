import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap';

class NavigationBar extends Component{
  render() {
    return (
      <div>
        
        <Navbar bg="dark" className="nav-bar" variant="dark">
          <Navbar.Brand href="#home">
            {' Blockchain Data Visualizer'}
          </Navbar.Brand>
        </Navbar>
      </div> 
    );
  }
}
export default NavigationBar;