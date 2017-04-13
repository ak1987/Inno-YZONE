import React from 'react';
import './GreenBoxInfo.css';


function GreenBoxInfo(props){
    return <div className="greenBoxInfo">
      It is your reservation
      <div className="greenLink1" onClick={props.onEdit}>
        Edit
      </div>
      <div className="greenLink1" onClick={props.onDelete}>
        Delete
      </div>
    </div>;
} export default GreenBoxInfo;
