import { Container } from '@mui/system'
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import React from 'react'
import { makeStyles } from 'tss-react/mui';
import GoogleButton from 'react-google-button';
import LoginTab from '../components/LoginTab';
import SignUpTab from '../components/SignUpTab';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import firebaseEngine from '../firebase';
import { BookstoreState } from '../BookstoreContex';
import { useNavigate } from 'react-router';

const LoginPage = () => {
  const [value, setValue] = React.useState('1');
  const { auth } = firebaseEngine;
  const { setAlert } = BookstoreState();
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((userCred) => {
        const user = userCred.user
        setAlert({
          open: true,
          message: `You've successfully logged in ${user.displayName || user.email}`,
          type: "success"
        })
        navigate("/homepage");
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: `${error.message}`,
          type: "error"
        });
    })
  }

  const useStyle = makeStyles()(() => ({
    wrapper: {
      display: "flex",
      alignItems: "center",
      height: "100vh",
      padding: 0,
      margin: 0,
      background: "linear-gradient(45deg, #fe6b8b 30%, #FF8E53 90%)"
    },
    tab: {
      backgroundColor: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100px",
      borderRadius: "20px",
      width: "520px",
      margin: "40px",
      boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75)"
    },
    boxContainer: {
      width: "100%",
      
    },
    background: {
      backgroundImage: "url(./books.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      width: "100%",
      flex: 1
    }
  }))

  const { classes } = useStyle();

  return (
    <div className={classes.wrapper}>
      <Box className={classes.tab}>
        <TabContext value={value}>
          <Box className={classes.boxContainer}>
            <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor='secondary' centered >
              <Tab label="login" value="1"/>
              <Tab label="sign up" value="2"/>
            </Tabs>
          </Box>
          <TabPanel value='1'><LoginTab/></TabPanel>
          <TabPanel value='2'><SignUpTab/></TabPanel>
          <Box className={classes.google}>
            <GoogleButton
              label='sign in with Google'
              onClick={signInWithGoogle}
              style={{ minWidth: "450px", marginBottom: "30px" }}
              fullWidth
            />
          </Box>
        </TabContext>
      </Box>
        <Box className={classes.background}>
        </Box>
    </div>
  )
}

export default LoginPage