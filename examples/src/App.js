import React from 'react';
import LazyLoad from '../../src/index';
import './App.css';

function App() {
  let arr = new Array(10000).fill(1);
  return (
    <div className="App">
      {
        arr.map((item, index) => (
          <LazyLoad
            throttle={250}
            offsetVertical={100}
          >
            <div>{index}</div>
          </LazyLoad>
        ))
      }
    </div>
  );
}

export default App;
