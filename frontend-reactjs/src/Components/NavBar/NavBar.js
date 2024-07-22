import React, { useState } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import "./NavBar.css"

function NavbarComponent() {
  
  
  const [highlight, changeHighlight] = useState()

  function handleSelected(tab_name)
  {
    if (tab_name == "Search")
      changeHighlight("Search")
    else if (tab_name == "Wishlist")
      changeHighlight("Wishlist")
    else if (tab_name == "Portfolio")
      changeHighlight("Portfolio")
  }
  
  
  return (
      // <Navbar expand="lg" style={{ backgroundColor: "#A8DADC" }}>
      //   <Navbar.Brand
      //   style={{marginLeft:"20px"}}>Stock Tracker</Navbar.Brand>
      //   <Navbar.Toggle aria-controls="basic-navbar-nav" />
      //   <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
      //     <Nav className="mr-auto"></Nav>
      //     <Nav>
            
         
      //       <Nav.Link href="/search"
      //     className={`nav-select ${highlight === "Search" ? "active" : ""}`}
      //     onClick={() => handleSelected("Search")}
      //     style={{
      //       backgroundColor: highlight === "Search" ? "#f1faee" : "",
      //       borderRadius: highlight === "Search" ? "15px" : "",
      //     }}>Search</Nav.Link>
      //       <Nav.Link href="/watchlist" className='nav-select' onClick={() => handleSelected('Wishlist')}>Wishlist</Nav.Link>
      //       <Nav.Link href="/portfolio" className='nav-select' onClick={() => handleSelected('Portfolio')}>Portfolio</Nav.Link>
      //     </Nav>
      //   </Navbar.Collapse>
      // </Navbar>

      <Navbar expand="lg" style={{ backgroundColor: "#A8DADC" }}>
    <Navbar.Brand style={{ marginLeft: "20px" }}>Stock Tracker</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
      <Nav className="mr-auto"></Nav>
      <Nav>
        <Nav.Link
          href="/search"
          className={`nav-select ${highlight === "Search" ? "active" : ""}`}
          onClick={() => handleSelected("Search")}
          style={{
            backgroundColor: highlight === "Search" ? "#f1faee" : "",
            borderRadius: highlight === "Search" ? "15px" : "",
          }}
        >
          Search
        </Nav.Link>
        <Nav.Link
          href="/watchlist"
          className={`nav-select ${highlight === "Wishlist" ? "active" : ""}`}
          onClick={() => handleSelected("Wishlist")}
        >
          Wishlist
        </Nav.Link>
        <Nav.Link
          href="/portfolio"
          className={`nav-select ${highlight === "Portfolio" ? "active" : ""}`}
          onClick={() => handleSelected("Portfolio")}
        >
          Portfolio
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
    );
  }
  
  




export default NavbarComponent;