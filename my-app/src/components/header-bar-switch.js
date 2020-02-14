import React from 'react';
import Switch from '@material-ui/core/Switch';
import {ThemeContext} from './context'

export default function Switche() {
  
  return (
    <ThemeContext.Consumer>
      {({ theme, setTheme }) => (
    <div>
      <label style={{'font-size': '12px'}}>{theme}</label>
      <Switch onClick={setTheme} defaultChecked color="default" inputProps={{ 'aria-label': 'checkbox with default color' }}/>
    </div>
      )}
    </ThemeContext.Consumer>
  );
}
