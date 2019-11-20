import React ,{useState}from 'react';
import './App.css';
import Header from './components/Header';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import {BrowserRouter as Router,Route,useHistory} from 'react-router-dom'

import { ToastContainer } from 'react-toastify';
import Dashboard from './screens/Dashboard';
import ItemDetails from './screens/ItemDetails';
import HistoryScreen from './screens/HistoryScreen';
function App() {
  const [searchQuery,setSearchQuery]=useState('')
  const loader = document.querySelector('.loader');
  // if you want to show the loader when React loads data again
  const showLoader = () => loader.classList.remove('loader--hide');
  
  const hideLoader = () => loader.classList.add('loader--hide');
  return (
    <Router>
    <div>
    <ToastContainer/>
    <Route path='/' render={routeProps =>
        <Header {...routeProps} 
        searchQueryValue={searchQuery}
      inputChange={(event)=>{setSearchQuery(event.target.value)}}
      />} />
      {/* <Header 
      searchQueryValue={searchQuery}
      inputChange={(event)=>{setSearchQuery(event.target.value)}}
      />  */}
      <Route exact path='/'  render={routeProps =>
        <LoginScreen {...routeProps} 
      />} />
      <Route exact path="/signup"  render={routeProps => 
      <SignupScreen {...routeProps} 
     />} />

    <Route exact path="/dashboard" render={routeProps => 
      <Dashboard {...routeProps} 
      query={searchQuery}
      hideLoader={hideLoader}
      showLoader={showLoader} 
    
     />} />

    <Route exact path="/items/:id" render={routeProps => 
      <ItemDetails {...routeProps} 
      hideLoader={hideLoader}
      showLoader={showLoader} 
    
     />} />

    <Route exact path="/history"  render={routeProps => 
      <HistoryScreen {...routeProps} 
    
     />} />

    </div>
    </Router>
  );
}

export default App;
