import React from 'react';
import Modal from './Modal';

function DeleteModal(props){
  const content = <DeleteModalContent/>;
  return <Modal header="Delete?" content={content}/>;
} export default DeleteModal;

function DeleteModalContent(props){
  return <div className="deleteModalContent">
    <div className="text">Do you really want to delete reservation?</div>
    <button className="default">Yes</button>
    <button className="active">No</button>
  </div>;
}
