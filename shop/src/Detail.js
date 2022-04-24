import React from "react";
import { useHistory, useParams } from 'react-router-dom'

function Detail(props) {

    let { id } = useParams();
    let history = useHistory();

    return (
        <div className="container">
            {
                props.shoesData.map(data=>{
                    console.log('data.id==>>'+data.id)
                    console.log('id===>> '+id)
                    if(data.id == id) {
                    return (
                        <div className="row">
                            <div className="col-md-6">
                                <img src={data.imgUrl} width="100%" alt="detail" />
                            </div>
                            <div className="col-md-6 mt-4">
                                <h4 className="pt-5">{data.title}</h4>
                                <p>{data.content}</p>
                                <p>{data.price}원</p>
                                <button className="btn btn-danger">주문하기</button>
                                <button className="btn btn-danger" onClick={() => {
                                    history.goBack();
                                }}>뒤로가기</button>
                            </div>
                        </div>
                    )
                    }
                })
            }
        </div>
    )
};

export default Detail;