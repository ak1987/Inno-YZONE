import React, { Component } from 'react';
import './Tabs.css';

function Logo(props){
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
      (tab, i)=> (<Tab key={i} selected={(i==this.state.selected) ? '1' : '0'} day={tab.dayName} date={tab.date} onClick={() => this.handleClick(i)} />));
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
  return <div id="otherDateButton" className="otherDateBox">{img}{text}
  </div>;
}

function LeftSide(props){
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
  return <div id="notif" className="rightSideBox notif">{img}</div>;
}

function MyReservations(){
  const text = <div id="myReservButton" className="rightSideText">MyReservations</div>
  return <RightSideBox text={text} />;
}

function Account(){
  const text = <div id="accountButton" className="rightSideText">Account</div>
  return <RightSideBox text={text} />;
}

class RightSide extends React.Component{
  constructor(){
    super();
    this.state = {
      logged: false,
    };
    this.login = this.login.bind(this);
  }
  login(){
    this.setState({
      logged: true,
    });
  }
  render(){
    if (this.state.logged==true){
      return (<div className="rightSide-top">
          <Notification />
          <MyReservations />
          <Account />
        </div>);
    } else {
      return <div className="rightSide-top">
        <SignIn />
        <div id="tabTrigger" className="rightSideBox" onClick={this.login}></div>
      </div>;
    }
  }
}

function SignIn(){
  const text = <div id="signInButton" className="rightSideText">Sign In</div>
  return <RightSideBox text={text} />;
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
