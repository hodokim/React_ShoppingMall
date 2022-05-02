import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux';

let alertVal = true;

function reducer2(state = alertVal, action){
  if(action.type === 'popupClose'){
    return false;
  }
  return state;
}



let defaultState = [
  { id: 0, name: '나이키 축구화', quan: 1 },
  { id: 1, name: '아디다스 복싱화', quan: 1 }, 
]

function reducer(state = defaultState, action){
  if(action.type === 'addList'){
    let copy = [...state];
    let id = action.payload.id;
    console.log(copy)
    copy = copy.map((x)=>{
      if(x.id === id){
        x.quan++
      }
      return x
    })
    return copy;
  }else if(action.type === 'inc'){
    let copy = [...state];
    copy[0].quan++;
    return copy;
  }else if(action.type === 'dec'){
    let copy = [...state];
    copy[0].quan--;
    return copy;
  }else{
    return state;
  }    
}


  let store = createStore(combineReducers({reducer, reducer2}));
//let store = createStore(reducer);



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
