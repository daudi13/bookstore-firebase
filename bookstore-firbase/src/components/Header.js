import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from 'tss-react/mui';
import { BookstoreState } from '../BookstoreContex';
import { signOut } from 'firebase/auth';
import firebaseEngine from '../firebase'
import { useNavigate } from "react-router-dom";

export default function Header() {

  const { user, setAlert } = BookstoreState();
  const { auth } = firebaseEngine;
  const useStyle = makeStyles()(() => ({
    Appbar: {
      display: "flex",
      alignItems: "center",
      width: "100%"
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

    navigate("/");
  }

  const { classes } = useStyle();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" className={classes.Appbar}>
            BookStoreCMS
          </Typography>
          {user && <Button variant='outlined' onClick={logOut} color="inherit">Log out</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}