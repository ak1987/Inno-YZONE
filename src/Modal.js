import React, { Component } from 'react';
import './Modal.css';
import './styleOverride.css';

function Modal(props){
  return <div className="modalContainer">
    <ModalHeader header={props.header}/>
    <ModalContent content={props.content}/>
  </div>;
} export default Modal;

function ModalHeader(props){
  return <div className="modalHeader">
    <div className="modalHeaderText">{props.header}</div>
    <div className="modalHeaderClose"></div>
  </div>;
}

function ModalContent(props){
  return <div className="modalContentContainer">
    {props.content}
  </div>;
}
