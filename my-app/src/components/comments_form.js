import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { PostComment } from './APIfunctions.js'
import { CommentsContext, ThemeContext } from './context'


export default function Comment_form() {
  let [username, setName] = useState(" ");
  let [comm, setComm] = useState(" ");

  let [E1_text, setE1_text] = useState(" ");
  let [E1, setE1] = useState(false);
  let [E2_text, setE2_text] = useState(" ");
  let [E2, setE2] = useState(false);

  const colorData = useContext(ThemeContext);
  let ThemeColor = null;
  if (colorData.theme === 'dark')
    ThemeColor = 'white'
  if (colorData.theme === 'light')
    ThemeColor = 'black'

  const useStyles = makeStyles(theme => ({
    lineColor: {
      color: ThemeColor
    },
    root: {
      '& > *': {
        margin: theme.spacing(1),
        display: 'flex',
      },
    },
    input2: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: ThemeColor,
        },
        '&:hover fieldset': {
          borderColor: ThemeColor,
        },
        '&.Mui-focused fieldset': {
          borderColor: ThemeColor,
        },
      },
      '& label.Mui-focused': {
        color: ThemeColor,
      },
      '& label': {
        color: ThemeColor,
      },
      width: 320,
      'margin-right': 10,
    },
    input1: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: ThemeColor,
        },
        '&:hover fieldset': {
          borderColor: ThemeColor,
        },
        '&.Mui-focused fieldset': {
          borderColor: ThemeColor,
        },
      },
      '& label.Mui-focused': {
        color: ThemeColor,
      },
      '& label': {
        color: ThemeColor,
      },
      width: 200,

    },
    div1: {
      display: 'flex',
    },
    button: {
      backgroundColor: 'grey',
      height: 55,
    }
  }));
  const classes = useStyles();

  function updateName(e) {
    setName(username = e.target.value);
  }

  function updateComm(e) {
    setComm(comm = e.target.value);
  }

  const contextData = useContext(CommentsContext);
  
  async function validate() {
    if (username.length < 4) {
      setE1(E1 = true)
      setE1_text(E1_text = "username is to short")
    }
    else if (comm.length < 2) {
      setE2(E2 = true)
      setE2_text(E2_text = "Comment can't be empty")
    }
    else {
      setE1(E1 = false)
      setE1_text(E1_text = " ")
      setE2(E2 = false)
      setE2_text(E2_text = " ")
      await PostComment(username, comm);
      setComm(comm = " ");
      setName(username = " ");
      contextData.setComments();
    }
    }

    return (
      <form className={classes.root}>
        <TextField error={E1} InputProps={{ className: classes.lineColor }} value={username} onChange={updateName} helperText={E1_text}
          className={classes.input1} label="Name" variant="outlined" />
        <div className={classes.div1}>
          <TextField error={E2} InputProps={{ className: classes.lineColor }} value={comm} onChange={updateComm} helperText={E2_text}
            className={classes.input2} label="Comment" variant="outlined" />
          <Button onClick={validate} className={classes.button} variant="contained">Submit</Button>
        </div>
      </form>
    );
  }
