import React, { Component } from 'react';
import './SignIn.css';
import './styleOverride.css';

function ModalContent(props){
  return <div className="modalContentContainer">
    {props.content}
  </div>;
}

function SignInContent(props){
  return <div className="modalContent">
    <SignInText/>
    <form>
      <div className="emailContainer">
        <div className="fieldLabel">E-mail</div>
          <div className="emailInput">
            <input type="text" className="inline"/>
          <div className="atInnopolis">@innopolis.ru</div>
        </div>
      </div>
      <Button type="submit" className="active wide" value="Get link"/>
    </form>
  </div>;
}

function SignInText(props){
  return <div className="modalContentText">
    Enter your e-mail and we’ll send you<br/>
      a link via you can access your account
  </div>;
}

function ModalHeader(props){
  return <div className="modalHeader">
    <div className="modalHeaderText">{props.header}</div>
    <div className="modalHeaderClose"></div>
  </div>;
}

function Button(props){
  return <button className={props.className}>{props.value}</button>;
}

function EmailInput(){
  return ;
}

class SignInModal extends React.Component{
  constructor(){
    super();
  }

  render(){
    const content = <SignInContent/>;
    return (<div className="modalContainer">
        <ModalHeader header="Sign in"/>
        <ModalContent content={content}/>
      </div>);
  }
}

export default SignInModal;
