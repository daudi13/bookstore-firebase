import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { makeStyles } from 'tss-react/mui';
import { BookstoreState } from '../BookstoreContex';
import { signOut } from 'firebase/auth';
import Modal from '@mui/material/Modal';
import firebaseEngine from '../firebase'
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  
  const [open, setOpen] = React.useState(false)
  const { setAlert} = BookstoreState();
  const { auth } = firebaseEngine;
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  const useStyle = makeStyles()((theme) => ({
    Appbar: {
      display: "flex",
      alignItems: "center",
      width: "100%"
    },
    btn: {
      padding: 0,
      backgroundColor: "white",
      width: "100px",
      color: "black",
      "&:hover": {
        backgroundColor: "red",
        color: "white"
      }
    },
    modal: {
      backgroundColor: "#f0fff0",
      height: "250px",
      width: "300px",
      position: "absolute",
      top: "64px",
      right: "0",
      gap: "20px",
      outline: "none",
      borderRadius: "0 0 10px 10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "column",
      padding: "20px",
      boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.23)",
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
    setOpen(false);
    navigate("/");
  }

  const { classes } = useStyle();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" className={classes.Appbar} style={{cursor: "pointer"}}>
            BookStoreCMS
          </Typography>
          {location.pathname === "/" ? " " :
            <Avatar
            className={classes.picture}
            src={user.photoURL}
            alt={user.displayName || user.email}
            onClick={() => setOpen(true)}
          />}
        </Toolbar>
      </AppBar>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <img src={user === null?  " " : user.photoURL} alt={user === null?  " " : user.displayName || user.email} style={{ borderRadius: "50%", width: "150px", height: "150px" }} />
          <Typography variant='h6' style={{color: "black", fontFamily: "Montserrat"}} component="h6">{user === null?  " " : user.email}</Typography>
          <Button variant='outlined' onClick={logOut} className={classes.btn}>Log out</Button>
        </Box>
      </Modal>
    </Box>
  );
}