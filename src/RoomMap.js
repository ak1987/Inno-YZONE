import React from 'react';
import './RoomMap.css';

class RoomMap extends React.Component{
  constructor(){
    super();
    this.state ={
      rooms: ['3.1', '3.2', '3.3', '3.4', '301', '303', '312', '313', '318', '320'],
    }
  }
  render(){
    const blocks = this.state.rooms.map((val, i)=>{
      if (i == this.props.active)
        return <div className={"roomRectangle ".concat("active ").concat('a'+val)}>{val}</div>;
      else
        return <div className={"roomRectangle ".concat('a'+val)}>{val}</div>;
    });
    return <div className="mapContainer">
      <div className="stairs a1"></div>
      <div className="stairs a2"></div>
      <div className="walklines1"></div>
      <div className="walklines2"></div>
      {blocks}
    </div>;
  }
} export default RoomMap;
