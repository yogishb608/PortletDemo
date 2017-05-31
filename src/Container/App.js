import React, { Component } from 'react';
import '../App.css';
import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';
import ReactGridLayout from 'react-grid-layout';
import Portal1 from '../Components/Portal1';
import Portal2 from '../Components/Portal2';
import Portal3 from '../Components/Portal3';

class App extends Component {
  render() {
    return (
      <div>
          <center><h2>Portlet Demo</h2></center>
          <ReactGridLayout className="layout" cols={12} rowHeight={30} width={1200}>
              <div key="a" data-grid={{x: 2, y: 0, w: 3, h: 11, minW: 2, maxW: 4}}><Portal1/></div>
              <div key="b" data-grid={{x: 5, y: 0, w: 3, h: 11, minW: 2, maxW: 4}}><Portal2/></div>
              <div key="c" data-grid={{x: 8, y: 0, w: 3, h: 11, minW: 2, maxW: 4}}><Portal3/></div>
          </ReactGridLayout>
      </div>
    );
  }
}

export default App;
