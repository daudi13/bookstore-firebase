import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from 'tss-react/mui';
import { BookstoreState } from '../BookstoreContex';
import { signOut } from 'firebase/auth';
import firebaseEngine from '../firebase'
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {

  const { setAlert} = BookstoreState();
  const { auth } = firebaseEngine;
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  const useStyle = makeStyles()(() => ({
    Appbar: {
      display: "flex",
      alignItems: "center",
      width: "100%"
    },
    btn: {
      padding: 0,
      backgroundColor: "red",
      width: "100px"
    }
  }))

  const navigate = useNavigate();


  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      message: "You have successfully logged out",
      type: "success"
    })
    localStorage.clear();
    navigate("/");
  }

  const { classes } = useStyle();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" className={classes.Appbar} onClick={logOut} style={{cursor: "pointer"}}>
            BookStoreCMS
          </Typography>
          {location.pathname === "/" ? " " :
            <Avatar
            className={classes.picture}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}