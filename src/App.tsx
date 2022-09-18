import React from 'react';
import { handleHelloWorldAlert } from './utils';

const App = () => {
  return (
    <div>
      <div>Hello PokeFederations (ui-utils)</div>
      <button onClick={handleHelloWorldAlert}>exec handleHelloWorldAlert</button>
    </div>
  );
};

export default App;
