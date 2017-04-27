import React from 'react';
import './styleOverride.css';
import './Reserve.css';

class ReservationFields extends React.Component{
  constructor(props){
    super();
    const durationList = ['30m', '1h', '1h 30m', '2h', '2h 30m', '3h', '3h 30m', '4h', '4h 30m', '5h', '5h 30m', '6h'];
    const timeList = []
    this.state = {
      timeOptions: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00',
                    '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'],
      durationOptions: ['30m', '1h', '1h 30m', '2h', '2h 30m', '3h', '3h 30m', '4h', '4h 30m', '5h', '5h 30m', '6h'],
      roomOptions: ['3.1', '3.2', '3.3', '3.4', '301', '303', '312', '313', '318', '320'],
      time: props.row,
      duration: props.duration,
      room: props.block,
      onDurationChange: props.onDurationChange,
      onSubmit: props.onSubmit,
    };
    this.durationChangeHandle = this.durationChangeHandle.bind(this);
    this.submitHandle = this.submitHandle.bind(this);
  }
  durationChangeHandle(event){
    this.setState({
      duration: event.target.value,
    });
    this.state.onDurationChange(event.target.value);
  }
  submitHandle(event){
    this.state.onSubmit(this.state.time, this.state.duration, this.state.room);
  }
  buttons(){
    if (this.props.edit!=null)
      return <div>
        <button onClick={this.submitHandle} className="active wide">Save</button>
        <div onClick={this.props.onEditCancel} className="cancelEdit">Cancel editing</div>
      </div>;
    else
      return <button onClick={this.submitHandle} className="active wide">Reserve</button>;
  }
  render(){
    return <div className="reservationContent">
      <div className="reservationInput">
        <TextField label="From" value={this.state.timeOptions[this.props.row]}/>
        <DropDown label="Duration" onChange={this.durationChangeHandle} options={this.state.durationOptions} value={this.props.duration}/>
        <TextField label="Room" value={this.state.roomOptions[this.props.block]}/>
      </div>
      {this.buttons()}
    </div>;
  }
} export default ReservationFields;

function DropDown(props){
  const options = props.options.map((value, index)=>{
    return <option key={index} value={index}>{value}</option>;
  });
  return <div className="dropDown">
    <div className="inputLabel">{props.label}</div>
    {(props.autofocus===true) ? <select className="drop focus" value={props.value} onChange={props.onChange} autoFocus>  {options}
  </select> : <select className="drop focus" value={props.value} onChange={props.onChange}>  {options}
</select>}

  </div>;
}

function TextField(props){
  return <div className="dropDown">
  <div className="inputLabel">{props.label}</div>
  <div className="textLock">{props.value}</div>
</div>;
}

{/* <DropDown label="From" onChange={this.timeChangeHandle} options={this.state.timeOptions} value={this.state.time}/>/>
<DropDown label="Room" onChange={this.roomChangeHandle} options={this.state.roomOptions} value={this.state.room}/> */}
