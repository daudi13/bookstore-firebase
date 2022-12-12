import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import React from 'react'; 
import HomePage from './pages/HomePage';
import Header from './components/Header';


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
        <div>
          <Routes>
            <Route path='/' element={<HomePage/>} exact />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
