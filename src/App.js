import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import ProductListing from './ProductListing';
import CheckoutSummary from './CheckoutSummary'
import ThankYou from './ThankYou';

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<ProductListing/>}></Route>
        <Route exact path='/checkout' element={<CheckoutSummary/> }/>
        <Route exact path='/thankyou' element={ <ThankYou/> }/>
      </Routes>
   </BrowserRouter>
  );
}

export default App;
