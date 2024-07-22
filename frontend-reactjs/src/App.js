import './App.css';
import React from 'react';
import NavbarComponent from './Components/NavBar/NavBar';
import SearchComponent from './Components/Search/search';
import { BrowserRouter as Router, Route, Routes, BrowserRouter, Redirect } from 'react-router-dom';
import WatchlistComponent from './Components/Watchlist/Watchlist';
import PortfolioComponent from './Components/Portfolio/Portfolio';
import StockDetailsComponent from './Components/StockDetails/StockDetails';

function App() {
  return (
    <div>
      <NavbarComponent/>
    
    
      <div>
        <BrowserRouter>
          
          <Routes>
              <Route exact path="/search" element={<SearchComponent/>}/>
              <Route exact path="/watchlist" element={<WatchlistComponent/>}/>
              <Route exact path="/portfolio" element={<PortfolioComponent/>}/>
              <Route exact path="/details/:id" element={<StockDetailsComponent/>}/>
              <Route exact path="/" element={<SearchComponent/>} />
          </Routes>

        </BrowserRouter>
      </div>


    </div>
  );
}

export default App;
