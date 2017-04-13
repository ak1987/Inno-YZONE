import React, { Component } from 'react';
import './Tabs.css';

function Logo(){
  return <div className="logoBox">
    <img className="logo" src="http://imgh.us/Group_(1)_1.svg" title="source: imgur.com" />
  </div>;
}
function Tab(props){
  const s = props.selected;
  return (
      <div className={(s=='1') ? 'tabBox selected' : 'tabBox'} onClick={() => props.onClick()}>
        <div className={(s=='1') ? 'dayName selected' : 'dayName'}>
          {props.day}
        </div>
        <div className={(s=='1') ? 'date selected' : 'date'}>
          {props.date}
        </div>
        { (s=='1') ? (<div className="orange-line"></div>) : null}
      </div>
    );
}

class Tabs extends React.Component {
  constructor(props){
    super();
    this.state = {
      tabs: [
        {dayName: "Today", date: "March, 10"},
        {dayName: "Saturday", date: "March, 11"},
        {dayName: "Sunday", date: "March, 12"},
        {dayName: "Monday", date: "March, 13"},
        {dayName: "Tuesday", date: "March, 14"},
        {dayName: "Wednesday", date: "March, 15"},
        {dayName: "Thursday", date: "March, 16"},
      ],
      selected: 0,
    };
    this.showTabs.bind(this);
    this.setActive.bind(this);
    this.handleClick.bind(this);
  }
  setActive(i){
    this.setState({
      selected: i
    });
  }
  handleClick(i){
    this.setActive(i);
  }
  showTabs(){
    const tabs = this.state.tabs;
    const listTabs = tabs.map(
      (tab, i)=> (<Tab selected={(i==this.state.selected) ? '1' : '0'} day={tab.dayName} date={tab.date} onClick={() => this.handleClick(i)} />));
    return (
      <div>
        {listTabs}
      </div>
    );
  }
  render() {
    return (
      <div className="dayTabs">
        {this.showTabs()}
      </div>
    );
  }
}


function OtherDate(){
  const img = <div className="otherDateImgBox"><img className="otherDateImg" src="http://imgh.us/Group_(3).svg" title="source: imgur.com" /></div>;
  const text = <div className="otherDate">Other date</div>;
  return <div className="otherDateBox">{img}{text}
  </div>;
}

function LeftSide(){
  return <div className="leftSide">
      <Logo />
      <Tabs />
      <OtherDate />
    </div>;
}

function RightSideBox(props){
  return <div className="rightSideBox">{props.text}</div>;
}

function Notification(){
  const img = <img className="noti" src="http://imgh.us/Component_4.svg" title="source: imgur.com" />;
  return <div className="rightSideBox notif">{img}</div>;
}

function MyReservations(){
  const text = <div className="rightSideText">MyReservations</div>
  return <RightSideBox text={text} />;
}

function Account(){
  const text = <div className="rightSideText">Account</div>
  return <RightSideBox text={text} />;
}

function RightSide(){
  return (<div className="rightSide-top">
      <Notification />
      <MyReservations />
      <Account />
    </div>);
}

function Topbar(){
  return (<div className="topbar">
    <LeftSide />
    <RightSide />
  </div>);
}

function TopBarCotainer(){
  return <div className="topbarContainer">
    <Topbar/></div>;
} export default TopBarCotainer;

function EmptyBox(){
  const text = Array(1000).fill('a');
  const list = text.map((val, i) => (<li key={i}>{val}</li>));
  return <ul className="emptyBox"></ul>;
}
