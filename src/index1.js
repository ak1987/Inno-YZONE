import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import Rnd from 'react-rnd';
import './test.css';

const style = {
  textAlign: 'center',
  padding: '10px',
  border: 'solid 3px #fff',
  borderRadius: '5px',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'height 0.4s',
  transition: 'position 0.4s',
};

const resizeProps = { top:true, right:false, bottom:true, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false };

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = { zIndex: 99 };
    setTimeout(() => this.setState({ zIndex: 1000 }), 5000);
  }
  render() {
    return (
      <Rnd
        ref={c => { this.rnd = c; }}
        initial={{
          x: window.innerWidth / 2 - 200,
          y: window.innerHeight / 2 - 80,
          width: 400,
          height: 160,
        }}
        moveAxis={'y'}
        style={style}
        minWidth={400}
        minHeight={160}
        maxWidth={400}
        maxHeight={900}
        bounds={'parent'}
        zIndex={this.state.zIndex}
        resizeGrid ={ [1, 38]}
        moveGrid = {[1, 38]}
        isReziseable = {resizeProps}
      >
        <span className="box">
          resize and drag me!!
        </span>
      </Rnd>
    );
  }
}

ReactDOM.render(<Example/>, document.getElementById('root'));
