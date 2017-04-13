import React, { Component } from 'react';
import Modal from './Modal';
import './SignIn.css';
import './styleOverride.css';

function SignInContent(props){
  return <div className="modalContent">
    <SignInText/>
      <div className="emailContainer">
        <div className="fieldLabel">E-mail</div>
          <div className="emailInput">
            <input id="email-input" type="text" className="inline"/>
            <div className="atInnopolis">@innopolis.ru</div>
        </div>
      </div>
      <Button className="active wide" value="Get link"/>
  </div>;
}

function SignInText(props){
  return <div className="modalContentText">
    Enter your e-mail and we’ll send you<br/>
      a link via you can access your account
  </div>;
}

function Button(props){
  return <button id="getLinkButton" className={props.className}>{props.value}</button>;
}


function SignInModal(){
  const content = <SignInContent/>;
  return <Modal header="Sign In" content={content}/>;
}

export default SignInModal;
