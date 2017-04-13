import React from 'react';
import Modal from './Modal';
import "./AccountModal.css";


class AccountContent extends React.Component{
  constructor(){
    super();
    this.state = {
      firstName: "Nikita",
      lastName: "Ulianov",
      email: "n.ulianov@innopolis.ru",
    };
    //this.onDelete = this.onDelete.bind(this);
  }

  render(){
    return <div className="accountContent">
      <div className="accountLogOut">Log out</div>
      <div className="accountLabel">E-mail</div>
      <div className="accountEmail" title="Change email">{this.state.email}</div>
      <div className="accountLabel">First name</div>
      <div className="accountName">{this.state.firstName}</div>
      <div className="accountLabel">Last name</div>
      <div className="accountName">{this.state.lastName}</div>
    </div>;
  }
}

function AccountModal(props){
  return <Modal header="Account" content={<AccountContent/>}/>;
}
