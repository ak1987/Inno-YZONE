import React from 'react';
import './BlackBoxInfo.css';
import './styleOverride.css';

function BlackBoxInfo(props){
  return <div className="blackBoxInfo">
    <GrayLabel label="Name"/>
    <BlackInfo info={props.name}/>
    <div className="place"></div>
    <GrayLabel label="E-mail"/>
    <BlackInfo info={props.email}/>
  </div>;
} export default BlackBoxInfo;

function GrayLabel(props){
  return <div className="infoField">
    {props.label}
  </div>;
}

function BlackInfo(props){
  return <div className="blackInfo">
    {props.info}
  </div>;
}
