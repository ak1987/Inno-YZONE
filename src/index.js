import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import TopBarCotainer from './Tabs';
import Schedule from './Schedule';

ReactDOM.render(
  <div>
    <div className="topbarHolder"/>
    <TopBarCotainer/>
    <Schedule/>
  </div>,
  document.getElementById('root')
);

// ReactDOM.render(<div>
//   <TopBarCotainer />
//   <div className="topbarHolder"></div>
//   <Schedule /></div>,
//   document.getElementById('root')
// );
