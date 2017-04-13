import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import TopBarCotainer from './Tabs';
import Schedule from './Schedule';
import MyReservationModal from './MyReservationModal'

ReactDOM.render(
  <div>
    <div className="topbarHolder"/>
    <TopBarCotainer/>
    <Schedule/>
  </div>,
  document.getElementById('root')
);

ReactDOM.render(<div id="myreserv12" className="modalBackground">
  <MyReservationModal/></div>,
  document.getElementById('myReservation123')
)

// ReactDOM.render(<div>
//   <TopBarCotainer />
//   <div className="topbarHolder"></div>
//   <Schedule /></div>,
//   document.getElementById('root')
// );
