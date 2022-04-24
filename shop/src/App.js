import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import { Nav, Navbar, Form, Container, 
  Offcanvas, FormControl, Button, NavDropdown,
 } from 'react-bootstrap';
import Data from './data.js';
import Detail from './Detail.js';

import { Link, Route, Switch } from 'react-router-dom';


function App() {

  let [shoesData, shoesDataChg] = useState(Data);



  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/"> Home </Nav.Link>
              <Nav.Link as={Link} to="/detail"> Detail </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


    <Switch>
      <Route exact path="/">
        <div className="background">
          20% Season Off!
        </div>
        <div className="container">
          <div className="row">
            {
              shoesData.map((data, idx) => {
                return (
                  <Card shoes={data} key={idx}></Card>
                )
              })
            }
          </div>
        </div>
      </Route>
      <Route path="/detail/:id">
            <Detail shoesData={shoesData}></Detail>
      </Route>    

      <Route path="/:id">
            <div>test</div>
      </Route>
    </Switch>


    </div>
  );
}



function Card(props) {
  return (
    <div className="col-md-4">
      <img src={props.shoes.imgUrl} width="100%" alt="shoesImg"></img>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
    </div>
  )
};


export default App;
