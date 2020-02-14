import React from 'react';
import Comments_main from './components/comments_main'
import Cats from './components/cats'
import Bar from './components/header-bar'
import {ThemeContext} from './components/context'

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      theme: 'dark',
      setTheme: this.toggleTheme,
    }
  }
  
  toggleTheme = () =>{
    if(this.state.theme === 'dark')
      this.setState({theme: 'light'})
    else
    this.setState({theme: 'dark'})
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        <div>
          <Bar />
          <Comments_main />
          <Cats />
        </div>
      </ThemeContext.Provider>
    );
  }
}

export default App;
