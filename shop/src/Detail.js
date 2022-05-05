import React, { useState, useEffect, useContext } from "react";
import { Nav } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import { stockContext } from './App.js'
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';

let Box = styled.div`
    padding : 20px;
`;

let Title = styled.h4`
    font-size : 25px;
    color : ${props => props.NewColor}
`;


//React 16.9 이전의 라이프사이클에 훅 걸기
// class Detail2 extends React.Compoenent{
//    componentDidMount(){

//    } 

//    componentWillUnmount(){

//    }
// }


function Detail(props) {
    //useEffect 는 mounted, updated 될때 작동한다.
    let [stockAlert, stockAlertChg] = useState(true);
    let stock = useContext(stockContext);
    let [tab, tabChg] = useState(0);
    let [cssSwitch, cssSwitchChg] = useState(false);

    useEffect(() => {
        let timer = setTimeout(() => {
            stockAlertChg(false);
        }, 2000);
        return () => { clearTimeout(timer) }
    }, []); //[] 를 넣으면 mounted 경우에만 실행되고 updated 일때는 실행안됨.

    let { id } = useParams();
    let history = useHistory();
    let findData = props.shoesData.find((data) => {
        return data.id == id;
    });




    return (
        <div className="container">
            <div className="row">
                {/* styled Components 예제 */}
                {/* <Box>
                    <Title className="red">후ㅡ후후</Title>
                </Box> */}

                {
                    stockAlert === true
                        ? (
                            <div className="my-alert-test">
                                <p>이 상품은 재고가 얼마 남지 않았어요!</p>
                            </div>
                        )
                        : null

                }







                <div className="col-md-6">
                    <img src={findData.imgUrl} width="100%" alt="detail" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{findData.title}</h4>
                    <p>{findData.content}</p>
                    <p>{findData.price}원</p>

                    <Stock stock={props.stock}></Stock>

                    <button className="btn btn-danger" onClick={() => {
                        props.stockChg([9, 11, 12])
                        props.dispatch({type:'addList', payload : {id: findData.id, name:findData.title, quan:1}})
                        history.push('/cart');
                    }}>주문하기</button>
                    <button className="btn btn-danger" onClick={() => {
                        history.goBack();
                    }}>뒤로가기</button>
                </div>
            </div>

            <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
                <Nav.Item>
                    <Nav.Link eventKey="link-0" onClick={() => {
                        tabChg(0);
                        cssSwitchChg(false);
                    }}>Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={() => {
                        tabChg(1);
                        cssSwitchChg(false);
                    }}>Option 2</Nav.Link>
                </Nav.Item>
            </Nav>
            <CSSTransition in={cssSwitch} classNames="wow" timeout={500}>
                <TabContent tab={tab} cssSwitchChg={cssSwitchChg}></TabContent>
            </CSSTransition>        
        </div>
    )
};

function TabContent(props) {
        useEffect(()=>{
            props.cssSwitchChg(true);
        })
        if(props.tab === 0){
            return <div>{props.tab}번째 내용입니다.</div>
        }
        if (props.tab === 1) {
            return <div>{props.tab}번째 내용입니다.</div>
        }
}

function Stock(props) {
    return (
        <p>재고 : {props.stock[0]}</p>
    )
}

function test(state) {
    return {
        state: state.reducer,
        alertState: state.reducer2
    }
}

export default connect(test)(Detail)