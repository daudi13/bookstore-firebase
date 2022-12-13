import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import React from 'react'; 
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import AlertBox from './components/Alert';


function App() {

  const useStyle = makeStyles()(() => ({
    App: {
      textAlign: "center",
    }
  }))

  const { classes } = useStyle();

  return (
    <BrowserRouter>      
      <div className={classes.App}>
        <Header/>
        <AlertBox/>
        <div>
          <Routes>
            <Route path='/' element={<LoginPage/>} exact />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
