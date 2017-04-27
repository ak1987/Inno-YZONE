import React from 'react';
import './Notifications.css';


class Notifications extends React.Component{
  constructor(){
    super();
    let array = [];
    array.push({type:0, dayName: 1, date:'May, 4', timeSt:'18:30', timeEnd:'20:30', room: '312'});
    array.push({type:1, dayName: 3, date:'May, 5', timeSt:'10:30', timeEnd:'12:00', room: '3.4'});
    this.state={
      notifs: array,
    };
  }
  render(){
    const notifs = this.state.notifs.map((val, i)=>{
      return <NotificationItem index={i} key={i} obj={val}/>;
    });
    return <div className="notiContent">
      {notifs}
    </div>;
  }
}
export default Notifications;

function NotificationItem(props){
  const typeTitiles = ['Your reservation has been canceled', 'Your reservation has been shorten'];
  const dayNames = ['Today', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return <div className={"notiItem".concat(props.index==0 ? " first" : "")}>
    <div className="notiTitle">{typeTitiles[props.obj.type]}</div>
    <div className={"notiDetails".concat(props.obj.type==0 ? " red" : " yellow")}>
      <div className="notiDay">
        <div className="notiDayName">{dayNames[props.obj.dayName]}</div>
        <div className="notiDate">{props.obj.date}</div>
      </div>
      <div className="notiTime">
        <span className="timeSt">
          {props.obj.timeSt}
        </span>&nbsp;-&nbsp;
        <span className="timeEnd">
          {props.obj.timeEnd}
        </span>
      </div>
      <div className="notiRoom">{props.obj.room}</div>
    </div>
  </div>
}
