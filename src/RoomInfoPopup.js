import React from 'react';
import './styleOverride.css';
import './RoomInfoPopup.css';

function RoomInfo (props){
  // constructor(props){
  //   super();
  //   this.state = {
  //     room: props.room,
  //     seats: props.seats,
  //     board: props.board,
  //     display: props.display,
  //   }
  // }
  const display = <div className="iconDisplay"></div>;
  const board = <div className="iconBoard"></div>;
  return <div className="roomInfo">
    <div className="romInfoText">
      <div className="roomInfoLabel">Room</div>
      <div className="roomInfoInfo">{props.room}</div>
      <div className="roomInfoLabel">Seats</div>
      <div className="roomInfoInfo">{props.seats}</div>
      <div className="roomInfoLabel">Equipment</div>
      { (props.display===true) ? display : null }
      { (props.board===true) ? board : null }
    </div>
    <div className="roomInfoMap">
      <img className="imgMap" src="http://imgh.us/Group_(12).png"/>
    </div>
  </div>;

} export default RoomInfo;
