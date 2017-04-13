import React, { Component } from 'react';
import './Schedule.css';
import PopupContainer from './PopupContainer';
import Reserve from './Reserve';
import RoomInfo from './RoomInfoPopup';
import BlackBoxInfo from './BlackBoxInfo';
import GreenBoxInfo from './GreenBoxInfo';

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
        return {type: 0, duration: 1, blackType: 0}; //{type: duration: blackType: name: email: }
      });
    });
    this.state ={
      blocks: array,
      orange: [ -1, -1],
      grid: 0,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.changeGrid = this.changeGrid.bind(this);
  }
  componentDidMount(){
    this.fillGrid0();
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
    blocks[time][room].type = 2;
    blocks[time][room].duration = duration;
    this.setState({
      blocks: blocks,
      orange: [-1, -1],
    });
  }
  handleEdit(j, i){
    const blocks = this.state.blocks;
    blocks[j][i].type = 3;
    const newOrange = [j, i];
    if (this.state.orange[0]!=-1&&this.state.orange[1]!=-1){
      const oi = this.state.orange[1];
      const oj = this.state.orange[0];
      blocks[oj][oi].type = 0;
      blocks[oj][oi].duration = 0;
    }
    this.setState({
      blocks: blocks,
      orange: newOrange,
    });
  }
  handleDelete(j, i){
    const blocks = this.state.blocks;
    blocks[j][i].type = 0;
    blocks[j][i].duration = 1;
    this.setState({
      blocks: blocks,
    });
  }
  fillGrid0(){
    const array = Array(24).fill(0).map((arr)=>{
      return Array(10).fill(0).map((val)=>{
        return {type: 0, duration: 1, blackType: 0}; //{type: duration: blackType: name: email: }
      });
    });
    array[6][0].type = 1;
    array[6][0].duration = 2;
    array[6][0].blackType = 1;

    array[0][1].type = 1;
    array[0][1].duration = 2;
    array[0][1].blackType = 2;
    //green
    array[13][1].type = 1;
    array[13][1].duration = 5;
    array[13][1].blackType = 0;
    //
    array[10][2].type = 1;
    array[10][2].duration = 3;
    array[10][2].blackType = 1;

    array[16][3].type = 1;
    array[16][3].duration = 5;
    array[16][3].blackType = 0;

    array[2][5].type = 1;
    array[2][5].duration = 3;
    array[2][5].blackType = 0;

    array[14][6].type = 1;
    array[14][6].duration = 4;
    array[14][6].blackType = 1;
    this.setState({
      blocks: array,
    });
  }
  fillGrid1(){
    const array = Array(24).fill(0).map((arr)=>{
      return Array(10).fill(0).map((val)=>{
        return {type: 0, duration: 1, blackType: 0}; //{type: duration: blackType: name: email: }
      });
    });
    array[6][0].type = 1;
    array[6][0].duration = 2;
    array[6][0].blackType = 1;

    array[0][1].type = 1;
    array[0][1].duration = 2;
    array[0][1].blackType = 2;
    //green
    array[13][1].type = 2;
    array[13][1].duration = 5;
    array[13][1].blackType = 0;
    //
    array[10][2].type = 1;
    array[10][2].duration = 3;
    array[10][2].blackType = 1;

    array[16][3].type = 1;
    array[16][3].duration = 5;
    array[16][3].blackType = 0;

    array[2][5].type = 1;
    array[2][5].duration = 3;
    array[2][5].blackType = 0;

    array[14][6].type = 1;
    array[14][6].duration = 4;
    array[14][6].blackType = 1;
    this.setState({
      blocks: array,
      grid: 1,
    });
  }
  fillGrid2(){
    const array = Array(24).fill(0).map((arr)=>{
      return Array(10).fill(0).map((val)=>{
        return {type: 0, duration: 1, blackType: 0}; //{type: duration: blackType: name: email: }
      });
    });
    array[6][1].type = 1;
    array[6][1].duration = 2;
    array[6][1].blackType = 1;

    array[0][2].type = 1;
    array[0][2].duration = 2;
    array[0][2].blackType = 2;
    //green
    array[13][2].type = 1;
    array[13][2].duration = 5;
    array[13][2].blackType = 0;
    //
    array[10][3].type = 1;
    array[10][3].duration = 3;
    array[10][3].blackType = 1;

    array[16][4].type = 1;
    array[16][4].duration = 5;
    array[16][4].blackType = 0;

    array[2][6].type = 1;
    array[2][6].duration = 3;
    array[2][6].blackType = 0;

    array[14][7].type = 1;
    array[14][7].duration = 4;
    array[14][7].blackType = 1;
    this.setState({
      blocks: array,
      grid: 2,
    });
  }
  changeGrid(){
    const b = this.state.grid;
    if(b == '1'){
      this.fillGrid2();
    } else {
      this.fillGrid1();
    }
  }
  render(){
    const blocks = this.state.blocks;
    const grid = blocks.map((arr, j)=>{
      const row = arr.map((block, i)=>{
        return <GridBlock key={i} child={
          <ReserveBlock onClick={()=>this.handleClick(j, i)}
          row={j} block={i} type={this.state.blocks[j][i].type} duration={this.state.blocks[j][i].duration} blackType={this.state.blocks[j][i].blackType}
          onDurationChange={(value)=>this.handleDurationChange(value)} onSubmit={this.handleSubmit}
          onEdit={()=>this.handleEdit(j, i)} onDelete={()=>this.handleDelete(j, i)} />
        } />;
      })
      return <div key={j} className='gridRow'>{row}</div>;
    });
    return <div className="grid">{grid}<div id="gridTrigger" onClick={this.changeGrid}></div></div>;
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
    return <div onClick={()=>props.onClick()} className="emptyBlock"></div>;
  } else if (props.type=='1') {
    let content;
    if (props.blackType=='0') {
      return <div className="reserveBlock Black" style={style}>
        Student
        <PopupContainer className="blackBoxInfo" content={<BlackBoxInfo name="Nikita Ulianov" email="n.ulianov@innopolis.ru"/>}/>
      </div>;
    } else if (props.blackType=='1'){
      return <div className="reserveBlock Black" style={style}>Administrator</div>;
    } else if (props.blackType=='2'){
      return <div className="reserveBlock Black" style={style}>
        Employee
        <PopupContainer className="blackBoxInfo" content={<BlackBoxInfo name="Nikita Ulianov" email="n.ulianov@innopolis.ru"/>}/>
      </div>;
    }
  } else if (props.type=='2'){
    return <div className="reserveBlock Green" style={style}>
      Your
      <PopupContainer className="greenBoxInfo" content={<GreenBoxInfo onEdit={props.onEdit} onDelete={props.onDelete}/> }/>
    </div>;
  } else if (props.type=='3'){
    return <div className="reserveBlock Orange" style={style}>
      New
      <PopupContainer className="reservation" content={<Reserve row={props.row} block={props.block} duration={props.duration}
        onSubmit={(time, duration, room)=>props.onSubmit(time, duration, room)} onDurationChange={(value)=>props.onDurationChange(value)}/>}/>
    </div>;
  }
}
