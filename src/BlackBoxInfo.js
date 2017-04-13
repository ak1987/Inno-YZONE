import React from 'react';
import './BlackBoxInfo.css';
import './styleOverride.css';

function BlackBoxInfo(props){
  return <div className="blackBoxInfo">
    <div className="infoFiled">
    <GrayLabel label="Name"/>
    <BlackInfo info={props.name}/>
  </div>
  <div className="infoFiled">
    <GrayLabel label="E-mail"/>
    <BlackInfo info={props.email}/></div>
  </div>;
} export default BlackBoxInfo;

function GrayLabel(props){
  return <div className="grayLabel">
    {props.label}
  </div>;
}

function BlackInfo(props){
  return <div className="blackInfo">
    {props.info}
  </div>;
}
