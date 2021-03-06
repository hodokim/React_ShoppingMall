import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext, useState, lazy, Suspense } from "react";
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import Data from './data.js';

import axios from 'axios';
import { Link, Route, Switch } from 'react-router-dom';
import Cart from './Cart.js';
import { useHistory } from 'react-router-dom';

// import Detail from './Detail.js';
let Detail = lazy( ()=> { return import('./Detail.js') });

export let stockContext = React.createContext();


function App() {

  let [shoesData, shoesDataChg] = useState(Data);
  let [stock, stockChg] = useState([10, 11, 12]);



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
            <stockContext.Provider value={stock}>
            <div className="row">
              {
                shoesData.map((data, idx) => {
                  return (
                    <Card shoes={data} key={idx}></Card>
                  )
                })
              }
            </div>
            </stockContext.Provider>
          </div>          
        </Route>

        
        <Route path="/detail/:id">
          <stockContext.Provider value={stock}>
          <Suspense fallback={<div>????????? ?????????..</div>}>
            <Detail shoesData={shoesData} stock={stock} stockChg={stockChg}></Detail>
          </Suspense>
          </stockContext.Provider>
        </Route>
       

        <Route path="/cart">
          <Cart></Cart>
        </Route>
      </Switch>

      <Route exact path="/">
        <button className="btn btn-primary" onClick={() => {
          axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((result) => {
              //?????? ??????
              let data = result.data;
              shoesDataChg([...shoesData, ...data])


              //????????? ?????? ??????.
              // let originCopy = [...shoesData];
              // let data = result.data;
              // data.forEach((x)=>{
              //   originCopy.push(x);
              // });
              // shoesDataChg(originCopy);    
            })
            .catch(() => { console.log('??????????????????.') })
        }}>?????????</button>
      </Route>
    </div>

  );
}



function Card(props) {

  let stock = useContext(stockContext);
  let history = useHistory();
  return (
    <div className="col-md-4" onClick={()=>{ history.push('detail/'+props.shoes.id)}}>
      <img src={'https://codingapple1.github.io/shop/shoes'+(props.shoes.id+1)+'.jpg'} width="100%" alt="shoesImg"></img>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
      
      <Test></Test>
    </div>
  )
};

function Test(){
  let stock = useContext(stockContext);
  return <p>?????? : {stock}</p>
}


export default App;
