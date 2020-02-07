import React from 'react';
import Users from './components/users'
import Cats from './components/cats'
import Bar from './components/header-bar'

function App() {
  return (
    <div>
      <Bar/>
      <Users/>
      <Cats/>
    </div>
  );
}

export default App;
