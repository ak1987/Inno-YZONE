import React from 'react';
import './styleOverride.css';
import './RoomInfoPopup.css';
import RoomMap from './RoomMap';

function RoomInfo (props){
  const display = <div className="iconDisplay"></div>;
  const board = <div className="iconBoard"></div>;
  return <div className="roomInfo">
    <div className="romInfoText">
      <div className="roomInfoLabel">Room</div>
      <div className="roomInfoInfo">{props.room}</div>
      <div className="roomInfoLabel">Seats</div>
      <div className="roomInfoInfo">{props.seats}</div>
      <div className="roomInfoLabel">Equipment</div>
      <div className="equipIconS">
        <img className="equipIcon" src="http://imgh.us/Vector_16_(1).png"/>
      </div>
      { (props.display===true) ? display : null }
      { (props.board===true) ? board : null }
    </div>
    <div className="roomInfoMap">
      <RoomMap active={props.active}/>
      {/* <img className="imgMap" src="http://imgh.us/Group_(12).png"/> */}
    </div>
  </div>;

} export default RoomInfo;
