import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Switch from './header-bar-switch';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color='secondary'>
        <Toolbar>
      <Switch/>
        </Toolbar>
      </AppBar>
    </div>
  );
}
