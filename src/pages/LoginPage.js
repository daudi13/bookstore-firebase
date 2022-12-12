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

const LoginPage = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const useStyle = makeStyles()(() => ({

  }))

  const { classes } = useStyle();

  return (
    <Container>
      <Box>
        <TabContext value={value}>
          <Box className={classes.boxContainer}>
            <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor='secondary' centered>
              <Tab label="login" value="1"/>
              <Tab label="sign up" value="2"/>
            </Tabs>
          </Box>
          <TabPanel value='1'><LoginTab/></TabPanel>
          <TabPanel value='2'>2</TabPanel>
          <Box className={classes.google}>
            <span>OR</span>
            <GoogleButton
              label='sign in with Google'
              onClick={() => console.log("sign in with google")}
              style={{width: "80%"}}
            />
          </Box>
        </TabContext>
      </Box>
    </Container>
  )
}

export default LoginPage