import React from "react";
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';

let Box = styled.div`
    padding : 20px;
`;

let Title = styled.h4`
    font-size : 25px;
    color : ${ props => props.NewColor }
`;


function Detail(props) {

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
                <div className="my-alert-test">
                    <p>이 상품은 재고가 얼마 남지 않았어요!</p>
                </div>
                <div className="col-md-6">
                    <img src={findData.imgUrl} width="100%" alt="detail" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{findData.title}</h4>
                    <p>{findData.content}</p>
                    <p>{findData.price}원</p>
                    <button className="btn btn-danger">주문하기</button>
                    <button className="btn btn-danger" onClick={() => {
                        history.goBack();
                    }}>뒤로가기</button>
                </div>
            </div>
        </div>
    )
};

export default Detail;