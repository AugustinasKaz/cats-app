import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Switch from './header-bar-switch';
import { ThemeContext } from './context'

export default function ButtonAppBar() {
  const colorData = useContext(ThemeContext);
  let color = null;
  if (colorData.theme === 'dark')
     color = '#99003d'
  if (colorData.theme === 'light')
     color = '#9ae5e5'

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    barColor: {
      backgroundColor: color,
    }
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.barColor} >
        <Toolbar>
          <Switch />
        </Toolbar>
      </AppBar>
    </div>
  );
}
