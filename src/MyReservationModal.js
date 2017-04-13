import React, { Component } from 'react';
import './MyReservationModal.css';
import './styleOverride.css';
import Modal from './Modal';


function MyReservationModal(props){
  const t = <MyReservationContent/>;
  return <Modal header="My Reservations" content={t}/>;
} export default MyReservationModal;

class MyReservationContent extends React.Component{
  constructor(){
    super();
    this.state = {
      records: [{date: "March, 01", day: "Wednesday", time: "18:30 - 20:00", room:"312"},
                {date: "March, 01", day: "Monday", time: "18:30 - 20:00", room:"312"},
                {date: "March, 01", day: "Monday", time: "18:30 - 20:00", room:"312"}
                ]
    };
    this.onDelete = this.onDelete.bind(this);
  }
  onDelete(index){
    const records = this.state.records;
    records.splice(index, 1);
    this.setState({
      records: records,
    });
  }
  render(){
    const records = this.state.records.map((record, i)=>{
      return <Record key={i} day={record.day} date={record.date} time={record.time} room={record.room} onDelete={()=>this.onDelete(i)}/>;
    });
    return <div className="myReservationContent">
      <TableLabels/>
      {records}
    </div>;
  }
}

function TableLabels(props){
  return <div className="labelContainer">
    <div className="recordLabel labelDate">Date</div>
    <div className="recordLabel labelTime">Time</div>
    <div className="recordLabel labelRoom">Room</div>
    <div className="recordLabel labelDelete">Delete</div>
  </div>;
}

function Record(props){
  return <div key={props.key} className="recordContainer">
    <div className="recordItem recordDayDate">
      <div className="recordDay">{props.day}</div>
      <div className="recordDate">{props.date}</div>
    </div>
    <div className="recordItem">
      <div className="recordTime" title="Edit time">{props.time}</div>
    </div>
    <div className="recordItem">
      <div className="recordRoom" title="Edit room">{props.room}</div>
    </div>
    <div className="recordItem delete">
      <div className="recordDelete" title="Delete reservation" onClick={props.onDelete}></div>
    </div>
  </div>;
}
