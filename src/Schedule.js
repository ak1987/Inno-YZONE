import React, { Component } from 'react';
import './Schedule.css';
import PopupContainer from './PopupContainer';
import Reserve from './Reserve';
import RoomInfo from './RoomInfoPopup';

function Schedule(){
  return <div className="schedule">
    <TimeBar/>
    <div className="rightSide">
      <RoomBar/>
      <Grid/>
    </div>
  </div>;
} export default Schedule;

function TimeBar(){
  var items = Array(24).fill(0);
  var j = false;
  var items = items.map((item, i)=>{
    if (j==false){
      var text = (Math.floor(i/2)+10).toString().concat(':00');
      j=true;
    } else {
      var text = (Math.floor(i/2)+10).toString().concat(':30');
      j=false;
    }
    return <TimeBlock key={i} label={text}/>
  });
  return <div className="timeBar"><TimeBlock/>{items}</div>;
}

function TimeBlock(props){
  return <div className="timeBlock"><div className="timeLabel">{props.label}</div></div>;
}

function RoomBar(){
  const list = ['Room 3.1',
                 '3.2',
                 '3.3',
                 '3.4',
                 '301',
                 '303',
                 '312',
                 '313',
                 '318',
                 '320'
                ];
  const items = list.map((item, i)=>{
    return <RoomBlock key={i} label={item}/>
  });
  return <div className="roomBar">{items}</div>;
}

class RoomBlock extends React.Component{
  constructor(props){
    super();
    this.state = {
      label: props.label,
      show: false,
    };
  }
  render(){
    const s = this.state.show;
    return <div className="roomBlock">

      {this.state.label}
      <PopupContainer className="roomInfoPopup" type="up" content={<RoomInfo room={this.state.label} seats="20" display="true" board="true"/>}/>
    
    </div>;
  }
}

class Grid extends React.Component{
  constructor(props){
    super();
    const array = Array(24).fill(0).map((arr)=>{
      return Array(10).fill(0).map((val)=>{
        return {type: 0, duration: 1}; //{type: duration: name: email: }
      });
    });
    this.state ={
      blocks: array,
      orange: [ -1, -1],
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleClick(j, i){
    const blocks = this.state.blocks;
    blocks[j][i].type = 3;
    if (this.state.orange[0]!=-1&&this.state.orange[1]!=-1){
      const oi = this.state.orange[1];
      const oj = this.state.orange[0];
      blocks[oj][oi].type = 0;
      blocks[j][i].duration = blocks[oj][oi].duration;
      blocks[oj][oi].duration = 0;

    }
    const newOrange = [j, i];
    this.setState({
      blocks: blocks,
      orange: newOrange,
    });
  }
  handleDurationChange(value){
    const blocks = this.state.blocks;
    const j = this.state.orange[0];
    const i = this.state.orange[1];
    blocks[j][i].duration = value;
    this.setState({
      blocks: blocks,
    });
  }
  handleSubmit(time, duration, room){
    const blocks = this.state.blocks;
    blocks[time][room] = {type: 2, duration: duration};
    this.setState({
      blocks: blocks,
      orange: [-1, -1],
    });
  }
  render(){
    const blocks = this.state.blocks;
    const grid = blocks.map((arr, j)=>{
      const row = arr.map((block, i)=>{
        return <GridBlock key={i} child={<ReserveBlock onClick={()=>this.handleClick(j, i)}
          row={j} block={i} type={this.state.blocks[j][i].type} duration={this.state.blocks[j][i].duration}
          onDurationChange={(value)=>this.handleDurationChange(value)} onSubmit={this.handleSubmit} />} />;
      })
      return <div key={j} className='gridRow'>{row}</div>;
    });
    return <div className="grid">{grid}</div>;
  }
}

function GridBlock(props){
  return <div className="gridBlock">
    {props.child}
  </div>;
}

function ReserveBlock(props){
  let height = (props.duration*1+1)*100+(props.duration*1)*5;
  const style = {
    height: (height).toString().concat('%'),
  }
  if (props.type=='0') {
    return <div onClick={()=>props.onClick()} className="emptyBlock"></div>;;
  } else if (props.type=='1') {
    return <div className="reserveBlock Black" style={style}>{props.name}</div>;
  } else if (props.type=='2'){
    return <div className="reserveBlock Green" style={style}>You</div>;
  } else if (props.type=='3'){
    return <div className="reserveBlock Orange" style={style}>
      New
      <PopupContainer className="reservation" content={<Reserve row={props.row} block={props.block} duration={props.duration}
        onSubmit={(time, duration, room)=>props.onSubmit(time, duration, room)} onDurationChange={(value)=>props.onDurationChange(value)}/>}/>
    </div>;
  }
}
