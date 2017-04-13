import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import TopBarCotainer from './Tabs';
import Schedule from './Schedule';
import MyReservationModal from './MyReservationModal';
import DatePicker from './DatePicker';
import AccountModal from './AccountModal';
import SignIn from './SignIn';

ReactDOM.render(
  <div>
    <div className="topbarHolder"/>
    <TopBarCotainer/>
    <Schedule/>
  </div>,
  document.getElementById('root')
);

ReactDOM.render(<div id="myreserv" className="modalBackground">
  <MyReservationModal/></div>,
  document.getElementById('myReservation123')
);

ReactDOM.render(<div id="account" className="modalBackground">
  <AccountModal/></div>,
  document.getElementById('account123')
)

ReactDOM.render(<div id="otherdate" className="modalBackground">
  <DatePicker/></div>,
  document.getElementById('otherDate123')
)

ReactDOM.render(<div id="signin" className="modalBackground">
  <SignIn/></div>,
  document.getElementById('signin123')
)


// ReactDOM.render(<div>
//   <TopBarCotainer />
//   <div className="topbarHolder"></div>
//   <Schedule /></div>,
//   document.getElementById('root')
// );
