import React from 'react';
import './PopupContainer.css';

function PopupContainer(props){
  if (props.type==="up"){
    return <div className={'popupContainer-up '.concat(props.className)}>
      <div className="popup-triangle-box">
        <div className="popup-triangle-up"></div>
      </div>
      <div className="popupContent">
        {props.content}
      </div>
    </div>;
  } else {
    return <div className={'popupContainer '.concat(props.className)}>
      <div className="popup-triangle-box">
        <div className="popup-triangle"></div>
      </div>
      <div className="popupContent">
        {props.content}
      </div>
    </div>;
  }
} export default PopupContainer;
