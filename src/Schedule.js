import React, { Component } from 'react';
import './Schedule.css';
import PopupContainer from './PopupContainer';
import Reserve from './Reserve';
import RoomInfo from './RoomInfoPopup';
import BlackBoxInfo from './BlackBoxInfo';
import GreenBoxInfo from './GreenBoxInfo';
import Rnd from 'react-rnd';
import { WindowResizeListener } from 'react-window-resize-listener';

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
  const list = ['3.1',
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
    return <RoomBlock key={i} label={item} active={i}/>
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
  firstRoom(){
    if (this.props.active==0)
      return 'Room ';
    else
      return null;
  }
  render(){
    const s = this.state.show;
    return <div className="roomBlock">
      {this.firstRoom()}
      {this.state.label}<span className="roomArrow">&nbsp;&#x25bc;</span>
      <PopupContainer className="roomInfoPopup" type="up" content={<RoomInfo room={this.state.label} seats="20" display="true" board="true" active={this.props.active}/>}/>

    </div>;
  }
}

class Grid extends React.Component{
  constructor(props){
    super();
    const array = Array(24).fill(0).map((arr)=>{
      return Array(10).fill(0).map((val)=>{
        return {type: 0, duration: 0, blackType: 0}; //{type: duration: blackType: name: email: }
      });
    });
    this.state ={
      timeOptions: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00',
                    '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'],
      blocks: array,
      orange: {row: -1, block: -1, duration: 1},
      grid: 0,
      edit: null,
      timeLine: -1,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.changeGrid = this.changeGrid.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleCancelEdit - this.handleCancelEdit.bind(this);
  }
  componentDidMount(){
    this.fillGrid0();
  }
  handleClick(j, i){
    this.setState({
      orange: {row:j, block:i, duration: this.state.orange.duration},
    });
  }
  handleDurationChange(value){
    const newOrange = this.state.orange;
    newOrange.duration = value;
    this.setState({
      orange: newOrange,
    });
  }
  handleSubmit(){
    const blocks = this.state.blocks;
    if (this.state.edit!=null){
      const a = this.state.edit[0];
      const b = this.state.edit[1];
      blocks[a][b].type = 0;
      blocks[a][b].duration = 0;
    }
    const i = this.state.orange.block;
    const j = this.state.orange.row;
    blocks[j][i].type = 2;
    blocks[j][i].duration = this.state.orange.duration;
    this.setState({
      blocks: blocks,
      orange: { row:-1, block: -1, duration: 1},
      edit: null,
    });
  }
  handleEdit(j, i){
    const blocks = this.state.blocks;
    blocks[j][i].type = 4;
    const newOrange = { row: j, block: i, duration: blocks[j][i].duration};
    this.setState({
      blocks: blocks,
      orange: newOrange,
      edit: [j, i],
    });
  }
  handleCancelEdit(){
    const blocks = this.state.blocks;
    const j = this.state.edit[0];
    const i = this.state.edit[1];
    blocks[i][i].type = 2;
    this.setState({
      blocks: blocks,
      orange: { row:-1, block: -1, duration: 1},
      edit: null,
    });
  }
  handleDelete(j, i){
    const blocks = this.state.blocks;
    blocks[j][i].type = 0;
    blocks[j][i].duration = 0;
    this.setState({
      blocks: blocks,
    });
  }
  handleDrag(ui){
    const newOrange = this.state.orange;
    const row = newOrange.row + Math.round(ui.position.top/38);
    newOrange.row = row;
    this.setState({
      orange: newOrange,
    });
  }
  handleResize(ssize, pos){
    const oldOrange = this.state.orange;
    const row = oldOrange.row + Math.round(pos.y/38);
    const duration = ssize.height/38 - 1;
    this.setState({
      orange: {row: row, block: oldOrange.block, duration: duration},
    });
  }
  fillGrid0(){
    const array = Array(24).fill(0).map((arr)=>{
      return Array(10).fill(0).map((val)=>{
        return {type: 0, duration: 1, blackType: 0}; //{type: duration: blackType: name: email: }
      });
    });

    const date = new Date();
    const line = (date.getHours()-10)*2+(date.getMinutes()>30 ? 1 : 0)-1;

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

    array[16][7].type = 1;
    array[16][7].duration = 4;
    array[16][7].blackType = 1;

    array[0][8].type = 1;
    array[0][8].duration = 4;
    array[0][8].blackType = 1;
    this.setState({
      blocks: array,
      timeLine: line,
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

    array[1][8].type = 1;
    array[1][8].duration = 4;
    array[1][8].blackType = 1;

    array[16][9].type = 1;
    array[16][9].duration = 4;
    array[16][9].blackType = 1;

    this.setState({
      blocks: array,
      grid: 1,
      timeLine: -1,
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

    array[16][9].type = 1;
    array[16][9].duration = 4;
    array[16][9].blackType = 1;

    array[0][8].type = 1;
    array[0][8].duration = 4;
    array[0][8].blackType = 1;

    this.setState({
      blocks: array,
      grid: 2,
      timeLine: -1,
    });
  }
  changeGrid(){
    const b = this.state.grid;
    if(b == '1'){
      this.fillGrid2();
    } else {
      this.fillGrid1();
    }
    this.setState({
      orange: {row: -1, block: -1, duration: 1},
    });
  }
  buildOrange(){
    return <OrangeBlock ref={(c)=> {this.orangeBlock = c;} } row={this.state.orange.row} block={this.state.orange.block} duration={this.state.orange.duration}
    handleDrag={this.handleDrag} handleSubmit={this.handleSubmit} handleDurationChange={this.handleDurationChange} handleResize={this.handleResize}
    edit={this.state.edit} onEditCancel={()=>this.handleCancelEdit()}/>;
  }
  render(){
    const orange = this.state.orange;
    const blocks = this.state.blocks;
    const grid = blocks.map((arr, j)=>{
      const row = arr.map((block, i)=>{
        return <GridBlock key={i} child={
          <ReserveBlock onClick={()=>this.handleClick(j, i)} timeOptions={this.state.timeOptions}
          row={j} block={i} type={this.state.blocks[j][i].type} duration={this.state.blocks[j][i].duration} blackType={this.state.blocks[j][i].blackType}
          onEdit={()=>this.handleEdit(j, i)} onDelete={()=>this.handleDelete(j, i)} />
        } />;
      });
      const classNm = ((j==this.state.timeLine) ? "gridRow lined" : "gridRow" );
      return <div key={j} className={classNm}>
        {orange.row==j ? this.buildOrange() : null}
        {row}
      </div>;
    });
    return <div id="grid" className="grid">
      {grid}
      <div id="gridTrigger" onClick={this.changeGrid}></div>
      <WindowResizeListener onResize={windowSize => {
        this.orangeBlock.forceUpdate();
      }}/>
    </div>;
  }
}

//

function GridBlock(props){
  return <div className="gridBlock">
    {props.child}
  </div>;
}

function ReserveBlock(props){
  let height = (props.duration*1+1)*100+(props.duration*1)*5;
  height = (height).toString().concat('%');
  const style = {
    height: (props.duration*1+1)*38-2,
  }
  const startTime = props.timeOptions[props.row].concat(" - ".concat(props.timeOptions[props.row+props.duration+1]));
  if (props.type=='0') {
    return <div onClick={()=>props.onClick()} className="emptyBlock"></div>;
  } else if (props.type=='1') {
    let content;
    if (props.blackType=='0') {
      return <div className="reserveBlock Black" style={style}>
        <span className="reserveBlockText">Student<br/>
        {startTime}</span>
        <PopupContainer className="blackBoxInfo" content={<BlackBoxInfo name="Nikita Ulianov" email="n.ulianov@innopolis.ru"/>}/>
      </div>;
    } else if (props.blackType=='1'){
      return <div className="reserveBlock Black" style={style}>
        <span className="reserveBlockText">Administrator<br/>
        {startTime}</span>
      </div>;
    } else if (props.blackType=='2'){
      return <div className="reserveBlock Black" style={style}>
        <span className="reserveBlockText">Employee<br/>
        {startTime}</span>
        <PopupContainer className="blackBoxInfo" content={<BlackBoxInfo name="Nikita Ulianov" email="n.ulianov@innopolis.ru"/>}/>
      </div>;
    }
  } else if (props.type=='2'){
    const startsTime = props.timeOptions[props.row].concat(" - ".concat(props.timeOptions[props.row*1+props.duration*1+1]));
    return <div className="reserveBlock Green" style={style}>
      <span className="reserveBlockText">Your<br/>
      {startsTime}</span>
      <PopupContainer className="greenBoxInfo" content={<GreenBoxInfo onEdit={props.onEdit} onDelete={props.onDelete}/> }/>
    </div>;
  } else if (props.type=='4'){
    const startsTime = props.timeOptions[props.row].concat(" - ".concat(props.timeOptions[props.row*1+props.duration*1+1]));
    return <div className="reserveBlock EditHolder" style={style}>
      <span className="reserveBlockText">Under Editing<br/>
      {startsTime}</span>
    </div>;
  }
}

class OrangeBlock extends React.Component{
  constructor(props){
    super(props);
  }
  updatePosition(obj){
    this.rnd.updatePosition(obj);
  }
  render(){
    const j = this.props.row;
    const i = this.props.block;
    const duration = this.props.duration;
    const width = document.getElementById('grid').offsetWidth/10;
    const height = document.getElementById('grid').offsetWidth/24;
    const handleTop = 'url(http://imgh.us/Vector_13.png) no-repeat '.concat(width/2-3*1).concat('px').concat(' 12px');
    const handleBottom = 'url(http://imgh.us/Vector_13_1.png) no-repeat '.concat(width/2-3*1).concat('px').concat(' 3px');
    const handleStyle =
      { top:  {
          position: 'absolute',
          width: '100%',
          height: '17px',
          top: '-5px',
          left: '0px',
          cursor: 'row-resize',
          background: handleTop,
        },
        bottom: {
          position: 'absolute',
          width: '100%',
          paddingLeft: '0%',
          height: '17px',
          bottom: '-5px',
          left: '0px',
          cursor: 'row-resize',
          background: handleBottom,
        }
      }
      // if (this.rnd!=null){
      //   this.rnd.updatePosition(document.getElementById('grid').offsetWidth/10*1*i, j*1*38);
      // }
    return <Rnd
            ref={(c) => {this.rnd = c;}}
            initial={{
              x: i*width+1,
              y: 1,
              width: width-2,
              height: 38*(duration*1+1)-2,
            }}
            bounds={parent}
            moveAxis={'y'}
            minHeight={38}
            maxHeight={12*38}
            resizeGrid={[1, 38]}
            moveGrid={[1, 38]}
            isResizable={{ top:true, right:false, bottom:true, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
            className = "orangeBlock"
            resizerHandleStyle={handleStyle}
            onResizeStop = {(dir, ssize, csize, delta, pos)=>this.props.handleResize(ssize, pos)}
            onDragStop= {(event, ui)=>this.props.handleDrag(ui)}
          >
            <div style={{userSelect: 'none'}}>
              New
              <PopupContainer className="reservation" content={<Reserve row={this.props.row} block={this.props.block} duration={this.props.duration}
                onSubmit={(time, duration, room)=>this.props.handleSubmit(time, duration, room)} onDurationChange={(value)=>this.props.handleDurationChange(value)}
              edit={this.props.edit} onEditCancel={this.props.onEditCancel}/>}/></div>

        </Rnd>
      }
}
