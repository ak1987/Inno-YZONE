import React from 'react';
import Rnd from 'react-rnd';


<Rnd
  ref={c => { this.rnd = c; }}
  initial={{
    x: window.innerWidth / 2 - 200,
    y: window.innerHeight / 2 - 80,
    width: 400,
    height: 160,
  }}
  style={style}
  minWidth={300}
  minHeight={160}
  maxWidth={800}
  maxHeight={300}
  bounds={'parent'}
>
  <span className="box">
    resize and drag me!!
  </span>
</Rnd> export default Resizeable
